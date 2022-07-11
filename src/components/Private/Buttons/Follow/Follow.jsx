import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { PostsContext } from "../../../../contexts/PostContext.js";
import { Modal, Button } from "@mui/material";

export const Follow = ({ name }) => {
	const { upgrade, setUpgrade } = useContext(PostsContext);
	const { profileName } = useParams();
	const [cookies] = useCookies();
	const [error, setError] = useState(null);

	const isAuthor = cookies.profileName === profileName;

	const [profileData, setProfileData] = useState(null);
	// pop up if follow/unfollow
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (profileName) {
			fetch(`http://localhost:7000/user/${profileName}`)
				.then((response) => response.json())
				.then((result) => {
					if (result.errors) {
						console.log("errors from Profile GET user :>> ", result.errors);
					} else {
						setProfileData(result);
					}
				})
				.catch((error) =>
					console.log(`error from profileName request in Profile`, error)
				);
		} else {
			fetch(`http://localhost:7000/user/${name}`)
				.then((response) => response.json())
				.then((result) => {
					if (result.errors) {
						console.log("errors from Profile GET user :>> ", result.errors);
					} else {
						setProfileData(result);
					}
				})
				.catch((error) =>
					console.log(`error from profileName request in Profile`, error)
				);
		}
	}, [isModalOpen]);

	function FollowUser() {
		const config = {
			method: "PATCH",
			credentials: "include", // specify this if you need cookies
			headers: { "Content-Type": "application/json" },
		};

		fetch(`http://localhost:7000/user/following/${profileData._id}`, config)
			.then((response) => response.json())
			.then((result) => {
				if (result.errors) {
					setError(result.errors);
				} else {
					setIsModalOpen(true);
					setUpgrade(!upgrade);
				}
			})
			.catch((error) => console.log(`error from Follow request`, error));
	}

	return (
		<>
			{profileData && !isAuthor && (
				<Button
					style={{ fontSize: "1rem", padding: '0.5em 1em' }}
					variant={
						profileData.followers.find((objId) => objId == cookies.id)
							? "outlined"
							: "contained"
					}
					onClick={FollowUser}
				>
					{profileData.followers.find((objId) => objId == cookies.id)
						? "Unfollow"
						: "Follow"}
				</Button>
			)}
			<p>{error}</p>
			{profileData && (
				<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<p>{`You are now ${
						profileData.followers.find((objId) => objId == cookies.id)
							? `following`
							: `unfollowing`
					} ${profileData.profileName}`}</p>
				</Modal>
			)}
		</>
	);
};
