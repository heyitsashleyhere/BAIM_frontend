import { createRoot} from "react-dom/client";
import {BrowserRouter} from 'react-router-dom'
import App from "./App.jsx";
import Main from "../src/Pages/LandingPage/Main/Main.jsx";
import PostsContextProvider from "./contexts/PostContext.js";
import { UserContextProvider } from "./contexts/UserContext.js";
import About from '../src/Pages/Public/About/About.jsx'

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
<<<<<<< HEAD
	<UserContextProvider>
		<PostsContextProvider>
			{/* <App /> */}
			<Main />
		</PostsContextProvider>
	</UserContextProvider>
=======
  <BrowserRouter>
  <UserContextProvider>
    <PostsContextProvider>
      <App />
    </PostsContextProvider>
  </UserContextProvider>
   </BrowserRouter>
>>>>>>> design
);
