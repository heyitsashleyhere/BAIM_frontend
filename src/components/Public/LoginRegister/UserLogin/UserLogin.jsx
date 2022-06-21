import { useState, useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext.js";
// mui
import { TextField, InputAdornment, IconButton, Button, FormHelperText, Stack, Grow, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function UserLogin() {
    const [errors, setErrors] = useState([])
    const { user, setUser, 
            inputValues, setInputValues,
            message, setMessage,
            setIsLogin,
            isShowPassword, showPasswordHandler } = useContext(UserContext)
    

    // this function can handle all the input changes:
    function handleChange(e) {
      console.log('e.target.value :>> ', e.target.value);
      setInputValues({ ...inputValues, [e.target.name]: e.target.value.trim()})
    }
  
    function handleUserLogin(e) {
      e.preventDefault();
      console.log(inputValues)
      setErrors([])
      const config = {
        method: "POST",
        credentials: 'include', // specify this if you need cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValues)
      };
      // https://stackoverflow.com/questions/36824106/express-doesnt-set-a-cookie
  
      fetch("http://localhost:7000/user/login", config)
        .then((response) => response.json())
        .then((result) => {
            // console.log("UserLogin:", result);
            if(!result.errors) {
              setUser({ id: result.user._id, profileName: result.user.profileName, avatar: result.user.avatar })
              setMessage(result.message)
              setIsLogin(true)
              
            } else {
              setErrors(result.errors)
              console.log('errors :>> ', errors);
            }
          })
        .catch((error) => console.log(error));
    }

  return (
    <section className="LoginForm">
    <Grow in>
      <Stack component="form" onSubmit={handleUserLogin}>
          <h1>Login</h1>
          <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              error={errors.find(error => error.email)}
              type="email"
              onChange={handleChange} />

          {errors.map((error, i) => (
            error.email && (<FormHelperText error key={"emailError"+ i}>{error.email}</FormHelperText>)
          ))}

          <TextField
              name="password"
              color="primary"
              label="Password"
              fullWidth
              margin="normal"
              error={errors.find(error => error.password)}
              type={isShowPassword ? "text" : "password"}
              onChange={handleChange}
              InputProps={
                {endAdornment: (
                 <InputAdornment position="end">
                  <IconButton
                    onClick={showPasswordHandler}
                    onMouseDown={showPasswordHandler}
                    >
                    {isShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                )}} />

          {errors.map((error, i) => (
            error.password && (<FormHelperText error key={"passwordError"+ i}>{error.password}</FormHelperText>)
          ))}  
          
          <Box textAlign='center'>
            <Button variant="contained" type="submit" size="large">Login</Button>
          </Box>
   
      </Stack>
    </Grow>
    </section>
  )
}
