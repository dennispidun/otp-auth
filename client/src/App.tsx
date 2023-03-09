import { useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./login/LoginPage";
import './App.css'
import FinishPage from "./finish/FinishPage";
import ErrorPage from "./error/ErrorPage";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/login/finish" element={<FinishPage/>}/>
        <Route path="/login/error" element={<ErrorPage/>}/>
        <Route path="*" element={<Navigate to={"/login"}/>}/>
    </Routes>
  )
}

export default App
