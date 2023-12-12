import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

export const DetailReview = () => {
  // レビューのid
  const { id } = useParams();
  // レビュー情報
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  //   ローディング
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useCookies();

  // スタイル
  const Review = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };

  useEffect(() => {
    axios
      .get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setUrl(res.data.url);
        setDetail(res.data.detail);
        setReview(res.data.review);
      })
      .catch((err) => console.log(err))
      //ローディング終了
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <form method="post" style={Review}>
          <h1>レビュー詳細画面</h1>
          <label htmlFor="review">
            <p>レビュー</p>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="タイトル"
              value={title}
              onChange={(e) => {
                //   setTitle(e.target.value);
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
            value={url}
            onChange={(e) => {
              // setUrl(e.target.value);
            }}
          />
          <br />
          <br />
          <textarea
            type="text"
            name="detail"
            id="detail"
            placeholder="詳細内容"
            value={detail}
            onChange={(e) => {
              // setDetail(e.target.value);
            }}
          />
          <br />
          <br />
          <textarea
            type="text"
            name="review"
            id="review"
            placeholder="新しいレビュー"
            value={review}
            onChange={(e) => {
              // setReview(e.target.value);
            }}
          />
          <br />
          <br />
          <button
            type="button"
            // onClick={onAddReview}
          >
            レビューを編集する
          </button>
        </form>
      )}
    </>
  );
};
