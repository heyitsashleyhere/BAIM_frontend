import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./contexts/UserContext.js";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
