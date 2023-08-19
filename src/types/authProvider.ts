import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion } from "next-auth/react";

export type AuthProvider = LiteralUnion<BuiltInProviderType>;
