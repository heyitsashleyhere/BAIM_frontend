import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
// Contexts:
import PostsContextProvider from "./contexts/PostContext.js";
import { UserContextProvider } from "./contexts/UserContext.js";
import { AnimationContextProvider } from "./contexts/AnimationContext.js";
import DataContextProvider from "./contexts/dataContext.js";
// Components
import App from "./App.jsx";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
	<BrowserRouter>
		<CookiesProvider>
			<UserContextProvider>
				<PostsContextProvider>
					<DataContextProvider>
						<AnimationContextProvider>
							<App />
						</AnimationContextProvider>
					</DataContextProvider>
				</PostsContextProvider>
			</UserContextProvider>
		</CookiesProvider>
	</BrowserRouter>
);
