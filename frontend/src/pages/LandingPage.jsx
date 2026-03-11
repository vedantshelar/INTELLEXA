import React from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();
    function openSignInSignUpPage() {
        navigate('/signInSignUpPage');
    }
    return (
        <div className={styles.container}>

            {/* Navbar */}
            <nav className={styles.navbar}>
                <h2 className={styles.logo}>Intellexa</h2>
                <div className={styles.navActions}>
                    <button className={styles.loginBtn} onClick={openSignInSignUpPage}>Sign In</button>
                    <button className={styles.primaryBtn} onClick={openSignInSignUpPage}>Sign Up</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroLeft}>
                    <h1>Turn Business Data into <br /> <span style={{color:"#2563eb"}}>Smart Decisions</span></h1>
                    <p>
                        Intellexa helps founders understand performance predict trends,
                        and make  <br />confident decisions using AI-powered insights.
                    </p>
                    <div className={styles.heroButtons}>
                        <button className={styles.primaryBtn} onClick={openSignInSignUpPage}>Get Started</button>
                    </div>
                </div>
            </section>
            <div className={styles.heroRight}>
                    <div className={styles.dashboardMock}>
                        <img src="/dashboardPreview.png" alt="dashboard preview" />
                    </div>
                </div>

            {/* Features Section */}
            <section className={styles.features}>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/idea.png" alt="" />
                        <h3>AI-Driven Insights</h3>
                        <p>Understand what’s happening and why with automated analysis.</p>
                    </div>
                <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                    <img src="/prediction.png" alt="" />
                    <h3>Predictive Analytics</h3>
                    <p>Forecast revenue and growth with confidence.</p>
                </div>
                <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                    <img src="/riskdetection.png" alt="" />
                    <h3>Risk Detection</h3>
                    <p>Identify drops, anomalies, and potential issues early.</p>
                </div>
                <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                    <img src="/whatif.png" alt="" />
                    <h3>What-If Analysis</h3>
                    <p>Simulate scenarios and decisions before acting.</p>
                </div>
            </section>

            {/* How It Works */}
            <section className={styles.howItWorks}>
                <h1 id={styles.howItWorksHeading}>How It Works</h1>
                <section className={styles.features}>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/upload.png" alt="" />
                        <h3>1. Upload your business data</h3>
                        <p>Connect your data sources securely</p>
                    </div>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/pattern.png" alt="" />
                        <h3>2. Intellexa analyzes patterns using AI</h3>
                        <p>Our advanced algorithms process your data</p>
                    </div>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/dashboard.png" alt="" />
                        <h3>3. View Insights, predictions, and risk analysis</h3>
                        <p>Identify drops, anomalies, and potential issues early.</p>
                    </div>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/decision.png" alt="" />
                        <h3>4. Make smarter strategic decisions</h3>
                        <p>Act cenfidentiy based on
                            Ai-diiven guidance.</p>
                    </div>
                </section>
            </section>

            {/* AI Insights Highlight */}
            <section className={styles.howItWorks}>
                <h1 id={styles.howItWorksHeading}>AI Insights Highlight</h1>
                <section className={styles.features}>
                    <div className={`${styles.featureCard} ${styles.aiInsightsHighlight}`}>
                        <p><i class="fa-solid fa-circle-info" style={{ color: "#3478ef" }}></i> Revenue increased by 18% compared to last week, indicating strong overall performance and improved customer engagement during peak business days.</p>
                    </div>
                    <div className={`${styles.featureCard} ${styles.aiInsightsHighlight}`}>
                        <p><i class="fa-solid fa-circle-info" style={{ color: "#3478ef" }}></i> Projected revenue growth of 20% next month based on current sales trends, consistent demand patterns, and recent growth momentum.</p>
                    </div>
                    <div className={`${styles.featureCard} ${styles.aiInsightsHighlight}`}>
                        <p><i class="fa-solid fa-circle-info" style={{ color: "#3478ef" }}></i> Sales dropped by 22% during weekends, suggesting lower customer activity and highlighting an opportunity to improve weekend promotions or offers.</p>
                    </div>
                    <div className={`${styles.featureCard} ${styles.aiInsightsHighlight}`}>
                        <p><i class="fa-solid fa-circle-info" style={{ color: "#3478ef" }}></i> This is your best-performing week in the last month, with consistently higher sales and revenue compared to previous weeks, reflecting strong business momentum.</p>
                    </div>
                </section>
            </section>

            {/* Why Intellexa */}
            <section className={styles.howItWorks}>
                <h1 id={styles.howItWorksHeading}>Why Intellexa</h1>
                <section className={styles.features}>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/founder.png" alt="" />
                        <h3>Built for founders & leaders</h3>
                        <p>Desioned for non-lechnical users to gain immediate value.</p>
                    </div>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/technical.png" alt="" />
                        <h3>No technical knowledge required</h3>
                        <p>Intoitive interface with zere coding needed.</p>
                    </div>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/insight.png" alt="" />
                        <h3>Real-time insights & predictions</h3>
                        <p>Stay ahead with up-to-the-minute
                            data analysis</p>
                    </div>
                    <div className={styles.featureCard} style={{borderLeft:"5px solid #bfdbfe"}}>
                        <img src="/security.png" alt="" />
                        <h3>Enterprise-grade Ul & security</h3>
                        <p>Trustworthy platform with rebust dsta pretection.</p>
                    </div>
                </section>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <h2>Make Every Business Decision Data-Driven</h2>
                <button className={styles.primaryBtn} onClick={openSignInSignUpPage}>Start Using Intellexa</button>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>© 2025 Intellexa • AI-powered decision intelligence</p>
            </footer>

        </div>
    );
};

export default LandingPage;
