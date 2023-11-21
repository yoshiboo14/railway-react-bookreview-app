describe("Sample test", () => {
  it("check data", () => {
    cy.visit("signintestcy.html"); // 今回はファイルの相対パス

    cy.get("#input-name").type("ログイン太郎");
    cy.get("#input-email").type("test.test@email.com"); // 適当なメールアドレスを渡す
    cy.get("#input-password").type("PasswordSample123");
    cy.get("#submit").click(); // ログインボタンを押す

    // 以下、出力のチェック
    cy.get("#result-name").should("have.text", "ログイン太郎");
    cy.get("#result-email").should("have.text", "test.test@email.com");
    cy.get("#result-password").should("have.text", "PasswordSample123");

    // cy.get("#result-email").should("have.text", "dummy@email.com");
  });
});
