import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";

import styles from "./AddMajorEmailScreen.style";
import { colors, strings } from "../../config";
import { Button, StandardBoxWithImage, StandardInputText } from "../../components";
import { Content, Item } from "native-base";
import standardFunctions from "../../utils/app/StandardFunctions";
import { validateEmail } from "../../utils/forms/validationRules";
import IntervalCheck from "../../utils/misc/IntervalCheck";
import { useDispatch } from "react-redux";
import { logOut } from "../Login/_actions";
import { CallServerPromise } from "../../utils/app/CallServer";
import Strings from "../../utils/misc/TextComponents";
import { UserData } from "../../config/constants";

const SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS = 300;

const intervalCheck = new IntervalCheck();
let timeout = 0;

const AddMajorEmailScreen = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  // const [majorText, setMajorText] = useState('');
  // const [majorList, setMajorList] = useState([]);
  // const [majorListVisible, setMajorListVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState({id: undefined});
  const [validContinue, setValidContinue] = useState(false);
  const [loading, setLoading] = useState(false);

  /*
  const setMajorHandler = value => {
    setMajorText(value);

    if (intervalCheck.passedLessThan(SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS)) {
      timeout && clearInterval(timeout);
      timeout = +setTimeout(
        () => sendRequest(value),
        SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS,
      );
    } else {
      sendRequest(value);
    }
    // IntervalCheck
  };

  const sendRequest = async value => {
    try {
      if (value && value.length > 2 && !searching) {
        setSearching(true);
        const majorListServer = await searchMajorsAPI(value);
        if (majorListServer) {
          const majorList = majorListServer.map(major => {
            return {
              id: major.major_id,
              name: major.name,
              faculties: major.faculties,
            };
          });
          setMajorList(majorList);
          setMajorListVisible(majorList.length > 0);
        }
        setSearching(false);
      } else {
        setMajorListVisible(false);
      }
    } catch (e) {
      setSearching(false);
    }
  };

  const onMajorListSelect = major => {
    setSelectedMajor(major);
    setMajorText(major.name);
    setMajorListVisible(false);
  };
  */

  useEffect(() => {
    setValidContinue(validateEmail(email) && email === confirmEmail);
  }, [email, confirmEmail]);

  const goNextScreen = async () => {
    if (!validateEmail(email)) {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.EMAIL_INVLID,
      );
      return;
    }
    if (email !== confirmEmail) {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.SIGNUP.TITLE,
        strings.ALERTS.ERRORS.SIGNUP.EMAIL_INVLID,
      );
      return;
    }

    try {
      setLoading(true);
      const request = await CallServerPromise.does_email_already_exist(
        email.toLowerCase(),
      );
      if (request.success) {
        if (request.data === false) {
          const request = await CallServerPromise.is_student_email(email);
          if (request.success && request.data === false) {
            const request = await CallServerPromise.fill_missing_standard_email(
              email,
            );
            if (request.success) {
              standardFunctions.show_alert(
                strings.SIGNUP.ADD_MAJOR_EMAIL.SUCCESS_TITLE,
                strings.SIGNUP.ADD_MAJOR_EMAIL.SUCCESS_MESSAGE.replace(
                  '{email}',
                  email,
                ),
              );
              const loggedOut = await dispatch(logOut());
              if (loggedOut) {
                props.navigation.pop(2);
              }
            } else {
              showError(request);
              setLoading(false);
            }
          } else {
            showError({is_univ_email: true, request});
            setLoading(false);
          }
        } else {
          showError({already_exists: true, request});
          setLoading(false);
        }
      } else {
        showError(request);
        setLoading(false);
      }
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  const showError = e => {
    let message;
    if (e.error === 'email not needed') {
      message = strings.SIGNUP.ADD_MAJOR_EMAIL.ERROR_ON_ALREADY_REGISTERED;
    } else if (e.is_univ_email === true) {
      message = strings.SIGNUP.ADD_MAJOR_EMAIL.ERROR_ON_IS_UNIV_EMAIL;
    } else if (e.already_exists === true) {
      message = strings.SIGNUP.ADD_MAJOR_EMAIL.ERROR_ON_ALREADY_EXISTS;
    } else {
      message = strings.SIGNUP.ADD_MAJOR_EMAIL.ERROR_ON_FILLING_EMAIL;
    }
    standardFunctions.show_alert_async(
      strings.SIGNUP.ADD_MAJOR_EMAIL.TITLE,
      message,
    );
  };

  const notNowButtonPressHandler = async () => {
    const loggedOut = await dispatch(logOut());
    if (loggedOut) {
      // props.navigation.goBack(null);
      props.navigation.pop(2);
    }
  };

  const description = strings.SIGNUP.ADD_MAJOR_EMAIL.DESCRIPTION.replace(
    '{firstname}',
    UserData.getUserData().firstname
      ? ' ' + UserData.getUserData().firstname + ','
      : ',',
  );

  return (
    <SafeAreaView style={styles.container}>
      <Content
        style={styles.subContainer}
        contentContainerStyle={styles.scrollSubContainer}>
        <StandardBoxWithImage
          image={require('../../../assets/images/icons/icn_big_classroom_light.png')}
          background_start_color={colors.GENERAL.START}
          background_finish_color={colors.GENERAL.FINISH}
          viewStyle={styles.logo}
          iconStyle={{width: '30%'}}
        />

        <Text style={styles.description}>{Strings.makeBold(description)}</Text>

        <View style={styles.inputContainer}>
          <Item style={styles.input}>
            <StandardInputText
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              textContentType={'username'}
              autoCompleteType={'email'}
              returnKeyType={'next'}
              placeholder={strings.SIGNUP.ADD_MAJOR_EMAIL.EMAIL}
              extra_styles={styles.inputText}
              value={email}
              onChangeText={setEmail}
            />
          </Item>
        </View>

        <View style={styles.inputContainer}>
          <Item style={styles.input}>
            <StandardInputText
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              textContentType={'username'}
              autoCompleteType={'email'}
              returnKeyType={'next'}
              placeholder={strings.SIGNUP.ADD_MAJOR_EMAIL.CONFIRM_EMAIL}
              extra_styles={styles.inputText}
              value={confirmEmail}
              onChangeText={setConfirmEmail}
            />
          </Item>
        </View>
      </Content>

      <View style={styles.subContainer2}>
        <Button
          onPress={notNowButtonPressHandler}
          style={[styles.button, styles.notNowButton]}
          textStyle={styles.notNowButtonText}>
          {strings.SIGNUP.ADD_MAJOR_EMAIL.NOT_NOW}
        </Button>
        <Button
          disabled={!validContinue || loading}
          style={!validContinue ? styles.disabledButton : {}}
          onPress={goNextScreen}>
          {loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            strings.SIGNUP.ADD_MAJOR_EMAIL.CONTINUE
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

AddMajorEmailScreen.navigationOptions = ({navigation}) => ({
  headerLeft: null,
  title: strings.SIGNUP.ADD_MAJOR_EMAIL.TITLE,
});

export default AddMajorEmailScreen;
