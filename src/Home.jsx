import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";

export const Home = () => {
  // ローカルストレージに保存したトークンを取得する
  const accessToken = localStorage.getItem("accessToken");

  // 取得した10件の配列をステートで管理
  const [reviews, setReviews] = useState("");
  // 現在のページ番号
  const [currentPage, setCurrentPage] = useState(1);

  // 書籍一覧を取得
  useEffect(() => {
    axios
      .get("https://railway.bookreview.techtrain.dev/books", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 次へボタン
  const nextPage = () => {
    //次のオフセット(10件)を格納
    const offset = (currentPage + 1) * 10;
    //ページ数を更新(オフセットを動的にするため)
    setCurrentPage(currentPage + 1);

    axios
      .get(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  };

  // 前へボタン
  const prevPage = () => {
    //次のオフセット(10件)を格納
    const offset = (currentPage - 1) * 10;
    //ページ数を更新(オフセットを動的にするため)
    setCurrentPage(currentPage - 1);

    axios
      .get(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  };

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
      {/* レビューを展開 */}
      {reviews.map((review) => {
        return (
          <>
            <div>
              <h1>{review.title}</h1>
              <h2>{review.review}</h2>
              <ul key={review.id}>
                <li>詳細　{review.detail}</li>
                <li>投稿者　{review.reviewer}</li>
                <li>URL {review.url}</li>
              </ul>
            </div>
          </>
        );
      })}
      <Pagination />
      <button onClick={prevPage}>前へ</button>
      <button onClick={nextPage}>次へ</button>
    </>
  );
};
