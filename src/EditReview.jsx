import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewForm } from "./ReviewForm";
import axios from "axios";
import { useCookies } from "react-cookie";

export const EditReview = () => {
  // レビューのid
  const { id } = useParams();
  // レビュー情報
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [accessToken, setAccessToken] = useCookies();
  // リダイレクト
  const history = useNavigate();

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
      .catch((err) => console.log(err));
  }, []);

  const editReview = () => {
    const data = {
      title: title,
      url: url,
      detail: detail,
      review: review,
    };

    axios
      .put(`https://railway.bookreview.techtrain.dev/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const deleteReview = () => {
    const deleteConfirm = window.confirm("レビューを削除しますか？");

    if (deleteConfirm) {
      axios
        .delete(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
          },
        })
        .then((res) => {
          console.log("レビューを削除しました");
          console.log(res);
          history("/books");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {id}
      <ReviewForm
        title={title}
        url={url}
        detail={detail}
        review={review}
        Title="編集"
        setTitle={setTitle}
        setUrl={setUrl}
        setDetail={setDetail}
        setReview={setReview}
        editReview={editReview}
        deleteReview={deleteReview}
      />
    </>
  );
};
