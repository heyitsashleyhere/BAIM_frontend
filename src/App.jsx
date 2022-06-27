import { useContext, useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
// Private components
import { AppHeader } from "./components/Private/Appheader/AppHeader.jsx";
import { Collections } from "./Pages/Private/Collections/Collections.jsx";
import { Discover } from "./Pages/Private/Discover/Discover.jsx";
import { PostPage } from "./components/Private/PostPage/PostPage.jsx";
import { Seasonal } from "./Pages/Private/Seasonal/Seasonal.jsx";

import { Community } from "./Pages/Private/Community/Community.jsx";
import { Profile } from "./Pages/Private/Profile/Profile.jsx";
import Create from "./Pages/Private/Create/Create.jsx";
// Public components
import Header from "./components/Public/header/Header.jsx";
import Main from "./Pages/Public/Main/Main.jsx"
import PromoVideo from "./Pages/PromoVideo/PromoVideo.jsx"
import About from "./Pages/Public/About/About.jsx";
import LoginRegister from "./Pages/Public/Login/LoginRegister.jsx";
import Team from "./Pages/Public/Team/Team.jsx"
import ScrollToTop from './components/Public/Footer/ScrollToTop.jsx'
// context
import { UserContext } from "./contexts/UserContext.js";
import { AnimationContext } from "./contexts/AnimationContext.js";
import { PostsContext } from "./contexts/PostContext.js";



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


export default function App() {
  const { isLogin } = useContext(UserContext);
  const { isNav } = useContext(AnimationContext)
  const [displayNav, setDisplayNav] = useState()
  const { recipe, beauty, arts, garden } = useContext(PostsContext)



  useEffect(() => {

    const localDisplayNav = localStorage.getItem('showNav')
    setDisplayNav(localDisplayNav)

  }, [])
  

  return (
    <ThemeProvider theme={theme}>
      <section className="App">

        {/* {displayNav || isNav ? (isLogin ? <AppHeader /> : <Header /> ) : null} */}
        <AppHeader />
        <ScrollToTop  />


        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PromoVideo />} />
          <Route path="/main" element={<Main />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/team" element={<Team/>} />
          <Route path="/auth" element={<LoginRegister/>} />

          {/* Private routes */}
          <Route path="/discover" element={<Discover/>} />
          <Route path="/create" element={<Create />} />

          <Route path="/gardens" >
            <Route index element={<Collections data={garden} type="garden"/>}/>
            <Route path="/gardens/:title" element={<PostPage data={garden} />}/>
          </Route>

          <Route path="/artsCraft">
            <Route index  element={<Collections data={arts} type="arts"/>}/>
            <Route path="/artsCraft/:title" element={<PostPage data={arts}/>}/>
          </Route>

          <Route path="/recipes">
            <Route index element={<Collections data={recipe} type="recipe"/>}/>
            <Route path="/recipes/:title" element={<PostPage data={recipe} /> }/>
          </Route>

          <Route path="/beauty">
            <Route index element={<Collections data={beauty} type="beauty"/>}/>
            <Route path="/beauty/:title" element={<PostPage data={beauty}/>}/>
          </Route>

          <Route path="/community">
            <Route index element={<Community/>}/>
            <Route path="/community/:title" element={<PostPage/>}/>
          </Route>

          <Route path="/seasonal">
            <Route index element={<Seasonal/>}/>
            <Route path="/seasonal/:item" element={<PostPage/>}/>
          </Route>

          <Route path="/profile">
            <Route index element={<Profile/>}/>
            <Route path="/profile/:profileName" element={<Profile/>}/>
          </Route>

          <Route path="/*" element={<Main />} />

        </Routes>
      </section>
    </ThemeProvider>

  )
}

