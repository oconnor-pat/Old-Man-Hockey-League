import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homefeed from "./components/Homefeed/Homefeed";
import Profile from "../src/components/Profile/Profile";
import Discover from "./components/Discover/Discover";
import GlobalStyles from "./utils/GlobalStyles";
import LandingPage from "./components/Landingpage/LandingPage";
function App() {
    return (_jsxs(Router, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/homefeed", element: _jsx(Homefeed, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/discover", element: _jsx(Discover, {}) })] }), _jsx(GlobalStyles, {})] }));
}
export default App;
