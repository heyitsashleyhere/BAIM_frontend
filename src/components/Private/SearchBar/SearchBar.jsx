import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../../../contexts/PostContext.js";
import { Select, MenuItem, TextField, InputAdornment, IconButton, Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ display }) {
	// filter
	const {
		searchResult,
		setSearchResult,
		searchCat,
		setSearchCat,
		searchOpt,
		setSearchOpt,
		searchInput,
		setSearchInput,
	} = useContext(PostsContext);
	const filterCat = [
		"user",
		"beauty",
		"artsCraft",
		"garden",
		"recipe",
		"event",
		"in season"
	];
	const filterOpt = [
		"authorProfileName",
		"title",
		"description",
		"category",
		"tags",
	];
	const produceOpt = [
		'type',
		'name'
	]
	const produceType = [
		"Fruits",
		"Herbs",
		"Vegetables"
	]
	let navigate = useNavigate();

	function handleSearch() {
		if (searchCat === "user") {
			fetch(`https://loka-database.herokuapp.com/user/search/${searchInput}`)
				.then((response) => response.json())
				.then((result) => {
					if (!result.errors) {
						setSearchResult(result);
					} else {
						console.log("errors :>> ", result.errors);
					}
				})
				.catch((error) => console.log(error.message));
		} else if (searchCat === "in season") {
			if (searchOpt === "type") {
				fetch(`https://lokalseasons.herokuapp.com/produce/${searchInput}`)
				.then((response) => response.json())
				.then((result) => {
					if (!result.errors) {
						setSearchResult(result);
						navigate("/Search");
					} else {
						console.log("errors :>> ", errors);
					}
				})
				.catch((error) => console.log(error.message));
			} else {
				fetch(`https://lokalseasons.herokuapp.com/produce/search/${searchInput}`)
				.then((response) => response.json())
				.then((result) => {
					if (!result.errors) {
						setSearchResult(result);
						navigate("/Search");
					} else {
						console.log("errors :>> ", errors);
					}
				})
				.catch((error) => console.log(error.message));
			}
		} else {
			fetch(`https://loka-database.herokuapp.com/${searchCat}/${searchOpt}/${searchInput}`)
				.then((response) => response.json())
				.then((result) => {
					if (!result.errors) {
						setSearchResult(result);
						navigate("/Search");
					} else {
						console.log("errors :>> ", errors);
					}
				})
				.catch((error) => console.log(error.message));
		}
	}

	return (
		<Stack direction="row" className="SearchBar">
			<Select
				variant="standard"
				displayEmpty
				fullWidth
				value={searchCat}
				className="select-input"
				onChange={(e) => setSearchCat(e.target.value)}
			>
				<MenuItem disabled value="">
					<em>category</em>
				</MenuItem>
				{filterCat.map((cat) => (
					<MenuItem value={cat} key={`searchCat-` + cat}>
						{cat === "user" ? "profile name" : cat}
					</MenuItem>
				))}
			</Select>
			{searchCat !== "user" && searchCat !== "in season" && (
				<Select
					variant="standard"
					displayEmpty
					value={searchOpt}
					className="select-input"
					fullWidth
					onChange={(e) => setSearchOpt(e.target.value)}
				>
					<MenuItem disabled value="">
						<em>filter</em>
					</MenuItem>
					{filterOpt.map((cat) => (
						<MenuItem value={cat} key={`searchOpt-` + cat}>
							{cat === "authorProfileName" ? "profile name" : cat}
						</MenuItem>
					))}
				</Select>
			)}
			{searchCat === "in season" && (
				<Select
					variant="standard"
					displayEmpty
					value={searchOpt}
					className="select-input"
					fullWidth
					onChange={(e) => setSearchOpt(e.target.value)}
				>
					<MenuItem disabled value="">
						<em>search by</em>
					</MenuItem>
					{produceOpt.map((cat) => (
						<MenuItem value={cat} key={`produceSearchOpt-` + cat}>
							{cat}
						</MenuItem>
					))}
				</Select>
			)}
			{searchOpt === "type" && (
				<Select
					variant="standard"
					displayEmpty
					value={searchInput}
					className="select-input"
					fullWidth
					onChange={(e) => setSearchInput(e.target.value)}
				>
					{/* <MenuItem disabled value="">
						<em>search by</em>
					</MenuItem> */}
					{produceType.map((cat) => (
						<MenuItem value={cat} key={`produceTypeSearch-` + cat}>
							{cat}
						</MenuItem>
					))}
				</Select>
			)}
			{searchOpt === "type" && (
				<IconButton onClick={handleSearch}>
					<SearchIcon />
				</IconButton>
			)}
			{searchOpt !== "type" && (
				<TextField placeholder="Search" variant="standard"
						   className="search-input" fullWidth
						   onChange={(e) => setSearchInput(e.target.value)}
						   InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleSearch}>
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								),
						   }}/>

			)}

		</Stack>
	);
}
