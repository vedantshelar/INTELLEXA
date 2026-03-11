import React, { useState,useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useSelector, useDispatch } from 'react-redux'
import { getAllBusinessData } from "../slices/dataSlice";
import { getUserData } from "../slices/userSlice";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
      
    const user = useSelector((store)=>{
        if(store.user.user){
            return store.user.user.data;
        }else{
            return undefined;
        }
    })


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function closeSideBar(){
        setIsSidebarOpen(false);
    }

    async function handleLogout() {
        const response = await axios.post(
            `${backend_url}/auth/logout`,
            {},
            { withCredentials: true }
          );
          if(response.data.success){
            navigate("/")
          }
    }

    useEffect(()=>{
        dispatch(getUserData());
        dispatch(getAllBusinessData());
    },[])

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside
                className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""
                    }`}
            > 
            <div style={{display:"flex",flexDirection:"row", alignItems:"center",justifyContent:"space-between",marginBottom:"30px"}}>
                    <div className={styles.logo} onClick={()=>{navigate("/")}}>Intellexa</div>
                    <span className={styles.cross} onClick={()=>{setIsSidebarOpen(false)}}>&#10005;</span>
                </div>

                <nav className={styles.nav}>
                <NavLink to="/dashboard/upload" className={styles.navItem} onClick={closeSideBar}>
                <i class="fa-solid fa-cloud-arrow-down"></i> Upload Data
                    </NavLink>
                    <NavLink to="/dashboard/graphs" className={styles.navItem} onClick={closeSideBar}>
                    <i class="fa-solid fa-house"></i> Dashboard
                    </NavLink>
                    <NavLink to="/dashboard/insights" className={styles.navItem} onClick={closeSideBar}>
                    <i class="fa-solid fa-lightbulb"></i> Insights
                    </NavLink>
                    <NavLink to="/dashboard/predictions" className={styles.navItem} onClick={closeSideBar}>
                    <i class="fa-solid fa-wand-magic-sparkles"></i> AI Recommendations
                    </NavLink>
                    <NavLink to="/dashboard/risk" className={styles.navItem} onClick={closeSideBar}>
                    <i class="fa-solid fa-circle-exclamation"></i> Risk Detections
                    </NavLink>
                    <NavLink to="/dashboard/chatbot" className={styles.navItem} onClick={closeSideBar}>
                    <i class="fa-brands fa-twitch"></i> AI Assistant
                    </NavLink>
                    <NavLink to="/dashboard/history/0" className={styles.navItem} onClick={closeSideBar}>
                    <i class="fa-brands fa-slack"></i> History
                    </NavLink>
                </nav>
            </aside>

            {/* Main Section */}
            <div className={styles.main}>
                {/* Top Bar */}
                <header className={styles.topbar}>
                    <button
                        className={styles.menuBtn}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>

                    <div className={styles.topRight}>
                        {/* <span className={styles.notification}>🔔</span> */}
                        <div className={styles.profile}>
                            <img
                                src="/businessman.png"
                                alt="profile"
                                className={styles.avatar}
                            />
                            <div>
                                <p className={styles.name}>{user ? user.name : "Loading..."}</p>
                                <span className={styles.role}>CEO</span>
                            </div>
                        </div>
                        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                    </div>
                </header>

                {/* Content Area */}
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
