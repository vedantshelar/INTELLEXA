import React, { useEffect, useState } from "react";
import styles from "./SignInSignUpPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInSignUpPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [user,setUser] = useState({
    name:"",
    email:"",
    mobileNo:"",
    password:""
  })
  const navigate = useNavigate();

  function handleUserInput(event){
    let key = event.target.name;
    let value = event.target.value;

    setUser((currUser)=>{
      return {...currUser,[key]:value}
    })
  }

  function goToTheLandingPage(){
    navigate("/");
  }

  function goToDashboard(){
    navigate("/dashboard");
  }

  async function handleSignin(){
    try {
      if(user.email=="" || user.password==""){
        alert("Fields can not be empty!");
      }else{
        let response = await axios.post("http://localhost:3000/auth/login",{email:user.email,password:user.password},{
          withCredentials: true
        });
        console.log("response is : ",response);
        setUser({
          name:"",
          email:"",
          mobileNo:"",
          password:""
        })
        goToDashboard();
      }
    } catch (error) {
      console.log("error : ",error)
      alert("Logged In Failed!");
    }
  }

  async function handleSignUp(){
    try {
      if(user.name=="" || user.email=="" || user.mobileNo=="" || user.password==""){
        alert("Fields can not be empty!");
      }else{
        let response = await axios.post("http://localhost:3000/auth/register",user,{
          withCredentials: true
        });
        console.log("response is : ",response);
        setUser({
          name:"",
          email:"",
          mobileNo:"",
          password:""
        })
        if(response.data.success){
          goToDashboard();
        }else{
          alert(response.data.message)
        }
      }
    } catch (error) {
      console.log("error : ",error)
      alert("Could not create account Please try again!");
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3000/auth/isUserLoggedIn", {
      withCredentials: true
    })
    .then(res => {
      if(res.data.success){
        console.log("success")
        navigate("/dashboard");
      }else{
        console.log("error")
      }
    })
    .catch((error) => {console.log("error"+error)});
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        {/* Header */}
        <h2 className={styles.logo}>Intellexa</h2>
        <p className={styles.subtitle}>
          {isSignUp
            ? "Create your account to get AI-powered insights"
            : "Welcome back! Sign in to your dashboard"}
        </p>

        {/* Form */}
        <form className={styles.form}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={user.name}
              onChange={handleUserInput}
              className={styles.input}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={user.email}
            onChange={handleUserInput}
            className={styles.input}
          />

          {isSignUp && <input
            type="text"
            placeholder="Mobile Number"
            name="mobileNo"
            value={user.mobileNo}
            onChange={handleUserInput}
            className={styles.input}
          />}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleUserInput}
            className={styles.input}
          />

          <button type="button" className={styles.primaryBtn} onClick={()=>{{isSignUp ? handleSignUp():handleSignin()}}}>
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span>or</span>
        </div>

        {/* Social Login */}
        <div className={styles.socialButtons}>
          <button className={styles.socialBtn} onClick={goToTheLandingPage}>Back To The Landing Page</button>
        </div>

        {/* Toggle */}
        <p className={styles.toggleText}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={()=>{setIsSignUp(!isSignUp);}}
            className={styles.toggleLink}
          >
            {isSignUp ? " Sign In" : " Sign Up"}
          </span>
        </p>

        {/* Footer */}
        <p className={styles.footerText}>
          Secure login • Enterprise-grade encryption
        </p>

      </div>
    </div>
  );
};

export default SignInSignUpPage;
