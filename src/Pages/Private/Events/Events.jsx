import { useState, useContext, useEffect } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { AnimationContext } from "../../../contexts/AnimationContext";
import { ProduceNav } from "../../../components/Private/section-header/ProduceNav.jsx";

import * as MUI from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const cta = "../../../assets/images/Seasonal.jpg";

import "./events.scss";
export const Events = () => {
	const { allEventPost, eventData, setEventData } = useContext(PostsContext);
	const { windowWidth } = useContext(AnimationContext);
	const [showMobile, setShowMobile] = useState(false);

	const getEventData = (event) => {
		setEventData((prevState) => [...prevState, event]);
	};

	useEffect(() => {
		setShowMobile(windowWidth <= 500 ? true : false);
	}, [showMobile, windowWidth]);

	const date = new Date();
	let currentMonth = date.toLocaleString("default", { month: "long" });
	let day = date.toLocaleString("default", { weekday: "short" });

	const eventDate = allEventPost.filter((event) => {
		const eventMonth = new Date(event.start).toLocaleString("default", {
			month: "long",
		});
		if (eventMonth === currentMonth) {
			return eventMonth;
		}
	});
	console.log(eventDate);

	return (
		<>
			<ProduceNav />
			<section className="events">
				<div className="events-cta">
					<h1>upcoming events</h1>
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
								<MUI.TableRow
									sx={{ "& > *": { fontWeight: "bold", fontSize: "16px" } }}
								>
									<MUI.TableCell />
									<MUI.TableCell>Date</MUI.TableCell>
									{showMobile ? null : (
										<MUI.TableCell align="right">Time</MUI.TableCell>
									)}
									<MUI.TableCell align="right">Location</MUI.TableCell>
									<MUI.TableCell align="right">City</MUI.TableCell>
									{showMobile ? null : (
										<MUI.TableCell align="right">Attending</MUI.TableCell>
									)}
								</MUI.TableRow>
							</MUI.TableHead>
							<MUI.TableBody>
								{eventDate.map((event) => (
									<EventRow
										key={event._id}
										event={event}
										showMobile={showMobile}
										setEventData={setEventData}
										getEventData={getEventData}
									/>
								))}
							</MUI.TableBody>
						</MUI.Table>
					</MUI.TableContainer>
				</section>
			</section>
		</>
	);
};

function EventRow(props) {
	const { event, showMobile, getEventData } = props;
	const [open, setOpen] = useState(false);

	return (
		<>
			<MUI.TableRow
				sx={{ "& > *": { borderBottom: "unset", fontSize: "15px" } }}
			>
				<MUI.TableCell padding="checkbox">
					<MUI.IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</MUI.IconButton>
				</MUI.TableCell>
				<MUI.TableCell component="th" scope="row">
					{new Date(event.start).getDate()}{" "}
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
				<MUI.TableCell align="right">{event.address.city}</MUI.TableCell>
				{showMobile ? null : (
					<MUI.TableCell align="right">
						<MUI.Checkbox
							sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
							onClick={() => getEventData(event)}
						/>
					</MUI.TableCell>
				)}
			</MUI.TableRow>
			<MUI.TableRow>
				<MUI.TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<MUI.Collapse in={open} timeout="auto" unmountOnExit>
						<MUI.Box sx={{ margin: 1 }}>
							{/* <MUI.Typography variant="h5" gutterBottom component="div">
								{event.title}
							</MUI.Typography> */}
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
