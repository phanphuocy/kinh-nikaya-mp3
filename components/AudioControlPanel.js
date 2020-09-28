import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  pausePlaybackIntance,
  playPlaybackIntance,
  setPlaybackPosition,
} from "../store/actions/playerActions";
import convertToReadableTime from "../helpers/convertToReadableTime";
import Slider from "@react-native-community/slider";

const TrackPartList = ({ parts, currentPart, loading }) => {
  if (parts.length <= 0 || loading) {
    return <Text>Đang tải..</Text>;
  }
  return (
    <TrackPartListContainer>
      <Text>Các Phần: </Text>
      {parts.length === 1 ? (
        <Text>Chỉ có 1 phần</Text>
      ) : (
        <FlatList
          horizontal={true}
          data={parts}
          keyExtractor={(item) => item.id}
          renderItem={(props) => (
            <PartItem isActive={currentPart === props.index}>
              <Text>Phần {props.index + 1}</Text>
            </PartItem>
          )}
        />
      )}
    </TrackPartListContainer>
  );
};

const TrackPartListContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PartItem = styled.View`
  background-color: ${(props) => (props.isActive ? "gray" : "lightgray")};
  color: ${(props) => (props.isActive ? "white" : "darkgray")};
  padding: 4px 8px;
  margin-right: 4px;
  border-radius: 4px;
`;

const AudioControlPanel = ({
  player,
  pausePlaybackIntance,
  playPlaybackIntance,
  setPlaybackPosition,
  onCloseButton,
}) => {
  const {
    playbackInstance,
    parts,
    currentPart,
    status,
    isLoadingNewInstance,
  } = player;

  function pauseButtonHandler() {
    pausePlaybackIntance(playbackInstance);
  }

  function playButtonHandler() {
    playPlaybackIntance(playbackInstance);
  }

  function rewind10ButtonHandler() {
    if (status !== null) {
      let newPosition =
        status.positionMillis - 10000 <= 0 ? 0 : status.positionMillis - 10000;
      setPlaybackPosition(playbackInstance, newPosition);
    }
  }

  function fastforward30ButtonHandler() {
    if (status !== null) {
      let newPosition =
        status.positionMillis + 30000 >= status.durationMillis
          ? status.durationMillis
          : status.positionMillis + 30000;
      setPlaybackPosition(playbackInstance, newPosition);
    }
  }

  function onSliderSeeked(value) {
    if (value < 0 || value > 1) {
      return;
    }
    if (!status) {
      return;
    }
    let newPosition = Math.round(status.durationMillis * value);
    setPlaybackPosition(playbackInstance, newPosition);
  }

  // useEffect(() => {
  //   console.log(progressRef.current);
  // }, [status.positionMillis]);

  let progress =
    status && status.positionMillis && status.durationMillis
      ? status.positionMillis / status.durationMillis
      : 0;
  return (
    <PanelContainer>
      <TopRow>
        <TrackPartList
          parts={parts}
          currentPart={currentPart}
          loading={isLoadingNewInstance}
        />
        <TouchableNativeFeedback onPress={onCloseButton}>
          <CloseButtonWrapper>
            <Ionicons name="ios-arrow-down" size={24} color="black" />
          </CloseButtonWrapper>
        </TouchableNativeFeedback>
      </TopRow>
      {status ? (
        <TimelineRow>
          <Text>{convertToReadableTime(status.positionMillis)}</Text>
          <GrowView>
            <Slider
              style={{ width: "100%", height: 10 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#606C38"
              maximumTrackTintColor="#000000"
              thumbTintColor="#606C38"
              value={progress}
              onSlidingComplete={(newVal) => onSliderSeeked(newVal)}
              // ref={progressRef}
            />
          </GrowView>
          <Text>{convertToReadableTime(status.durationMillis)}</Text>
        </TimelineRow>
      ) : (
        <View>
          <Text>...loading...</Text>
        </View>
      )}
      <Row5>
        <Row5Item>
          {/* <IconButton
            icon={
              <MaterialCommunityIcons
                name="skip-previous"
                size={24}
                color="black"
              />
            }
          /> */}
        </Row5Item>
        <Row5Item>
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="rewind-10"
                size={24}
                color="black"
              />
            }
            onPress={rewind10ButtonHandler}
          />
        </Row5Item>
        <Row5Item>
          {status !== null && !status.isPlaying ? (
            <IconButton
              iconName="md-play"
              icon={<Ionicons name="md-play" size={24} color="black" />}
              onPress={playButtonHandler}
            />
          ) : (
            <IconButton
              iconName="md-pause"
              icon={<Ionicons name="md-pause" size={24} color="black" />}
              onPress={pauseButtonHandler}
            />
          )}
        </Row5Item>
        <Row5Item>
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="fast-forward-30"
                size={24}
                color="black"
              />
            }
            onPress={fastforward30ButtonHandler}
          />
        </Row5Item>
        <Row5Item>
          {/* <IconButton
            icon={
              <MaterialCommunityIcons
                name="skip-next"
                size={24}
                color="black"
              />
            }
          /> */}
        </Row5Item>
      </Row5>
    </PanelContainer>
  );
};

const Row5 = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Row5Item = styled.View`
  width: 20%;
  flex-direction: row;
  justify-content: center;
`;

const IconButton = ({ iconName = "md-play", icon, onPress }) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <ButtonWraper>{icon}</ButtonWraper>
    </TouchableNativeFeedback>
  );
};

const ButtonWraper = styled.View`
  padding: 8px 16px;
`;

const PanelContainer = styled.View`
  min-height: 160px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  background-color: white;
  padding: 16px 12px;
  box-shadow: 0px -12px 4px black;
  elevation: 16;
  /* border-top-left-radius: 8px;
  border-top-right-radius: 8px; */
`;

const TopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TimelineRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

const GrowView = styled.View`
  flex-grow: 1;
  /* flex-shrink: 1; */
`;

const CloseButtonWrapper = styled.View`
  padding: 4px 8px;
`;

function mapStateToProps(state, ownProps) {
  return {
    player: state.player,
  };
}

export default connect(mapStateToProps, {
  pausePlaybackIntance,
  playPlaybackIntance,
  setPlaybackPosition,
})(AudioControlPanel);
