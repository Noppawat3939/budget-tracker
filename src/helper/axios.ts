export const createAuthHeader = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
