"use client";

import type { ReactNode } from "react";
import { configureAmplifyClient } from "@/lib/amplify-client";

type AmplifyClientProviderProps = {
  children: ReactNode;
};

export function AmplifyClientProvider({ children }: AmplifyClientProviderProps) {
  configureAmplifyClient();
  return <>{children}</>;
}
