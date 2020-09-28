import {
  LOAD_NEW_PLAYBACK_INSTANCE,
  LOADING_INSTANCE,
  PAUSE_PLAYBACK_INSTANCE,
  PLAY_PLAYBACK_INSTANCE,
  SET_PLAYBACK_POSITION,
  UPDATE_PLAYBACK_STATUS,
  RESET_PLAYBACK,
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
  parts,
  startAt = 0,
  shouldPlay = true,
  suttaName
) => async (dispatch) => {
  try {
    console.log("ACTIONS: LOAD NEW PLAYBACK");
    console.log(("PARTS", parts));

    function onPlaybackStatusUpdate(status) {
      console.log("UPDATING STATUS", status);
      updateStatus(dispatch, status);
    }

    // console.log("Instance", instance);
    loadingInstance();

    if (instance !== null) {
      await instance.unloadAsync();
      instance = null;
    }

    let source = parts[startAt].url;
    let fileName = parts[startAt].title;

    const initialStatus = {
      shouldPlay: true,
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
        currentPart: startAt,
        suttaName: suttaName,
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
    console.log("ERROR:");
    console.log(error);
  }
};

export const playPlaybackIntance = (instance) => async (dispatch) => {
  try {
    let status;
    if (instance !== null) {
      console.log("ACTION: PLAYING");
      await instance.playAsync();
      status = await instance.getStatusAsync();
      dispatch({
        type: PLAY_PLAYBACK_INSTANCE,
        payload: { instance: instance, status: status },
      });
    } else {
      console.log("There is no playback instance currently available");
      dispatch({
        type: RESET_PLAYBACK,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setPlaybackPosition = (instance, newPosition) => async (
  dispatch
) => {
  try {
    if (instance) {
      console.log("ACTION: SET POSITION");
      await instance.setPositionAsync(newPosition);
      status = await instance.getStatusAsync();
      dispatch({
        type: SET_PLAYBACK_POSITION,
        payload: {
          instance: instance,
          status: status,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
