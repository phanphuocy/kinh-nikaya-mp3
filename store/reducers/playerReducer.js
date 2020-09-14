import { INITIALIZE_PLAYER } from "../types";

const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const initialState = {
  index: 0,
  isSeeking: false,
  shouldPlayAtEndOfSeek: false,
  playbackInstance: null,
  state: {
    showVideo: false,
    playbackInstanceName: LOADING_STRING,
    loopingType: LOOPING_TYPE_ALL,
    muted: false,
    playbackInstancePosition: null,
    playbackInstanceDuration: null,
    shouldPlay: false,
    isPlaying: false,
    isBuffering: false,
    isLoading: true,
    shouldCorrectPitch: true,
    volume: 1.0,
    rate: 1.0,
  },
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_PLAYER:
      return {
        ...state,
        playerLoaded: true,
      };
    default:
      return state;
  }
};

export default playerReducer;
