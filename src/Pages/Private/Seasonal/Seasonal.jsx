import React from "react";
import { useContext } from "react";
import { SeasonalAvatar } from "../../../components/Private/Avatars-Links/Avatars";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar";
import { PostsContext } from "../../../contexts/PostContext";

import "./seasonal.scss";

export const Seasonal = () => {
	const { seasonal } = useContext(PostsContext);

	const date = new Date();
	let currentMonth = date
		.toLocaleString("default", { month: "long" })
		.split(" ")[0]
		.toLowerCase();

	let shortMonth = date
		.toLocaleString("default", { month: "short" })
		.split(" ")[0]
		.toLowerCase();

	const library = seasonal.sort((a, b) => {
		let textA = a.name;
		let textB = b.name;
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});

	const inSeason = seasonal.filter((produce) => {
		// produce.in_season.includes(currentMonth)
		return produce.in_season.filter((month) => month === currentMonth).length;
		// return produce.in_season.some(month => month === currentMonth)
	});


	const planting = library.filter(
		(produce) =>
			produce.planting_time.filter((month) => month === currentMonth).length
	);


	const seedingIndoor = library.filter(
		(produce) =>
			produce.seeding_indoor.filter((month) => month === currentMonth).length
	);


	const seedingOutdoor = library.filter(
		(produce) =>
			produce.seeding_outdoor.filter((month) => month === currentMonth).length
	);

	return (
		<>
			<DiscoverNavbar />
			<section className="Seasonal">
				<section className="Seasonal-inner">
					<section className="Seasonal-Hero">
						<img></img>
					</section>

					<section className="Seasonal-wrapper">
						<h1>
							{currentMonth[0].toUpperCase() + currentMonth.substring(1)} In
							season
						</h1>
						<section className="Seasonal-wrapper-collection">
							{inSeason.map((item) => (
								<SeasonalAvatar
									name={item.name}
									id={item._id}
									image={item.image}
									key={item._id}
								/>
							))}
						</section>
					</section>

					<section className="Seasonal-wrapper">
						<h1>Seeding Indoor</h1>
						<section className="Seasonal-wrapper-collection">
							{seedingIndoor.map((item) => (
								<SeasonalAvatar
									name={item.name}
									id={item._id}
									image={item.image}
									key={item._id}
								/>
							))}
						</section>
					</section>

					<section className="Seasonal-wrapper">
						<h1>Seeding Outdoor</h1>
						<section className="Seasonal-wrapper-collection">
							{seedingOutdoor.map((item) => (
								<SeasonalAvatar
									name={item.name}
									id={item._id}
									image={item.image}
									key={item._id}
								/>
							))}
						</section>
					</section>

					<section className="Seasonal-wrapper">
						<h1>Planting season</h1>
						<section className="Seasonal-wrapper-collection">
							{planting.map((item) => (
								<SeasonalAvatar
									name={item.name}
									id={item._id}
									image={item.image}
									key={item._id}
								/>
							))}
						</section>
					</section>

					<section className="Seasonal-wrapper">
						<h1>library</h1>
						<section className="Seasonal-wrapper-collection">
							{library.map((item) => (
								<SeasonalAvatar
									name={item.name}
									id={item._id}
									image={item.image}
									key={item._id}
								/>
							))}
						</section>
					</section>
				</section>
			</section>
		</>
	);
};
