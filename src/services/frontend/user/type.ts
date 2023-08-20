export type PostGetUserRequest = {
  token: string;
};

export type PostGetUserResponse = {
  user: User;
};
type User = {
  userId: string;
  email: string;
  name: string;
  profile: string;
  provider: string;
  created_at: string;
};
