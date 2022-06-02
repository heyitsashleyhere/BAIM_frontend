import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function UserRegistration() {
    const {
      firstName,
      setFirstName,
      lastName,
      setLastName,
      profileName,
      setProfileName,
      email,
      setEmail,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      street,
      setStreet,
      streetNumber,
      setStreetNumber,
      city,
      setCity,
      zip,
      setZip,
      country,
      setCountry,
      handleUserEdit,
    } = useContext(UserContext);
  
    return (
      <div>
        <h1>User Edit</h1>
        <form onSubmit={handleUserEdit}>
          <label></label>
          <input
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="profile name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <h2>address</h2>
          <input
            type="text"
            placeholder="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
           <input
            type="text"
            placeholder="street number"
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="ciy"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="zip code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <input
            type="text"
            placeholder="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">save changes</button>
        </form>
      </div>
    );
  }