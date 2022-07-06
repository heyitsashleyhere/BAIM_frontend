import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { AnimationContext } from "../../../contexts/AnimationContext";
import { ProduceNav } from "../../../components/Private/section-header/ProduceNav.jsx";
import EventModal from "./EventModal.jsx";

//MUI
import * as MUI from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import "./events.scss";
const cta = "../../../assets/images/Seasonal.jpg";

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

export const Events = () => {
	const { allEventPost, setEventData, eventData } = useContext(PostsContext);
	const { windowWidth } = useContext(AnimationContext);
	const [showMobile, setShowMobile] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	// const handleClick = () => {
	// 	setOpen(true);
	// };

	const handleModalOpen = (idx) => {
		console.log("idx :>> ", idx);
		setIsModalOpen(true);
	};
	const handleModalClose = () => setIsModalOpen(false);

	useEffect(() => {
		setShowMobile(windowWidth <= 500 ? true : false);
	}, [showMobile, windowWidth]);

	const handleCheckBoxClick = (event) => {
		setEventData((prevState) => [...prevState, event]);
		setSnackbarOpen(true);
	};

	//alert mini popup
	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbarOpen(false);
	};

	//current month in letters
	const date = new Date();
	let currentMonth = date.toLocaleString("default", { month: "long" });
	// let day = date.toLocaleString("default", { weekday: "short" });

	//filtering events object based on current month
	const eventDate = allEventPost.filter((event) => {
		const eventMonth = new Date(event.start).toLocaleString("default", {
			month: "long",
		});
		if (eventMonth === currentMonth) {
			return eventMonth;
		}
	});

	return (
		<>
			<ProduceNav />
			<section className="events">
				<div className="events-cta">
					<div className="events-cta-title">
						<h1>Events</h1>
					</div>
				</div>
				<section className="events-month">
					<div className="events-month-container">
						<h2>{currentMonth}</h2>
					</div>
				</section>
				<section className="events-calendar">
					<MUI.TableContainer component={MUI.Paper}>
						<MUI.Table aria-label="collapsible table">
							<MUI.TableHead>
								<MUI.TableRow sx={styles}>
									<MUI.TableCell />
									<MUI.TableCell>Date</MUI.TableCell>
									{showMobile ? null : (
										<MUI.TableCell align="right">Time</MUI.TableCell>
									)}
									<MUI.TableCell align="right">Location</MUI.TableCell>
									{showMobile ? null : (
										<MUI.TableCell align="right">City</MUI.TableCell>
									)}
									<MUI.TableCell align="right">Attending</MUI.TableCell>
								</MUI.TableRow>
							</MUI.TableHead>
							<MUI.TableBody>
								{eventDate.map((event) => (
									<EventRow
										key={event._id}
										event={event}
										showMobile={showMobile}
										setEventData={setEventData}
										handleCheckBoxClick={handleCheckBoxClick}
									/>
								))}
							</MUI.TableBody>
						</MUI.Table>
					</MUI.TableContainer>
				</section>

				<section className="events-month">
					<div className="events-month-container">
						<h2>Aug</h2>
					</div>
				</section>
				<section className="events-calendar">
					<MUI.List component={MUI.Paper}>
						{eventDate.map((event, idx) => (
							<MUI.CardActionArea
								key={idx}
								onClick={() => handleModalOpen(idx)}
							>
								<MUI.ListItem alignItems="flex-start">
									<MUI.ListItemAvatar sx={{ mb: 1 }}>
										<MUI.Avatar
											sx={
												showMobile
													? { width: 42, height: 42 }
													: { width: 56, height: 56 }
											}
											alt="Remy Sharp"
											src={event.image}
										/>
									</MUI.ListItemAvatar>
									<MUI.ListItemText
										sx={showMobile ? { pl: 1, pt: 0.5 } : { pl: 3, pt: 1 }}
										primary={
											<MUI.Typography
												sx={{ display: "inline" }}
												component="span"
												variant={showMobile ? "h5" : "h4"}
											>
												{event.title}
											</MUI.Typography>
										}
										secondary={
											<>
												<MUI.Typography
													sx={{ display: "inline" }}
													component="span"
													variant="h6"
													color="text.secondary"
												>
													{new Date(event.start).getDate()}
												</MUI.Typography>
												<MUI.Typography
													sx={{ display: "inline" }}
													component="span"
													variant="h6"
													color="text.secondary"
												>
													{" — "}
													{event.address.street}
													{", "}
													{event.address.city}
												</MUI.Typography>
											</>
										}
									/>
								</MUI.ListItem>
								<MUI.Divider component="li" />
								<EventModal
									setIsModalOpen={setIsModalOpen}
									handleModalClose={handleModalClose}
									isModalOpen={isModalOpen}
									event={event}
									key={event._id}
								/>
							</MUI.CardActionArea>
						))}
					</MUI.List>
				</section>
				<MUI.Snackbar
					open={snackbarOpen}
					autoHideDuration={3000}
					onClose={handleSnackbarClose}
				>
					<MUI.Alert
						onClose={handleSnackbarClose}
						severity="success"
						sx={{ width: "100%" }}
					>
						event was added to your calendar!
					</MUI.Alert>
				</MUI.Snackbar>
			</section>
		</>
	);
};

function EventRow(props) {
	const { event, showMobile, handleCheckBoxClick } = props;
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
						{open ? (
							<KeyboardArrowUpIcon sx={{ fontSize: 22 }} />
						) : (
							<KeyboardArrowDownIcon sx={{ fontSize: 22 }} />
						)}
					</MUI.IconButton>
				</MUI.TableCell>
				<MUI.TableCell component="th" scope="row">
					{new Date(event.start).getDate()}
					{" - "}
					{new Date(event.start).toLocaleString("default", {
						weekday: "short",
					})}
				</MUI.TableCell>
				{showMobile ? null : (
					<MUI.TableCell align="right">
						{new Date(event.start).getHours()}
					</MUI.TableCell>
				)}
				<MUI.TableCell align="right">{event.address.street}</MUI.TableCell>
				{showMobile ? null : (
					<MUI.TableCell align="right">{event.address.city}</MUI.TableCell>
				)}
				<MUI.TableCell align="right">
					<MUI.Checkbox
						sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
						onClick={() => handleCheckBoxClick(event)}
					/>
				</MUI.TableCell>
			</MUI.TableRow>
			<MUI.TableRow>
				<MUI.TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<MUI.Collapse in={open} timeout="auto" unmountOnExit>
						<MUI.Box sx={{ margin: 1 }}>
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
										}}
									>
										{event.title}
									</MUI.Typography>
									<MUI.Typography variant="h5" color="text.secondary">
										{event.description}
									</MUI.Typography>
								</MUI.CardContent>
							</MUI.Card>
							<MUI.Box my={3}>
								{event.tags.map((tag) => (
									<MUI.Chip
										key={tag}
										label={tag}
										margin="normal"
										variant="outlined"
										sx={{ m: 0.5, fontSize: "12px" }}
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
