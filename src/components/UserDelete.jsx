import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


export default function UserDelete(){
    const { handleUserDelete } = useContext(UserContext)

    

    return(
        <div>
            <h1>Delete User</h1>
            <button onClick={handleUserDelete}>Delete your account</button>
        </div>
    )
}