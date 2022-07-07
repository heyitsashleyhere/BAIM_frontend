import * as React from "react";
import * as MUI from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

export default function EventModal(props) {
	const { isModalOpen, event, handleModalClose } = props;

	return (
		<div>
			{/* <MUI.Button onClick={handleOpen}>Open modal</MUI.Button> */}
			<MUI.Modal
				open={isModalOpen}
				onClose={handleModalClose}
				closeAfterTransition
				BackdropComponent={MUI.Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<MUI.Box sx={style}>
					<MUI.Typography
						id="keep-mounted-modal-title"
						variant="h6"
						component="h2"
					>
						Text in a modal
					</MUI.Typography>
					<MUI.Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</MUI.Typography>
				</MUI.Box>
			</MUI.Modal>
		</div>
	);
}
