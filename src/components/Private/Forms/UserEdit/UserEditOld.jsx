import { useState, useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext.js";
import ImageInput from "../ImageInput.jsx";


export default function UserRegistration() {
    const [userAddress, setUserAddress] = useState({})
    const [errors, setErrors] = useState([])
    const { inputValues, setInputValues, setMessage,
            isShowPassword, showPasswordHandler } = useContext(UserContext)
    
    // this function can handle all the input(but address) changes:
    function handleChange(e) {
       setInputValues({ ...inputValues, [e.target.name]: e.target.value})
    }
    // this function handles all the address input changes:
    function handleAddressChange(e) {
       setUserAddress({...userAddress, [e.target.name]: e.target.value })
    }

    function handleUserEdit(e) {
       e.preventDefault();
       setErrors([])

       const config = {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(inputValues),
              }
               
       fetch(`http://localhost:7000/user/${user.id}`, config)
              .then((response) => response.json())
              .then((result) => {
                     console.log("UserEdit:", result)
                     if(result.errors){
                            setErrors(result.errors)
                     }
                     setMessage(result.message)
              })
              .catch((error) => console.log(error));

    }
  
    return (
      <div>
        <h1>User Edit</h1>
        <form onSubmit={handleUserEdit}>
          <input name="firstName" placeholder="first name" type="text"
                 onChange={handleChange}  />
          {errors.map((error, i) => (    
            error.firstName && (<p key={"firstNameError"+ i}>{error.firstName}</p>)
          ))}  

          <input name="lastName" placeholder="last name" type="text"
                 onChange={handleChange}  />
          {errors.map((error, i) => (    
            error.lastName && (<p key={"lastNameError"+ i}>{error.lastName}</p>)
          ))} 

          <input name="profileName" placeholder="profile name" type="text"
                 onChange={handleChange}  />
          {errors.map((error, i) => (    
            error.profileName && (<p key={"profileNameError"+ i}>{error.profileName}</p>)
          ))} 

          <input name="email" placeholder="email" type="email"
                 onChange={handleChange}  />
          {errors.map((error, i) => (    
            error.email && (<p key={"emailError"+ i}>{error.email}</p>)
          ))}


          <input name="password" placeholder="password" type={isShowPassword ? "text" : "password"} required
                 onChange={handleChange} />
          <span onClick={showPasswordHandler}>{isShowPassword ? "🐵" : "🙈"}</span>
          {errors.map((error, i) => (    
            error.password && (<p key={"passwordError"+ i}>{error.password}</p>)
          ))}

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
       
          <h2>Avatar</h2>
          <ImageInput imageUsage="avatar"/>
       
          <button type="submit">Save changes</button>

        </form>
      </div>
    );
}