import Navbar from "./components/headers/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import React, { useState } from "react";
import "./index.css"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {

  return (


    <Provider store={store}>
      <Navbar />
      <Home />
    </Provider>


  )
}

export default App;
