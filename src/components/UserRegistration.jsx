import { useState, useEffect } from "react";
import ImageInput from "./ImageInput";

export default function UserRegistration() {
    const [userAddress, setUserAddress] = useState({})
    const [registerData, setRegisterData] = useState({})

    useEffect(() => {
       setRegisterData({ ...registerData, userAddress })
    }, [userAddress])
    
    // this function can handle all the input(but address) changes:
    function handleChange(e) {
       setRegisterData({ ...registerData, [e.target.name]: e.target.value})
    }
    // this function handles all the address input changes:
    function handleAddressChange(e) {
       setUserAddress({...userAddress, [e.target.name]: e.target.value })
    }

    // this function creates the 'path' variable for react-routes     
//     function convert(str){    
       // const string = str.toLowerCase().trim()
//        const string = str.trim()
//        const encoded = encodeURI(string);
//        return encoded;
//     }

    function handleUserRegistration(e) {
       e.preventDefault();
       // setRegisterData({...registerData, path: convert(registerData.profileName) })
       console.log('registerData :>> ', registerData);
     
       const config = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(registerData),
              }
               
       fetch("http://localhost:7000/user/register", config)
              .then((response) => response.json())
              .then((result) => console.log("UserRegistrationPOST:", result))
              .catch((error) => console.log(error));
               //TODO Pop up message instead of console.log later
    }
  
    return (
      <div>
        <h1>User Registration</h1>
        <form onSubmit={handleUserRegistration}>
          <input name="firstName" placeholder="first name" type="text" required
                 onChange={handleChange} />

          <input name="lastName" placeholder="last name" type="text" required
                 onChange={handleChange} />

          <input name="profileName" placeholder="profile name" type="text" required
                 onChange={handleChange} />

          <input name="email" placeholder="email" type="email" required
                 onChange={handleChange} />

          <input name="password" placeholder="password" type="password" required
                 onChange={handleChange} />

          <input name="confirmPassword" placeholder="confirm password" type="password" required
                 onChange={handleChange} />
          
          <h2>Address</h2>
          <input name="street" placeholder="street" type="text"
                 onChange={handleAddressChange} />
          <input name="streetNumber" placeholder="street number" type="text"
                 onChange={handleAddressChange} />
          <input name="city" placeholder="ciy" type="text" required
                 onChange={handleAddressChange} />
          <input name="zip" placeholder="zip code" type="text"
                 onChange={handleAddressChange} />
          <input name="country" placeholder="country" type="text" required
                 onChange={handleAddressChange} />
        {/* <h1>AVATAR</h1>
              <ImageInput></ImageInput> */}
          <button type="submit">Register</button>

         
        </form>
        {/* <h1>AVATAR</h1>
        <ImageInput></ImageInput> */}

      </div>
    )
}