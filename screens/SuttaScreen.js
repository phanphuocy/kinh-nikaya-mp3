import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import SuttaScreenMenu from "../components/SuttaScreenMenu";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import custom components
import AudioControlPanel from "../components/AudioControlPanel";
import ScrollIndicator from "../components/ScrollIndicator";

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
        {/* <TouchableOpacity onPress={menuButtonHandler}>
          <MenuButtonContainer>
            <Ionicons name="md-menu" size={28} color="white" />
          </MenuButtonContainer>
        </TouchableOpacity> */}
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
  suttaName,
  loadNewPlaybackInstance,
  addNewReadingSutta,
  navigation,
  route,
}) => {
  const [openAudioPanel, setOpenAudioPanel] = useState(
    route.params.openWithAudio
  );

  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (route.params.openWithAudio) {
      if (suttaName !== sutta.codeName) {
        loadNewPlaybackInstance(instance, tracks, 0, true, sutta.codeName);
      }
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
          (event.nativeEvent.contentSize.height -
            event.nativeEvent.layoutMeasurement.height)) *
          100
      ) / 100;
    setScrollingPosition(position);
    let scrollingOffset = Math.round(event.nativeEvent.contentOffset.y);
    // Only fire add new sutta action when scrolling changed by 0.01 and user have
    // read over 10% percent
    if (position !== scrollingPosition && position >= 0.1) {
      addNewReadingSutta(id, sutta, scrollingPosition, scrollingOffset);
    }
  }

  const [scrollingPosition, setScrollingPosition] = useState(0);

  function handleCloseAudioPanel() {
    setOpenAudioPanel(false);
  }

  return (
    <Screen>
      {openMenu && <SuttaScreenMenu />}
      <ScreenHeader
        closeButtonHandler={handleCloseButtonClicked}
        increaseFontsizeHandler={handleIncreaseFontsize}
        decreaseFontsizeHandler={handleDecreaseFontsize}
        menuButtonHandler={toggleMenu}
      />
      <ScrollIndicator percent={scrollingPosition} />
      <ScrollView
        ref={scrollViewRef}
        onScroll={(e) => handleOnContentScroll(e)}
        scrollEventThrottle={200}
        onLayout={(evt) => {
          evt.persist();
          if (scrollViewRef.current && route.params.scrollOffset) {
            scrollViewRef.current.scrollTo({
              x: 0,
              y: route.params.scrollOffset,
              animate: true,
            });
          }
        }}
      >
        <ContentHeader>
          <SuttaSubtitle>
            {sutta.belongToCollection.name} - {sutta.codeName}
          </SuttaSubtitle>
          <Underline />
          <SuttaTitle>{sutta.name}</SuttaTitle>
        </ContentHeader>
        <ReadingText style={{ fontSize: fontSize }}>{suttaText}</ReadingText>
      </ScrollView>
      {openAudioPanel && (
        <AudioControlPanel onCloseButton={handleCloseAudioPanel} />
      )}
      {/* <Text>{JSON.stringify(tracks, null, 2)}</Text> */}
    </Screen>
  );
};

const Screen = styled.View`
  background-color: #f9f9f9;
  flex: 1;
`;

const SuttaSubtitle = styled.Text`
  text-align: center;
  font-family: sans400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 8px;
  padding: 0 16px;
`;

const Underline = styled.View`
  align-self: center;
  width: 124px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.08);
`;

const SuttaTitle = styled.Text`
  text-align: center;
  font-family: serif400;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.87);
  margin-top: 12px;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const ContentHeader = styled.View`
  padding: 32px 0 12px;
`;

const ReadingText = styled.Text`
  font-family: serif400;
  font-size: 16px;
  padding: 12px 24px;
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

  let belongToCollectionId = state.system.suttas.byIds[id].belongToCollection;

  return {
    id: id,
    sutta: {
      ...state.system.suttas.byIds[id],
      belongToCollection: state.system.collections.byIds[belongToCollectionId],
    },
    suttaText: state.system.suttasText.byIds[id],
    tracks: tracks,
    instance: state.player.playbackInstance,
    suttaName: state.player.suttaName,
  };
}

export default connect(mapStateToProps, {
  loadNewPlaybackInstance,
  addNewReadingSutta,
})(SuttaScreen);
