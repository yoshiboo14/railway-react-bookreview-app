import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
// import { LogIn } from "./LogIn_jest";
import { Books } from "./Books";
import { Profile } from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        {/* <Route path="/LogIn" element={<LogIn />}></Route> */}
        <Route path="/books" element={<Books />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
