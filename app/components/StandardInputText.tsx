import * as React from 'react';
import {useState} from 'react';
import {
  ReturnKeyTypeOptions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import {Input} from 'native-base';
import FastImage from 'react-native-fast-image';

export type KeyboardType =
  | 'default'
  | 'email-address'
  | 'numeric'
  | 'phone-pad';
export type KeyboardTypeIOS =
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'number-pad'
  | 'name-phone-pad'
  | 'decimal-pad'
  | 'twitter'
  | 'web-search';
export type KeyboardTypeAndroid = 'visible-password';
export type KeyboardTypeOptions =
  | KeyboardType
  | KeyboardTypeAndroid
  | KeyboardTypeIOS;

interface Props {
  testID?: string;
  placeholder: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  returnKeyType?: ReturnKeyTypeOptions;
  extra_styles?: any;
  hasEye?: any;
  eyeState?: any;
  showColorBorder?: boolean;
  showErrorBorder?: boolean;
  showBlueBorder?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onSubmitEditing: any;
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off';
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
}

const StandardInputText = props => {
  const {
    testID,
    placeholder,
    value,
    returnKeyType,
    onChangeText,
    extra_styles,
    textContentType,
    keyboardType,
    autoCompleteType,
    clearButtonMode,
    autoCapitalize,
    hasEye,
    defaultValue,
    editable,
    showColorBorder,
    showErrorBorder,
    showBlueBorder,
    onSubmitEditing,
    placeholderTextColor,
  } = props;

  const [eyeState, setEyeState] = useState(props.eyeState);

  return (
    <WrapContainer
      textContentType={textContentType}
      hasEye={hasEye}
      eyeState={props.eyeState}
      onChangeEye={eyeState => setEyeState(eyeState)}>
      <Input
        testID={testID}
        secureTextEntry={textContentType === 'password' && !eyeState}
        textContentType={
          textContentType === 'password'
            ? eyeState
              ? 'none'
              : 'password'
            : textContentType
        } // {textContentType === 'password' && eyeState ? textContentType : 'password'}
        keyboardType={keyboardType}
        autoCompleteType={autoCompleteType}
        selectionColor={
          props.selectionColor ? props.selectionColor : colors.THEFACULTY
        }
        style={[
          styles.textInput,
          extra_styles,
          showColorBorder &&
            showBlueBorder && {borderColor: colors.THEFACULTY, borderWidth: 2},
          showColorBorder &&
            showErrorBorder && {borderColor: colors.RED_TF, borderWidth: 2},
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || colors.DEFAULT_PLACEHOLDER}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        clearButtonMode={clearButtonMode ? clearButtonMode : 'while-editing'}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
      />
    </WrapContainer>
  );
};

const WrapContainer = props => {
  const [eyeState, setEyeState] = useState(props.eyeState);
  return props.textContentType === 'password' && props.hasEye === true ? (
    <View style={styles.hasEyeContainer}>
      <TouchableOpacity
        onPress={() => {
          const _eyeState = !eyeState;
          setEyeState(_eyeState);
          props.onChangeEye && props.onChangeEye(_eyeState);
        }}
        style={styles.passwordEyeButton}>
        <FastImage
          source={
            eyeState === true
              ? require('../../assets/images/icons/icn_eye_open.png')
              : require('../../assets/images/icons/icn_eye_close.png')
          }
          style={styles.passwordEyeIcon}
        />
      </TouchableOpacity>
      {props.children}
    </View>
  ) : (
    props.children
  );
};

const styles = StyleSheet.create({
  hasEyeContainer: {
    width: '100%',
    alignItems: 'center',
  },
  passwordEyeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 23,
    top: 13,
    zIndex: 2,
    elevation: 1,
  },
  passwordEyeIcon: {
    width: 24,
    height: 24,
  },
  textInput: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 0,
    width: '92%',
    height: 53,
    zIndex: 1,
    backgroundColor: colors.WHITE,
    borderColor: colors.SILVER,
    borderRadius: 14,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.2,
  },
});

export default StandardInputText;
