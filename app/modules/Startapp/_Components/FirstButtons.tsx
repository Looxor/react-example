import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors, constants, strings } from "../../../config";
import { Button } from "../../../components";

const width = Dimensions.get('window').width;

const FirstButtons = props => {
  return (
    <View style={styles.container}>
      <Svg viewBox={`0 0 ${width} 30`} style={styles.arcContainer}>
        <Path
          d={`M -30 50 C 0 -30, ${width} -30, ${width + 30} 50`}
          fill={colors.THEFACULTY}
        />
      </Svg>
      <View style={styles.rectContainer}>
        <Button
          testID={'signupButton'}
          onPress={props.onPressSignup}
          style={styles.signupButton}
          textStyle={styles.signupButtonText}>
          {strings.LOGIN_LABEL}
        </Button>
      </View>
    </View>
  );
};

/*
  OLD Login Button
        <View style={styles.loginTextContainer}>
          <TouchableOpacity
            onPress={props.onPressLogin}
            style={styles.loginButton}>
            <Text style={styles.loginText}>{strings.FIRST_SCREEN.CONFIRM_QUESTION}{' '}
              <Text style={styles.loginButtonText}>{strings.LOGIN_LABEL_LOWER}</Text>
            </Text>
          </TouchableOpacity>
        </View>
 */

const styles = StyleSheet.create({
  container: {},
  arcContainer: {
    height: 60,
  },
  rectContainer: {
    justifyContent: 'center',
    marginTop: -5,
    paddingBottom: 20,
    backgroundColor: colors.THEFACULTY,
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: 'white',
    width: 320,
  },
  signupButtonText: {
    color: colors.THEFACULTY,
  },
  loginTextContainer: {
    flexDirection: 'row',
  },
  loginText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: 'white',
    lineHeight: 30,
  },
  loginButton: {},
  loginButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    lineHeight: 30,
    color: 'white',
    marginHorizontal: 5,
  },
});

export default FirstButtons;
