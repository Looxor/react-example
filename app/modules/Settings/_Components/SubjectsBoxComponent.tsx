import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, constants } from "../../../config";

const SubjectItemComponent = props => {
  const {item, index} = props;
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
};

const SubjectsBoxComponent = props => {
  const {subjects} = props;
  return (
    <View style={styles.container}>
      {subjects &&
        subjects.map((item, index) => (
          <SubjectItemComponent index={index} item={item} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    height: 70,
    backgroundColor: colors.WHITE,
    marginBottom: 7,
    justifyContent: 'center',
    borderRadius: 18,
    paddingLeft: 15,
  },
  itemText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 16,
  },
});
export default SubjectsBoxComponent;
