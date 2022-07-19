import { useState, useEffect, useContext } from 'react'
import { useCookies } from "react-cookie";
import { EventRow } from "./EvenetsRow.jsx"
import { AnimationContext } from "../../../contexts/AnimationContext";

//MUI
import * as MUI from "@mui/material";


//MUI styles
const styles = {
  "& th": {
    fontWeight: "bold",
    fontSize: "15px",
    px: "8px"
  },
};

export const EventsTable = (props) => {
  const [cookies] = useCookies();
  const { data } = props;
  const { windowWidth, setSnackbar } = useContext(AnimationContext);
  const [showMobile, setShowMobile] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false)

  //to toggle show/hide mui components between breakpoints
  useEffect(() => {
    setShowMobile(windowWidth <= 500 ? true : false);
  }, [showMobile, windowWidth]);

  //current month in letters
  const date = new Date();
  let currentMonth = date.toLocaleString("default", { month: "long" });

  let nthNumber = (d) => {
    if (d > 3 && d < 21) return `${d}th`;
    switch (d % 10) {
      case 1: return `${d}st'`;
      case 2: return `${d}nd'`;
      case 3: return `${d}rd`;
      default: return `${d}th`
    }
  }

  console.log(isAuthor);
  useEffect(() => {
    setIsAuthor(data.find(item => item.author === cookies.id))
  }, [isAuthor]);

  const pinEvent = (event) => {
    const config = {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`http://localhost:7000/event/pin/${event._id}`, config)
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          setError(result.errors);
        } else {
          setSnackbar({
            message: `Event ${event.likes.find(item => item === cookies.id) ? `was removed from` : `was added to`} your Profile`,
            open: true,
            severity: "error"
          })
        }
      })
      .catch((error) => {
        console.log("error from Pin Event", error);
      });
  };
  console.log(data.length)
  return (
    <>
      {data.length === 0 ? null : (
        <MUI.TableContainer component={MUI.Paper}>
          <MUI.Table aria-label="collapsible table">
            <MUI.TableHead>
              <MUI.TableRow sx={styles}>
                <MUI.TableCell />
                <MUI.TableCell>Title</MUI.TableCell>
                <MUI.TableCell>Date</MUI.TableCell>
                {isAuthor || !currentMonth ? null :
                  <MUI.TableCell align="right">Attending</MUI.TableCell>
                }
              </MUI.TableRow>
            </MUI.TableHead>
            <MUI.TableBody>
              {data.map((event) => (
                <EventRow
                  key={event._id}
                  currentUserId={cookies.id}
                  event={event}
                  showMobile={showMobile}
                  pinEvent={pinEvent}
                  isAuthor={isAuthor}
                  data={data}
                  nthNumber={nthNumber}
                />
              ))}
            </MUI.TableBody>
          </MUI.Table>
        </MUI.TableContainer>
      )}
    </>
  )
}
