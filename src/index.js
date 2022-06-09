import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Main from "../src/Pages/LandingPage/Main/Main.jsx";
import PostsContextProvider from "./contexts/PostContext.js";
import { UserContextProvider } from "./contexts/UserContext.js";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
	<UserContextProvider>
		<PostsContextProvider>
			{/* <App /> */}
			<Main />
		</PostsContextProvider>
	</UserContextProvider>
);
