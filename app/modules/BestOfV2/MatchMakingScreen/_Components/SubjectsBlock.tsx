import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { WAITING_INDICATOR_HEIGHT } from "./WaitingIndicator";
import { USER_BLOCK_HEIGHT } from "./UserInfoBlock";
import { colors, constants } from "../../../../config";
import FadeInView from "./FadeInView";

const PLAYER_BLOCK_HEIGHT =
  (Dimensions.get('window').height - WAITING_INDICATOR_HEIGHT) / 2;
const containerHeight = PLAYER_BLOCK_HEIGHT - USER_BLOCK_HEIGHT - 100;
const SubjectsBlock = props => {
  const {subjects, fade = false} = props;
  return subjects && subjects.length > 0 ? (
    <FadeInView
      duration={!fade ? 0 : 1000}
      style={{maxHeight: containerHeight}}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {subjects &&
          subjects.map((subject, index) => (
            <View key={String(index)} style={styles.subjectView}>
              <Text style={styles.subjectText}>{subject.name}</Text>
            </View>
          ))}
      </ScrollView>
    </FadeInView>
  ) : null;
};

const styles = StyleSheet.create({
  subjectView: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    margin: 5,
  },
  subjectText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 15,
    color: colors.BESTOF2.BG1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 5,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 1,
    elevation: 5,
  },
});

export default SubjectsBlock;
