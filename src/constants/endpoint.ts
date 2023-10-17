export const ENDPOINT = {
  CONTENT: "/api/content",
  AUTH: {
    SOCIAL_LOGIN: "/api/auth/login/social",
  },
  USER: "/api/user/info",
  PATH_NAME: "/api/path",
  BUDGET: {
    CREATE: "/api/budget/create",
    GET: "/api/budget/get",
    EDIT: "/api/budget/edit",
    DELETE: "/api/budget/delete",
    BALANCE: "/api/budget/balance",
  },
} as const;
