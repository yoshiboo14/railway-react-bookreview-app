import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  // 簡易的なスタイルの適用
  const signUpStyle = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };

  // 新規登録データをステートとして管理
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // エラーメッセージをステートで管理
  const [error, setError] = useState("");
  // リダイレクト
  const history = useNavigate();

  // インプットのonChange関数
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  //   axiosでpost通信を非同期処理
  const onCreateUser = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("https://railway.bookreview.techtrain.dev/users", data)
      .then((res) => {
        console.log(res.data);
        history("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  // JSX
  return (
    <>
      {/* エラーの表示 */}
      <p>{error}</p>
      <form method="post" style={signUpStyle}>
        <h1>新規作成画面</h1>
        <label htmlFor="name">
          <p>ユーザー名</p>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="名前を入力"
            onChange={onChangeName}
          />
        </label>
        <label htmlFor="email">
          <p>メールアドレス</p>
          <input
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
          新規作成する
        </button>
        {/* <input type="submit" value="新規作成する" onClick={onCreateUser} /> */}
        <br />
        <br />
        <Link to="/signIn">すでに登録済みの方</Link>
      </form>
    </>
  );
};
