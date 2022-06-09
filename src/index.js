import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Main from "./Pages/Public/Main/Main.jsx";
import PostsContextProvider from "./contexts/PostContext.js";
import { UserContextProvider } from "./contexts/UserContext.js";
import About from "../src/Pages/Public/About/About.jsx";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<PostsContextProvider>
				{/* <App /> */}
				<Main />
			</PostsContextProvider>
		</UserContextProvider>
	</BrowserRouter>
);
