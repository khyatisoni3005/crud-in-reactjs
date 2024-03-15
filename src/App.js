import Navbar from "./components/headers/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/pages/Home";
import React, { useState } from "react";
import "./index.css"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {

  return (
    <>
      <Home />

    </>
  )
}

export default App;
