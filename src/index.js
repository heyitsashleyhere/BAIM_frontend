import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
// Contexts:
import PostsContextProvider from "./contexts/PostContext.js";
import { UserContextProvider } from "./contexts/UserContext.js";
import { AnimationContextProvider } from "./contexts/AnimationContext.js";
// Components
import App from "./App.jsx";
// import { Events } from "./Pages/Private/Events/Events.jsx";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<CookiesProvider>
			<UserContextProvider>
				<PostsContextProvider>
					<AnimationContextProvider>
						{/* <Events /> */}
						<App />
					</AnimationContextProvider>
				</PostsContextProvider>
			</UserContextProvider>
		</CookiesProvider>
	</BrowserRouter>
);
