import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Modal, Button, Snackbar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const Follow = ({ name, followers, following }) => {
	const { profileName } = useParams();
	const [cookies] = useCookies();
	const [error, setError] = useState(null);
	const isAuthor = JSON.parse(localStorage.getItem("profileName")) === profileName;
	const [profileData, setProfileData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [followers, setFollowers] = useState(followers)
	const [following, setFollowing] = useState(following)

	useEffect(() => {
		if (profileName) {
			fetch(`https://loka-database.herokuapp.com/user/${profileName}`)
				.then((response) => response.json())
				.then((result) => {
					if (result.errors) {
						console.log("errors from Profile GET user :>> ", result.errors);
					} else {
						setProfileData(result);
						setFollowers(result.followers)
						setFollowing(result.following)
					}
				})
				.catch((error) =>
					console.log(`error from profileName request in Profile`, error)
				);
		} else {
			fetch(`https://loka-database.herokuapp.com/user/${name}`)
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
			credentials: "include",
			withCredentials: true, // specify this if you need cookies
			headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true, },
		};

		fetch(`https://loka-database.herokuapp.com/user/following/${profileData._id}`, config)
			.then((response) => response.json())
			.then((result) => {
				if (result.errors) {
					setError(result.errors);
				} else {
					setIsModalOpen(true);
				}
			})
			.catch((error) => console.log(`error from Follow request`, error));
	}

	function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}
		setIsModalOpen(false);
	}

	return (
		<>
			{profileData && !isAuthor && (
				<Button
					style={{ fontSize: "1rem", padding: '0.5em 1em' }}
					variant={
						followers.find((objId) => objId == JSON.parse(localStorage.getItem("id")))
							? "outlined"
							: "contained"
					}
					onClick={FollowUser}
				>
					{followers.find((objId) => objId == JSON.parse(localStorage.getItem("id")))
						? "Unfollow"
						: "Follow"}
				</Button>
			)}
			<p>{error}</p>
			{profileData && (
				<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<Snackbar open={isModalOpen} autoHideDuration={6000}
						onClose={handleClose}
						message={`You are now ${followers.find((objId) => objId == JSON.parse(localStorage.getItem("id"))) ? `following` : `unfollowing`} ${profileData.profileName}`}
						action={
							<React.Fragment>
								<IconButton
									aria-label="close"
									color="inherit"
									sx={{ p: 0.5 }}
									onClick={handleClose}
								>
									<CloseIcon />
								</IconButton>
							</React.Fragment>
						} />
				</Modal>
			)}
		</>
	);
};
