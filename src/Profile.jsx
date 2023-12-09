import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  // 新規登録データをステートとして管理
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  // リダイレクト
  const history = useNavigate();
  // アクセストークン(useCookiesに変更,セキュリティ考慮)
  const [accessToken, setAccessToken] = useCookies();

  // スタイル
  const Profile = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };

  //   登録済みのユーザー情報を取得
  useEffect(() => {
    axios
      .get("https://railway.bookreview.techtrain.dev/users", {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setIcon(res.data.iconUrl);
      })
      .catch((err) => console.log(err));
  }, []);

  // 更新ボタンの処理
  const onEditUser = () => {
    const data = {
      name: name,
    };

    axios
      .put("https://railway.bookreview.techtrain.dev/users", data, {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        alert("プロフィールを更新しました");
        console.log(res);
        history("/books");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form method="post" style={Profile}>
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
        <label htmlFor="file">
          <p>アイコン</p>
        </label>
        <div>
          <img src={icon} alt="アイコン画像" />
        </div>
        <br />
        <button type="button" onClick={onEditUser}>
          プロフィールを更新する
        </button>
      </form>
    </>
  );
};
