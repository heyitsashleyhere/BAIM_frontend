import { useContext, useState } from "react";
import { PostsContext } from "../../../../contexts/PostContext.js";
import { Grid, TextField, MenuItem, Autocomplete, Button, FormHelperText, Grow, Modal, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageInput from "../ImageInput.jsx";
import TagInput from "./TagInput.jsx";



export default function EditPost({ postData, setPostData, setIsEditOpen }) {
  const [ category, setCategory ] = useState(postData.type)
  const { inputValues, setInputValues, address, setAddress, handleFileUpload, upgrade, setUpgrade } = useContext(PostsContext)
  const [errors, setErrors] = useState([])
  const [country, setCountry] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [tagsArray, setTagsArray] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const categoriesForCategory = {
     artsCraft: ["upcycling", "refashion", "decor", "ceramic", "textile", "drawings", "zero-waste", "other"],
     beauty: ["hygiene","skin", "hair", "face", "anti-aging","makeup","other"],
     event: ["market", "tasting", "workshop", "charity","sit-in","meet-and-greet","fair", "other" ],
     garden: ["vegetable", "fruit", "grain", "herb","plants", "flower", "indoor-plant", "outdoor-plant", "plant", "tree", "other"],
     recipe: ["juice","smoothie", "breakfast", "sandwiches", "main-dish", "soup", "salad", "appetizer", "dessert", "other"]
  }

  function handleStart(value) {
    setStartTime(value)
    setInputValues({ ...inputValues, start: value });
  }

  function handleEnd(value) {
    setEndTime(value)
    setInputValues({ ...inputValues, end: value });
  }

  function handleTags(e) {
    // const trimmed = (e.target.value).trim()
    const removeSpaces = e.target.value.replace(/\s+/g, "");
    const toArray = removeSpaces.split(",");
    setTagsArray(toArray)
    setInputValues({ ...inputValues, tags: toArray })
  }

  function handleInputChange(e) {
       setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log('inputValues :>> ', inputValues);
    const config = {
      method: "PATCH",
      credentials: "include", // specify this if you need cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValues),
    }

    fetch(`http://localhost:7000/${category}/${postData._id}`, config)
      .then((response) => response.json())
      .then((result) => {
       if (result.errors) {
              setErrors(result.errors);
       } else {
        setPostData(result.updatedPost)
        setIsModalOpen(true)
        setUpgrade(!upgrade)
       }
      })
      .catch((error) => console.log(error));
  }
  // console.log('postData :>> ', postData);

  return (
    <section className="CreatePost-section">
      <Grow in>
        <form className="create-form" onSubmit={handleSubmit} style={{ padding: '5% 7%'}}>
          <Grid container spacing={2}>
            <Grid sx={{ textAlign: 'center', marginBottom: '2%'}}>
              <ImageInput imageUsage="image" oldUrl={postData.image} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="title" label="Title"
                      type="text"
                      fullWidth margin="dense"
                      InputLabelProps={{ shrink: true }}
                      defaultValue={postData.title}
                      error={errors.find((error) => error.description)}
                      onChange={handleInputChange} />
              {errors.map(
                     (error, i) =>
                     error.title && (
                     <FormHelperText error key={category + "-title" + i}>
                     {error.title}
                     </FormHelperText>
                     )
              )}
            </Grid>
            <Grid item xs={12}>
              <Autocomplete multiple
                      options={categoriesForCategory[`${postData.type}`]}
                      getOptionLabel={(option) => option}
                      defaultValue={postData.category || []}
                      onChange={(event, value) => setInputValues({ ...inputValues, category: value })}
                      onInputChange={(event, value) => setInputValues({ ...inputValues, category: value })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="category"
                          label="Category"
                        />
                      )}
                    />
            </Grid>
            <Grid item xs={12}>
              <TextField name="description" label="Description"
                     type="text"
                     fullWidth margin="dense"
                     multiline rows={6}
                     InputLabelProps={{ shrink: true }}
                     defaultValue={postData.description}
                     error={errors.find((error) => error.description)}
                     onChange={handleInputChange} />
              {errors.map(
                     (error, i) =>
                     error.description && (
                     <FormHelperText error key={category + "-description" + i}>
                     {error.description}
                     </FormHelperText>
                     )
              )}
            </Grid>

            <Grid item xs={12}>
                <TextField name="tags" label="Tags (separated by comma)"
                        type="text" fullWidth margin="dense"
                        InputLabelProps={{ shrink: true }}
                        defaultValue={postData.tags || []}
                        error={errors.find((error) => error.tags)}
                        onChange={handleTags} />
                  {errors.map( (error, i) =>
                      error.tags && (
                        <FormHelperText error key={category + "-tags" + i}>
                          {error.tags}
                        </FormHelperText>)
                  )}
            </Grid>

            {category === "event" && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12}>
                  <h4>Location</h4>
                </Grid>
                <Grid item xs={12}>
                  <TextField name="street" label="Street"
                        type="text" fullWidth margin="dense"
                        error={errors.find((error) => error["address.street"])}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                  {errors.map(
                        (error, i) =>
                        error["address.street"] && (
                        <FormHelperText error key={category + "-streetAddress" + i}>
                        {error["address.street"]}
                        </FormHelperText>
                        )
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField name="streetNumber" label="Street Number"
                          type="text" fullWidth margin="dense"
                          error={errors.find((error) => error["address.streetNumber"])}
                          onChange={(e) => setAddress({ ...address, streetNumber: e.target.value })} />
                    {errors.map(
                          (error, i) =>
                          error["address.streetNumber"] && (
                          <FormHelperText error key={category + "-streetNumber" + i}>
                          {error["address.streetNumber"]}
                          </FormHelperText>
                          )
                    )}
                </Grid>
                <Grid item xs={6}>
                  <TextField name="city" label="City"
                          type="text" fullWidth margin="dense"
                          error={errors.find((error) => error["address.city"])}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    {errors.map(
                          (error, i) =>
                          error["address.city"] && (
                          <FormHelperText error key={category + "-city" + i}>
                          {error["address.city"]}
                          </FormHelperText>
                          )
                    )}
                </Grid>
                <Grid item xs={6}>
                  <TextField name="zip" label="Zip Code"
                          type="text" fullWidth margin="dense"
                          error={errors.find((error) => error["address.zip"])}
                          onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                    {errors.map(
                          (error, i) =>
                          error["address.zip"] && (
                          <FormHelperText error key={category + "-zip" + i}>
                          {error["address.zip"]}
                          </FormHelperText>
                          )
                    )}
                </Grid>
                <Grid item xs={12}>
                  <TextField name="country" label="Country"
                          select fullWidth margin="dense"
                          error={errors.find((error) => error["address.country"])}
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value)
                            setAddress({ ...address, country: e.target.value })
                          }}>
                      {countryList.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                  </TextField>
                    {errors.map(
                          (error, i) =>
                          error["address.country"] && (
                          <FormHelperText error key={category + "-country" + i}>
                          {error["address.country"]}
                          </FormHelperText>
                          )
                    )}
                </Grid>

                <Grid item xs={12}>
                  <h4>Time</h4>
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                    label="Start date & time"
                    value={startTime}
                    onChange={handleStart}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={new Date()} 
                  />
                    {errors.map(
                          (error, i) =>
                          error.start && (
                          <FormHelperText error key={category + "start" + i}>
                          {error.start}
                          </FormHelperText>
                          )
                    )}
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                    label="End date & time"
                    value={endTime}
                    onChange={handleEnd}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={new Date()} 
                  />
                  {errors.map(
                          (error, i) =>
                          error.end && (
                          <FormHelperText error key={category + "end" + i}>
                          {error.end}
                          </FormHelperText>
                          )
                    )}
                </Grid>
              </LocalizationProvider>
            )}

            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <label htmlFor="create-post-video">
                <input type="file" name="video" accept="video/mp4,video/x-m4v,video/*" id='create-post-video'
                       onChange={(e) => handleFileUpload(e)} style={{display: 'none'}} />
                <Button variant="contained" endIcon={<VideocamIcon />} size="large" component="span">
                  Upload Video
                </Button>
              </label>
            </Grid>

            {/* <Grid item xs={6}>
              <label htmlFor="create-post-image">
                <input type="file" name="image" accept="image/*" id='create-post-image'
                      onChange={(e) => handleFileUpload(e)} style={{display: 'none'}} />
                <Button variant="contained" endIcon={<ImageIcon />} size="large" component="span">
                  Upload Image
                </Button>
              </label>
            </Grid> */}

            <Grid item xs={12} sm={8}>
              <TextField name="link" label="Link"
                     type="text"
                     fullWidth margin="dense"
                     InputLabelProps={{ shrink: true }}
                     defaultValue={postData.link || ''}
                     error={errors.find((error) => error.link)}
                     onChange={handleInputChange} />
              {errors.map(
                     (error, i) =>
                     error.link && (
                     <FormHelperText error key={category + "-link" + i}>
                     {error.link}
                     </FormHelperText>
                     )
              )}
            </Grid>
        
            <Grid item xs={12} textAlign='center'>
              <Button variant="contained" type="submit" size="large">Update</Button>
            </Grid>

          </Grid>
        </form>

      </Grow>
      <Modal open={isModalOpen} onClose={() => { setIsModalOpen(false); setCategory(null); setIsEditOpen(false) }} >
          <p>You have updated your {category} post</p>
       </Modal>
    </section>
  )
}
