import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";

import { Icon } from "react-native-elements";

import { colors } from "../config";
import { CallServerPromise } from "../utils/app/CallServer";
import { routes } from "../navigation/rootNavigation/navigation.constants";
import { CONFIRM_EMAIL_TYPE } from "../modules/SignUp/EmailPendingScreen";
import { UserData } from "../config/constants";

const gotoStudentEmailVerifyScreen = props => {
  if (props.gotoStudentEmailVerifyScreen) props.gotoStudentEmailVerifyScreen();
  else props.navigation.navigate(routes.SIGNUP.STUDENT_EMAIL_VERIFY);
};

const gotoEmailPendingScreen = (props, params) => {
  if (props.gotoEmailPendingScreen) props.gotoEmailPendingScreen();
  else props.navigation.navigate(routes.SIGNUP.EMAIL_PENDING_SCREEN, params);
};

const gotoStudentCardPendingScreen = props => {
  if (props.gotoStudentCardPendingScreen) props.gotoStudentCardPendingScreen();
  else props.navigation.navigate(routes.SIGNUP.STUDENT_CARD_PENDING);
  // else props.navigation.navigate(routes.SIGNUP.STUDENT_EMAIL_VERIFY);
};

const LockScreen = props => {
  const [state, setState] = useState({
    loading: false,
  });

  const setState2 = state2 => setState({...state, ...state2});

  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  useEffect(componentDidMount);

  const lockButtonPressHandler = async () => {
    try {
      setState2({loading: true});
      const request: any =
        await CallServerPromise.is_upgrade_to_student_account_available();
      setState2({loading: false});
      if (request.success && request.data) {
        if (request.data.is_available === true) {
          gotoStudentEmailVerifyScreen(props);
        } else if (
          request.data.status === 'student card verification in progress'
        ) {
          gotoStudentCardPendingScreen(props);
        } else if (
          request.data.status === 'student email verification in progress'
        ) {
          gotoEmailPendingScreen(props, {type: CONFIRM_EMAIL_TYPE.STUDENT});
        }
      } else if (
        request.success === false &&
        request.error === 'already student'
      ) {
        const request = await CallServerPromise.get_user_data();
        if (request.success) {
          const userData = {...UserData.getUserData(), ...request.data};
          UserData.setUserData(userData);
        }
      } else {
      }
    } catch (error) {
      setState2({loading: false});
    }
  };

  return (
    <View style={styles.lockCover}>
      <TouchableOpacity
        disabled={state.loading}
        onPress={lockButtonPressHandler}
        style={styles.lockCoverButton}>
        {!state.loading && (
          <Icon
            style={styles.lockIcon}
            size={50}
            name="lock"
            color={
              props.lock_color != undefined
                ? props.lock_color
                : colors.THEFACULTY
            }
          />
        )}
        {state.loading && <ActivityIndicator />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  lockCover: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    elevation: 2,
  },
  lockCoverButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {},
});

export default LockScreen;
