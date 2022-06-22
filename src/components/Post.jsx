import { useContext, useState } from "react";
// MUI
import { Grid, TextField, InputAdornment, IconButton, Button, FormHelperText, Stack, Grow, Box } from "@mui/material";
// context
import { PostsContext } from "../contexts/PostContext.js";

export default function Post({ category }) {
  const { inputValues, setInputValues, 
          address, setAddress, 
          handleFileUpload } = useContext(PostsContext);
  const [errors, setErrors] = useState([]);

  function handleInputChange(e) {
       setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault()
    setInputValues({ ...inputValues, address });
    const config = {
      method: "POST",
      credentials: "include", // specify this if you need cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValues),
    }

    fetch(`http://localhost:7000/${category}`, config)
      .then((response) => response.json())
      .then((result) => {
       if (result.errors) {
              setErrors(result.errors);
       }
       console.log(category, "fetch result:", result)
       })
      .catch((error) => console.log(error));
  }

  return (
    <section className="CreatePost-section">
      <Grow in>
        <form className="create-form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="title" label="Title"
                     type="text"
                     fullWidth margin="dense"
                     error={errors.find((error) => error.title)}
                     onChange={handleInputChange} />
              {errors.map(
                     (error, i) =>
                     error.title && (
                     <FormHelperText error key={category + "title" + i}>
                     {error.title}
                     </FormHelperText>
                     )
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField name="description" label="Description"
                     type="text"
                     fullWidth margin="dense"
                     multiline maxRows={10}
                     error={errors.find((error) => error.description)}
                     onChange={handleInputChange} />
              {errors.map(
                     (error, i) =>
                     error.description && (
                     <FormHelperText error key={category + "description" + i}>
                     {error.description}
                     </FormHelperText>
                     )
              )}
            </Grid>

            {category === "event" && (
              <>
                <h4>Location</h4>
                <input
                  type="text"
                  name="street"
                  placeholder="street"
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="streetNumber"
                  placeholder="street number"
                  onChange={(e) =>
                    setAddress({ ...address, streetNumber: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="zip code"
                  onChange={(e) =>
                    setAddress({ ...address, zip: parseInt(e.target.value) })
                  }
                />
                <input
                  type="text"
                  name="city"
                  placeholder="city"
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="country"
                  placeholder="country"
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                />

                <h4>Time</h4>
                <input
                  type="date"
                  name="startDate"
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      startDate: e.target.value,
                    })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                />

                <input
                  type="time"
                  name="startTime"
                  onChange={(e) =>
                    setInputValues({
                      ...inputValues,
                      startTime: e.target.value,
                    })
                  }
                />

                <input
                  type="date"
                  name="endDate"
                  onChange={(e) =>
                    setInputValues({ ...inputValues, endDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1)
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                />

                <input
                  type="time"
                  name="endTime"
                  onChange={(e) =>
                    setInputValues({ ...inputValues, endTime: e.target.value })
                  }
                />
              </>
            )}
            <label htmlFor="video">video:</label>
            <input
              type="file"
              name="video"
              accept="video/mp4,video/x-m4v,video/*"
            />

            <label htmlFor="video">image:</label>
            <input
              type="file"
              name="image"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />

            <input
              type="text"
              name="link"
              placeholder="link"
              onChange={(e) =>
                setInputValues({ ...inputValues, links: e.target.value })
              }
            />

            <input
              type="text"
              name="tags"
              placeholder="tags"
              onChange={(e) => {
                const removeSpaces = e.target.value.replace(/\s+/g, "");
                const toArray = removeSpaces.split(",");
                setInputValues({ ...inputValues, tags: toArray });
              }}
            />

            <button type="submit">Create</button>
          </Grid>
        </form>
      </Grow>
    </section>
  )
}
