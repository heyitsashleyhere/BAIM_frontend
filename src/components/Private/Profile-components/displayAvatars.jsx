import { SquareAvatar } from "../Avatars-Links/Avatars.jsx";
// import { EventsTable } from "../Avatars-Links/Tables.jsx";
import { EventsTable } from '../../../Pages/Private/Events/EventsTable'


export default function displayAvatars(
	type,
	beauties,
	artsCrafts,
	gardens,
	recipes,
	events
) {

	switch (type) {
		case "beauty":
			return beauties.map((data, i) => (
				<SquareAvatar key={"profilePage-avatar" + i} data={data} />
			));
		case "artsCraft":
			return artsCrafts.map((data, i) => (
				<SquareAvatar key={"profilePage-avatar" + i} data={data} />
			));
		case "garden":
			return gardens.map((data, i) => (
				<SquareAvatar key={"profilePage-avatar" + i} data={data} />
			));
		case "recipe":
			return recipes.map((data, i) => (
				<SquareAvatar key={"profilePage-avatar" + i} data={data} />
			));
		case "event":
			return <EventsTable data={events} />;
	}
}
