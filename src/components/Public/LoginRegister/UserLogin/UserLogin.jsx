import { useState, useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext.js";

import './userLogin.scss'

export default function UserLogin() {
    const [errors, setErrors] = useState([])
    const { user, setUser, 
            inputValues, setInputValues,
            message, setMessage,
            setIsLogin,
            isShowPassword, showPasswordHandler } = useContext(UserContext)
    

    // this function can handle all the input changes:
    function handleChange(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value.trim()})
    }
  
    function handleUserLogin(e) {
      e.preventDefault();
      console.log(inputValues)
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
    <div className="Login_Outer">
        <h1 >Login</h1>
      <form onSubmit={handleUserLogin}>

           <section className="Input">
           <p className="Input_title">email</p>
            <input name="email" type="email" placeholder="....here@"
                 onChange={handleChange} />     
          {errors.map((error, i) => (    
            error.email && (<p className="inputAlert" key={"emailError"+ i}>{error.email}</p>)
          ))}
          </section>

          <section className="Input">
            <p className="Input_title">password</p>

            <section className="Input_Hidden">

            <input name="password" type={isShowPassword ? "text" : "password"} placeholder="*********"
                  onChange={handleChange} />
            <span className="icon" onClick={showPasswordHandler}>{isShowPassword ? "🐵" : "🙈"}</span>
            </section>

            {errors.map((error, i) => (    
              error.password && (<p className="inputAlert" key={"passwordError"+ i}>{error.password}</p>)
            ))}
          </section>
          <button className="Button" type="submit">Login</button>
          
      </form>
    </div>
  );
}
