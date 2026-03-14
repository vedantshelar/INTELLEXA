import React, { useEffect, useState } from "react";
import styles from "./Upload.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAllBusinessData } from "../../slices/dataSlice";
const backend_url = import.meta.env.VITE_BACKEND_URL;
const ml_service_url = import.meta.env.VITE_ML_SERVICE_URL;

const Upload = () => {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isMlServiceLoading,setIsMlServiceLoading] = useState(false);
  const navigate = useNavigate();

  async function wakeupMlService(){
    console.log("inside")
    setIsMlServiceLoading(true);
    const response = await axios.get(ml_service_url);
    if(response.data.success){
      setIsMlServiceLoading(false);
    }else{
      setIsMlServiceLoading(true);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      setStatus("Invalid file type. Please upload a CSV or Excel file.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);

    setStatus("✅ File selected successfully.");
  };

  const handleUpload = async () => {
    if(isMlServiceLoading){
      alert("Wait Server is gettting Loaded!");
    }else{
      try {
        setIsLoading(true);
        if (!selectedFile) {
          setStatus("❌ Please select a file before uploading.");
          setIsLoading(false);
          return;
        }
  
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(`${backend_url}/data`, formData,{withCredentials:true});
        console.log(response);
        setStatus(
          `✅ ${selectedFile.name} uploaded successfully. Ready for AI analysis.`
        );
        setIsLoading(false);
        dispatch(getAllBusinessData());
        navigate("/dashboard/graphs/")
      } catch (error) {
        console.log(error)
        alert("Error Occured While Uploading File , Please Try Again!");
      }
    }
  };

  useEffect(()=>{
    wakeupMlService();
  },[])

  return (
    <div className={styles.container}>
      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <div className={styles.headerIcon}></div>
        <h1>Upload Business Data</h1>
        <p>Upload your business data to generate AI-powered insights</p>
      </header>

      {/* ================= MAIN WRAPPER ================= */}
      <div className={styles.mainWrapper}>

        {/* ================= UPLOAD CARD ================= */}
        <div className={styles.uploadCard}>
          <div className={styles.dropZone}>
            <div className={styles.uploadIcon}></div>
            <p className={styles.mainText}>Drag & drop your file here</p>
            <p className={styles.subText}>or click to browse</p>

            <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
          </div>

          <div className={styles.fileInfo}>
            <p>
              Supported formats: <strong>.csv, .xlsx</strong>
            </p>
            <p>Maximum file size: 5MB</p>

            {selectedFile && (
              <p className={styles.fileName}>
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>

          {!isLoading && <button className={styles.uploadBtn} onClick={handleUpload}>
           {!isMlServiceLoading ? "Upload File":"Wait, Server Getting Ready..."}
          </button>}
          {isLoading && <button className={styles.uploadBtn}>
            Analysing....
          </button>}

          {status && <p className={styles.status}>{status}</p>}
        </div>
      </div>

      {/* ================= SAMPLE DATA SECTION ================= */}

      <div className={styles.sampleSection}>

        <div className={styles.sampleContent}>

          <div className={styles.sampleIcon}>
            <i className="fa-solid fa-file-arrow-down"></i>
          </div>

          <div className={styles.sampleText}>
            <h3>Download Sample Dataset</h3>
            <p>
              New to Intellexa? Download a sample business dataset
              to explore AI insights, predictions, and dashboards.
            </p>
          </div>

        </div>

        <button
          className={styles.sampleDownloadBtn}
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/sample-data.csv"; // file inside public/
            link.download = "intellexa-sample-data.csv";
            link.click();
          }}
        >
          <i className="fa-solid fa-download"></i>
          Download Sample Data
        </button>

      </div>

      {/* ================= FOOTER ================= */}
      <footer className={styles.footer}>
        <div className={styles.lockIcon}></div>
        <p>Your data is securely processed by Intellexa AI</p>
      </footer>
    </div>
  );
};

export default Upload;

