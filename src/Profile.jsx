import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  // 新規登録データをステートとして管理
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconSrc, setIconSrc] = useState("");
  // バリデーションエラー
  // エラーメッセージをステートで管理
  const [error, setError] = useState("");
  // リダイレクト
  const history = useNavigate();

  // アクセストークン(useCookiesに変更,セキュリティ考慮)
  const [accessToken, setAccessToken] = useCookies();

  //   登録済みのユーザー情報を取得
  useEffect(() => {
    axios
      .get("https://railway.bookreview.techtrain.dev/users", {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      })
      .then((res) => {
        // const res2 = res.json();
        console.log(res);
        setName(res.data.name);
        setIcon(res.data.iconUrl);
      })
      .catch();
  }, []);

  return (
    <>
      <form
        method="post"
        //   style={signUpStyle}
      >
        <h1>プロフィール画面</h1>
        <label htmlFor="name">
          <p>ユーザー名</p>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="ユーザー名"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label htmlFor="name">
          <p>アイコン</p>
          <input
            type="file"
            name="file"
            id="file"
            encType="multipart/form-data"
            src={icon}
            // onChange={onChangeFileSize}
          />
        </label>
        <br />
        <div>
          <img
            //   src={iconSrc}
            alt="アイコン画像"
          />
        </div>
        <button
          type="button"
          //  onClick={onCreateUser}
        >
          プロフィールを更新する
        </button>
      </form>
      <button type="button" onClick={() => history("/books")}>
        一覧画面に戻る
      </button>
    </>
  );
};
