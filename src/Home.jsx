import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <div className="BooksReviewApp">
        <h1 className="BooksReviewApp_title">ホーム画面</h1>
        <Link to="/signUp">
          <button className="BooksReviewApp_signUp_button">新規作成する</button>
        </Link>
        <br />
        <br />
        <Link to="/signIn">
          <button className="BooksReviewApp_signIn_button">ログインする</button>
        </Link>
        <div className="BooksReviewApp_Pagination"></div>
      </div>
    </>
  );
};
