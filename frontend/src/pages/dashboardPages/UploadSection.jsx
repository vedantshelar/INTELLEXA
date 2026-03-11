import React, { useState, useRef } from "react";
import styles from "./UploadSection.module.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UploadSection = () => {
    let navigate = useNavigate();
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Upload Business Data</h2>
      <p className={styles.description}>
        Upload your Excel (.xlsx) or CSV files to analyze business data and generate AI insights.
      </p>

      <div
        className={styles.uploadBox}
      >
        <FaCloudUploadAlt className={styles.uploadIcon} />

        <p className={styles.uploadText}>
          Drag & Drop your file here
        </p>

        <button className={styles.browseButton} onClick={()=>{navigate("/dashboard/upload")}}>
          Browse File
        </button>

        <input
          type="file"
          className={styles.fileInput}
          accept=".csv,.xlsx"
        />

      </div>
    </section>
  );
};

export default UploadSection;