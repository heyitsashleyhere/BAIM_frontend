import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";

export default function UserLogin() {
    const [loginData, setLoginData] = useState({})
    const { user, setUser } = useContext(UserContext)
    

    // this function can handle all the input changes:
    function handleChange(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value})
    }
  
    function handleUserLogin(e) {
      e.preventDefault();
  
      const config = {
        method: "POST",
        credentials: 'include', // specify this if you need cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      };
      // https://stackoverflow.com/questions/36824106/express-doesnt-set-a-cookie
  
      fetch("http://localhost:7000/user/login", config)
        .then((response) => response.json())
        .then((result) => {
            console.log("UserLogin:", result);
            // console.log('result.user :>> ', result.user);
            setUser({ id: result.user._id, profileName: result.user.profileName})
          })
        .catch((error) => console.log(error));
      // Pop up message instead of console.log later
      // Token and cookie stuff
      // maybe useState set current User?
    }

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleUserLogin}>
          <input name="email" type="email" placeholder="email"
                 onChange={handleChange} />

          <input name="password" type="password" placeholder="password"
                 onChange={handleChange} />

          <button type="submit">Login</button>
      </form>
    </div>
  );
}
