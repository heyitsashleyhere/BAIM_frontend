import { useContext, useState } from "react";
import { Grid, TextField, MenuItem, Autocomplete, Button, FormHelperText, Grow } from "@mui/material";
import { PostsContext } from "../../../contexts/PostContext";
import CreatePost from "../../../components/Private/Forms/CreatePost/CreatePost.jsx";
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
                <CreatePost category={category} setCategory={setCategory}/>
            )}

    </section>
  )
}
