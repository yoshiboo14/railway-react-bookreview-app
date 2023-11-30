const onUploadIcon = () => {
  const img = {
    iconUrl: iconUrl,
    token: accessToken,
  };
  console.log(img);
  // 画像のアップロード
  axios
    .post("https://railway.bookreview.techtrain.dev/uploads", img, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "multipart/form-data",
        // accept: "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      console.log(accessToken);
      // setAccessToken(res.data.token);
      history("/");
    })
    .catch((err) => {
      console.log(err);
      setError(err.response.data.message);
    });
};
