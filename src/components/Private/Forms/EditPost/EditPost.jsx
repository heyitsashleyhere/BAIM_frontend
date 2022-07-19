import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../../../contexts/PostContext.js";
import { Grid, TextField, MenuItem, Autocomplete, Button, FormHelperText, Grow, Modal, Snackbar, IconButton } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageInput from "../ImageInput.jsx";
// import ImageIcon from '@mui/icons-material/Image';
import TagInput from "./TagInput.jsx";



export default function EditPost({ postData, setPostData, setIsEditOpen }) {
  const [ category, setCategory ] = useState(postData.type)
  const { inputValues, setInputValues, address, setAddress, handleFileUpload, upgrade, setUpgrade, image, setImage } = useContext(PostsContext)
  const [errors, setErrors] = useState([])
  const [country, setCountry] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [tagsArray, setTagsArray] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const countryList = [
    'Andorra',
    'United Arab Emirates',
    'Afghanistan',
    'Antigua and Barbuda',
    'Anguilla',
    'Albania',
    'Armenia',
    'Angola',
    'Antarctica',
    'Argentina',
    'American Samoa',
    'Austria',
    'Australia',
    'Aruba', 
    'Alland Islands',
    'Azerbaijan',
    'Bosnia and Herzegovina',
    'Barbados', 
    'Bangladesh', 
    'Belgium', 
    'Burkina Faso', 
    'Bulgaria', 
    'Bahrain', 
    'Burundi', 
    'Benin', 
    'Saint Barthelemy',
    'Bermuda', 
    'Brunei Darussalam',
    'Bolivia',
    'Brazil',
    'Bahamas',
    'Bhutan', 
    'Bouvet Island',
    'Botswana',
    'Belarus',
    'Belize',
    'Canada',
    'Cocos (Keeling) Islands',
    'Congo, Democratic Republic of the',
    'Central African Republic',
    'Congo, Republic of the',
    'Switzerland', 
    "Cote d'Ivoire", 
    'Cook Islands', 
    'Chile',
    'Cameroon', 
    'China', 
    'Colombia', 
    'Costa Rica', 
    'Cuba', 
    'Cape Verde', 
    'Curacao', 
    'Christmas Island', 
    'Cyprus', 
    'Czech Republic',
    'Germany',
    'Djibouti', 
    'Denmark', 
    'Dominica', 
    'Dominican Republic',
    'Algeria', 
    'Ecuador', 
    'Estonia', 
    'Egypt', 
    'Western Sahara', 
    'Eritrea',
    'Spain', 
    'Ethiopia', 
    'Finland', 
    'Fiji', 
    'Falkland Islands (Malvinas)',
    'Micronesia, Federated States of',
    'Faroe Islands', 
    'France',
    'Gabon', 
    'United Kingdom', 
    'Grenada', 
    'Georgia', 
    'French Guiana', 
    'Guernsey', 
    'Ghana', 
    'Gibraltar', 
    'Greenland', 
    'Gambia', 
    'Guinea', 
    'Guadeloupe', 
    'Equatorial Guinea',
    'Greece', 
    'South Georgia and the South Sandwich Islands',
    'Guatemala', 
    'Guam', 
    'Guinea-Bissau', 
    'Guyana', 
    'Hong Kong',
    'Heard Island and McDonald Islands',
    'Honduras',
    'Croatia', 
    'Haiti', 
    'Hungary', 
    'Indonesia', 
    'Ireland', 
    'Israel', 
    'Isle of Man', 
    'India', 
    'British Indian Ocean Territory',
    'Iraq', 
    'Iran, Islamic Republic of',
    'Iceland', 
    'Italy', 
    'Jersey', 
    'Jamaica',
    'Jordan',
    'Japan',
    'Kenya', 
    'Kyrgyzstan', 
    'Cambodia',
    'Kiribati', 
    'Comoros',
    'Saint Kitts and Nevis',
    "Korea, Democratic People's Republic of",
    'Korea, Republic of',
    'Kuwait', 
    'Cayman Islands', 
    'Kazakhstan', 
    "Lao People's Democratic Republic",
    'Lebanon', 
    'Saint Lucia',
    'Liechtenstein', 
    'Sri Lanka', 
    'Liberia', 
    'Lesotho', 
    'Lithuania',
    'Luxembourg',
    'Latvia', 
    'Libya', 
    'Morocco',
    'Monaco', 
    'Moldova, Republic of',
    'Montenegro',
    'Saint Martin (French part)',
    'Madagascar',
    'Marshall Islands', 
    'Macedonia, the Former Yugoslav Republic of',
    'Mali', 
    'Myanmar', 
    'Mongolia', 
    'Macao', 
    'Northern Mariana Islands',
    'Martinique', 
    'Mauritania',
    'Montserrat', 
    'Malta',
    'Mauritius', 
    'Maldives', 
    'Malawi', 
    'Mexico', 
    'Malaysia', 
    'Mozambique', 
    'Namibia', 
    'New Caledonia', 
    'Niger', 
    'Norfolk Island',
    'Nigeria', 
    'Nicaragua', 
    'Netherlands', 
    'Norway',
    'Nepal', 
    'Nauru', 
    'Niue', 
    'New Zealand', 
    'Oman', 
    'Panama', 
    'Peru', 
    'French Polynesia', 
    'Papua New Guinea', 
    'Philippines', 
    'Pakistan', 
    'Poland', 
    'Saint Pierre and Miquelon',
    'Pitcairn',
    'Puerto Rico',
    'Palestine, State of',
    'Portugal', 
    'Palau', 
    'Paraguay', 
    'Qatar', 
    'Reunion', 
    'Romania', 
    'Serbia', 
    'Russian Federation', 
    'Rwanda', 
    'Saudi Arabia', 
    'Solomon Islands', 
    'Seychelles', 
    'Sudan',
    'Sweden', 
    'Singapore', 
    'Saint Helena', 
    'Slovenia', 
    'Svalbard and Jan Mayen',
    'Slovakia',
    'Sierra Leone', 
    'San Marino', 
    'Senegal', 
    'Somalia', 
    'Suriname', 
    'South Sudan', 
    'Sao Tome and Principe',
    'El Salvador',
    'Sint Maarten (Dutch part)',
    'Syrian Arab Republic',
    'Swaziland', 
    'Turks and Caicos Islands',
    'Chad', 
    'French Southern Territories',
    'Togo', 
    'Thailand',
    'Tajikistan', 
    'Tokelau', 
    'Timor-Leste', 
    'Turkmenistan', 
    'Tunisia', 
    'Tonga', 
    'Turkey', 
    'Trinidad and Tobago',
    'Tuvalu', 
    'Taiwan, Province of China',
    'United Republic of Tanzania',
    'Ukraine', 
    'Uganda',
    'United States',
    'Uruguay',
    'Uzbekistan', 
    'Holy See (Vatican City State)',
    'Saint Vincent and the Grenadines',
    'Venezuela',
    'British Virgin Islands',
    'US Virgin Islands',
    'Vietnam', 
    'Vanuatu', 
    'Wallis and Futuna', 
    'Samoa', 
    'Kosovo', 
    'Yemen',
    'Mayotte', 
    'South Africa', 
    'Zambia', 
    'Zimbabwe']
  let navigate = useNavigate()

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
    
    const payload = {...inputValues, ...image}

    if(Object.values(payload).every(x => (x === null || x === ''))){
      setIsEditOpen(false)
    } else {
      const config = {
        method: "PATCH",
        credentials: "include", // specify this if you need cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
          setImage('')
         }
        })
        .catch((error) => console.log(error));
    }
  }
  
  function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		  }
		  setIsModalOpen(false);
      setIsEditOpen(false);
	}
  

  return (
    <section className="CreatePost-section">
      <Grow in>
        <form className="create-form" onSubmit={handleSubmit} style={{ padding: '5% 7%'}}>
          <Grid container spacing={2}>
            <Grid sx={{ textAlign: 'center', marginBottom: '2%'}}>
              <ImageInput oldUrl={postData.image} category={category} imageUsage="image"/>
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
                          autoComplete="new-password"
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
              <Button variant="outlined" size="large" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            </Grid>

          </Grid>
        </form>

      </Grow>
      <Modal open={isModalOpen} onClose={() => { setIsModalOpen(false); setCategory(null); setIsEditOpen(false) }} >
          <Snackbar open={isModalOpen} autoHideDuration={6000}
              onClose={handleClose}
              message={`You have updated your ${category} post`}
              action={
                  <React.Fragment>
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    sx={{ p: 0.5 }}
                    onClick={handleClose}
                    >
                    <CloseIcon />
                    </IconButton>
                  </React.Fragment>
                  } />
       </Modal>
    </section>
  )
}
