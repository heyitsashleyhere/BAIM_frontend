import React, { useContext, useState } from "react";
import { PostsContext } from "../../../../contexts/PostContext";
import { Alert } from "@mui/material";

import "./addComment.scss";

// post={selected}
export const AddComment = ({ post } ) => {
  const { upgrade, setUpgrade } = useContext(PostsContext);

  const [error, setError] = useState();
  const [comment, setComment] = useState("");

  // make a playload with { type: beauty, beauty: _id of the post, message: input}
  function AddComment() {
    const payload = {
      type: post.type,
      [post.type]: post._id,
      message: comment
    }
    console.log('payload', payload)
    const config = {
      method: "POST",
      credentials: "include", // specify this if you need cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:7000/comments`, config)
      .then((response) => response.json())
      .then((result) => {
        console.log('result :>> ', result);
        if (result.errors) {
          setError(result.errors);
        } else {
          setUpgrade(!upgrade);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className="AddComment">
      <textarea
        className="AddComment-input"
        placeholder="leave a comment"
        onChange={(e) => setComment(e.target.value)}
      />

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2}}>{error[0].message}</Alert>
      )}
      
      <button className="NavLink-Black" onClick={AddComment}>
        submit
      </button>
    </section>
  );
};
