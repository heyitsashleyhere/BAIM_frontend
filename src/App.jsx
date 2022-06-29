import { useContext, useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCookies } from "react-cookie";
// Private components
import { AppHeader } from "./components/Private/Appheader/AppHeader.jsx";
import { Collections } from "./Pages/Private/Collections/Collections.jsx";
import { Discover } from "./Pages/Private/Discover/Discover.jsx";
import { PostPage } from "./components/Private/PostPage/PostPage.jsx";
import { Seasonal } from "./Pages/Private/Seasonal/Seasonal.jsx";
import { Community } from "./Pages/Private/Community/Community.jsx";
import { Profile } from "./Pages/Private/Profile/Profile.jsx";
import Create from "./Pages/Private/Create/Create.jsx";
import Search from "./Pages/Private/Search/Search.jsx";
// Public components
import Header from "./components/Public/header/Header.jsx";
import Main from "./Pages/Public/Main/Main.jsx"
import PromoVideo from "./Pages/PromoVideo/PromoVideo.jsx"
import About from "./Pages/Public/About/About.jsx";
import LoginRegister from "./Pages/Public/Login/LoginRegister.jsx";
import Team from "./Pages/Public/Team/Team.jsx"
import ScrollToTop from './components/Public/Footer/ScrollToTop.jsx'
// context
import { AnimationContext } from "./contexts/AnimationContext.js";
import { PostsContext } from "./contexts/PostContext.js";
import { UserContext } from "./contexts/UserContext.js";
import { SectionNav } from "./components/Private/section-header/SectionNav.jsx";



const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },

    secondary: {
      main: '#ffffff'
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
  const { isNav } = useContext(AnimationContext);
  const [cookies] = useCookies();
  const [displayNav, setDisplayNav] = useState()
  const { users, recipes, beauties, gardens, events, artsCrafts } = useContext(PostsContext)

  useEffect(() => {
    const localDisplayNav = localStorage.getItem('showNav')
    setDisplayNav(localDisplayNav)
  }, [])

  // ! try to do 'checkLogin' endpoint
  // if (!initialized) {
  //   return "Loading ;)"
  // }

  return (
    <ThemeProvider theme={theme}>
      <section className="App">

        {displayNav || isNav ? (cookies.profileName || isLogin ? (
          <>
        <AppHeader />
            <SectionNav />
            </>
        ) : <Header />) : null}
        
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
          <Route path="/search" element={<Search />} />
          

          <Route path="/garden" >
            <Route index element={<Collections data={gardens} type="garden"/>}/>
            <Route path="/garden/:title" element={<PostPage data={gardens} />}/>
          </Route>

          <Route path="/artsCraft">
            <Route index  element={<Collections data={artsCrafts} type="arts"/>}/>
            <Route path="/artsCraft/:title" element={<PostPage data={artsCrafts}/>}/>
          </Route>

          <Route path="/recipe">
            <Route index element={<Collections data={recipes} type="recipe"/>}/>
            <Route path="/recipe/:title" element={<PostPage data={recipes} /> }/>
          </Route>

          <Route path="/beauty">
            <Route index element={<Collections data={beauties} type="beauty"/>}/>
            <Route path="/beauty/:title" element={<PostPage data={beauties}/>}/>
          </Route>

          <Route path="/community">
            <Route index element={<Community/>}/>
            <Route path="/community/:title" element={<PostPage/>}/>
          </Route>

          <Route path="/seasonal">
            <Route index element={<Seasonal/>}/>
            <Route path="/seasonal/:name" element={<PostPage/>}/>
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

