import { useState, useContext } from "react";
import { Link } from "@mui/material";
// contexts
import { UserContext } from "../../../contexts/UserContext.js";
// components
import UserLogin from "../../../components/Public/LoginRegister/UserLogin/UserLogin.jsx";
import UserRegistration from "../../../components/Public/LoginRegister/UserRegistration/UserRegistration.jsx";
// styles
import "./loginRegister.scss";

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const { message, setMessage, user, setUser, isLogin, showPasswordHandler } =
    useContext(UserContext);

  function switchForm() {
    showPasswordHandler(false);
    setIsRegister(!isRegister);
    setMessage("");
    setUser({});
  }

  return (
    <div className="LoginRegister">
      <section className="outer-Video">
        <video src={process.env.PUBLIC_URL + "/landingVideos/berriesWhite.webm"}
               autoPlay playsInline muted loop />
      </section>
      {isLogin ? (
      <section className="welcome-page">
        <img src={user.avatar} alt="avatar" width="100" height="100" />
        <p>{message}</p>
      </section>
      ) : (
        <section className="login-page">
          {isRegister ? <UserRegistration /> : <UserLogin />}
          {/* <Link underline="hover" onClick={switchForm}>
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Link> */}
          <button className="LogIn-Button" onClick={switchForm}>
              { isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
        </section>
      )}
    </div>
  );
}
