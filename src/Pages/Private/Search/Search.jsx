import { useContext } from "react";
import { PostsContext } from "../../../contexts/PostContext.js";
import { RoundAvatar, SeasonalAvatar, SquareAvatar } from "../../../components/Private/Avatars-Links/Avatars.jsx";
import SearchBar from "../../../components/Private/SearchBar/SearchBar.jsx";
import { ProduceNavbar } from "../../../components/Private/section-header/ProduceNavbar.jsx";
import { DiscoverNavbar } from "../../../components/Private/section-header/DiscoverNavbar.jsx";
import "./search.scss";
import { Button } from "@mui/material";

export default function Search() {
	const { searchResult, searchInput, searchCat, searchOpt, 
			setSearchResult, setSearchInput, setSearchCat, setSearchOpt } =
		useContext(PostsContext);

	const isEmpty = searchResult.length > 0;

	function handleClear(){
		setSearchCat('')
		setSearchOpt('')
		setSearchInput('')
		setSearchResult([])
	}

	return (
		<>
			<ProduceNavbar />
			<DiscoverNavbar />
			<div className="Search">
				<div className="search-filter">
					<SearchBar></SearchBar>
				</div>
				<div className="search-wrapper">
					<section className="search-info">
						<h2>
							Search {searchCat} on {searchOpt}: {searchInput}
						</h2>

						<Button onClick={handleClear}
								sx={{ marginTop: 1}} 
								variant="outlined">Clear Search</Button>
						
						{isEmpty ? (
							<p>
								{searchCat} items : {searchResult.length}
							</p>
						) : (
							<p>{searchCat} Item not found</p>
						)}
					</section>
					{isEmpty && searchCat !== 'user' && searchCat !== 'in season' && (
						<div className="search-collection">
							{searchResult.map((post) => (
								<SquareAvatar data={post} key={post._id} />
							))}
						</div>
					)}
					{isEmpty && searchCat === 'user' && (
						<div className="search-collection">
							{searchResult.map((post) => (
								<RoundAvatar name={post.profileName}
											 id={post._id}
											 image={post.avatar} 
											 followers={post.followers}
											 following={post.following}
											 key={`searchUser-` + post._id}/>
							))}
						</div>
					)}
					{isEmpty && searchCat === 'in season' && (
						<div className="search-collection">
							{searchResult.map((post) => (
								<SeasonalAvatar
									name={post.name}
									id={post._id}
									image={post.image}
									key={`searchProduce-` + post._id} />
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
