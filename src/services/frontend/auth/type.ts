import { AuthProvider } from "@/types";

export type PostLoginWithSocialRequest = {
  email: string;
  name?: string;
  profile?: string;
  provider: AuthProvider;
};
