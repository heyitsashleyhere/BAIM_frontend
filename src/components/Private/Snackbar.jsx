import React, { useContext } from 'react'
import { AnimationContext } from "../../contexts/AnimationContext.js"
import { PostsContext } from '../../contexts/PostContext.js';
import * as MUI from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


export const Snackbar = () => {
  const { snackbar, setSnackbar } = useContext(AnimationContext);
  const { upgrade, setUpgrade } = useContext(PostsContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false });
    setUpgrade(!upgrade)
  };
  const action = (
    <MUI.IconButton
      size="medium"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="medium" />
    </MUI.IconButton>
  );

  return (
    <MUI.Snackbar
      open={snackbar.open}
      onClose={handleClose}
      autoHideDuration={3000}
      sx={{
        width: '100%',
        "& .MuiSnackbarContent-root": {
          fontSize: '14px',
        }
      }}
      action={action}
      message={snackbar.message}
      severity='success'
    />
  )
}
