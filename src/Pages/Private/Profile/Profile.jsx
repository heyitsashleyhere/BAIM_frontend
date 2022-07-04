import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// context
import { PostsContext } from "../../../contexts/PostContext.js";
// components
import { SquareAvatar } from "../../../components/Private/Avatars-Links/Avatars.jsx";
import { Follow } from "../../../components/Private/Buttons/Follow/Follow.jsx";
import { ProduceNav } from "../../../components/Private/section-header/ProduceNav.jsx";
// style
import "./profile.scss";

export const Profile = () => {
	const { postCategories } = useContext(PostsContext);
	const { profileName } = useParams();

	const currentUser = JSON.parse(localStorage.getItem("user"));

	const [beauties, setBeauties] = useState([]);
	const [artsCrafts, setArtsCrafts] = useState([]);
	const [gardens, setGardens] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [events, setEvents] = useState([]);

	const [display, setDisplay] = useState(null);

	useEffect(() => {
		const config = {
			method: "GET",
			credentials: "include", // specify this if you need cookies
			headers: { "Content-Type": "application/json" },
		};
		// const promises = postCategories.map(cat => fetch(`http://localhost:7000/${cat}/author/${profileName}/`, config))
		// Promise.all(promises)
		//        .then(responses => Promise.all( responses.map(r => r.json())) )
		//        .then(result =>  {
		//         result.forEach(cat => currentUserLibrary[cat[0].type] = cat)
		//         setTest(result)
		//       }) // result.forEach(catArr =>  setCurrentUserLibrary({...currentUserLibrary, [catArr[0].type]: catArr}))
		//        .catch(err => console.error(`from Promise all`, err))

		//       console.log('currentUserLibrary :>> ', currentUserLibrary);
		//       console.log('typeof test :>> ', typeof test);
		postCategories.map((cat) => {
			fetch(`http://localhost:7000/${cat}/author/${profileName}/`, config)
				.then((response) => response.json())
				.then((result) => {
					if (!result.errors) {
						switch (cat) {
							case "beauty":
								setBeauties(result);
								break;
							case "artsCraft":
								setArtsCrafts(result);
								break;
							case "garden":
								setGardens(result);
								break;
							case "recipe":
								setRecipes(result);
								break;
							case "event":
								setEvents(result);
								break;
						}
					} else {
						console.log(
							"profile PostCategory fetch errors :>> ",
							result.errors
						);
					}
				})
				.catch((error) => console.log(error));
		});
	}, []);

	function showPostCategoryButton(Category) {
		if (Category.length > 0) {
			return (
				<button onClick={(e) => setDisplay(Category[0].type)} data={Category}>
					{Category[0].type === "artsCraft"
						? "arts and crafts"
						: Category[0].type}
				</button>
			);
		}
	}

	function displayAvatars(type) {
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
				return events.map((data, i) => (
					<SquareAvatar key={"profilePage-avatar" + i} data={data} />
				));
		}
	}

	return (
		<>
			<ProduceNav />
			<section className="Profile">
				<section className="Profile-inner">
					<section className="Profile-header">
						<button>...</button>

						<section className="Profile-info">
							<img src={currentUser.avatar}></img>
							<section className="Profile-text">
								<h1>{currentUser.profileName}</h1>
								<p>Gardner</p>
								<p>I'm all about plants, and herbs</p>
								<h2>
									{currentUser.userAddress.city} ,{" "}
									{currentUser.userAddress.country}
								</h2>
							</section>
						</section>

						<section className="Profile-followers">
							<Follow user={currentUser._id} users={currentUser._id} />
							<p>100 followers</p>
							<p>10 following</p>
						</section>
					</section>

					<section className="Profile-Library">
						<section>
							{showPostCategoryButton(beauties)}
							{showPostCategoryButton(artsCrafts)}
							{showPostCategoryButton(gardens)}
							{showPostCategoryButton(recipes)}
							{showPostCategoryButton(events)}
						</section>

						<section>{display && displayAvatars(display)}</section>
					</section>
				</section>
			</section>
		</>
	);
};
