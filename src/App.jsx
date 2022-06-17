import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
// components
import { AppHeader } from "./components/Private/Appheader/AppHeader.jsx";
import Header from "./components/Public/header/Header.jsx";
import { Recipes } from "./Pages/Private/Recipes/Recipes.jsx";
import Main from "./Pages/Public/Main/Main.jsx"

// Ashley testing components
import Posts from "./components/Posts.jsx";
import UserEdit from "./components/UserEdit.jsx";
import UserDelete from "./components/UserDelete.jsx";
import UserLogout from "./components/UserLogout.jsx";
// import LoginRegister from "./components/Public/header/LoginRegister/LoginRegister.jsx.js";
// context
import { UserContext } from "./contexts/UserContext.js";
import About from "./Pages/Public/About/About.jsx";
import LoginRegister from "./Pages/Public/Login/LoginRegister.jsx";
import Team from "./Pages/Public/Team/Team.jsx"
import { Discover } from "./Pages/Private/Discover/Discover.jsx";
import { Gardens } from './Pages/Private/Gardens/Gardens.jsx'
import { Beauty } from "./Pages/Private/Beauty/Beauty.jsx";
import { Seasonal } from "./Pages/Private/Seasonal/Seasonal.jsx";
import { RecipePost } from "./components/Private/RecipePost.jsx/RecipePost.jsx";
import { Community } from "./Pages/Private/Community/Community.jsx";




export default function App() {
  const { isLogin } = useContext(UserContext);

  return (

      <section className="App">
        {isLogin ? <AppHeader /> : <Header />}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/team" element={<Team/>} />
          <Route path="/login" element={<LoginRegister/>} />

          {isLogin && (
            <>
              <Route path="/discover">
                <Route index element={<Discover/>} />
                <Route path="/discover/recipes">
                  <Route index element={<Recipes/>} />
                  <Route path="/discover/recipes/:title" element={<RecipePost/>}/>
                </Route>
                <Route path="/discover/gardens">
                  <Route index element={<Gardens/>} />
                </Route>
                <Route path="/discover/beauty">
                  <Route index element={<Beauty/>} />
                </Route>
                <Route path="/discover/arts&crafts">
                  <Route index element={<p>arts</p>} />
                </Route>
                <Route path="/discover/community">
                  <Route index element={<Community/>}/>
                </Route>
                <Route path="/discover/seasonal">
                  <Route index element={<Seasonal/>} />
                </Route>
                <Route path="/discover/events">
                  <Route index element={<p>events</p>} />
                </Route>
              </Route>

              <Route path="/feed" element={<h1>feed</h1>} />
              <Route path="/profile" element={<h1>profile</h1>} />
              <Route path="/create" element={<h1>create</h1>} />
              <Route path="/logout" element={<h1>logout</h1>} />
            </>
          )}

          {/* <Route path="*" element={<LoginRegister/>} /> */}
        </Routes>
      </section>

  )
}

// <div>
// <LoginRegister />
// <UserLogout />
// <UserEdit />
// <UserDelete />
// <Posts />
// </div>