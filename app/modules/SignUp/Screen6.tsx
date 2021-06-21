// Libraries //
import React, { useEffect, useState } from "react";

import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { Icon, Item, Text } from "native-base";
// Configs //
import { Button, StandardBoxWithImage } from "../../components";
import { colors, constants, strings } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";

import genders from "../../utils/misc/Gender";
import profile_image from "../../utils/misc/ProfileImage";
import { styles } from "./Screen6.style";
// redux actions
import { createAccountAPI, getAllFacultiesAPI } from "./_actions";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { CONFIRM_EMAIL_TYPE } from "./EmailPendingScreen";

const defaultFaculty: any = {};
const Screen6 = props => {
  const signUpInfo = useSelector((state: any) => state.signUp);

  const [selectedFaculty, setSelectedFaculty] = useState(defaultFaculty);
  const [showAll, setShowAll] = useState(false);
  const [validContinue, setValidContinue] = useState(false);
  const [allFaculties, setAllFaculties] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setValidContinue(selectedFaculty.faculty_id !== undefined);
  }, [selectedFaculty, allFaculties]);

  const showAllHandler = async () => {
    try {
      if (!showAll) {
        if (allFaculties.length === 0) {
          setLoadingAll(true);
          const all_faculties = await getAllFacultiesAPI();
          setAllFaculties(all_faculties);
          setLoadingAll(false);
        }
      }
      setShowAll(!showAll);
    } catch (e) {}
  };

  const dispatch = useDispatch();
  const goNextScreen = async () => {
    try {
      let {
        firstname,
        lastname,
        gender,
        birthday,
        birth_place,
        is_student = false,
        daily_mode = false,
        email,
        nickname,
        password,
        major_id = signUpInfo.User.major.id,
        faculty_id = selectedFaculty.faculty_id,
        profile_image_url,
      } = signUpInfo.User;
      birthday = new Date(birthday).toISOString();
      gender = genders[gender];
      profile_image_url = profile_image[gender];
      const userInfo = {
        firstname,
        lastname,
        gender,
        birthday,
        birth_place,
        is_student,
        daily_mode,
        email,
        nickname,
        password,
        major_id,
        faculty_id,
        profile_image_url,
      };
      setCreating(true);

      // userInfo.email = 'jinnahrae@gmail.com';

      const createdResult: any = await dispatch(createAccountAPI(userInfo));

      setCreating(false);
      if (createdResult.failed) {
        signUpError(createdResult);
      }

      if (createdResult.success) {
        await standardFunctions.show_alert_async(
          strings.ALERTS.ERRORS.SIGNUP.TITLE_SUCCESS,
          strings.ALERTS.ERRORS.SIGNUP.CREATION_SUCCESS,
        );
        props.navigation.navigate(routes.SIGNUP.EMAIL_PENDING_SCREEN, {
          type: CONFIRM_EMAIL_TYPE.STANDARD,
        });
      } else {
      }
    } catch (error) {
      standardFunctions.show_alert_async('Error log', JSON.stringify(error));
    }
  };

  const signUpError = (error: any) => {
    if (error.code == 'auth/email-already-in-use') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.EMAIL_IN_USE,
      );
    } else if (error.code == 'auth/invalid-email') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.EMAIL_INVLID,
      );
    } else if (error.code == 'auth/weak-password') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.WEAK_PASSWORD,
      );
    } else if (error.code == 'auth/operation-not-allowed') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.OPERATION_NOT_ALLOWED,
      );
    } else {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.OTHER_MESSAGES,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.subContainer, styles.scrollSubContainer]}>
        <StandardBoxWithImage
          image={require('../../../assets/images/icons/icn_big_classroom_light.png')}
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.logo}
          iconStyle={{width: '30%'}}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.staticText}>
            {strings.SIGNUP.SIXTH_SCREEN.FIRST_CELL_TEXT}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Item
            regular
            style={[
              styles.inputAuto,
              {
                margin: 0,
                width: Dimensions.get('window').width - 30,
                padding: 8,
              },
            ]}>
            <Text style={{fontFamily: constants.DEFAULT_FONT, color: '#AAA'}}>
              {signUpInfo.User.major && signUpInfo.User.major.name}
            </Text>
          </Item>
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.staticText, {marginTop: 10}]}>
            {strings.SIGNUP.SIXTH_SCREEN.SECOND_CELL_TEXT}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <FlatList
            style={styles.facultyList}
            data={
              showAll
                ? allFaculties
                : signUpInfo.User.major && signUpInfo.User.major.faculties
            }
            keyExtractor={(item, index) => String(index)}
            renderItem={({item, index}) => {
              const faculty = item;
              const facultyImageURL = faculty.faculty_image;
              return (
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 20,
                    height: 70,
                    marginBottom: 5,
                    backgroundColor: colors.WHITE,
                  }}
                  onPress={() => {
                    if (selectedFaculty.faculty_id === faculty.faculty_id) {
                      setSelectedFaculty({});
                    } else {
                      setSelectedFaculty(faculty);
                    }
                  }}>
                  <View style={styles.facultyItemContainer}>
                    <FastImage
                      source={{uri: facultyImageURL}}
                      style={styles.facultyItemImage}
                      resizeMode={'contain'}
                    />
                    <View style={styles.facultyItemText}>
                      <Text style={{fontFamily: constants.DEFAULT_FONT}}>
                        {'    '}
                        {faculty.name}
                      </Text>
                    </View>
                    {selectedFaculty.faculty_id === faculty.faculty_id && (
                      <Icon
                        style={styles.facultyItemIcon}
                        name="md-checkmark"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      <View style={styles.subContainer2}>
        <TouchableOpacity
          onPress={showAllHandler}
          style={styles.showAllFaculty}>
          {loadingAll ? (
            <View style={styles.loadingAllIcon}>
              <ActivityIndicator size="small" />
            </View>
          ) : !showAll ? (
            <Text
              style={{
                fontFamily: constants.DEFAULT_FONT,
                lineHeight: 40,
                color: colors.THEFACULTY,
              }}>
              {strings.SIGNUP.SIXTH_SCREEN.SHOW_ALL_FACULTIES_BUTTON}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: constants.DEFAULT_FONT,
                lineHeight: 40,
                color: colors.THEFACULTY,
              }}>
              {strings.SIGNUP.SIXTH_SCREEN.SHOW_SUGGESTED_FACULTIES_BUTTON}
            </Text>
          )}
        </TouchableOpacity>
        {creating ? (
          <Button disabled={true}>
            <ActivityIndicator size="small" color={colors.WHITE} />
          </Button>
        ) : (
          <Button
            disabled={!validContinue}
            style={!validContinue ? styles.disabledButton : {}}
            onPress={goNextScreen}>
            {strings.SIGNUP.SIXTH_SCREEN.CONTINUE_BUTTON}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

Screen6.navigationOptions = {
  title: strings.SIGNUP.FIFTH_SCREEN.PAGE_TITLE,
};

export default Screen6;
