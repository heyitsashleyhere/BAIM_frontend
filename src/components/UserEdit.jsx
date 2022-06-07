import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";


export default function UserRegistration() {
       const [editData, setEditData] = useState({})
       const [userAddress, setUserAddress] = useState({})
       const { user } = useContext(UserContext)
    
       // this function can handle all the input changes:
       function handleChange(e) {
              setEditData({ ...editData, [e.target.name]: e.target.value})
       }

        // this function handles all the address input changes:
       function handleAddressChange(e) {
              setUserAddress({...userAddress, [e.target.name]: e.target.value })
       }

       function handleUserEdit(e) {
              e.preventDefault();
              const config = {
                method: "PATCH",
                credentials: 'include', // specify this if you need cookies
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData)
              };
          
              fetch(`http://localhost:7000/user/${user.id}`, config)
                .then((response) => response.json())
                .then((result) => console.log("UserEdit:", result))
                .catch((error) => console.log(error));
              // Pop up message instead of console.log later
              // cookie, Token stuff
       }
  
    return (
      <div>
        <h1>User Edit</h1>
        <form onSubmit={handleUserEdit}>
          <input name="firstName" placeholder="first name" type="text"
                 onChange={handleChange}  />

          <input name="lastName" placeholder="last name" type="text"
                 onChange={handleChange}  />

          <input name="profileName" placeholder="profile name" type="text"
                 onChange={handleChange}  />

          <input name="email" placeholder="email" type="email"
                 onChange={handleChange}  />

          <input name="password" placeholder="password" type="password"
                 onChange={handleChange}  />

          <input name="confirmPassword" placeholder="confirm password" type="password"
                 onChange={handleChange}  />

          <h2>Address</h2>
          <input name="street" placeholder="street" type="text"
                 onChange={handleAddressChange} />
          <input name="streetNumber" placeholder="street number" type="text"
                 onChange={handleAddressChange} />
          <input name="city" placeholder="ciy" type="text"
                 onChange={handleAddressChange} />
          <input name="zip" placeholder="zip code" type="text"
                 onChange={handleAddressChange} />
          <input name="country" placeholder="country" type="text"
                 onChange={handleAddressChange} />
                 
          <button type="submit">Save changes</button>
        </form>
      </div>
    );
}