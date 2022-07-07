import { useContext, useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useCookies } from "react-cookie";
// Private components
import { PrivateHeader } from "./components/Private/private-header/PrivateHeader.jsx";
import { Collections } from "./Pages/Private/Collections/Collections.jsx";
import { Discover } from "./Pages/Private/Discover/Discover.jsx";
import { PostPage } from "./Pages/Private/PostPage/PostPage.jsx";
import { Seasonal } from "./Pages/Private/Seasonal/Seasonal.jsx";
import { Community } from "./Pages/Private/Community/Community.jsx";
import { Profile } from "./Pages/Private/Profile/Profile.jsx";
import Create from "./Pages/Private/Create/Create.jsx";
import Search from "./Pages/Private/Search/Search.jsx";
import { SingleProducePage } from "./Pages/Private/SingleProducePage/SingleProducePage.jsx";
import Footer from "./components/Public/Footer/Footer.jsx";
// Public components
import Header from "./components/Public/header/Header.jsx";
import Main from "./Pages/Public/Main/Main.jsx";
import PromoVideo from "./Pages/PromoVideo/PromoVideo.jsx";
import About from "./Pages/Public/About/About.jsx";
import LoginRegister from "./Pages/Public/Login/LoginRegister.jsx";
import Team from "./Pages/Public/Team/Team.jsx";
import ScrollToTop from "./components/Public/Footer/ScrollToTop.jsx";
// context
import { AnimationContext } from "./contexts/AnimationContext.js"; //TODO help to make it NONEED
import { PostsContext } from "./contexts/PostContext.js";
import { UserContext } from "./contexts/UserContext.js";
import { Events } from "./Pages/Private/Events/Events.jsx";

const theme = createTheme({
	palette: {
		primary: {
			main: "#000000",
		},

		secondary: {
			main: "#ffffff",
		},
	},
	typography: {
		htmlFontSize: 10,
		fontFamily: ["Varela Round", "Arial", "Helvetica", "sans-serif"].join(","),
	},
});

export default function App() {
	const { isLogin } = useContext(UserContext);
	const { isNav } = useContext(AnimationContext);
	const [cookies] = useCookies();
	const [displayNav, setDisplayNav] = useState();
	const {
		users,
		allBeautyPost,
		allArtsCraftPost,
		allGardenPost,
		allRecipePost,
		allEventPost,
	} = useContext(PostsContext);

	useEffect(() => {
		const localDisplayNav = localStorage.getItem("showNav");
		setDisplayNav(localDisplayNav);
	}, []);

  if (!users.length){ return "loading" }
	// ! try to do 'checkLogin' endpoint
	// if (!initialized) {
	//   return "Loading ;)"
	// }


	return (
		<ThemeProvider theme={theme}>
			<section className="App">
				{displayNav || isNav ? (
					cookies.profileName || isLogin ? (
						<>
							<PrivateHeader />
						</>
					) : (
						<Header />
					)
				) : null}

				<ScrollToTop />

				<Routes>
					{/* Public routes */}
					<Route path="/" element={<PromoVideo />} />
					<Route path="/main" element={<Main />} />
					<Route path="/about" element={<About />} />
					<Route path="/team" element={<Team />} />
					<Route path="/auth" element={<LoginRegister />} />

					{/* Private routes */}
					<Route path="/discover" element={<Discover />} />
					<Route path="/create" element={<Create />} />
					<Route path="/search" element={<Search />} />

					<Route
						path="/garden"
						element={<Collections data={allGardenPost} type="garden" />}
					/>
					<Route
						path="/garden/:title"
						element={<PostPage data={allGardenPost} />}
					/>

					<Route
						path="/artsCraft"
						element={<Collections data={allArtsCraftPost} type="arts" />}
					/>
					<Route
						path="/artsCraft/:title"
						element={<PostPage data={allArtsCraftPost} />}
					/>

					<Route
						path="/recipe"
						element={<Collections data={allRecipePost} type="recipe" />}
					/>
					<Route
						path="/recipe/:title"
						element={<PostPage data={allRecipePost} />}
					/>

					<Route
						path="/beauty"
						element={<Collections data={allBeautyPost} type="beauty" />}
					/>
					<Route
						path="/beauty/:title"
						element={<PostPage data={allBeautyPost} />}
					/>

					<Route path="/community" element={<Community />} />
					<Route path="/community/:title" element={<PostPage />} />

					<Route path="/seasonal" element={<Seasonal />} />
					<Route path="/seasonal/:name" element={<SingleProducePage />} />

					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/:profileName" element={<Profile />} />

					<Route path="/events" element={<Events />} />

					<Route path="/*" element={<Main />} />
				</Routes>
				{/* {isLogin ? <Footer /> : null} */}

				{displayNav ? (
					cookies.profileName || isLogin ? (
						<>
							<Footer />
						</>
					) : null
				) : null}

				{/* <Footer /> */}
			</section>
		</ThemeProvider>
	);
}
