import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";

const data = {
  EXP_0: {
    title: 'Need explanation',
    content: 'There is no enough explanation here',
  },
  EXP_1: {
    title: 'Need explanation',
    content: 'There is no enough explanation in P 2.3',
  },
};

const onPressErrorButton = errorId => {
  standardFunctions.show_alert(data[errorId].title, data[errorId].content);
};

const NeedExplanation = props => {
  const id = props.id;
  return (
    <TouchableOpacity
      onPress={() => onPressErrorButton(id)}
      style={[styles.viewReasonButton, props.style]}>
      <Text style={styles.viewReasonButtonText}>
        {props.text || "Can't do. View reason"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewReasonButton: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.RED_TF,
  },
  viewReasonButtonText: {
    color: colors.RED_TF,
    fontWeight: 'bold',
  },
});

export default React.memo(NeedExplanation);
