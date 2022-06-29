import React, { useState } from "react";

const userTemplate = [];

export const UserContext = React.createContext(userTemplate);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState({}); //! maybe we don't need anymore
  const [inputValues, setInputValues] = useState({})
  const [message, setMessage] = useState("")
  const [isLogin, setIsLogin] = useState(false)
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