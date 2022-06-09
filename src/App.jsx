import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
// components
import { Allrecipes } from "./components/Private/Allrecipes/Allrecipes.jsx";
import { AppHeader } from "./components/Private/Appheader/AppHeader.jsx";
import Header from "./components/Public/header/Header.jsx";
import { Recipes } from "./Pages/Private/Recipes/Recipes.jsx";
import Main from "./Pages/Public/Main/Main.jsx"
// Ashley testing components
import Posts from "./components/Posts.jsx";
import UserEdit from "./components/UserEdit.jsx";
import UserDelete from "./components/UserDelete.jsx";
import UserLogout from "./components/UserLogout.jsx";
import LoginRegister from "./components/LoginRegister/LoginRegister.jsx";
// context
import { UserContext } from "./contexts/UserContext.js";

export default function App() {
  const { isLogin } = useContext(UserContext);

  return (

      <>
        {isLogin ? <AppHeader /> : <Header />}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<p>about</p>} />
          <Route path="/team" element={<p>team</p>} />
          <Route path="/login" element={<p>login</p>} />

          {isLogin && (
            <>
              <Route path="/discover">
                <Route index element={<h1>DISCOVER</h1>} />
                <Route path="/discover/recipes">
                  <Route index element={<Allrecipes />} />
                  {/* <Route path="/discover/recipes/:title" element={<Recipes/>}/> */}
                </Route>
                <Route path="/discover/gardens">
                  <Route index element={<p>gardens</p>} />
                </Route>
                <Route path="/discover/beauty">
                  <Route index element={<p>gardens</p>} />
                </Route>
              </Route>

              <Route path="/feed" element={<h1>feed</h1>} />
              <Route path="/profile" element={<h1>profile</h1>} />
              <Route path="/create" element={<h1>create</h1>} />
              <Route path="/logout" element={<h1>logout</h1>} />
            </>
          )}

          <Route path="*" element={<p>error</p>} />
        </Routes>
      </>

  )
}

// <div>
// <LoginRegister />
// <UserLogout />
// <UserEdit />
// <UserDelete />
// <Posts />
// </div>