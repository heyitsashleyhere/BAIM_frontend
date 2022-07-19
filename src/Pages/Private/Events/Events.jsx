import { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { AnimationContext } from "../../../contexts/AnimationContext";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar";
import EventModal from "./EventModal.jsx";
import { EventsTable } from "./EventsTable.jsx";


//MUI
import * as MUI from "@mui/material";
import "./events.scss";
import { Snackbar } from "../../../components/Private/Snackbar.jsx";



export const Events = ({ data }) => {
	const [cookies] = useCookies();
	const { windowWidth } = useContext(AnimationContext);
	const [showMobile, setShowMobile] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selected, setSelected] = useState({});



	const handleModalOpen = (event) => {
		setSelected(event);
		setIsModalOpen(true);
	};
	const handleModalClose = () => setIsModalOpen(false);


	//to toggle show/hide mui components between breakpoints
	useEffect(() => {
		setShowMobile(windowWidth <= 500 ? true : false);
	}, [showMobile, windowWidth]);

	// let nthNumber = (d) => {
	// 	if (d > 3 && d < 21) return `${d}th`;
	// 	switch (d % 10) {
	// 		case 1: return `${d}st'`;
	// 		case 2: return `${d}nd'`;
	// 		case 3: return `${d}rd`;
	// 		default: return `${d}th`
	// 	}
	// }

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

	const augustEvents = data.filter((event) => {
		const upcomingMonth = new Date(event.start).toLocaleString("default", { month: "long" })
		if (upcomingMonth === 'August') {
			return upcomingMonth
		}
	})

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
					<EventsTable data={eventDate} />
				</section>

				<section className="events-month">
					<div className="events-month-container">
						<h2>Aug</h2>
					</div>
				</section>
				<section className="events-calendar">
					<MUI.List component={MUI.Paper}>
						{augustEvents.map((event, idx) => (
							<div key={event._id}>
								<MUI.CardActionArea
									key={idx}
									onClick={() => handleModalOpen(event)}
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
													sx={{ display: "inline", fontWeight: 800 }}
													component="span"
													variant="h6"
												>
													{event.title}
												</MUI.Typography>
											}
											secondary={
												<>
													{/* <MUI.Typography
														sx={{ display: "inline" }}
														component="span"
														variant="h6"
														color="text.secondary"
													>
														{nthNumber(new Date(event.start).getDate())}
													</MUI.Typography> */}
													<MUI.Typography
														sx={{ display: "inline", fontSize: '1.6rem' }}
														component="span"
														color="text.secondary"
													>
														{/* {" — "} */}
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
									isModalOpen={selected._id === event._id && isModalOpen}
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
