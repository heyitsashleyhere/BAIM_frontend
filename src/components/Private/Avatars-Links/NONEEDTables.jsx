import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { AnimationContext } from "../../../contexts/AnimationContext.js";
import { useCookies } from "react-cookie";

//MUI
import * as MUI from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

//MUI styles
const styles = {
	"& th": {
		fontWeight: "bold",
		fontSize: "15px",
	},
};
const styles2 = {
	"& th, td": {
		fontWeight: "bold",
		fontSize: "14px",
	},
};

export const EventsTable = ({ events }) => {
	console.log('events from EventsTable :>> ', events);
	const { windowWidth } = useContext(AnimationContext);
	const [showMobile, setShowMobile] = useState(false);
	const [cookies] = useCookies();

	//to toggle show/hide mui components between breakpoints
	useEffect(() => {
		setShowMobile(windowWidth <= 500 ? true : false);
	}, [showMobile, windowWidth]);

	return (
		<section className="tableAvatar" style={{ width: "100%" }}>
			<MUI.TableContainer component={MUI.Paper}>
				<MUI.Table aria-label="collapsible table">
					<MUI.TableHead>
						<MUI.TableRow sx={styles}>
							<MUI.TableCell />
							<MUI.TableCell>Date</MUI.TableCell>
							{showMobile ? null : (
								<MUI.TableCell align="center">Time</MUI.TableCell>
							)}
							<MUI.TableCell align="right">Location</MUI.TableCell>
							{showMobile ? null : (
								<MUI.TableCell align="right">City</MUI.TableCell>
							)}
						</MUI.TableRow>
					</MUI.TableHead>
					<MUI.TableBody>
						{events.map((event, i) => (
							<>
								<EventRow
									key={"profilePage-avatar-eventRow" + i}
									data={event}
									showMobile={showMobile}
								/>
							</>
						))}
					</MUI.TableBody>
				</MUI.Table>
			</MUI.TableContainer>
		</section>
	);
};

function EventRow(props) {
	const { data, showMobile } = props;
	const [open, setOpen] = useState(false);

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
					{new Date(data.start).getDate()}
					{" - "}
					{new Date(data.start).toLocaleString("default", {
						weekday: "short",
					})}
				</MUI.TableCell>
				{showMobile ? null : (
					<MUI.TableCell align="center">
						{new Date(data.start).getHours() % 12 || 12}
						{":00"} {" - "}
						{new Date(data.end).getHours() % 12 || 12}
						{":00"}
					</MUI.TableCell>
				)}
				<MUI.TableCell align="right">{data.address.street}</MUI.TableCell>
				{showMobile ? null : (
					<MUI.TableCell align="right">{data.address.city}</MUI.TableCell>
				)}
			</MUI.TableRow>
			<MUI.TableRow>
				<MUI.TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<MUI.Collapse in={open} timeout="auto" unmountOnExit>
						<MUI.Box sx={{ margin: 1 }}>
							<MUI.Card elevation={0} square sx={{ marginTop: 2 }}>
								<MUI.CardMedia
									component="img"
									height="400"
									image={data.image}
									alt={data.title}
								/>
								<MUI.CardContent>
									<MUI.Typography
										gutterBottom
										variant="h3"
										component="div"
										sx={{
											textTransform: "capitalize",
											fontWeight: "bold",
										}}
									>
										{data.title}
									</MUI.Typography>
									<MUI.Typography variant="h5" color="text.secondary">
										{data.description}
									</MUI.Typography>
								</MUI.CardContent>
							</MUI.Card>
							<MUI.Box my={3}>
								{data.tags.map((tag, i) => (
									<MUI.Chip
										key={'eventRow-tag-of-' + i + tag}
										label={tag}
										margin="normal"
										variant="outlined"
										sx={{ m: 0.5 }}
									/>
								))}
							</MUI.Box>
						</MUI.Box>
					</MUI.Collapse>
				</MUI.TableCell>
			</MUI.TableRow>
		</>
	);
}
