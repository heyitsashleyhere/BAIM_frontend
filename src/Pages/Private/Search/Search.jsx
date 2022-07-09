import { useContext } from "react";
import { SquareAvatar } from "../../../components/Private/Avatars-Links/Avatars.jsx";
import SearchBar from "../../../components/Private/SearchBar/SearchBar.jsx";
import { PostsContext } from "../../../contexts/PostContext.js";

import "./search.scss";
import { ProduceNavbar } from "../../../components/Private/section-header/ProduceNavbar.jsx";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar";

export default function Search() {
	const { searchResult, searchInput, searchCat, searchOpt } =
		useContext(PostsContext);

	const isEmpty = searchResult.length > 0;

	return (
		<>
			<ProduceNavbar />
			<DiscoverNavbar />
			<section className="Search">
				<section className="search-filter">
					<SearchBar></SearchBar>
				</section>
				<section className="search-wrapper">
					<section className="search-info">
						<h2>
							Search {searchCat} on {searchOpt}: {searchInput}
						</h2>
						{isEmpty ? (
							<p>
								{searchCat} items : {searchResult.length}
							</p>
						) : (
							<p>{searchCat} Item not found</p>
						)}
					</section>
					{isEmpty ? (
						<section className="search-collection">
							{searchResult.map((post) => (
								<SquareAvatar data={post} key={post._id} />
							))}
						</section>
					) : null}
				</section>
			</section>
		</>
	);
}
