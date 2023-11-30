import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";

export const Home = () => {
  // 書籍一覧を取得
  useEffect(() => {
    axios
      .get("https://railway.bookreview.techtrain.dev/books")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  // 次へボタン
  const nextPage = () => {};

  // 前へボタン
  const prevPage = () => {};

  return (
    <>
      <div className="App">
        <h1>書籍レビューの一覧画面</h1>
        <Link to="/signUp">
          <button>新規作成する</button>
        </Link>
        <br />
        <br />
        <Link to="/signIn">
          <button>ログインする</button>
        </Link>
      </div>
      <Pagination />
      <button onClick={prevPage}>前へ</button>
      <button onClick={nextPage}>次へ</button>
    </>
  );
};
