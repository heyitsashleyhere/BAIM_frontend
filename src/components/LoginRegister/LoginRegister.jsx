import { useState, useContext }  from "react";
import { UserContext } from "../../contexts/UserContext.js";
import UserLogin from "./UserLogin/UserLogin.jsx";
import UserRegistration from "./UserRegistration/UserRegistration.jsx";


export default function LoginRegister() {
    const [isRegister, setIsRegister] = useState(false)
    const { message, setMessage, user, setUser } = useContext(UserContext)


    function switchForm() {
        setIsRegister(!isRegister)
        setMessage("")
        setUser({})
    }

  return (
    <div className="LoginRegister">
         
        { isRegister ? <UserRegistration />: <UserLogin />}
        <button onClick={switchForm}>
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
        {message && <div>{message}</div>}
        {user.avatar && <img src={user.avatar} alt="avatar" width="100" />}
        
    </div>
  )
}
