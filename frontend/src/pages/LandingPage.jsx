import React from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    function openSignInSignUpPage() {
        navigate("/signInSignUpPage");
    }

    return (
        <div className={styles.container}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <h2 className={styles.logo}>Intellexa</h2>
                <div className={styles.navActions}>
                    <button className={styles.loginBtn} onClick={openSignInSignUpPage}>
                        Sign In
                    </button>
                    <button className={styles.primaryBtn} onClick={openSignInSignUpPage}>
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>
                        Turn Business Data into <br />
                        <span className={styles.textGradient}>Smart Decisions</span>
                    </h1>
                    <p>
                        Intellexa helps founders understand performance, predict trends,
                        and make confident decisions using AI-powered insights.
                    </p>
                    <div className={styles.heroButtons}>
                        <button className={styles.primaryBtn} onClick={openSignInSignUpPage}>
                            Get Started for Free
                        </button>
                    </div>
                </div>

                <div className={styles.heroImageWrapper}>
                    <div className={styles.dashboardMock}>
                        <img src="/dashboardPreview.png" alt="Intellexa Dashboard Preview" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Powerful Features</h2>
                    <p>Everything you need to scale your business intelligently.</p>
                </div>
                <div className={styles.gridContainer}>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <img src="/idea.png" alt="AI Insights" />
                        </div>
                        <h3>AI-Driven Insights</h3>
                        <p>Understand what’s happening and why with automated analysis.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <img src="/prediction.png" alt="Predictive Analytics" />
                        </div>
                        <h3>Predictive Analytics</h3>
                        <p>Forecast revenue and growth with absolute confidence.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <img src="/riskdetection.png" alt="Risk Detection" />
                        </div>
                        <h3>Risk Detection</h3>
                        <p>Identify drops, anomalies, and potential issues early.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <img src="/whatif.png" alt="What-If Analysis" />
                        </div>
                        <h3>What-If Analysis</h3>
                        <p>Simulate scenarios and decisions before taking action.</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className={`${styles.section} ${styles.bgLight}`}>
                <div className={styles.sectionHeader}>
                    <h2>How It Works</h2>
                    <p>Four simple steps to data-driven clarity.</p>
                </div>
                <div className={styles.gridContainer}>
                    <div className={styles.stepCard}>
                        <span className={styles.stepNumber}>1</span>
                        <h3>Upload your data</h3>
                        <p>Connect your business data sources securely and effortlessly.</p>
                    </div>
                    <div className={styles.stepCard}>
                        <span className={styles.stepNumber}>2</span>
                        <h3>AI Analyzes Patterns</h3>
                        <p>Our advanced algorithms process your data in real-time.</p>
                    </div>
                    <div className={styles.stepCard}>
                        <span className={styles.stepNumber}>3</span>
                        <h3>View Insights</h3>
                        <p>Instantly access predictions, risk analysis, and growth metrics.</p>
                    </div>
                    <div className={styles.stepCard}>
                        <span className={styles.stepNumber}>4</span>
                        <h3>Act Strategically</h3>
                        <p>Make smarter decisions based on AI-driven guidance.</p>
                    </div>
                </div>
            </section>

            {/* AI Insights Highlight */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>AI Insights Highlight</h2>
                    <p>See exactly what Intellexa tells you about your business.</p>
                </div>
                <div className={styles.gridContainer}>
                    <div className={`${styles.featureCard} ${styles.aiCard}`}>
                        <i className="fa-solid fa-circle-info" style={{ color: "#3478ef", fontSize: "20px" }}></i>
                        <p><strong>Revenue increased by 18%</strong> compared to last week, indicating strong overall performance and improved customer engagement.</p>
                    </div>
                    <div className={`${styles.featureCard} ${styles.aiCard}`}>
                        <i className="fa-solid fa-circle-info" style={{ color: "#3478ef", fontSize: "20px" }}></i>
                        <p><strong>Projected growth of 20%</strong> next month based on current sales trends, consistent demand patterns, and recent momentum.</p>
                    </div>
                    <div className={`${styles.featureCard} ${styles.aiCard}`}>
                        <i className="fa-solid fa-circle-info" style={{ color: "#ef4444", fontSize: "20px" }}></i>
                        <p><strong>Sales dropped by 22%</strong> during weekends. Highlights an opportunity to improve weekend promotions or targeted offers.</p>
                    </div>
                    <div className={`${styles.featureCard} ${styles.aiCard}`}>
                        <i className="fa-solid fa-circle-info" style={{ color: "#10b981", fontSize: "20px" }}></i>
                        <p><strong>Best-performing week</strong> in the last month, reflecting strong business momentum and higher conversion rates.</p>
                    </div>
                </div>
            </section>

            {/* Why Intellexa */}
            <section className={`${styles.section} ${styles.bgLight}`}>
                <div className={styles.sectionHeader}>
                    <h2>Why Choose Intellexa?</h2>
                </div>
                <div className={styles.gridContainer}>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <img src="/founder.png" alt="Founders" />
                        </div>
                        <h3>Built for Leaders</h3>
                        <p>Designed for non-technical users to gain immediate value.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <img src="/technical.png" alt="No Code" />
                        </div>
                        <h3>No Coding Required</h3>
                        <p>Intuitive interface with zero technical knowledge needed.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <img src="/insight.png" alt="Real-time" />
                        </div>
                        <h3>Real-time Insights</h3>
                        <p>Stay ahead of the curve with up-to-the-minute data analysis.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <img src="/security.png" alt="Security" />
                        </div>
                        <h3>Enterprise Security</h3>
                        <p>Trustworthy platform with robust, bank-grade data protection.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.ctaContent}>
                    <h2>Make Every Business Decision Data-Driven</h2>
                    <p>Join thousands of founders making smarter choices today.</p>
                    <button className={`${styles.primaryBtn} ${styles.ctaBtn}`} onClick={openSignInSignUpPage}>
                        Start Using Intellexa
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <h2 className={styles.logo}>Intellexa</h2>
                    <p>© 2026 Intellexa • AI-powered decision intelligence</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;