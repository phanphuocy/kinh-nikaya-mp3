import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import SuttaScreenMenu from "../components/SuttaScreenMenu";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import custom components
import AudioControlPanel from "../components/AudioControlPanel";

// Import actions
import { loadNewPlaybackInstance } from "../store/actions/playerActions";
import { addNewReadingSutta } from "../store/actions/personalActions";

const ScreenHeader = ({
  menuButtonHandler,
  closeButtonHandler,
  increaseFontsizeHandler,
  decreaseFontsizeHandler,
}) => {
  return (
    <HeaderContainer>
      <MenuContainer>
        <TouchableOpacity onPress={menuButtonHandler}>
          <MenuButtonContainer>
            <Ionicons name="md-menu" size={28} color="white" />
          </MenuButtonContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={decreaseFontsizeHandler}>
          <HeaderButtonContainer>
            <MaterialCommunityIcons
              name="format-font-size-decrease"
              size={28}
              color="white"
            />
          </HeaderButtonContainer>
        </TouchableOpacity>
        <TouchableOpacity onPress={increaseFontsizeHandler}>
          <HeaderButtonContainer>
            <MaterialCommunityIcons
              name="format-font-size-increase"
              size={28}
              color="white"
            />
          </HeaderButtonContainer>
        </TouchableOpacity>
      </MenuContainer>
      <TouchableOpacity onPress={closeButtonHandler}>
        <HeaderButtonContainer>
          <Ionicons name="md-close" size={28} color="white" />
        </HeaderButtonContainer>
      </TouchableOpacity>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  background-color: #606c38;
  padding: 28px 24px 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MenuContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MenuButtonContainer = styled.View`
  background-color: #545f31;
  border-radius: 8px;
  padding: 8px 12px;
  margin-right: 8px;
`;

const HeaderButtonContainer = styled.View`
  padding: 8px 4px;
  margin-right: 4px;
`;

const SuttaScreen = ({
  id,
  sutta,
  suttaText,
  tracks,
  instance,
  loadNewPlaybackInstance,
  addNewReadingSutta,
  navigation,
  route,
}) => {
  const [openAudioPanel, setOpenAudioPanel] = useState(
    route.params.openWithAudio
  );

  useEffect(() => {
    if (route.params.openWithAudio) {
      loadNewPlaybackInstance(instance, tracks[0].url, tracks, true, {});
    }
  }, [id]);

  //
  const fontSizes = [14, 16, 18, 20, 22];
  const [fontSize, setFontSize] = useState(fontSizes[2]);

  const [openMenu, setOpenMenu] = useState(false);

  function toggleMenu() {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  }

  function handleCloseButtonClicked() {
    navigation.goBack();
  }

  function handleIncreaseFontsize() {
    let currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  }

  function handleDecreaseFontsize() {
    let currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  }

  function handleOnContentScroll(event) {
    event.persist();
    let position =
      Math.round(
        (event.nativeEvent.contentOffset.y /
          event.nativeEvent.contentSize.height) *
          100
      ) / 100;
    setScrollingPosition(position);

    // Only fire add new sutta action when scrolling changed by 0.01 and user have
    // read over 10% percent
    if (position !== scrollingPosition && position >= 0.1) {
      addNewReadingSutta(id, sutta, scrollingPosition);
    }
  }

  const [scrollingPosition, setScrollingPosition] = useState(0);

  return (
    <Screen>
      {openMenu && <SuttaScreenMenu />}
      <ScreenHeader
        closeButtonHandler={handleCloseButtonClicked}
        increaseFontsizeHandler={handleIncreaseFontsize}
        decreaseFontsizeHandler={handleDecreaseFontsize}
        menuButtonHandler={toggleMenu}
      />
      <View>
        <Text>{scrollingPosition}</Text>
      </View>
      <ScrollView
        onScroll={(e) => handleOnContentScroll(e)}
        scrollEventThrottle={200}
      >
        {/* <Text>Sutta screen</Text>
        <Text>{id}</Text>
        <Text>{JSON.stringify(sutta, null, 2)}</Text> */}

        <ReadingText style={{ fontSize: fontSize }}>{suttaText}</ReadingText>
      </ScrollView>
      {openAudioPanel && <AudioControlPanel />}
      {/* <Text>{JSON.stringify(tracks, null, 2)}</Text> */}
    </Screen>
  );
};

const Screen = styled.View`
  background-color: #f9f9f9;
  flex: 1;
`;

const ReadingText = styled.Text`
  font-family: serif400;
  font-size: 16px;
  padding: 48px 24px;
`;

function mapStateToProps(state, ownProps) {
  const id = ownProps.route.params.id;

  const isThisTrackHaveAudio = state.system.suttas.byIds[id].hasOwnProperty(
    "tracks"
  );

  let tracks = null;

  if (isThisTrackHaveAudio) {
    tracks = state.system.suttas.byIds[id].tracks.map(
      (id) => state.player.tracks.byIds[id]
    );
  }

  return {
    id: id,
    sutta: state.system.suttas.byIds[id],
    suttaText: state.system.suttasText.byIds[id],
    tracks: tracks,
    instance: state.player.playbackInstance,
  };
}

export default connect(mapStateToProps, {
  loadNewPlaybackInstance,
  addNewReadingSutta,
})(SuttaScreen);
