import React, { useState, useEffect, useContext } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { IconButton,	Button,	Typography,	Menu,	MenuItem,	Popover,	Box} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";


export default function ProfileControllers({ handleEdit, handleUserDelete, isUserEditOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
  const { profileData } = useContext(PostsContext)
  const openFeatures = Boolean(anchorEl);
  const openPopper = Boolean(deleteAnchorEl);

  useEffect(() => {
    if(isUserEditOpen === false ) {
      setAnchorEl(null);
      setDeleteAnchorEl(null);
    }
  }, [isUserEditOpen])
  

  const handlePopper = (event) => {
    setDeleteAnchorEl(deleteAnchorEl ? null : event.currentTarget);
  };

  const popperId = openPopper ? "simple-popper" : undefined;

  const handleFeatures = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDeleteAnchorEl(null);
  };
  // MUI popper END
  return (
    <section className="Profile-editor">
      <IconButton
        aria-label="edit"
        aria-controls={openFeatures ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openFeatures ? "true" : undefined}
        onClick={handleFeatures}
        className="editor-icon"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={openFeatures} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ mr: 2 }} color="primary" />
          Edit
        </MenuItem>
        <MenuItem onClick={handlePopper}>
          <DeleteIcon fontSize="small" sx={{ mr: 2 }} color="primary" />
          Delete
        </MenuItem>
        <Popover
          id={popperId}
          open={openPopper}
          anchorEl={deleteAnchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Typography sx={{ p: 2 }}>
            Want to delete your account forever ever?
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<CheckCircleIcon />}
              sx={{ mb: 1 }}
              onClick={() => handleUserDelete(profileData._id)}
            >
              YES
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CloseIcon />}
              sx={{ mb: 1 }}
              onClick={() => setDeleteAnchorEl(null)}
            >
              NO
            </Button>
          </Box>
        </Popover>
      </Menu>
    </section>
  );
}
