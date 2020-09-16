import tracks from "../../database/tracks.json";
import {
  LOAD_NEW_PLAYBACK_INSTANCE,
  LOADING_INSTANCE,
  PAUSE_PLAYBACK_INSTANCE,
  PLAY_PLAYBACK_INSTANCE,
  UPDATE_PLAYBACK_STATUS,
} from "../types";

const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

const initialState = {
  index: 0,
  tracks: tracks,
  parts: [],
  currentPart: 0,
  loadingInstance: false,
  isSeeking: false,
  shouldPlayAtEndOfSeek: false,
  playbackInstance: null,
  state: {
    showVideo: false,
    muted: false,
    playbackInstanceName: LOADING_STRING,
    loopingType: LOOPING_TYPE_ALL,
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
  status: null,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEW_PLAYBACK_INSTANCE:
      return {
        ...state,
        playbackInstance: action.payload.instance,
        status: action.payload.status,
        parts: action.payload.parts,
        loadingInstance: false,
      };
    case UPDATE_PLAYBACK_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
    case PAUSE_PLAYBACK_INSTANCE:
      return {
        ...state,
        playbackInstance: action.payload.instance,
        status: action.payload.status,
      };
    case PLAY_PLAYBACK_INSTANCE:
      return {
        ...state,
        playbackInstance: action.payload.instance,
        status: action.payload.status,
      };
    case LOADING_INSTANCE:
      return {
        ...state,
        loadingInstance: true,
      };
    default:
      return state;
  }
};

export default playerReducer;
