import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext.js";
import ImageInput from "../../../ImageInput.jsx";

import './userRegistration.scss'

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
       setInputValues({ ...inputValues, [e.target.name]: e.target.value.trim()})
    }
    // this function handles all the address input changes:
    function handleAddressChange(e) {
       setUserAddress({...userAddress, [e.target.name]: e.target.value.trim()})
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
      <div className="Register_Outer">
        <h1>Register</h1>
        <form onSubmit={handleUserRegistration}>
        
          {/* <h2>Avatar</h2>
          <ImageInput imageUsage="avatar"/>  */}
          <section className="Input">
          <p className="Input_title">First Name</p>   
          <input name="firstName" placeholder="" type="text" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.firstName && (<p className="inputAlert" key={"firstNameError"+ i}>{error.firstName}</p>)
          ))}
          </section> 
              
          <section className="Input">
          <p className="Input_title">Family Name</p>
          <input name="lastName" placeholder="" type="text" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.lastName && (<p className="InputAlert" key={"lastNameError"+ i}>{error.lastName}</p>)
          ))}
          </section>      
          <section className="Input">
          <p className="Input_title">Profile Name</p>
          <input name="profileName" placeholder="" type="text" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.profileName && (<p className="inputAlert" key={"profileNameError"+ i}>{error.profileName}</p>)
          ))}
          </section> 
          <section className="Input">
          <p className="Input_title">email</p>
          <input name="email" placeholder="" type="email" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.email && (<p className="inputAlert" key={"emailError"+ i}>{error.email}</p>)
          ))}
          </section>

          <section className="Input">
          <p className="Input_title">Password</p>

          <section className="Input_Hidden">
          <input name="password" placeholder="****" type={isShowPassword ? "text" : "password"} required
                 onChange={handleChange} />
          <span className="icon" onClick={showPasswordHandler}>{isShowPassword ? "🐵" : "🙈"}</span>
          </section>
          {errors.map((error, i) => (    
            error.password && (<p className="inputAlert" key={"passwordError"+ i}>{error.password}</p>)
          ))}
          </section>
          
          <section className="Input">
          <p className="Input_title">Confirm Password</p>
          <input name="confirmPassword" placeholder="*****" type="password" required
                 onChange={handleChange} />
          {errors.map((error, i) => (    
            error.confirmPassword && (<p className="inputAlert" key={"confirmPasswordError"+ i}>{error.confirmPassword}</p>)
          ))}
          </section>
          <section className="Input">
          <p className="Input_title">street</p>
          <input name="street" placeholder="" type="text"
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.street"] && (<p className="inputAlert" key={"streetError"+ i}>{error["userAddress.street"] }</p>)
          ))}
          </section>
          <section className="Input">
          <p className="Input_title">House Number</p>
          <input name="streetNumber" placeholder="ex:12, 12B 12A-B" type="text" 
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.streetNumber"] && (<p className="inputAlert" key={"streetNumberError"+ i}>{error["userAddress.streetNumber"] }</p>)
          ))}
          </section>
          <section className="Input">
          <p className="Input_title">City</p>
          <input name="city" placeholder="" type="text" required
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.city"] && (<p className="inputAlert" key={"cityError"+ i}>{error["userAddress.city"] }</p>)
          ))}
          </section>

          <section className="Input">
          <p className="Input_title">Zip Code</p>
          <input name="zip" placeholder="12345" type="text"
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.zip"] && (<p className="inputAlert" key={"zipError"+ i}>{error["userAddress.zip"] }</p>)
          ))}
          </section>
          <section className="Input">
          <p className="Input_title">Country</p>
          <input name="country" placeholder="" type="text" required
                 onChange={handleAddressChange} />
          {errors.map((error, i) => (    
            error["userAddress.country"] && (<p className="inputAlert" key={"countryError"+ i}>{error["userAddress.country"] }</p>)
          ))}
          </section>
          
          <button className="Button" type="submit">Register</button>

        </form>

      </div>
    )
}