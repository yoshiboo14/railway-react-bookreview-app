import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import "./Books.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Books = () => {
  // アクセストークン
  const [accessToken, setAccessToken] = useCookies(); // useCookiesに変更

  // 取得した10件の配列をステートで管理
  const [reviews, setReviews] = useState([]);
  // 現在のページ番号
  const [currentPage, setCurrentPage] = useState(0);

  // 書籍一覧を取得
  useEffect(() => {
    axios
      .get("https://railway.bookreview.techtrain.dev/books", {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
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
          Authorization: `Bearer ${accessToken.token}`,
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
          Authorization: `Bearer ${accessToken.token}`,
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
      <div className="BooksReviewApp">
        <h1 className="BooksReviewApp_title">書籍レビューの一覧画面</h1>
        <Link to="/profile">ユーザー情報</Link>
        <br />
        <br />
        <Link>ログアウト</Link>
        {/* レビューを展開 */}
        {reviews.map((review) => {
          return (
            <>
              <div className="BooksReviewApp_review">
                <h1 className="BooksReviewApp_review_title">{review.title}</h1>
                <h2 className="BooksReviewApp_review_review">
                  {review.review}
                </h2>
                <ul className="BooksReviewApp_review_id" key={review.id}>
                  <li className="BooksReviewApp_review_detail">
                    詳細　{review.detail}
                  </li>
                  <li className="BooksReviewApp_review_reviewer">
                    投稿者　{review.reviewer}
                  </li>
                  <li className="BooksReviewApp_review_url">
                    URL {review.url}
                  </li>
                </ul>
              </div>
            </>
          );
        })}
        <div className="BooksReviewApp_Pagination">
          <Pagination nextPage={nextPage} prevPage={prevPage} />
        </div>
      </div>
    </>
  );
};
