import React from 'react'
import './loadingSpinner.scss'
import Logo from "../../assets/logo/raspberry-black.png"

export default function LoadingSpinner() {
	return (
		<div className="LoadingSpinner-wrapper">
			<img src={Logo} alt="Loka loading" />
			<p>Loading</p>
		</div>
	)
}

