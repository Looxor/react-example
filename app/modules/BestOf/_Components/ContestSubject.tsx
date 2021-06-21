import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, constants } from "../../../config";

const ContestSubject = props => {
  const {subject_name, current_index, all_count} = props;
  return (
    <View style={styles.subjectContainer}>
      <Text style={styles.subject}>{subject_name}</Text>
      <Text style={styles.subjectInfo}>
        {`Domanda ${current_index} di ${all_count}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subjectContainer: {marginLeft: 50, alignItems: 'center'},
  subject: {
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
  },
  subjectInfo: {
    color: colors.WHITE,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default ContestSubject;
