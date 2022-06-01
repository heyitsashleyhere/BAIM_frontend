import { useState } from "react";

function UserRegistration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div>
      <h1>User Registration</h1>
      <form>
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
      </form>
    </div>
  );
}

function UserLogin() {
  return (
    <div>
      <h1>User Login</h1>
    </div>
  );
}

function UserEdit() {
  return (
    <div>
      <h1>User Edit</h1>
    </div>
  );
}

function RecipePost() {
  return (
    <div>
      <h1>Recipe Post</h1>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}
