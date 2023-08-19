import { AuthProvider } from "@/types";

// AUTH
export type PostLoginWithSocialRequest = {
  email: string;
  name?: string;
  profile?: string;
  provider: AuthProvider;
};
