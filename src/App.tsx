import {Route, Routes} from 'react-router-dom';
import GamesCataloguePage from './components/GamesCataloguePage/GamesCataloguePage.tsx';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage.tsx';
import LoginPage from './components/LoginPage/LoginPage.tsx';
import SignUpPage from "./components/SignUpPage/SignUpPage.tsx";
import GamesDetailPage from "./components/GamesDetailPage/GamesDetailPage.tsx";
import SteamProfile from "./components/SteamProfile/SteamProfile.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route element={<NavBar></NavBar>}>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    <Route path="/games-catalogue">
                        <Route index element={<GamesCataloguePage></GamesCataloguePage>}></Route>
                        <Route path="/games-catalogue/:gameId" element={<GamesDetailPage></GamesDetailPage>}></Route>
                    </Route>
                    <Route path="/login" element={<LoginPage></LoginPage>}></Route>
                    <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
                    <Route path="/steamprofile/:name" element={<SteamProfile/>}></Route>
                    <Route path="*" element={<h1>404</h1>}></Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
