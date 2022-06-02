import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


export default function UserDelete(){
    const { handleUserDelete } = useContext(UserContext)

    

    return(
        <div>
            <button onClick={handleUserDelete}>Delete your account</button>
        </div>
    )
}