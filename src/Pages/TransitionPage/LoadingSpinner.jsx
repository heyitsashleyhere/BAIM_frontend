import React from 'react'
import './loadingSpinner.scss'
import Logo from "../../assets/logo/raspberry-black.png"

export default function LoadingSpinner() {
  return (
	<div className="LoadingSpinner-wrapper">
		<p>Loading</p>
		<img src={Logo} alt="Loka loading" />
	</div>
  )
}

