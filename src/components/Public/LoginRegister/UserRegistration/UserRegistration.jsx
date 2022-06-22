import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext.js";
// mui
import { TextField, InputAdornment, IconButton, Button, FormHelperText, Grow, Box, Grid } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import ImageInput from "../../../ImageInput.jsx";
// import "./userRegistration.scss";

export default function UserRegistration() {
  const [userAddress, setUserAddress] = useState({});
  const [errors, setErrors] = useState([]);
  const {
    inputValues,
    setInputValues,
    setMessage,
    isShowPassword,
    showPasswordHandler,
  } = useContext(UserContext);

  useEffect(() => {
    setInputValues({ ...inputValues, userAddress });
  }, [userAddress]);

  // this function can handle all the input(but address) changes:
  function handleChange(e) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value.trim() });
  }
  // this function handles all the address input changes:
  function handleAddressChange(e) {
    setUserAddress({ ...userAddress, [e.target.name]: e.target.value.trim() });
  }

  function handleUserRegistration(e) {
    e.preventDefault();
    setErrors([]);

    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValues),
    };

    fetch("http://localhost:7000/user/register", config)
      .then((response) => response.json())
      .then((result) => {
        // console.log("UserRegistrationPOST:", result)
        if (result.errors) {
          setErrors(result.errors);
        }
        setMessage(result.message);
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className="RegisterForm">
    <Grow in>
      <form onSubmit={handleUserRegistration}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Register</h1>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="firstName" label="First Name"
              fullWidth required
              margin="dense" type="text"
              error={errors.find((error) => error.firstName)}
              onChange={handleChange} />
            {errors.map(
              (error, i) =>
                error.firstName && (
                  <FormHelperText error key={"firstNameError" + i}>
                    {error.firstName}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="lastName" label="Last Name"
              fullWidth required
              margin="dense" type="text"
              error={errors.find((error) => error.lastName)}
              onChange={handleChange} />
            {errors.map(
              (error, i) =>
                error.lastName && (
                  <FormHelperText error key={"lastNameError" + i}>
                    {error.lastName}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField name="profileName" label="Profile Name"
              fullWidth required
              margin="dense" type="text"
              error={errors.find((error) => error.profileName)}
              onChange={handleChange} />
            {errors.map(
              (error, i) =>
                error.profileName && (
                  <FormHelperText error key={"profileNameError" + i}>
                    {error.profileName}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField name="email" label="Email"
              fullWidth required
              margin="dense" type="email"
              error={errors.find((error) => error.email)}
              onChange={handleChange} />
            {errors.map(
              (error, i) =>
                error.email && (
                  <FormHelperText error key={"emailError" + i}>
                    {error.email}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField name="password" label="Password"
              fullWidth required
              margin="dense" type={isShowPassword ? "text" : "password"}
              error={errors.find((error) => error.password)}
              onChange={handleChange}
              InputProps={{
                endAdornment: ( 
                  <InputAdornment position="end">
                    <IconButton onClick={showPasswordHandler} onMouseDown={showPasswordHandler} >
                      {isShowPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment> )
              }} />
            {errors.map(
              (error, i) =>
                error.password && (
                  <FormHelperText error key={"passwordError" + i}>
                    {error.password}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField name="confirmPassword" label="Confirm Password"
              fullWidth required
              margin="dense" type="password"
              error={errors.find((error) => error.confirmPassword)} 
              onChange={handleChange} />
            {errors.map(
              (error, i) =>
                error.confirmPassword && (
                  <FormHelperText error key={"confirmPasswordError" + i}>
                    {error.confirmPassword}
                  </FormHelperText>
                )
            )}
          </Grid>

          <Grid item xs={12}>
            <h2>Address</h2>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField name="street" label="Street"
              fullWidth 
              margin="dense" type="text"
              error={errors.find((error) => error["userAddress.street"])}
              onChange={handleAddressChange} />
            {errors.map(
              (error, i) =>
                error["userAddress.street"] && (
                  <FormHelperText error key={"streetError" + i}>
                    {error["userAddress.street"]}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField name="streetNumber" label="Street Number"
              fullWidth 
              margin="dense" type="text"
              error={errors.find((error) => error["userAddress.streetNumber"])}
              onChange={handleAddressChange} />
            {errors.map(
              (error, i) =>
                error["userAddress.streetNumber"] && (
                  <FormHelperText error key={"streetNumberError" + i}>
                    {error["userAddress.streetNumber"]}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="city" label="City"
              fullWidth required
              margin="dense" type="text"
              error={errors.find((error) => error["userAddress.city"])}
              onChange={handleAddressChange} />
            {errors.map(
              (error, i) =>
                error["userAddress.city"] && (
                  <FormHelperText error key={"cityError" + i}>
                    {error["userAddress.city"]}
                  </FormHelperText>
                )
            )}
         </Grid>
         <Grid item xs={12} sm={6}>
            <TextField name="zip" label="Zip Code"
              fullWidth 
              margin="dense" type="text"
              error={errors.find((error) => error["userAddress.zip"])}
              onChange={handleAddressChange} />
            {errors.map(
              (error, i) =>
                error["userAddress.zip"] && (
                  <FormHelperText error key={"zipError" + i}>
                    {error["userAddress.zip"]}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField name="country" label="Country"
              fullWidth required
              margin="dense" type="text"
              error={errors.find((error) => error["userAddress.country"])}
              onChange={handleAddressChange} />
            {errors.map(
              (error, i) =>
                error["userAddress.country"] && (
                  <FormHelperText error key={"countryError" + i}>
                    {error["userAddress.country"]}
                  </FormHelperText>
                )
            )}
          </Grid>

          <Grid item xs={12} textAlign='center' sx={{ marginBottom: `2rem` }}>
            <Button variant="contained" type="submit" size="large">Register</Button>
          </Grid>
        </Grid>
      </form>
    </Grow>
    </section>
  )
}
