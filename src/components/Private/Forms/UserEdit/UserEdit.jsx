import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext.js";
import { Typography, TextField, Autocomplete, Paper, Button, FormHelperText, Grow, MenuItem, Grid } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ImageInput from "../ImageInput.jsx";

export default function UserEdit({ profileData }) {
  const [userAddress, setUserAddress] = useState({});
  const [errors, setErrors] = useState([]);
  const { inputValues, setInputValues, setMessage, isShowPassword, showPasswordHandler } = useContext(UserContext);
  const [country, setCountry] = useState('')
  const countryList = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "United States of America (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands"
  ]
  const currentUser = JSON.parse(localStorage.getItem("user"));

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
    if(e.target.name === 'country') {
      setCountry(e.target.value)
    }
  }

  function handleUserRegistration(e) {
    e.preventDefault();
    setErrors([]);

    const config = {
      method: "PATCH",
      credentials: 'include', 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValues),
    };

    fetch(`http://localhost:7000/user/${currentUser._id}`, config)
      .then((response) => response.json())
      .then((result) => {
        // console.log("UserRegistrationPOST:", result)
        if (result.errors) {
          setErrors(result.errors);
        }
        setMessage(result.message);
        console.log('result :>> ', result);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Paper elevation={3} className="ProfileEdit-form" sx={{ width: '80%', margin: '2rem'}}>
    <Grow in>
      <form onSubmit={handleUserRegistration} style={{ padding: '1rem 2rem'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: 'center '}}>
            <Typography variant="h1">Edit Profile</Typography>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center '}}>
            <Typography variant="h4">Profile Picture</Typography>
            <ImageInput imageUsage="avatar" oldUrl={profileData.avatar}/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography>First Name</Typography>
            <Typography name="firstName" variant="h4"
              contentEditable={true} suppressContentEditableWarning={true}
              error={errors.find((error) => error.firstName)}
              onInput={e => setInputValues({ ...inputValues, firstName: e.currentTarget.textContent}) } >
                {profileData.firstName}
            </Typography>
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
            <Typography>Last Name</Typography>
            <Typography name="lastName" variant="h4"
              contentEditable={true} suppressContentEditableWarning={true}
              error={errors.find((error) => error.lastName)}
              onInput={e => setInputValues({ ...inputValues, lastName: e.currentTarget.textContent}) } >
              {profileData.lastName}
            </Typography>
            {errors.map(
              (error, i) =>
                error.lastName && (
                  <FormHelperText error key={"lastNameError" + i}>
                    {error.lastName}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Profile Name</Typography>
            <Typography name="profileName" variant="h4"
              contentEditable={true} suppressContentEditableWarning={true}
              error={errors.find((error) => error.profileName)}
              onInput={e => setInputValues({ ...inputValues, profileName: e.currentTarget.textContent}) } >
              {profileData.profileName}
            </Typography>
            {errors.map(
              (error, i) =>
                error.profileName && (
                  <FormHelperText error key={"profileNameError" + i}>
                    {error.profileName}
                  </FormHelperText>
                )
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
              <Autocomplete multiple
                      options={["arts-and-craft", "beauty", "event", "garden", "recipe"]}
                      getOptionLabel={(option) => option}
                      defaultValue={profileData.interests || []}
                      onChange={(event, value) => setInputValues({ ...inputValues, interests: value })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="interests"
                          label="interests"
                        />
                      )}
                    />
            </Grid>

          <Grid item xs={12}>
            <Typography>Email</Typography>
            <Typography name="email" variant="h4"
              contentEditable={true} suppressContentEditableWarning={true}
              error={errors.find((error) => error.email)}
              onInput={e => setInputValues({ ...inputValues, email: e.currentTarget.textContent}) } >
              {profileData.email}
            </Typography>
            {errors.map(
              (error, i) =>
                error.email && (
                  <FormHelperText error key={"emailError" + i}>
                    {error.email}
                  </FormHelperText>
                )
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4">Address</Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography>Street</Typography>
            <Typography name="street" variant="h4"
              contentEditable={true} suppressContentEditableWarning={true}
              error={errors.find((error) => error["userAddress.street"])}
              onInput={e => setUserAddress({ ...userAddress, street: e.currentTarget.textContent}) } >
              {profileData.userAddress && (profileData.userAddress.street)}
            </Typography>
            {errors.map(
              (error, i) =>
                error["userAddress.street"] && (
                  <FormHelperText error key={"streetError" + i}>
                    {error["userAddress.street"]}
                  </FormHelperText>
                )
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>Street Number</Typography>
            <Typography name="streetNumber" variant="h4"
              contentEditable={true} suppressContentEditableWarning={true}
              error={errors.find((error) => error["userAddress.streetNumber"])}
              onInput={e => setUserAddress({ ...userAddress, streetNumber: e.currentTarget.textContent}) } >
              {profileData.userAddress && (profileData.userAddress.streetNumber)}
            </Typography>
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
            <Typography>City</Typography>
            <Typography name="city" variant="h4"
              contentEditable={true} suppressContentEditableWarning={true}
              error={errors.find((error) => error["userAddress.city"])}
              onInput={e => setUserAddress({ ...userAddress, city: e.currentTarget.textContent}) } >
              {profileData.userAddress && (profileData.userAddress.city)}
            </Typography>
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
            <Typography>Zip Code</Typography>
            <Typography name="zip" variant="h4"
              contentEditable={true} suppressContentEditableWarning={true}
              error={errors.find((error) => error["userAddress.zip"])}
              onInput={e => setUserAddress({ ...userAddress, zip: e.currentTarget.textContent}) } >
              {profileData.userAddress && (profileData.userAddress.zip)}
            </Typography>
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
              fullWidth 
              margin="dense" select
              value={profileData.userAddress.country || country}
              error={errors.find((error) => error["userAddress.country"])}
              onChange={handleAddressChange}>
              {countryList.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
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
            <Button variant="contained" type="submit" size="large">Confirm</Button>
          </Grid>
        </Grid>
      </form>
    </Grow>
    </Paper>
  )
}
