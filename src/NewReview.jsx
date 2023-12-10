import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const NewReview = () => {
  // トークン
  const [accessToken, setAccessToken] = useCookies();
  // レビュー情報
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  // リダイレクト
  const history = useNavigate();

  // スタイル
  const Review = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };

  // 新規レビュー追加
  const onAddReview = () => {
    const data = {
      title: title,
      url: url,
      detail: detail,
      review: review,
    };

    axios
      .post("https://railway.bookreview.techtrain.dev/books", data, {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        history("/books");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {" "}
      <form method="post" style={Review}>
        <h1>レビュー登録画面</h1>
        <label htmlFor="review">
          <p>レビュー</p>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="タイトル"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <br />
        <br />
        <input
          type="text"
          name="url"
          id="url"
          placeholder="URL"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <br />
        <br />
        <textarea
          type="text"
          name="detail"
          id="detail"
          placeholder="詳細内容"
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        />
        <br />
        <br />
        <textarea
          type="text"
          name="review"
          id="review"
          placeholder="新しいレビュー"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <br />
        <br />
        <button type="button" onClick={onAddReview}>
          レビューを追加する
        </button>
      </form>
    </>
  );
};
