import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewForm } from "./ReviewForm";
import axios from "axios";
import { useCookies } from "react-cookie";

export const EditReview = () => {
  const [accessToken, setAccessToken] = useCookies();
  // レビュー情報
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  //   ローディング
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const editReview = () => {
    const data = {
      title: "string",
      url: "string",
      detail: "string",
      review: "string",
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

  return (
    <>
      {id}
      <ReviewForm title="編集" editReview={editReview} />
    </>
  );
};
