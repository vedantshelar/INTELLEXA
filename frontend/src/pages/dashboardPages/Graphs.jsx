import React, { useState } from "react";
import styles from "./Graphs.module.css";
import SimpleBarChart from "../charts/SimpleBarChart";
import LineChartGraph from "../charts/LineChartGraph";
import PieChartGraph from "../charts/PieChartGraph";
import AreaChartGraph from "../charts/AreaChartGraph";

import { useSelector, useDispatch } from 'react-redux'
import UploadSection from "./UploadSection";

const Graphs = () => {
  let currentDatasetIndex = useSelector((state)=>{
    return state.datasetIndex.index;
  })

  let [days, setDays] = useState(30);

  const data = useSelector((state) => {
    return state.data.data.data[currentDatasetIndex];
  })
  console.log("data : ",data);
  function handleDays(event) {
    setDays(event.target.value);
  }


  if(data){
    return (
      <div className={styles.container}>
        {/* Duration Seleciton And Export Section */}
        <section className={styles.durationSection}>
          <div className={styles.durationBox}>
            <select name="" id="" className={styles.duraitonSelectionBtn} value={days} onChange={handleDays}>
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="365">1 year</option>
            </select>
            <button className={styles.exportBtn}>Export Report</button>
          </div>
        </section>
        {/* ================= KPI SECTION ================= */}
        <section className={styles.kpiSection}>
          <div className={styles.kpiCard}>
            <div className={styles.iconPlaceholder}></div>
            <p className={styles.kpiTitle}>Total Revenue</p>
            {days == "7" && <h3>₹{data.last7DaysKPIs.totalRevenue}</h3>}
            {days == "30" && <h3>₹{data.last30DaysKPIs.totalRevenue}</h3>}
            {days == "365" && <h3>₹{data.last365DaysKPIs.totalRevenue}</h3>}
            <span className={styles.growth}>+18.5%</span>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.iconPlaceholder}></div>
            <p className={styles.kpiTitle}>Total Customers</p>
            {days == "7" && <h3>₹{data.last7DaysKPIs.totalCustomers}</h3>}
            {days == "30" && <h3>₹{data.last30DaysKPIs.totalCustomers}</h3>}
            {days == "365" && <h3>₹{data.last365DaysKPIs.totalCustomers}</h3>}
            <span className={styles.growth}>+2.1%</span>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.iconPlaceholder}></div>
            <p className={styles.kpiTitle}>Avg Orders Value</p>
            {days == "7" && <h3>₹{data.last7DaysKPIs.avgOrderValue}</h3>}
            {days == "30" && <h3>₹{data.last30DaysKPIs.avgOrderValue}</h3>}
            {days == "365" && <h3>₹{data.last365DaysKPIs.avgOrderValue}</h3>}
            <span className={styles.growth}>+5.3%</span>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.iconPlaceholder}></div>
            <p className={styles.kpiTitle}>Retention Rate (%)</p>
            {days == "7" && <h3>{data.last7DaysKPIs.retentionRate}%</h3>}
            {days == "30" && <h3>{data.last30DaysKPIs.retentionRate}%</h3>}
            {days == "365" && <h3>{data.last365DaysKPIs.retentionRate}%</h3>}
            <span className={styles.growth}>+1.2%</span>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.iconPlaceholder}></div>
            <p className={styles.kpiTitle}>Revenue Growth (%)</p>
            {days == "7" && <h3>{data.last7DaysKPIs.revenueGrowth}%</h3>}
            {days == "30" && <h3>{data.last30DaysKPIs.revenueGrowth}%</h3>}
            {days == "365" && <h3>{data.last365DaysKPIs.revenueGrowth}%</h3>}
          </div>
        </section>

        {/* ================= CHARTS SECTION ================= */}
        <section className={styles.chartsSection}>
          <div className={styles.chartCard}>
            <h4>Customer Activity</h4>
            <div className={styles.chartPlaceholder}>
              {days == "7" && <SimpleBarChart data={data.barChart7DaysData} />}
              {days == "30" && <SimpleBarChart data={data.barChart30DaysData} />}
              {days == "365" && <SimpleBarChart data={data.barChart365DaysData} />}
            </div>
          </div>

          <div className={styles.chartCard}>
            <h4>Revenue Trend</h4>
            <div className={styles.chartPlaceholder}>
              {days == "7" && <LineChartGraph data={data.areaChart7DaysData} />}
              {days == "30" && <LineChartGraph data={data.areaChart30DaysData} />}
              {days == "365" && <LineChartGraph data={data.areaChart365DaysData} />}
            </div>
          </div>

          <div className={styles.chartCard}>
            <h4>Customer Distribution</h4>
            <div className={styles.chartPlaceholder}>
              {/* <PieChartGraph /> */}
              {days == "7" && <PieChartGraph data={data.pieChart7DaysData} />}
              {days == "30" && <PieChartGraph data={data.pieChart30DaysData} />}
              {days == "365" && <PieChartGraph data={data.pieChart365DaysData} />}
            </div>
          </div>

          <div className={styles.chartCard}>
            <h4>Next 30 days Revenue Prediction</h4>
            <div className={styles.chartPlaceholder}>
              <AreaChartGraph data={data.lineChartData} />
            </div>
          </div>

        </section>

        {/* ===== AI INTELLIGENCE SECTION ===== */}

        <div className={styles.insightsAndRiskContainer}>

          {/* ================= INSIGHTS ================= */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <i className="fa-solid fa-brain"></i>
              AI Insights
            </h3>

            {data.LLMResult?.insights
              ?.slice(0, 3)
              .map((item, index) => (

                <div key={index} className={styles.insightCard}>
                  <div className={styles.iconWrapper}>
                    <i className="fa-solid fa-circle-info"></i>
                  </div>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>

              ))}
          </div>


          {/* ================= RISKS ================= */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <i className="fa-solid fa-triangle-exclamation"></i>
              Risk Alerts
            </h3>

            {data.LLMResult?.risk
              ?.slice(0, 3)
              .map((item, index) => (

                <div key={index} className={styles.riskCard}>
                  <div className={styles.iconWrapperRisk}>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </div>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>

              ))}
          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <footer className={styles.footer}>
          <p>AI-Powered by Intellexa Core</p>
        </footer>
      </div> 
    );
  }else{
    return <UploadSection />
  }

};

export default Graphs;
