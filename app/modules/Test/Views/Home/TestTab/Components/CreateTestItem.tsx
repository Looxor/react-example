import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

import { colors, constants, strings } from "../../../../../../config";
import { routes } from "../../../../../../navigation/rootNavigation/navigation.constants";
import TestManager, { TestCreateMode, TestEvent } from "../../../../ViewModels/_Common/TestManager";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";
import NavigationService from "../../../../../../utils/app/NavigationService";

const CreateTestItem = props => {
  const createNewTestPressHandler = () => {
    standardFunctions.add_firebase_event_log(
      'test',
      'button_create_test_clicked',
    );
    TestManager.testCreateMode = TestCreateMode.M_2_4;
    TestManager.bindEvent(
      TestEvent.onCreatedTestInstance,
      props.onCreatedTestInstance,
    );
    NavigationService.navigate(routes.TEST_NAVIGATOR, {
      screen: routes.TEST_COURSE_OF_STUDY,
    });
  };

  return (
    <TouchableOpacity
      onPress={createNewTestPressHandler}
      style={{...styles.container, ...props.style}}>
      <FastImage
        style={styles.plusIcon}
        source={require('../../../../../../../assets/images/icons/icn_plus_blue.png')}
      />
      <Text style={styles.text}>
        {strings.TEST.TEST_SCREEN.CREATE_NEW_BUTTON}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStyle: 'dashed',
    borderColor: colors.THEFACULTY,
    borderWidth: constants.onePixel * 2,
    borderRadius: 10,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    marginBottom: 20,
  },
  plusIcon: {width: 20, height: 20},
  text: {
    color: colors.THEFACULTY,
    fontSize: 18,
    marginLeft: 10,
    marginTop: 5.5,
    lineHeight: 20,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default React.memo(CreateTestItem);
