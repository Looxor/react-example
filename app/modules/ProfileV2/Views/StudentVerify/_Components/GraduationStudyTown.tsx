import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, constants, strings} from '../../../../../config';
import standardFunctions from '../../../../../utils/app/StandardFunctions';
import {validateEmail} from '../../../../../utils/forms/validationRules';
import {CallServerPromise} from '../../../../../utils/app/CallServer';

const CHECK_ICON = require('../../../../../../assets/images/icons/icn_checkbox_checked.png');
const UNCHECK_ICON = require('../../../../../../assets/images/icons/icn_checkbox_unchecked.png');
const CityItem = props => {
  const {studytown, checked, onPressCityItem} = props;
  return (
    <TouchableOpacity
      style={{
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      onPress={() => onPressCityItem && onPressCityItem(studytown)}>
      {checked ? (
        <FastImage source={CHECK_ICON} style={styles.checkIcon} />
      ) : (
        <FastImage source={UNCHECK_ICON} style={styles.checkIcon} />
      )}
      <Text style={styles.iconText}>{studytown}</Text>
    </TouchableOpacity>
  );
};

const GraduationStudyTown = props => {
  const {style, onChangeStudyTown} = props;
  const [state, setState] = useState({
    cities: [],
    studytown: '',
    loadingCities: false,
  });
  const [collapsed, setCollapsed] = useState(false);

  const setState2 = useCallback(
    state2 => {
      setState({...state, ...state2});
    },
    [state],
  );

  useEffect(() => {
    onChangeStudyTown && onChangeStudyTown(state.studytown);
  }, [state.studytown]);

  const openCityPicker = cities => {
    Keyboard.dismiss();
    setState2({cities});
  };

  const changeCityHandler = studytown => {
    setState2({isValidCityName: true, studytown});
  };

  const studyTownSelectPressHandler = async () => {
    if (collapsed) {
      setCollapsed(!collapsed);
      openCityPicker(state.cities);
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

            request = await CallServerPromise.is_student_email(
              props.email.trim(),
            );
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
                  setCollapsed(!collapsed);
                  openCityPicker(request.data.cities);
                }
              }
            }

            // openCityPicker(tempDataWhenNotEnoughParams.data.cities);
          }
        } else {
          console.log('error on checking university email existence', request);
          setState2({loadingCities: false});
          await standardFunctions.show_alert_async(
            strings.SIGNUP.STUDENT1.TITLE,
            strings.SIGNUP.STUDENT1.COMPILE_ALL_FIELDS_FOR_STUDYTOWN,
          );
        }
      }
    }

    //
    // openCityTownOverlay(cities, changeCityHandler);
  };

  return (
    <>
      <View style={[styles.container, style]}>
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
          {state.loadingCities ? (
            <ActivityIndicator
              style={styles.loadingCitiesIcon}
              color={colors.THEFACULTY}
            />
          ) : (
            <FastImage
              resizeMode={'contain'}
              source={require('../../../../../../assets/images/icons/icn_dropdown_blue_open.png')}
              style={styles.dropDownIcon}
            />
          )}
        </TouchableOpacity>
      </View>
      {collapsed && (
        <View style={[styles.listContainer, style]}>
          {state.cities.map((item, index) => (
            <CityItem
              checked={item === state.studytown}
              key={String(index)}
              studytown={item}
              onPressCityItem={studytown => {
                standardFunctions.play_tap_sound();
                setState2({studytown});
              }}
            />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputText: {},
  graduation_year: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.DARK_ALOE_TF,
  },
  studyTown: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 5,
  },
  studyTownText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.THEFACULTY2,
    fontSize: 17,
    textAlignVertical: 'center',
  },
  studyTownSelected: {
    color: colors.THEFACULTY2,
  },
  loadingCitiesIcon: {
    width: 20,
    height: 20,
    // position: 'absolute',
    // right: 15,
    // top: 13,
  },
  dropDownIcon: {
    width: 18,
    height: 18,
  },
  listContainer: {},
  checkIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 2,
  },
  iconText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.THEFACULTY2,
  },
});

export default GraduationStudyTown;
