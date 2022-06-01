import React, { useState } from "react";

const userTemplate = [];

export const UserContext = React.createContext(userTemplate);

export const UserContextProvider = (props) => {
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

  function handleUserRegistration(e) {
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
      .then((result) => console.log("UserRegistrationPOST:", result))
      .catch((error) => console.log(error));
  }

  const userContextValue = {
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
    handleUserRegistration,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
