import { useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.js";

export default function UserLogin() {
    const [errors, setErrors] = useState([])
    const { user, setUser, 
            inputValues, setInputValues,
            message, setMessage,
            setIsLogin,
            isShowPassword, showPasswordHandler } = useContext(UserContext)
    

    // this function can handle all the input changes:
    function handleChange(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value})
    }
  
    function handleUserLogin(e) {
      e.preventDefault();
      setErrors([])
      const config = {
        method: "POST",
        credentials: 'include', // specify this if you need cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValues)
      };
      // https://stackoverflow.com/questions/36824106/express-doesnt-set-a-cookie
  
      fetch("http://localhost:7000/user/login", config)
        .then((response) => response.json())
        .then((result) => {
            console.log("UserLogin:", result);
            if(!result.errors) {
              setUser({ id: result.user._id, profileName: result.user.profileName, avatar: result.user.avatar })
              setMessage(result.message)
              setIsLogin(true)
            } else {
              setErrors(result.errors)
              console.log('errors :>> ', errors);
            }
          })
        .catch((error) => console.log(error));
    }

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleUserLogin}>
          <input name="email" type="email" placeholder="email"
                 onChange={handleChange} />              
          {errors.map((error, i) => (    
            error.email && (<p key={"emailError"+ i}>{error.email}</p>)
          ))}
          <input name="password" type={isShowPassword ? "text" : "password"} placeholder="password"
                 onChange={handleChange} />
          <span onClick={showPasswordHandler}>{isShowPassword ? "🐵" : "🙈"}</span>
          {errors.map((error, i) => (    
            error.password && (<p key={"passwordError"+ i}>{error.password}</p>)
          ))}
          <button type="submit">Login</button>
          
      </form>
    </div>
  );
}
