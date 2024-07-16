const accessTokenStr = 'accessToken';

export const AccessTokenService = {
  get: () =>
    typeof window !== 'undefined' ? localStorage.getItem(accessTokenStr) : null,
  set: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(accessTokenStr, token);
    }
  },
  remove: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(accessTokenStr);
    }
  },
};

export const LocalStorageService = {
  AccessToken: AccessTokenService,
};
export default LocalStorageService;
