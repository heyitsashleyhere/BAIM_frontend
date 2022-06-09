import { useState, useContext }  from "react";
import { UserContext } from "../../contexts/UserContext.js";
import UserLogin from "./UserLogin/UserLogin.jsx";
import UserRegistration from "./UserRegistration/UserRegistration.jsx";


export default function LoginRegister() {
    const [isRegister, setIsRegister] = useState(false)
    const { message, setMessage, 
            user, setUser,
            isLogin } = useContext(UserContext)


    function switchForm() {
        setIsRegister(!isRegister)
        setMessage("")
        setUser({})
    }

  return (
    <div className="LoginRegister">
        { isLogin ?
          <section className="welcome-page">
            <p>{message}</p>
            <img src={user.avatar} alt="avatar" width="100" />
          </section> 
          :
          <section className="login-page">
            { isRegister ? <UserRegistration />: <UserLogin />}
            <button onClick={switchForm}>
              {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
          </section>

        }   
    </div>
  )
}
