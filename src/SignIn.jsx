import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const signInStyle = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };

  // 新規登録データをステートとして管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // エラーメッセージをステートで管理
  const [error, setError] = useState("");
  // リダイレクト
  const history = useNavigate();

  // インプットのonChange関数
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  //   axiosでpost通信を非同期処理
  const onCreateUser = () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("https://railway.bookreview.techtrain.dev/signin", data)
      .then((res) => {
        console.log(res.data);
        history("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  return (
    <>
      {/* エラーの表示 */}
      <p>{error}</p>
      <form action="#" method="post" style={signInStyle}>
        <h1>ログイン画面</h1>
        <label htmlFor="email">
          <p>メールアドレス</p>
          <input
            data-testid="email"
            type="email"
            name="email"
            id="email"
            placeholder="メールアドレスを入力"
            onChange={onChangeEmail}
          />
        </label>
        <label htmlFor="password">
          <p>パスワード</p>
          <input
            data-testid="password"
            type="password"
            name="password"
            id="password"
            placeholder="パスワードを入力"
            onChange={onChangePassword}
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={onCreateUser}>
          ログインする
        </button>
        <br />
        <br />
        <Link to="/signUp">まだ新規登録ができてない場合</Link>
      </form>
    </>
  );
};
