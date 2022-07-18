import { useState, useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext.js";
// mui
import { Grid, TextField, InputAdornment, IconButton, Button, FormHelperText, Stack, Grow, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function UserLogin() {
    const [errors, setErrors] = useState([])
    const { setUser, setMessage, setIsLogin,
            inputValues, setInputValues,
            isShowPassword, showPasswordHandler } = useContext(UserContext)
    

    // this function can handle all the input changes:
    function handleChange(e) {
      setInputValues({ ...inputValues, [e.target.name]: e.target.value.trim()})
    }
  
    function handleUserLogin(e) {
      e.preventDefault();
      setErrors([])
      const config = {
        method: "POST",
        credentials: 'include', // specify this if you need cookies
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
        body: JSON.stringify(inputValues)
      };
      // https://stackoverflow.com/questions/36824106/express-doesnt-set-a-cookie
  
      fetch("https://loka-database.herokuapp.com/user/login", config)
        .then((response) => response.json())
        .then((result) => {
            // console.log("UserLogin:", result);
            if(!result.errors) { 
              // setUser(result.user)
              setMessage(result.message)
              setIsLogin(true)
              // localStorage.setItem('user', JSON.stringify(result.user))
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
      <Grid component="form" spacing={2} container onSubmit={handleUserLogin}>
          <Grid item xs={12}>
            <h1>Login</h1>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
                      {isShowPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                  )}} />
            {errors.map((error, i) => (
              error.password && (<FormHelperText error key={"passwordError"+ i}>{error.password}</FormHelperText>)
            ))}  
          </Grid>
          <Grid item xs={12} textAlign='center'>
            <Button variant="contained" type="submit" size="large">Login</Button>
          </Grid>
          
      </Grid>
    </Grow>
    </section>
  )
}
