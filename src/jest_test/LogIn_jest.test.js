import { render, screen } from "@testing-library/react";
import { LogIn } from "../LogIn_jest";
import userEvent from "@testing-library/user-event";

describe("jestを用いた単体テスト", () => {
  test("サインインコンポーネントをレンダリング", () => {
    render(<LogIn />);
    screen.debug();
  });

  test("メールアドレスという文字列が取得できているか確認", () => {
    render(<LogIn />);
    const element = screen.getByText("メールアドレス");
    screen.debug(element);
    expect(element).toBeInTheDocument();
  });

  test("ログインフォームの入力", () => {
    render(<LogIn />);
    // inputの取得
    const user = screen.getByTestId("user");
    const email = screen.getByTestId("email");
    const password = screen.getByTestId("password");

    // 値の入力
    userEvent.type(user, "テスト太郎");
    userEvent.type(email, "test.test@gmail.com");
    userEvent.type(password, "Password123");

    // 入力値の形式が正しいか判定
    expect(user.value).toBe("テスト太郎");
    expect(email.value).toBe("test.test@gmail.com");
    expect(password.value).toBe("Password123");
    // パスワードが違う場合
    // expect(password.value).toBe("Password1234");
  });
});
