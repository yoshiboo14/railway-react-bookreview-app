import React from "react";
export const LogIn = () => {
  const signInStyle = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };

  return (
    <>
      <form action="#" method="post" style={signInStyle}>
        <h1>ログイン画面</h1>
        <label htmlFor="name">
          <p>ユーザー名</p>
          <input
            data-testid="user"
            type="user"
            name="name"
            id="name"
            placeholder="名前を入力"
          />
        </label>
        <label htmlFor="email">
          <p>メールアドレス</p>
          <input
            data-testid="email"
            type="email"
            name="email"
            id="email"
            placeholder="メールアドレスを入力"
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
          />
        </label>
        <br />
        <br />
        <input type="submit" value="ログインする" />
        <br />
        <br />
      </form>
    </>
  );
};
