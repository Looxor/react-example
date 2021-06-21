import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../../../../../components";
import { colors, constants, strings } from "../../../../../../config";
import FastImage from "react-native-fast-image";
import { Label, Popover } from "teaset";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";

const TestInstanceItem = props => {
  const {test_id, test_name, test_university_name, new_created, is_a_test} =
    props;

  const resultPressHandler = () => {
    standardFunctions.add_firebase_event_log(
      'test',
      'button_training_clicked',
      {test_id: test_id},
    );
    props.onPressResult();
  };
  const pressSimulateButtonHandler = () => {
    standardFunctions.add_firebase_event_log(
      'test',
      'button_simulation_clicked',
      {test_id: test_id},
    );
    props.onPressSimulate();
  };
  return (
    <View style={{...styles.container, ...props.style}}>
      {new_created && (
        <Popover
          style={styles.popoverContainer}
          arrow="bottomLeft"
          paddingCorner={20}>
          <Label
            text={
              is_a_test
                ? strings.TEST.TEST_SCREEN.SUCCESS_CREATED_TEST
                : strings.TEST.TEST_SCREEN.SUCCESS_CREATED
            }
            style={styles.popoverTextStyle}
          />
        </Popover>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{test_name}</Text>
        <View style={styles.locationContainer}>
          <FastImage
            style={styles.locationIcon}
            source={require('../../../../../../../assets/images/icons/icn_pin_location.png')}
          />
          <Text style={styles.location}>{test_university_name}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={pressSimulateButtonHandler}
          style={styles.button}
          textStyle={styles.buttonText}>
          {strings.TEST.TEST_SCREEN.SIMULATE}
        </Button>
        <Button
          onPress={resultPressHandler}
          style={styles.button}
          textStyle={styles.buttonText}>
          {strings.TEST.TEST_SCREEN.RESULT}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGray,
    borderWidth: constants.onePixel,
    borderRadius: 10,
    width: '100%',
    height: 150,
    padding: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  infoContainer: {
    flexDirection: 'column',
    fontFamily: constants.DEFAULT_FONT,
  },
  title: {
    fontSize: 18,
    marginBottom: 3,
    color: colors.darkGray,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  location: {
    fontSize: 15,
    color: colors.gray,
    marginLeft: 3,
    marginTop: 0,
    fontFamily: constants.DEFAULT_FONT,
  },
  locationIcon: {width: 18, height: 18, marginTop: 1},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    borderColor: colors.THEFACULTY,
    borderWidth: constants.onePixel,
    width: '48%',
    height: 32,
    shadowColor: colors.DEFAULT_BACKGROUND,
    shadowOpacity: 0,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 0,
    elevation: 2,
  },
  buttonText: {
    height: 25,
    color: colors.THEFACULTY,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    paddingTop: 2,
  },
  popoverContainer: {
    backgroundColor: colors.THEFACULTY,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    position: 'absolute',
    zIndex: 2,
    top: -12,
    left: 10,
    width: 200,
    borderRadius: 15,
    shadowColor: '#777',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  popoverTextStyle: {
    color: colors.WHITE,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default TestInstanceItem;
