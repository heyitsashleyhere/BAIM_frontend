import * as React from "react";
import * as MUI from "@mui/material";
import { height } from "@mui/system";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: '10px',
	overflowY: "scroll",
	height: "80%"
};

export default function EventModal(props) {
	const { isModalOpen, event, handleModalClose } = props;


	return (
		<MUI.Modal
			open={isModalOpen}
			onClose={handleModalClose}
			closeAfterTransition
			BackdropComponent={MUI.Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<MUI.Fade in={isModalOpen} >
				<MUI.Box sx={style} >
					<MUI.Card elevation={0} square>
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
						<MUI.Typography
							sx={{ display: "inline" }}
							component="span"
							variant="h5"
							color="text.secondary"
						>
							Date: {new Date(event.start).toLocaleDateString()}
						</MUI.Typography>
						<MUI.Typography
							sx={{ display: "inline", textTransform: "capitalize", ml: 8 }}
							component="span"
							variant="h5"
							color="text.secondary"
						>
							Location: {event.address.street}
						</MUI.Typography>
						<MUI.CardMedia
							component="img"
							height="400"
							image={event.image}
							alt={event.title}
							sx={{ mt: 1, borderRadius: '5px' }}
						/>
						<MUI.CardContent>

							<MUI.Typography variant="h5" component="span" color="text.secondary">
								{event.description}
							</MUI.Typography>
						</MUI.CardContent>
					</MUI.Card>
					<MUI.Box>
						{event.tags.map((tag) => (
							<MUI.Chip
								key={tag}
								label={tag}
								variant="outlined"
								sx={{ m: 0.5 }}
							/>
						))}
					</MUI.Box>
				</MUI.Box>
			</MUI.Fade>
		</MUI.Modal>
	);
}
