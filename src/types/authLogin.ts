import { AuthProvider } from ".";

export type AuthRequest = {
  email: string;
  provider: AuthProvider;
  name?: string;
  profile?: string;
};
