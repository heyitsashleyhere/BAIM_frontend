import React, { useState } from "react";

const userTemplate = [];

export const UserContext = React.createContext(userTemplate);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({ id: "", profileName: "" });

  const userContextValue = {
    user, setUser
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