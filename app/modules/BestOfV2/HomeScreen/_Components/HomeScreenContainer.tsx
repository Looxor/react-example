import React from "react";
import { StyleSheet, View } from "react-native";
import GameScreen from "../Screens/GameScreen";
import SubjectsScreen from "../Screens/SubjectsScreen";
import ScoreboardScreen from "../Screens/ScoreboardScreen";
import HistoryScreen from "../Screens/HistoryScreen";

const HomeScreenContainer = props => {
  const {
    selectedBookmark,
    setSelectedBookmark,
    setIsToShowAnimation,
    isToShowAnimation,
    showUpArrowIcon,
    setShowUpArrowIcon,
    showDownArrowIcon,
    setShowDownArrowIcon,
  } = props;
  return (
    <View style={styles.container}>
      {selectedBookmark === 0 && (
        <HistoryScreen
          navigation={props.navigation}
          isToShowAnimation={isToShowAnimation}
          setIsToShowAnimation={setIsToShowAnimation}
        />
      )}
      {selectedBookmark === 1 && (
        <GameScreen
          navigation={props.navigation}
          setSelectedBookmark={setSelectedBookmark}
          setIsToShowAnimation={setIsToShowAnimation}
          showUpArrowIcon={showUpArrowIcon}
          setShowUpArrowIcon={setShowUpArrowIcon}
          showDownArrowIcon={showDownArrowIcon}
          setShowDownArrowIcon={setShowDownArrowIcon}
        />
      )}
      {selectedBookmark === 2 && (
        <ScoreboardScreen
          navigation={props.navigation}
          setSelectedBookmark={setSelectedBookmark}
        />
      )}
      {selectedBookmark === 3 && (
        <SubjectsScreen navigation={props.navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '86%',
    flex: 1,
  },
});

export default HomeScreenContainer;
