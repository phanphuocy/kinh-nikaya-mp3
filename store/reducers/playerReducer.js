import tracks from "../../database/tracks.json";
import {
  LOAD_NEW_PLAYBACK_INSTANCE,
  LOADING_INSTANCE,
  PAUSE_PLAYBACK_INSTANCE,
  PLAY_PLAYBACK_INSTANCE,
  SET_PLAYBACK_POSITION,
  UPDATE_PLAYBACK_STATUS,
  RESET_PLAYBACK,
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
  isLoadingNewInstance: false,
  isSeeking: false,
  shouldPlayAtEndOfSeek: false,
  playbackInstance: null,
  // state: {
  //   showVideo: false,
  //   muted: false,
  //   playbackInstanceName: "",
  //   loopingType: LOOPING_TYPE_ALL,
  //   playbackInstancePosition: null,
  //   playbackInstanceDuration: null,
  //   shouldPlay: false,
  //   isPlaying: false,
  //   isBuffering: false,
  //   isLoading: true,
  //   shouldCorrectPitch: true,
  //   volume: 1.0,
  //   rate: 1.0,
  // },
  status: null,
  suttaName: "",
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NEW_PLAYBACK_INSTANCE:
      return {
        ...state,
        playbackInstance: action.payload.instance,
        status: action.payload.status,
        parts: action.payload.parts,
        currentPart: action.payload.currentPart,
        isLoadingNewInstance: false,
        suttaName: action.payload.suttaName,
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
    case SET_PLAYBACK_POSITION:
      return {
        ...state,
        playbackInstance: action.payload.instance,
        status: action.payload.status,
      };
    case RESET_PLAYBACK:
      return initialState;
    case LOADING_INSTANCE:
      return {
        ...state,
        isLoadingNewInstance: true,
      };
    default:
      return state;
  }
};

export default playerReducer;
