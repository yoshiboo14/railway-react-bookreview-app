import React from "react";
import { Link } from "react-router-dom";

export const ReviewForm = (props) => {
  // スタイル
  const Review = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };

  return (
    <>
      <form method="post" style={Review}>
        <h1>レビュー{props.Title}画面</h1>
        <label htmlFor="review">
          <p>レビュー</p>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="タイトル"
            value={props.title}
            onChange={(e) => {
              props.setTitle(e.target.value);
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
          value={props.url}
          onChange={(e) => {
            props.setUrl(e.target.value);
          }}
        />
        <br />
        <br />
        <textarea
          type="text"
          name="detail"
          id="detail"
          placeholder="詳細内容"
          value={props.detail}
          onChange={(e) => {
            props.setDetail(e.target.value);
          }}
        />
        <br />
        <br />
        <textarea
          type="text"
          name="review"
          id="review"
          placeholder="新しいレビュー"
          value={props.review}
          onChange={(e) => {
            props.setReview(e.target.value);
          }}
        />
        <br />
        <br />
        <Link to="/books">
          <button type="button" onClick={props.editReview}>
            レビューを更新する
          </button>
        </Link>
      </form>
    </>
  );
};
