import { INITIALIZE_PLAYER } from "../types";
import { Audio } from "expo-av";

export const initializePlayer = () => async (dispatch) => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require("../../assets/01dusttilldawn.mp3"));
    // await soundObject.playAsync();
    // Your sound is playing!
    const status = await soundObject.getStatusAsync();

    console.log(status);

    dispatch({
      type: INITIALIZE_PLAYER,
    });

    // Don't forget to unload the sound from memory
    // when you are done using the Sound object
    // await soundObject.unloadAsync();
  } catch (error) {
    // An error occurred!
    console.log(error);
  }
};
