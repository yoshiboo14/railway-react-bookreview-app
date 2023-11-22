import React from "react";
import render from "@testing-library/react";
import { SignIn } from "../SignIn";

describe("ログインフォームのテストを行います", () => {
  test("サインインコンポーネントをレンダリング", () => {
    render(<SignIn />);
  });
});
