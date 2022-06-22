import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// components
import { AppHeader } from "./components/Private/Appheader/AppHeader.jsx";
import Header from "./components/Public/header/Header.jsx";
import { Recipes } from "./Pages/Private/Recipes/Recipes.jsx";
import Main from "./Pages/Public/Main/Main.jsx"
import PromoVideo from "./Pages/PromoVideo/PromoVideo.jsx"
// Ashley testing components
import Posts from "./components/Posts.jsx";
import UserEdit from "./components/UserEdit.jsx";
import UserDelete from "./components/UserDelete.jsx";
import UserLogout from "./components/UserLogout.jsx";
// import LoginRegister from "./components/Public/header/LoginRegister/LoginRegister.jsx.js";
// context
import { UserContext } from "./contexts/UserContext.js";
import { AnimationContext } from "./contexts/AnimationContext.js";
import About from "./Pages/Public/About/About.jsx";
import LoginRegister from "./Pages/Public/Login/LoginRegister.jsx";
import Team from "./Pages/Public/Team/Team.jsx"
import { Discover } from "./Pages/Private/Discover/Discover.jsx";
import { Gardens } from './Pages/Private/Gardens/Gardens.jsx'
import { Beauty } from "./Pages/Private/Beauty/Beauty.jsx";
import { Seasonal } from "./Pages/Private/Seasonal/Seasonal.jsx";
import { RecipePost } from "./components/Private/RecipePost.jsx/RecipePost.jsx";
import { Community } from "./Pages/Private/Community/Community.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },

    secondary: {
      main: '#0eebf6'
    }
  },
  typography: {
    fontFamily : [
      'Varela Round',
      'Arial', 'Helvetica', 'sans-serif'
    ].join(','),
  }
});


//Murad Testing Component
import Loader from './Pages/Public/Main/Loader';

export default function App() {
  const { isLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true)
  const { isNav } = useContext(AnimationContext);

  return (
    <ThemeProvider theme={theme}>
      <section className="App">
      {isNav && (isLogin ? <AppHeader /> : <Header />)}
      {/* <AppHeader  /> */}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PromoVideo />} />
          <Route path="/main" element={<Main />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/team" element={<Team/>} />
          <Route path="/auth" element={<LoginRegister/>} />

          {/* Private routes */}
          <Route path="/discover" element={<Discover/>} />

          <Route path="/gardens" >
            <Route index element={<Gardens/>}/>
            <Route path="/gardens/:title" element={<p>garden post</p>}/>
          </Route>

          <Route path="/artsCraft">
            <Route index  element={<p>arts and craft</p>}/>
            <Route path="/artsCraft/:title" element={<p>arts and craft post</p>}/>
          </Route>

          <Route path="/recipes">
            <Route index element={<Recipes/>}/>
            <Route path="/recipes/:title" element={<RecipePost/>}/>
          </Route>

          <Route path="/beauty">
            <Route index element={<Beauty/>}/>
            <Route path="/beauty/:title" element={<p>beauty post</p>}/>
          </Route>

          <Route path="/community">
            <Route index element={<Community/>}/>
            <Route path="/community/:title" element={<p>community post?</p>}/>
          </Route>

          <Route path="/seasonal">
            <Route index element={<Seasonal/>}/>
            <Route path="/seasonal/:item" element={<p>seasonal post</p>}/>
          </Route>

          <Route path="/*" element={<Main />} />

        </Routes>
      </section>
    </ThemeProvider>

  )
}

