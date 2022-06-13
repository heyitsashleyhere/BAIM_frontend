import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";

import PostsContextProvider from "./contexts/PostContext.js";
import { UserContextProvider } from "./contexts/UserContext.js";

import { AnimationContextProvider } from "./contexts/AnimationContext.js";
import Team from "./Pages/Public/Team/Team.jsx";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<PostsContextProvider>
				<AnimationContextProvider>
					{/* <App /> */}
					<Team />
				</AnimationContextProvider>
			</PostsContextProvider>
		</UserContextProvider>
	</BrowserRouter>
);
