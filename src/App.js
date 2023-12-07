import "./App.css";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
// import { LogIn } from "./LogIn_jest";
import { Books } from "./Books";
import { Profile } from "./Profile";
import { useCookies } from "react-cookie";

function App() {
  // アクセストークン(useCookiesに変更,セキュリティ考慮)
  const [accessToken, setAccessToken] = useCookies();
  // const history = useNavigate();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {accessToken.token ? (
          <Route path="/signUp" element={<Navigate to="/books" />}></Route>
        ) : (
          <Route path="/signUp" element={<SignUp />}></Route>
        )}
        {accessToken.token ? (
          <Route path="/signIn" element={<Navigate to="/books" />}></Route>
        ) : (
          <Route path="/signIn" element={<SignIn />}></Route>
        )}
        {/* <Route path="/LogIn" element={<LogIn />}></Route> */}
        <Route path="/books" element={<Books />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
