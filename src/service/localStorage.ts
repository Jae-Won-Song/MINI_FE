const accessTokenStr = "access-token";

export const AccessTokenService = {
  get: () => localStorage.getItem(accessTokenStr),
  set: (token) => localStorage.setItem(accessTokenStr, token),
  remove: () => localStorage.removeItem(accessTokenStr),
};

export const LocalStorageService = {
  AccessToken: AccessTokenService,
};
export default LocalStorageService;
