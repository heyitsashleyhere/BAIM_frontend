import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.js";
import ImageInput from "../../ImageInput.jsx";

export default function UserRegistration() {
    const [userAddress, setUserAddress] = useState({})
    const [errors, setErrors] = useState([])
    const { inputValues, setInputValues, setMessage,
            isShowPassword, showPasswordHandler } = useContext(UserContext)

    useEffect(() => {
       setInputValues({ ...inputValues, userAddress })
    }, [userAddress])
    
    // this function can handle all the input(but address) changes:
    function handleChange(e) {
       setInputValues({ ...inputValues, [e.target.name]: e.target.value})
    }
    // this function handles all the address input changes:
    function handleAddressChange(e) {
       setUserAddress({...userAddress, [e.target.name]: e.target.value })
    }


    function handleUserRegistration(e) {
       e.preventDefault();
       setErrors([])
     
       const config = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(inputValues),
              }
               
       fetch("http://localhost:7000/user/register", config)
              .then((response) => response.json())
              .then((result) => {
                     console.log("UserRegistrationPOST:", result)
                     if(result.errors){
                            setErrors(result.errors)
                     }
                     setMessage(result.message)
              })
              .catch((error) => console.log(error));
    }
  
    return (
      <div>
        <h1>User Registration</h1>
        <form onSubmit={handleUserRegistration}>
          <input name="firstName" placeholder="first name" type="text" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.firstName && (<p key={"firstNameError"+ i}>{error.firstName}</p>)
          ))}    

          <input name="lastName" placeholder="last name" type="text" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.lastName && (<p key={"lastNameError"+ i}>{error.lastName}</p>)
          ))}      

          <input name="profileName" placeholder="profile name" type="text" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.profileName && (<p key={"profileNameError"+ i}>{error.profileName}</p>)
          ))} 

          <input name="email" placeholder="email" type="email" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.email && (<p key={"emailError"+ i}>{error.email}</p>)
          ))}

          <input name="password" placeholder="password" type={isShowPassword ? "text" : "password"} required
                 onChange={handleChange} />
          <span onClick={showPasswordHandler}>{isShowPassword ? "🐵" : "🙈"}</span>
          {errors.map((error, i) => (    
            error.password && (<p key={"passwordError"+ i}>{error.password}</p>)
          ))}

          <input name="confirmPassword" placeholder="confirm password" type="password" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.confirmPassword && (<p key={"confirmPasswordError"+ i}>{error.confirmPassword}</p>)
          ))}
          
          <h2>Address</h2>
          <input name="street" placeholder="street" type="text"
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.street"] && (<p key={"streetError"+ i}>{error["userAddress.street"] }</p>)
          ))}

          <input name="streetNumber" placeholder="street number" type="text"
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.streetNumber"] && (<p key={"streetNumberError"+ i}>{error["userAddress.streetNumber"] }</p>)
          ))}

          <input name="city" placeholder="ciy" type="text" required
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.city"] && (<p key={"cityError"+ i}>{error["userAddress.city"] }</p>)
          ))}

          <input name="zip" placeholder="zip code" type="text"
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.zip"] && (<p key={"zipError"+ i}>{error["userAddress.zip"] }</p>)
          ))}

          <input name="country" placeholder="country" type="text" required
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.country"] && (<p key={"countryError"+ i}>{error["userAddress.country"] }</p>)
          ))}
              
          <h2>Avatar</h2>
          <ImageInput imageUsage="avatar"/>
          
          <button type="submit">Register</button>

        </form>

      </div>
    )
}