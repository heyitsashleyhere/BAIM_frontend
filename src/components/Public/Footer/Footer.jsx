import React from 'react'
import logo from '../../../assets/logo/raspberry.png'

import './footer.scss'

const Footer = () => {
  return (
    <section className="footer">
        <p>lokalisieren</p>
        <img className="logo" src={logo}></img>
    </section>
  )
}

export default Footer