import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";

function UserRegistration() {
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
    city,
    setCity,
    zip,
    setZip,
    country,
    setCountry,
  } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        profileName,
        email,
        password,
        confirmPassword,
        userAddress: {
          street,
          city,
          zip,
          country,
        },
      }),
    };

    fetch("http://localhost:8000/user/register", config)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

// function UserLogin() {
//   return (
//     <div>
//       <h1>User Login</h1>
//     </div>
//   );
// }

// function UserEdit() {
//   return (
//     <div>
//       <h1>User Edit</h1>
//     </div>
//   );
// }

// function RecipePost() {
//   return (
//     <div>
//       <h1>Recipe Post</h1>
//     </div>
//   );
// }

export default function App() {
  return (
    <div>
      <UserRegistration />
    </div>
  );
}
