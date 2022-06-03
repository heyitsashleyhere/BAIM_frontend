import { useState } from "react";

export default function UserLogin() {
    const [loginData, setLoginData] = useState({})

    // this function can handle all the input changes:
    function handleChange(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value})
    }
  
    function handleUserLogin(e) {
      e.preventDefault();
  
      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      };
  
      fetch("http://localhost:7000/user/login", config)
        .then((response) => response.json())
        .then((result) => console.log("UserRegistrationPOST:", result))
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
