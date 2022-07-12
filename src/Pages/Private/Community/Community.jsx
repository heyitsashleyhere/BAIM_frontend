import React, { useContext } from "react";
import { RoundAvatar } from "../../../components/Private/Avatars-Links/Avatars.jsx";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar.jsx";
import { PostsContext } from "../../../contexts/PostContext.js";
import LoadingSpinner from "../../TransitionPage/LoadingSpinner.jsx";

import "./community.scss";

export const Community = () => {
	const { users } = useContext(PostsContext);

	if (!users.length) {
		return <LoadingSpinner />
	}

	return (
		<>
			<DiscoverNavbar />
			<section className="Pages">
				<section className="Hero">
					<section className="hero-image community"></section>
					<section className="Hero-text">
						<h1>Community</h1>
						<p>Connect</p>
					</section>
				</section>

				<section className="Library-wrapper">
					<section className="lib-wrapper-header">
						<h2>users </h2>
						<p>{users.length} users</p>
					</section>
					<section className="Library-container">
						{users.map((item) => (
							<RoundAvatar
								id={item._id}
								image={item.avatar}
								name={item.profileName}
								key={"community-users-roundAvatar" + item._id}
							/>
						))}
					</section>
				</section>

				<section></section>
			</section>
		</>
	);
};
