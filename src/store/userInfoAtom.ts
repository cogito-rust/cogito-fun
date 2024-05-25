import { atom } from 'jotai';

export const userInfoAtom = atom<StoreUserInfo | null>(null);

export const userLoggedIn = atom<boolean>(false);
