import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";

export const SignUp = () => {
  // 簡易的なスタイルの適用
  const signUpStyle = {
    alignItems: "center",
    textAlign: "center",
    paddingTop: "100px",
  };
  const validation = {
    color: "red",
  };

  // 新規登録データをステートとして管理
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconSrc, setIconSrc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // バリデーションエラー
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // アクセストークン
  const [accessToken, setAccessToken] = useCookies(["token"]); // useCookiesに変更
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
  // アイコンの圧縮処理
  const onChangeFileSize = (e) => {
    const selectedIcon = e.target.files[0];
    // console.log(selectedIcon);

    // 圧縮処理
    new Compressor(selectedIcon, {
      quality: 0.6,
      maxWidth: 300,
      maxHeight: 200,

      //圧縮が完了した時の処理を記述する
      success(result) {
        // console.log(result);
        setIcon(result);
        const url = URL.createObjectURL(result);
        // console.log(url);
        setIconSrc(url);
      },
      //エラー処理
      error(err) {
        console.log(err.message);
      },
    });
  };
  // console.log(icon);

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
        console.log(res.data.token);
        // クッキーに保存
        setAccessToken("token", res.data.token);
        // フォームデータ
        const img = {
          icon: icon,
        };
        // console.log(img.icon);

        // 画像のアップロード
        axios
          .post("https://railway.bookreview.techtrain.dev/uploads", img, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            alert("新規登録できました");
            console.log(res.data);
            console.log(accessToken);
            history("/books");
          })
          .catch((err) => {
            console.log(err);
            setError(err.message);
          });
      })
      .catch((err) => {
        alert("新規登録できませんでした");
        console.log(err);
        setError(err.message);
      });
  };

  // JSX
  return (
    <>
      {/* エラーの表示 */}
      {error && <p style={validation}>{error}</p>}
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
        <label htmlFor="name">
          <p>アイコン</p>
          <input
            type="file"
            name="file"
            id="file"
            encType="multipart/form-data"
            onChange={onChangeFileSize}
          />
        </label>
        <br />
        <div>
          <img src={iconSrc} alt="アイコン画像" />
        </div>
        <label htmlFor="email">
          <p>メールアドレス</p>
          {/* バリデーション */}
          {emailError && <p style={validation}>{emailError}</p>}
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
          {/* バリデーション */}
          {password && <p style={validation}>{passwordError}</p>}
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
