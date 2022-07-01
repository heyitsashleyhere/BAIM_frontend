import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";

export default function UserLogin() {
    const { user, setUser, setIsLogin } = useContext(UserContext)
    
    function handleUserLogout() {
      const config = {
        method: "POST",
        credentials: 'include' // specify this if you need cookies
      };
      // https://stackoverflow.com/questions/36824106/express-doesnt-set-a-cookie
  
      fetch("http://localhost:7000/user/logout", config)
        .then((response) => response.json())
        .then((result) => {
            console.log("UserLogout:", result);
            // console.log('result.user :>> ', result.user);
            setUser({ id: "", profileName: "", avatar: ""})
            setIsLogin(false)
            console.log('user :>> ', user);
          })
        .catch((error) => console.log(error));
      // Pop up message instead of console.log later
      // Token and cookie stuff
      // maybe useState set current User?
    }

  return (
    <div>
      <h1>User Logout</h1>
      <button onClick={handleUserLogout}>Logout</button>
    </div>
  );
}
