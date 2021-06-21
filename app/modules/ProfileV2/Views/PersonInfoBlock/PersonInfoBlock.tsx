import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GENDERS} from './PersonInfoEditBlock';
import {colors, constants, strings} from '../../../../config';
import {validateEmail} from '../../../../utils/forms/validationRules';
import PersonInfoHeader from './_Components/PersonInfoHeader';
import RadioBox from '../../../../components/RadioBox';
import {StandardInputText} from '../../../../components';
import DatePicker2 from './_Components/DatePicker2';
import {MESSAGE_TYPE, showMessage} from '../StudentVerify/StudentEmailVerify';
import Moment from 'moment';
import FastImage from 'react-native-fast-image';
import standardFunctions from '../../../../utils/app/StandardFunctions';

const PersonInfoBlock = props => {
  const {
    view,
    onSavePersonInfo,
    processEmailVerification,
    savingPersonInfoData,
  } = props;

  const {
    rewards,
    coin,
    gender,
    contact_email,
    mainEmail,
    useMainEmail,
    birthday,
  } = props.personInfoBlockData;

  const onChangeBirthDay = value => {
    // console.log('onChangeBirthDay', Moment(value, 'DD/MM/YYYY').format('YYYY/MM/DD'))
    const birthday =
      Moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T00:00:00Z';
    // console.log('birthday', birthday);
    onSavePersonInfo && onSavePersonInfo({birthday});
  };

  const onEmailChangedHandler = async e => {
    const email = e.nativeEvent.text;
    if (!validateEmail(email)) {
      await showMessage(MESSAGE_TYPE.INVALID_EMAIL);
    } else {
      props.personInfoBlockData['contact_email'] = email;
      processEmailVerification && processEmailVerification();
    }
  };

  const changeGenderHandler = async value => {
    standardFunctions.play_tap_sound();
    onSavePersonInfo && onSavePersonInfo({['gender']: value});
  };
  const mainEmailPressHandler = () => {
    const changedValue = !useMainEmail;
    standardFunctions.play_tap_sound();
    if (changedValue === true) {
      props.personInfoBlockData['contact_email'] =
        props.personInfoBlockData.mainEmail;
      processEmailVerification && processEmailVerification();
    }
    props.personInfoBlockData['useMainEmail'] = changedValue;
    view.updateView();
  };

  return (
    <View style={styles.container}>
      <View style={styles.marginContainer}>
        <PersonInfoHeader
          coin={coin}
          show_coins={rewards && !rewards.basic_data}
          savingPersonInfoData={savingPersonInfoData}
        />
        <Text style={styles.descriptionLabel}>
          {strings.PROFILE.HOME.GENDER}
        </Text>
        <RadioBox
          data={GENDERS}
          containerStyle={{
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'flex-start',
          }}
          defaultCheckedValue={gender}
          onChangeValue={changeGenderHandler}
          iconStyle={{
            width: 20,
            height: 20,
            marginLeft: 5,
          }}
          textStyle={{
            lineHeight: 20,
            marginHorizontal: 3,
            marginTop: 1,
            color: colors.DARK_ALOE_TF,
            marginRight: 25,
          }}
        />
        <Text style={styles.descriptionLabel}>
          {strings.PROFILE.HOME.EMAIL}
        </Text>
        <View style={styles.itemContainer}>
          <StandardInputText
            placeholder={useMainEmail ? mainEmail : strings.PROFILE.HOME.EMAIL}
            textContentType={'emailAddress'}
            autoCompleteType={'email'}
            defaultValue={useMainEmail ? '' : contact_email}
            // onChangeText={text => onChangeValue("contact_email", text)}
            returnKeyType={'next'}
            keyboardType={'default'}
            autoCapitalize={'none'}
            onSubmitEditing={onEmailChangedHandler}
            showColorBorder={false}
            showBlueBorder={true}
            editable={!useMainEmail}
            selectionColor={colors.LIGHT_ALOE_TF}
            extra_styles={[
              {
                alignSelf: 'center',
                width: '100%',
                borderWidth: 3,
                borderColor: colors.LIGHT_ALOE_TF,
                color: colors.DARK_ALOE_TF,
              },
              useMainEmail ? styles.disabledInput : null,
            ]}
          />
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.mainEmailCheckBoxButton}
            onPress={mainEmailPressHandler}>
            <FastImage
              style={{width: 23, height: 23, top: 2, left: 10}}
              resizeMode={'contain'}
              source={
                useMainEmail
                  ? require('../../../../../assets/images/icons/icn_check_dark_aloe.png')
                  : require('../../../../../assets/images/icons/icn_checkbox_giftcard_unchecked.png')
              }
            />
            <View style={styles.mainEmailCheckBoxTextContainer}>
              <Text style={styles.mainEmailCheckBoxText}>
                {strings.PROFILE.HOME.USE_MAIN_EMAIL}
              </Text>
              <Text style={styles.mainEmailText}>{mainEmail || ''}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.itemContainer, {marginTop: 30}]}>
          <Text
            style={[
              styles.descriptionLabel,
              {marginTop: -10, marginBottom: 5},
            ]}>
            {strings.PROFILE.HOME.BIRTHDAY}
          </Text>
          <DatePicker2
            selectedDate={birthday}
            onValueChange={onChangeBirthDay}
            containerStyle={[
              styles.picker,
              {padding: 5, borderColor: colors.LIGHT_ALOE_TF, borderWidth: 3},
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    marginHorizontal: 0,
  },
  marginContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  itemContainer: {
    width: '100%',
    marginTop: 5,
  },
  picker: {
    width: '100%',
    height: 53,
    marginVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.SILVER,
    borderRadius: 14,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    marginTop: 0,
    marginBottom: 0,
    zIndex: 1,
    backgroundColor: colors.WHITE,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.2,
  },
  emailTextInput: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    paddingLeft: 10,
  },
  mainEmailCheckBoxButton: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  },
  mainEmailCheckBoxTextContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  mainEmailCheckBoxText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.DARK_ALOE_TF,
    lineHeight: 20,
  },
  mainEmailText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.DARK_ALOE_TF,
    lineHeight: 18,
  },
  datepickerPlaceholder: {
    width: '100%',
    height: 50,
  },
  disabledInput: {
    // backgroundColor: colors.LIGHT_SILVER
  },
  descriptionLabel: {
    marginTop: 10,
    marginLeft: 5,
    marginBottom: -5,
    fontSize: 14,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.DARK_ALOE_TF,
  },
});

export default PersonInfoBlock;
