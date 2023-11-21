import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const signUpStyle = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };

  //   useEffectでpost通信を非同期処理

  return (
    <>
      <form action="#" method="post" style={signUpStyle}>
        <h1>新規作成画面</h1>
        <label htmlFor="name">
          <p>ユーザー名</p>
          <input type="text" name="name" id="name" placeholder="名前を入力" />
        </label>
        <label htmlFor="email">
          <p>メールアドレス</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="メールアドレスを入力"
          />
        </label>
        <label htmlFor="password">
          <p>パスワード</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="パスワードを入力"
          />
        </label>
        <br />
        <br />
        <input type="submit" value="新規作成する" />
        <br />
        <br />
        <Link to="/signIn">すでに登録済みの方</Link>
      </form>
    </>
  );
};
