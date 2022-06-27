import { useContext, useState } from "react";
import { Grid, TextField, MenuItem, Autocomplete, Button, FormHelperText, Grow } from "@mui/material";
// context
import { PostsContext } from "../../../contexts/PostContext";
// components
import CreatePost from "../../../components/CreatePost.jsx";
// style
import './Create.scss'

export default function Create() {
  const { postCategories } = useContext(PostsContext)
  const [category, setCategory] = useState('')
  return (
    <section className="Create">
        <h1>Create a Post</h1>
        <Grid container spacing={2} className='pick-container'>
            <Grid item xs={12} sm={6}>
                <h4>Pick a category</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                      options={postCategories}
                    //   value={category}
                      onInputChange={(event, value) => setCategory(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="category"
                          label="Category"
                        /> )}
                  />
            </Grid>
        </Grid>           
            {category && (
                <CreatePost category={category} />
            )}

    </section>
  )
}
