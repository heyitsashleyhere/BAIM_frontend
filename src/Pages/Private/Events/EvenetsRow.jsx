import { useState, useEffect, useContext } from 'react'
import { useCookies } from "react-cookie";
import { PostsContext } from "../../../contexts/PostContext";
import { PostCommentsAvatar } from '../../../components/Private/Avatars-Links/Avatars.jsx'

//MUI
import * as MUI from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LocationOn from '@mui/icons-material/LocationOn';
import "./events.scss";


//MUI styles
const styles2 = {
  "& th, td": {
    fontWeight: "bold",
    fontSize: "13px",
    px: "8px"
  },
};

export function EventRow(props) {
  const { event, pinEvent, isAuthor, currentUserId } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { users } = useContext(PostsContext);

  let nthNumber = (d) => {
    if (d > 3 && d < 21) return `${d}th`;
    switch (d % 10) {
      case 1: return `${d}st'`;
      case 2: return `${d}nd'`;
      case 3: return `${d}rd`;
      default: return `${d}th`
    }
  }

  const openMap = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  }
  const isOpen = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;


  function filter(arr1, arr2) {
    return arr1.filter(el => {
      return arr2.find(element => {
        return String(element) === String(el._id)
      })
    })

  }
  return (
    <>
      <MUI.TableRow sx={styles2}>
        <MUI.TableCell>
          <MUI.IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </MUI.IconButton>
        </MUI.TableCell>
        <MUI.TableCell component="th" scope="row">
          <MUI.Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              display: 'inline',
              mb: 0
            }}
          >
            {event.title}
          </MUI.Typography>
        </MUI.TableCell>
        <MUI.TableCell component="th" scope="row">
          {new Date(event.start).toLocaleString("default", {
            weekday: "short",
          })}
          {", "}
          {nthNumber(new Date(event.start).getDate())}
        </MUI.TableCell>
        <MUI.TableCell align="right">
          {isAuthor ? null :
            <MUI.Checkbox
              onClick={() => pinEvent(event)}
              defaultChecked={event.likes.find(item => item === currentUserId) ? true : false}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
        </MUI.TableCell>
      </MUI.TableRow>
      <MUI.TableRow>
        <MUI.TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <MUI.Collapse in={open} timeout="auto" unmountOnExit>
            <MUI.Box sx={{ margin: 1 }}>
              <MUI.Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <MUI.List
                  sx={{
                    width: '100%',
                    maxWidth: 200,
                  }}
                >
                  <MUI.ListItem>
                    <MUI.ListItemAvatar>
                      <MUI.Avatar alt="Remy Sharp" src={event.authorAvatar} sx={{ border: '1px solid black' }} />
                    </MUI.ListItemAvatar>
                    <MUI.ListItemText secondary="Host" primary={event.authorProfileName} />
                  </MUI.ListItem>
                </MUI.List>

                <MUI.Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '5px' }}>
                  <p style={{ fontSize: '1.4rem' }}>Time: {new Date(event.start).getHours()}
                    {":00"} {" - "}
                    {new Date(event.end).getHours()}
                    {":00"}
                  </p>
                  <MUI.Chip
                    clickable
                    size={'small'}
                    onClick={openMap}
                    icon={<LocationOn />}
                    label={Object.keys(event.address).map((key, idx) => (
                      <>
                        {event.address[key] + ', '}
                      </>
                    ))}
                    variant="outlined"
                    sx={{
                      py: 2,
                      "& .MuiChip-label": {
                        fontSize: '14px',
                      },
                    }}
                  />
                </MUI.Box>
              </MUI.Box>
              <MUI.Card elevation={0} square sx={{ marginTop: 2 }}>
                <MUI.CardMedia
                  component="img"
                  height="400"
                  image={event.image}
                  alt={event.title}
                />
                <MUI.CardContent>
                  <MUI.Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      display: 'inline',
                      mb: 0
                    }}
                  >
                    {event.title}
                  </MUI.Typography>

                  <MUI.Typography variant="h6" color="text.secondary" mt={1}>
                    {event.description}
                  </MUI.Typography>

                </MUI.CardContent>
              </MUI.Card>
              <MUI.Divider variant="middle" >
                Attending
              </MUI.Divider>
              <MUI.Box sx={{ display: 'flex', alignItems: 'center', justify: 'center', }}>
                {filter(users, event.attendingUsers).map(item =>
                (
                  <PostCommentsAvatar
                    name={item.profileName}
                    image={item.avatar}
                    key={"eventsAttending-" + item._id}
                  />
                )
                )}
              </MUI.Box>
              <MUI.Box my={3}>
                {event.tags.map((tag) => (
                  <MUI.Chip
                    key={tag}
                    label={tag}
                    margin="normal"
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  />
                )
                )}
              </MUI.Box>
            </MUI.Box>
          </MUI.Collapse>
        </MUI.TableCell>
      </MUI.TableRow>
      <MUI.Popper id={id} open={isOpen} anchorEl={anchorEl}>
        <MUI.Paper elevation={3}>
          <MUI.Box sx={{ border: 0, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
            <iframe src={event.link} style={{ border: 0, maxHeight: "300px", maxWidth: "400px" }} loading="lazy"></iframe>
          </MUI.Box>
        </MUI.Paper>
      </MUI.Popper>
    </>
  );
}