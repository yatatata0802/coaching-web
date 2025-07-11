// 管理者判定機能
export const isAdmin = (): boolean => {
  // /adminを含むURLで判定
  return window.location.pathname.includes("/admin");
};
