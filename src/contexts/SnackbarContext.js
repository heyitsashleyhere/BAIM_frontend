import React, { useState, useContext } from 'react'
import * as MUI from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

export const SnackbarContext = React.createContext({})

function SnackbarContextProvider({ children }) {
	const [snackbar, setSnackbar] = useState({
		message: '',
		open: false,
		severity: null,
	})

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar({ open: false });

	};
	const action = (
		<MUI.IconButton
			size="large"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		>
			<CloseIcon fontSize="large" />
		</MUI.IconButton>
	);


	return (
		<SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
			<MUI.Snackbar
				open={snackbar.open}
				onClose={handleClose}
				autoHideDuration={3000}
				sx={{
					width: '100%',
					"& .MuiSnackbarContent-root": {
						fontSize: '14px',
					}
				}}
				action={action}
				message={snackbar.message}
				severity='success'
			/>
			{/* <MUI.Alert severity={snackbar.severity} >
					<div>{snackbar.message}</div>
				</MUI.Alert>
			</MUI.Snackbar> */}
			{children}
		</SnackbarContext.Provider>
	)
}

export default SnackbarContextProvider
