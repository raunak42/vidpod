"use client"
import { RecoilRoot } from "recoil";

interface RecoiProviderProps {
  children: React.ReactNode;
}

export const RecoiProvider: React.FC<RecoiProviderProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
