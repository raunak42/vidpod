import { atom } from "recoil";

export const adTypeState = atom<"Auto" | "Static" | "A/B test" | "">({
    key: 'adTypeState',
    default: "",
});

export const adStartsState = atom<number>({
    key: 'adStartsState',
    default: 0,
});

export const adImgUrlState = atom<string>({
    key: 'adImgUrlState',
    default: "",
});

export const adsToTestState = atom<string[] | null>({
    key: 'adsToTestState',
    default: null,
});

export const showAdMarkersModalState = atom<boolean>({
    key: 'showAdMarkersModalState',
    default: false,
});

export const showABTestModalState = atom<boolean>({
    key: 'showABTestModalState',
    default: false,
});

export const showTestResultModalState = atom<boolean>({
    key: 'showTestResultModalState',
    default: false,
});

export const displayHazeState = atom<boolean>({
    key: 'displayHazeState',
    default: false,
});

export const displayPickTimeModalState = atom<boolean>({
    key: 'displayPickTimeModalState',
    default: false,
});

export const disPlayStaticAdModalState = atom<boolean>({
    key: 'disPlayStaticAdModalState',
    default: false,
});

export const selectMarkerClickedState = atom<boolean>({
    key: 'selectMarkerClickedState',
    default: false,
});

export const displayAdMarkersModalState = atom<boolean>({
    key: 'displayAdMarkersModalState',
    default: false,
});

interface MarkerType {
    id: number;
    left: number;
}

export const showTimeLineMarkerState = atom<boolean>({
    key: 'showTimeLineMarkerState',
    default: true,
});

export const markerToHideState = atom<number | null>({
    key: 'markerToHideState',
    default: null,
});

export const showDeleteModalState = atom<boolean>({
    key: 'showDeleteModalState',
    default: false,
});

export const unavailableStartState = atom<boolean>({
    key: 'unavailableStartState',
    default: false,
});

export const markerIdState = atom<number |null>({
    key: 'markerIdState',
    default: null,
});