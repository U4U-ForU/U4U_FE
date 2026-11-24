"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SignupData {
  email: string;
  password: string;
  nickname: string;
  id: string;
}

interface SignupContextValue {
  data: SignupData;
  save: (patch: Partial<SignupData>) => void;
}

const EMPTY_DATA: SignupData = {
  email: "",
  password: "",
  nickname: "",
  id: "",
};

const SignupContext = createContext<SignupContextValue | null>(null);

export function SignupProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SignupData>(EMPTY_DATA);

  const save = useCallback((patch: Partial<SignupData>) => {
    setData((previous) => ({ ...previous, ...patch }));
  }, []);

  const value = useMemo(() => ({ data, save }), [data, save]);

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
}

export function useSignupContext() {
  const context = useContext(SignupContext);

  if (context === null) {
    throw new Error(
      "useSignupContext는 SignupProvider 안에서만 사용할 수 있습니다.",
    );
  }

  return context;
}
