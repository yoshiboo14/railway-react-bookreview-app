import React from "react";

export const Pagination = (props) => {
  return (
    <>
      <div>ページネーションコンポーネントがあります</div>
      <button onClick={props.prevPage}>前へ</button>
      <button onClick={props.nextPage}>次へ</button>
    </>
  );
};
