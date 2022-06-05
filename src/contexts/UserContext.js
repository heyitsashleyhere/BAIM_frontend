import React, { useState } from "react";

const userTemplate = [];

export const UserContext = React.createContext(userTemplate);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({ id: "", profileName: "" });

  // User  Edit



  // User Delete
  function handleUserDelete() {
    const config = {
      method: "DELETE",
    };

    fetch(`http://localhost:7000/user/${user.id}`, config)
      .then((response) => response.json())
      .then((result) => console.log("UserRegistrationPOST:", result))
      .catch((error) => console.log(error));
    // Pop up message instead of console.log later
    // cookie, Token stuff
  }

  const userContextValue = {
    user, setUser,
    handleUserDelete,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [profileName, setProfileName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [street, setStreet] = useState("");
  // const [streetNumber, setStreetNumber] = useState("");
  // const [city, setCity] = useState("");
  // const [zip, setZip] = useState("");
  // const [country, setCountry] = useState("");