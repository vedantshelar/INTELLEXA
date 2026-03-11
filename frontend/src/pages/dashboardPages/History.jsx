import React, { useState } from "react";
import styles from "./History.module.css";
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentDatasetIndex } from "../../slices/datasetIndexSlice";
import {getAllBusinessData} from "../../slices/dataSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function History() {
  let params = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let businessData = useSelector((state) => {
    return state.data.data.data;
  })

  let currentDatasetIndex = useSelector((state)=>{
    return state.datasetIndex.index;
  })

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  /* ================= Rename ================= */

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditedName(item.datasetName);
  };

  const saveEdit = async (businessDataId) => {
    const response = await axios.patch(
      `${backend_url}/businessData/name`,
      {businessDataId,newName:editedName},
      { withCredentials: true }
    );
    if(response.data.success){
      alert("name updated successfully!")
      dispatch(getAllBusinessData());
    }else{
      alert("could not update the name please try again!");
    }
    setEditingId(null);
  };

  /* ================= Delete ================= */

  const deleteDataset = async (businessDataId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this dataset?"
    );

    if (confirmDelete) {
      const response = await axios.delete(
        `${backend_url}/businessData/${businessDataId}`,
        { withCredentials: true }
      );
      if(response.data.success){ 
        alert("dataset deleted successfully!")
        dispatch(getAllBusinessData());
      }else{
        alert("could not delete the dataset please try again!");
      }
    }
  };

  function viewDashboard(indx){
    dispatch(updateCurrentDatasetIndex(indx))
    navigate("/dashboard/graphs/") // remove indexes from every path and use global datasetIndex
  }
  return (
    <div className={styles.container}>
      {/* ========= HEADER ========= */}
      <div className={styles.header}>
        <div>
          <h1>History</h1>
          <p>
            View and manage previously analyzed business datasets
          </p>
        </div>

        <div className={styles.headerActions}>
          <input
            type="text"
            placeholder="Search dataset name..."
            className={styles.searchInput}
          />

          <select className={styles.filterSelect}>
            <option>Recent uploads</option>
            <option>Oldest</option>
            <option>Last viewed</option>
          </select>
        </div>
      </div>

      {/* ========= CONTENT ========= */}
      {businessData.length === 0 ? (
        <div className={styles.emptyState}>
          <i className="fa-solid fa-folder-open"></i>
          <h3>No datasets uploaded yet</h3>
          <p>
            Upload your first dataset to start analyzing business insights.
          </p>
          <button onClick={()=>{navigate("/dashboard/upload")}}>Upload Dataset</button>
        </div>
      ) : (
        <div className={styles.grid}>
          {businessData.map((item, i) => (
            <div
              key={item._id}
              className={styles.card}
              style={{
                border: Number(currentDatasetIndex) === i
                  ? "2px solid black"
                  : "none"
              }}
            >
              {/* ===== TOP ===== */}
              <div className={styles.cardTop}>
                <div className={styles.titleSection}>
                  <i className="fa-solid fa-database"></i>

                  {editingId === item._id ? (
                    <div className={styles.editWrapper}>
                      <input
                        value={editedName}
                        onChange={(e) =>
                          setEditedName(e.target.value)
                        }
                      />
                      <i
                        className="fa-solid fa-check"
                        onClick={() => saveEdit(item._id)}
                      ></i>
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() =>
                          setEditingId(null)
                        }
                      ></i>
                    </div>
                  ) : (
                    <>
                      <h3>{item.datasetName}</h3>
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => startEditing(item)}
                      ></i>
                    </>
                  )}
                </div>

                <div className={styles.actions}>
                  <i className="fa-solid fa-eye"></i>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() =>
                      deleteDataset(item._id)
                    }
                  ></i>
                </div>
              </div>

              {/* ===== META ===== */}
              <div className={styles.meta}>
                <p>📅 Uploaded: {item.createdAt.slice(0, 10)} {item.createdAt.slice(12, -5)}</p>
              </div>

              {/* ===== BUTTON ===== */}
              <button className={styles.viewBtn} onClick={()=>{viewDashboard(i)}}>
                View Dashboard
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}