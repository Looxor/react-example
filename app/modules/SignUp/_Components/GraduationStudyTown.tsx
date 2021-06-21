import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../config";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { validateEmail } from "../../../utils/forms/validationRules";
import { CallServerPromise } from "../../../utils/app/CallServer";
import { openCityTownOverlay } from "./CityListComponent";

const GraduationStudyTown = props => {
  const [state, setState] = useState({
    studytown: '',
    loadingCities: false,
  });
  const setState2 = useCallback(
    state2 => {
      setState({...state, ...state2});
    },
    [state],
  );

  const openCityPicker = cities => {
    openCityTownOverlay(cities, changeCityHandler);
  };

  const changeCityHandler = studytown => {
    setState2({isValidCityName: true, studytown});
    props.onChangeStudyTown(studytown);
  };

  const studyTownSelectPressHandler = async () => {
    if (props.cities) {
      openCityPicker(props.cities);
      setState2({cities: props.cities});
    } else {
      if (!validateEmail(props.email)) {
        await standardFunctions.show_alert_async(
          strings.SIGNUP.STUDENT1.TITLE,
          strings.SIGNUP.STUDENT1.INVALID_EMAIL,
        );
      } else {
        setState2({loadingCities: true});
        let request = await CallServerPromise.does_email_already_exist(
          props.email,
        );
        if (request.success) {
          setState2({loadingCities: false});
          if (request.data === true) {
            await standardFunctions.show_alert_async(
              strings.SIGNUP.STUDENT1.TITLE,
              strings.SIGNUP.STUDENT1.ALREADY_EXIST,
            );
          } else {
            // not enough base data
            // I can't get the university data using email due to the following reasons
            // 1) I don't have email verified for now.
            //    federico gave me test@smartcreative.eu, but it shows me "Email is not verified"
            // 2) It is unclear in using get_university_data_from_email because it's not signed in for now.
            //    It means that the firebase_idToken can be generated even though user is not signed in?
            //    Anyway, I will continue in this situation, but needs to be answered above things.
            //    Instead, I will use the temporary data which I got using christian.locatelli.dev@gmail.com
            // const tempDataWhenNotEnoughParams = {
            //   data: {
            //     cities: ['Milano'],
            //     domains: ['smartcreative.eu', 'thefaculty.it'],
            //     last_update_date: '2019-11-15T16:43:56.658Z',
            //     name: 'SmartCreative Srl',
            //     university_id: '5bb8f32f1c9d44000022b211',
            //     version: 0,
            //   },
            //   success: true,
            // };

            request = await CallServerPromise.is_student_email(props.email);
            // At this stage, I need to check if it's student email or not.
            // OK test@smartcreative.eu is student email now.
            if (request.success) {
              if (request.data !== true) {
                await standardFunctions.show_alert_async(
                  strings.SIGNUP.STUDENT1.TITLE,
                  strings.SIGNUP.STUDENT1.NOT_UNIVERSITY_EMAIL,
                );
              } else {
                // Will ignore get_university_data_from_email because I can't the list from the server.
                // Server sends me "email not verified" in any case, in any test
                // I think that the email should be registered before this process.
                // Here, I need to get the list of universities location or something.
                // As you can see, I can get the list of the universities study towns because
                // test@smartcreative.eu is not verified by the server. What shall I do here?
                request =
                  await CallServerPromise.get_university_data_from_email(
                    props.email,
                  );
                if (request.success) {
                  openCityPicker(request.data.cities);
                  setState2({cities: request.data.cities});
                }
              }
            }

            // openCityPicker(tempDataWhenNotEnoughParams.data.cities);
          }
        }
      }
    }

    //
    // openCityTownOverlay(cities, changeCityHandler);
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        disabled={state.loadingCities}
        style={styles.studyTown}
        onPress={studyTownSelectPressHandler}>
        <Text
          style={[
            styles.inputText,
            styles.studyTownText,
            state.studytown ? styles.studyTownSelected : {},
          ]}>
          {state.studytown
            ? state.studytown
            : strings.SIGNUP.STUDENT1.STUDY_TOWN}
        </Text>
        {state.loadingCities && (
          <ActivityIndicator
            style={styles.loadingCitiesIcon}
            color={colors.THEFACULTY}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputText: {},
  graduation_year: {
    fontFamily: constants.DEFAULT_FONT,
    color: 'black',
  },
  studyTown: {
    height: 50,
    justifyContent: 'center',
  },
  studyTownText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.DEFAULT_PLACEHOLDER,
    fontSize: 16,
    lineHeight: 42,
    textAlignVertical: 'center',
  },
  studyTownSelected: {
    color: colors.BLACK,
  },
  loadingCitiesIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: 15,
    top: 13,
  },
});

export default GraduationStudyTown;
