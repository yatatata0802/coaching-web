// 管理者判定機能
export const isAdmin = (): boolean => {
  // /adminを含むURLで判定
  return window.location.pathname.includes("/admin");
};

// 管理者ログアウト
export const logoutAdmin = (): void => {
  window.location.href = "/";
};

// 管理者認証ページの表示（不要になったため削除）
export const showAdminLogin = (): void => {
  // 何もしない
};
