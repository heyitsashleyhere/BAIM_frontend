import { Link } from "react-router-dom";
import logo from "../../../assets/logo/raspberry-black.png";

import "./footer.scss";

const Footer = () => {
	return (
		<section className="footer">
			<section className="footer-logo">
				<img className="logo" src={logo}></img>
				<p>lokalisieren</p>
			</section>
			<section className="footer-links">
				<ul>
					<li>
						<Link to="/about">
							<p className="LokaB">About</p>
						</Link>
					</li>
					<li>
						<Link to="/team">
							<p className="LokaB">Team</p>
						</Link>
					</li>
					<li>
						<Link to="/media">
							<p className="LokaB">Media</p>
						</Link>
					</li>
				</ul>
			</section>
		</section>
	);
};

export default Footer;
