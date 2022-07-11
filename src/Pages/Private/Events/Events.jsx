import { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { AnimationContext } from "../../../contexts/AnimationContext";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar";
import EventModal from "./EventModal.jsx";

//MUI
import * as MUI from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import "./events.scss";
import { Snackbar } from "../../../components/Private/Snackbar";

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

export const Events = ({ data }) => {
	const [cookies] = useCookies();
	const { windowWidth, setSnackbar } = useContext(AnimationContext);
	const [showMobile, setShowMobile] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);


	// find if the user is the author
	const isAuthor = data.find(item => item._id === cookies.id)


	const handleModalOpen = (idx) => {
		setIsModalOpen(true);
	};
	const handleModalClose = () => setIsModalOpen(false);

	//to toggle show/hide mui components between breakpoints
	useEffect(() => {
		setShowMobile(windowWidth <= 500 ? true : false);
	}, [showMobile, windowWidth]);


	//current month in letters
	const date = new Date();
	let currentMonth = date.toLocaleString("default", { month: "long" });

	//filtering events object based on current month
	const eventDate = data.filter((event) => {
		const eventMonth = new Date(event.start).toLocaleString("default", {
			month: "long",
		});
		if (eventMonth === currentMonth) {
			return eventMonth;
		}
	});


	const pinEvent = (event) => {
		console.log('event', event)
		const config = {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		};

		fetch(`http://localhost:7000/event/pin/${event._id}`, config)
			.then((response) => response.json())
			.then((result) => {
				console.log("result: >>", result);
				if (result.errors) {
					setError(result.errors);
				} else {
					setSnackbar({
						message: "Event added to your Profile",
						open: true,
						severity: "error"
					})
				}
			})
			.catch((error) => {
				console.log("error from Pin Event", error);
			});
	};


	return (
		<>
			<DiscoverNavbar />
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
										<MUI.TableCell align="center">Time</MUI.TableCell>
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
										pinEvent={pinEvent}
										isAuthor={isAuthor}
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
							<div key={event._id}>
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
								</MUI.CardActionArea>
								<EventModal
									setIsModalOpen={setIsModalOpen}
									handleModalClose={handleModalClose}
									isModalOpen={isModalOpen}
									event={event}
									key={event._id}
								/>
							</div>
						))}
					</MUI.List>
				</section>
				<Snackbar />
			</section>
		</>
	);
};

function EventRow(props) {
	const { event, showMobile, pinEvent, isAuthor } = props;
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
					{new Date(event.start).getDate()}
					{" - "}
					{new Date(event.start).toLocaleString("default", {
						weekday: "short",
					})}
				</MUI.TableCell>
				{showMobile ? null : (
					<MUI.TableCell align="center">
						{new Date(event.start).getHours() % 12 || 12}
						{":00"} {" - "}
						{new Date(event.end).getHours() % 12 || 12}
						{":00"}
					</MUI.TableCell>
				)}
				<MUI.TableCell align="right">{event.address.street}</MUI.TableCell>
				{showMobile ? null : (
					<MUI.TableCell align="right">{event.address.city}</MUI.TableCell>
				)}
				<MUI.TableCell align="right">
					{isAuthor ? null :
						<MUI.Checkbox
							onClick={() => pinEvent(event)}
						/>
					}
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
