import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";


export default function UserDelete(){
    const { user } = useContext(UserContext)

    function handleUserDelete() {
        console.log('user :>> ', user);
        if(user.id) {
            const config = {
                credentials: 'include', // specify this if you need cookies
                method: "DELETE",
              };
              
              fetch(`http://localhost:7000/user/${user.id}`, config)
                .then((response) => response.json())
                .then((result) => console.log("UserRegistrationPOST:", result))
                .catch((error) => console.log(error));
              // Pop up message instead of console.log later
              // cookie, Token stuff
        } else {
            console.log("User is not logged in");
        }

      }

    return(
        <div>
            <h1>Delete User</h1>
            <button onClick={handleUserDelete}>Delete your account</button>
        </div>
    )
}