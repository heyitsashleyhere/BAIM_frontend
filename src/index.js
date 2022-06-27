import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Contexts:
import PostsContextProvider from "./contexts/PostContext.js";
import { UserContextProvider } from "./contexts/UserContext.js";
import { AnimationContextProvider } from "./contexts/AnimationContext.js";
// Components
import App from "./App.jsx";

import DataContextProvider from "./contexts/dataContext.js";

import TransitionPage from "./testing/TransitionPage.jsx";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<PostsContextProvider>
				<DataContextProvider>
					<AnimationContextProvider>
						<App />
					</AnimationContextProvider>
				</DataContextProvider>
			</PostsContextProvider>
		</UserContextProvider>
	</BrowserRouter>
);
