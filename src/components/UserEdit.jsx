import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function UserRegistration() {
    const {
      firstName, setFirstName,
      lastName, setLastName,
      profileName, setProfileName,
      email, setEmail,
      password, setPassword,
      confirmPassword, setConfirmPassword,
      street, setStreet,
      streetNumber, setStreetNumber,
      city, setCity,
      zip, setZip,
      country, setCountry,
      handleUserEdit } = useContext(UserContext);
  
    return (
      <div>
        <h1>User Edit</h1>
        <form onSubmit={handleUserEdit}>
          <input value={firstName} placeholder="first name" type="text"
                 onChange={(e) => setFirstName(e.target.value)} />

          <input value={lastName} placeholder="last name" type="text"
                 onChange={(e) => setLastName(e.target.value)} />

          <input value={profileName} placeholder="profile name" type="text"
                 onChange={(e) => setProfileName(e.target.value)} />

          <input value={email} placeholder="email" type="email"
                 onChange={(e) => setEmail(e.target.value)} />

          <input value={password} placeholder="password" type="password"
                 onChange={(e) => setPassword(e.target.value)} />

          <input value={confirmPassword} placeholder="confirm password" type="password"
                 onChange={(e) => setConfirmPassword(e.target.value)} />

          <h2>address</h2>
           <input value={street} placeholder="street" type="text"
                  onChange={(e) => setStreet(e.target.value)} />

           <input value={streetNumber} placeholder="street number" type="text"
                  onChange={(e) => setStreetNumber(e.target.value)} />

           <input value={city} placeholder="ciy" type="text"
                  onChange={(e) => setCity(e.target.value)} />

           <input value={zip} placeholder="zip code" type="text"
                  onChange={(e) => setZip(e.target.value)} />

          <input value={country} placeholder="country" type="text"
                 onChange={(e) => setCountry(e.target.value)} />
                 
          <button type="submit">save changes</button>
        </form>
      </div>
    );
  }