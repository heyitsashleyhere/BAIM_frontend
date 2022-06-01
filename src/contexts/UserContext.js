import React from "react";

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
  };


  return (
      <UserContext.Provider value= {userContextValue}>
          {props.children}
      </UserContext.Provider>
  )
};
