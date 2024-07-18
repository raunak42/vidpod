import { atom } from "recoil";

export const adTypeState = atom<string | null>({
    key: 'adTypeState',
    default: null,
});