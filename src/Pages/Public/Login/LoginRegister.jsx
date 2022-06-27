import { useState, useContext } from "react";
import { useCookies } from "react-cookie";
// contexts
import { UserContext } from "../../../contexts/UserContext.js";
// components
import UserLogin from "../../../components/Public/LoginRegister/UserLogin/UserLogin.jsx";
import UserRegistration from "../../../components/Public/LoginRegister/UserRegistration/UserRegistration.jsx";
import TransitionPage from '../../TransitionPage/TransitionPage.jsx';
// styles
import "./loginRegister.scss";

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const [cookies] = useCookies();
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
        <TransitionPage />
      ) : (
        <section className="login-page">
          {isRegister ? <UserRegistration /> : <UserLogin />}

          <button className="LogIn-Button" onClick={switchForm}>
              { isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
        </section>
      )}
    </div>
  );
}
