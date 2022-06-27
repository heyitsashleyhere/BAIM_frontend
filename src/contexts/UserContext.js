import React, { useState } from "react";

const userTemplate = [];

export const UserContext = React.createContext(userTemplate);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({ _id: "62b1ab5ebdc67faca3f2d2e8", profileName: "NriabZZ", avatar: "" });
  const [inputValues, setInputValues] = useState({})
  const [message, setMessage] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [isShowPassword, setIsShowPassword] = useState(false)

  function showPasswordHandler(){
    setIsShowPassword(!isShowPassword)
  }

  const userContextValue = {
    user, setUser,
    inputValues, setInputValues,
    message, setMessage,
    isLogin, setIsLogin,
    isShowPassword, setIsShowPassword,
    showPasswordHandler
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
}