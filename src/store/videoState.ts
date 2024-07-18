import { RefObject } from 'react';
import { atom } from 'recoil';

export const videoLengthState = atom({
    key: 'videoLengthState',
    default: 0,
});

export const currentTimeState = atom({
    key: 'currentTimeState',
    default: 0,
});

export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false,
});

export const videoRefState = atom<RefObject<HTMLVideoElement> | null>({
    key: 'videoRefState',
    default: null,
  });
  
  