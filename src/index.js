import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Contexts:
import PostsContextProvider from "./contexts/PostContext.js";
import { UserContextProvider } from "./contexts/UserContext.js";
import { AnimationContextProvider } from "./contexts/AnimationContext.js";
// Components
import App from "./App.jsx";
import { Recipes } from "./Pages/Private/Recipes/Recipes.jsx";
import { Discover } from "./Pages/Private/Discover/Discover.jsx";
import { Gardens } from "./Pages/Private/Gardens/Gardens.jsx";
import DataContextProvider from "./contexts/dataContext.js";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<PostsContextProvider>
				<AnimationContextProvider>
					<App />
				</AnimationContextProvider>
			</PostsContextProvider>
		</UserContextProvider>
	</BrowserRouter>
);
