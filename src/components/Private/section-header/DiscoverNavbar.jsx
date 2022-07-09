import { useContext } from "react";
import { Link } from "react-router-dom";
import { AnimationContext } from "../../../contexts/AnimationContext.js";

import "./discoverNavbar.scss";

export const DiscoverNavbar = () => {
	const { discover } = useContext(AnimationContext)

	return (
		<section className="discover-nav">
			<section className="discover-nav-categories">
				<ul>
					{discover.map((category, index) => (
						<li key={category.id} className="category">
							<Link to={category.path}>
								<p className="LokaB">{category.name}</p>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</section>
	);
};
