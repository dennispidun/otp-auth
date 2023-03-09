import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import './App.css';
import FinishPage from "./finish/FinishPage";
import ErrorPage from "./error/ErrorPage";
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/login/finish", element: _jsx(FinishPage, {}) }), _jsx(Route, { path: "/login/error", element: _jsx(ErrorPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/login" }) })] }));
}
export default App;
