import {
  LOAD_NEW_PLAYBACK_INSTANCE,
  LOADING_INSTANCE,
  PAUSE_PLAYBACK_INSTANCE,
  PLAY_PLAYBACK_INSTANCE,
  SET_PLAYBACK_POSITION,
  UPDATE_PLAYBACK_STATUS,
} from "../types";
import { Audio } from "expo-av";

export const loadingInstance = () => {
  return {
    type: LOADING_INSTANCE,
  };
};

function updateStatus(dispatch, status) {
  dispatch({
    type: UPDATE_PLAYBACK_STATUS,
    payload: {
      status: status,
    },
  });
}

export const loadNewPlaybackInstance = (
  instance,
  source,
  parts,
  shouldPlay = true,
  state
) => async (dispatch, getState) => {
  try {
    console.log("ACTIONS: LOAD NEW PLAYBACK");
    console.log("SOURCE:", source);

    function onPlaybackStatusUpdate(status) {
      console.log(status);
      updateStatus(dispatch, status);
    }
    // let instance = getState().player.playbackInstance;
    console.log("Instance", instance);
    loadingInstance();

    if (instance !== null) {
      await instance.unloadAsync();
      // this.instance.setOnPlaybackStatusUpdate(null);
      instance = null;
    }

    const LOOPING_TYPE_ONE = 1;

    const initialStatus = {
      shouldPlay: shouldPlay,
      // rate: state.rate,
      // shouldCorrectPitch: state.shouldCorrectPitch,
      // volume: state.volume,
      // isMuted: state.muted,
      // isLooping: state.loopingType === LOOPING_TYPE_ONE,
    };

    const protocol = "https:";
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: protocol + source },
      initialStatus,
      onPlaybackStatusUpdate
    );

    console.log("SOUND", sound);
    console.log("STATUS", status);

    dispatch({
      type: LOAD_NEW_PLAYBACK_INSTANCE,
      payload: {
        instance: sound,
        status: status,
        parts: parts,
      },
    });
  } catch (error) {
    console.log("ERROR:");
    console.log(error);
  }
};

export const pausePlaybackIntance = (instance) => async (dispatch) => {
  try {
    if (instance !== null) {
      instance.pauseAsync();
    }

    console.log("PAUSING");
    const status = await instance.getStatusAsync();
    console.log("STATUS:", status);

    dispatch({
      type: PAUSE_PLAYBACK_INSTANCE,
      payload: { instance: instance, status: status },
    });
  } catch (error) {
    console.log(error);
  }
};

export const playPlaybackIntance = (instance) => async (dispatch) => {
  try {
    if (instance !== null) {
      instance.playAsync();
    }

    console.log("PLAYING");
    const status = await instance.getStatusAsync();
    console.log("STATUS:", status);

    dispatch({
      type: PLAY_PLAYBACK_INSTANCE,
      payload: { instance: instance, status: status },
    });
  } catch (error) {
    console.log(error);
  }
};

export const setPlaybackPosition = (instance, current, offset) => async (
  dispatch
) => {
  try {
    if (instance !== null) {
      let newPosition = current + offset;
    }
  } catch (error) {
    console.log(error);
  }
};
