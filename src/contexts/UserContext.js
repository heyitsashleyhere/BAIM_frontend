import React, { useState } from "react";

const userTemplate = [];

export const UserContext = React.createContext(userTemplate);

export const UserContextProvider = (props) => {
  // Current User Placeholder
  // maybe needs a additional logic later
  const [ user, setUser ] = useState({id:"", profileName: ""})
  // User Data State Variables
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

  // User Registration maybe put the fetch somewhere else later.
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

    fetch("http://localhost:7000/user/register", config)
      .then((response) => response.json())
      .then((result) => console.log("UserRegistrationPOST:", result))
      .catch((error) => console.log(error));
      // Pop up message instead of console.log later
  }
  // ///////////////////////////////////

  // User Login

  function handleUserLogin(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    fetch("http://localhost:7000/user/login", config)
      .then((response) => response.json())
      .then((result) => console.log("UserRegistrationPOST:", result))
      .catch((error) => console.log(error));
      // Pop up message instead of console.log later
      // Token and cookie stuff
      // maybe useState set current User?
  }
  // //////////////////////////////////

  // User  Edit

  function handleUserEdit(e) {
    e.preventDefault();

    const config = {
      method: "PATCH",
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

    fetch(`http://localhost:7000/user/${user.id}`, config)
      .then((response) => response.json())
      .then((result) => console.log("UserRegistrationPOST:", result))
      .catch((error) => console.log(error));
      // Pop up message instead of console.log later
      // cookie, Token stuff
  }

  // //////////////////////////////////

  // User Delete

  function handleUserDelete(){
    const config = {
      method: "DELETE"
    }

    fetch(`http://localhost:7000/user/${user.id}`, config)
      .then((response) => response.json())
      .then((result) => console.log("UserRegistrationPOST:", result))
      .catch((error) => console.log(error));
      // Pop up message instead of console.log later
      // cookie, Token stuff
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
    handleUserLogin,
    handleUserEdit,
    handleUserDelete
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
