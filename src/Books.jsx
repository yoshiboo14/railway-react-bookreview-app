import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import "./Books.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { SignOut } from "./SignOut";

export const Books = () => {
  // アクセストークン(useCookiesに変更,セキュリティ考慮)
  const [accessToken, setAccessToken, removeCookie] = useCookies();
  // ユーザー情報
  const [user, setUser] = useState(null);
  // 取得した10件の配列をステートで管理
  const [reviews, setReviews] = useState([]);
  // 現在のページ番号
  const [currentPage, setCurrentPage] = useState(0);
  const history = useNavigate();

  // ユーザー情報取得
  useEffect(() => {
    if (accessToken.token) {
      axios
        .get("https://railway.bookreview.techtrain.dev/users", {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [accessToken.token]);

  // 書籍一覧を取得
  useEffect(() => {
    // ログイン状態(権限)によって取得するapiを変更
    if (accessToken.token) {
      axios
        .get("https://railway.bookreview.techtrain.dev/books", {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res);
          setReviews(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("https://railway.bookreview.techtrain.dev/public/books", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          setReviews(res.data);
        })
        .catch((err) => console.log(err));
    }

    // ページネーションの処理
    const offset = (currentPage + 1) * 10;

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
  }, [currentPage]);

  // 次へボタン
  const nextPage = () => {
    //ページ数を更新(オフセットを動的にするため)
    setCurrentPage(currentPage + 1);
  };

  // 前へボタン
  const prevPage = () => {
    //ページ数を更新(オフセットを動的にするため)
    setCurrentPage(currentPage - 1);
  };

  // ログアウト処理
  const signOut = () => {
    const confirm = window.confirm("ログアウトしますか");
    if (confirm) {
      removeCookie("token", { path: "/" }, { httpOnly: true });
      history("/login");
      console.log("ログアウトします");
    } else {
      alert("ログアウトを中止します");
    }
  };

  // ログを送信
  const sendLog = (id) => {
    const data = {
      selectBookId: id,
    };

    axios
      .post("https://railway.bookreview.techtrain.dev/logs", data, {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="BooksReviewApp">
        <h1 className="BooksReviewApp_title">
          書籍レビューの一覧画面　{" "}
          {user ? (
            <Link to="/profile">{user.name}</Link>
          ) : (
            <Link to="/login">
              <button>ログインする</button>
            </Link>
          )}
        </h1>
        <Link to="/new">
          <button>レビューを新規作成</button>
        </Link>
        <br />
        <br />
        {user && <SignOut signOut={signOut} />}
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
                <Link to={"/detail/" + review.id}>
                  <button onClick={() => sendLog(review.id)}>詳細</button>
                </Link>
                <Link to={"/edit/" + review.id}>
                  <button type="button">編集する</button>
                </Link>
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
