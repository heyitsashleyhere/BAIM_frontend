import { useState } from "react";
import * as MUI from "@mui/material";
import { height } from "@mui/system";
import LocationOn from '@mui/icons-material/LocationOn';

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
	const [anchorEl, setAnchorEl] = useState(null);

	const openMap = (e) => {
		setAnchorEl(anchorEl ? null : e.currentTarget);
	}
	const isOpen = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

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
					<MUI.Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
						<MUI.List
							sx={{
								width: '100%',
								maxWidth: 200,
							}}
						>
							<MUI.ListItem>
								<MUI.ListItemAvatar>
									<MUI.Avatar alt="Remy Sharp" src={event.authorAvatar} sx={{ border: '1px solid black' }} />
								</MUI.ListItemAvatar>
								<MUI.ListItemText secondary="Host" primary={event.authorProfileName} />
							</MUI.ListItem>
						</MUI.List>

						<MUI.Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '5px' }}>
							<p style={{ fontSize: '1.4rem' }}> Date: {new Date(event.start).toLocaleDateString()}
							</p>
							<MUI.Chip
								clickable
								size={'small'}
								onClick={openMap}
								icon={<LocationOn />}
								label={Object.keys(event.address).map((key, idx) => (
									<>
										{event.address[key] + ', '}
									</>
								))}
								variant="outlined"
								sx={{
									py: 2,
									"& .MuiChip-label": {
										fontSize: '14px',
									},
								}}
							/>
						</MUI.Box>
					</MUI.Box>
					{/* <MUI.Typography
						sx={{ display: "inline", textTransform: "capitalize", ml: 8 }}
						component="span"
						variant="h6"
						color="text.secondary"
					>
						Location: {event.address.street}
					</MUI.Typography> */}
					<MUI.Card elevation={0}>
						<MUI.CardMedia
							component="img"
							height="400"
							image={event.image}
							alt={event.title}
							sx={{ mt: 1, borderRadius: '5px' }}
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

							<MUI.Typography variant="h6" component="span" >
								{event.description}
							</MUI.Typography>
						</MUI.CardContent>
					</MUI.Card>
					<MUI.Divider />

					<MUI.Box pt={2}>
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
