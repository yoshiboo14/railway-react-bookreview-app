import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const signInStyle = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };
  const validation = {
    color: "red",
  };

  // 新規登録データをステートとして管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // バリデーションエラー
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // エラーメッセージをステートで管理
  const [error, setError] = useState("");
  // リダイレクト
  const history = useNavigate();

  // インプットのonChange関数
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    // バリデーション機能
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regex.test(email)) {
      setEmailError("有効なメールアドレスを入力してください。");
    } else {
      setEmailError("");
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    // バリデーション機能
    const regex = /^[a-z\d]{8,100}$/i;
    if (!regex.test(password)) {
      setPasswordError("有効なパスワードを入力してください。");
    } else {
      setPasswordError("");
    }
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
        alert("ログインできました");
        console.log("トークンを送ります");
        console.log(res.data);
        // トークンをlocalStorageに保存
        localStorage.setItem("accessToken", res.data.token);
        history("/");
      })
      .catch((err) => {
        console.log("ログインできませんでした");
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
          {/* バリデーション */}
          {emailError && <p style={validation}>{emailError}</p>}
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
          {/* バリデーション */}
          {password && <p style={validation}>{passwordError}</p>}
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
