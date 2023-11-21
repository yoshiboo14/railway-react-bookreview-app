import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="App">
      <h1>ホーム画面</h1>
      {/* <p>email</p>
      <input type="email" />
      <br />
      <p>password</p>
      <input type="password" />
      <br /> */}
      <Link to="/signUp">
        <button>新規作成する</button>
      </Link>
      <br />
      <br />
      <Link to="/signIn">
        <button>ログインする</button>
      </Link>
    </div>
  );
};
