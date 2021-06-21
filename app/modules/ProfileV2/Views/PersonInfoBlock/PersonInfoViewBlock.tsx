import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, constants, strings} from '../../../../config';
import PersonInfoHeader from './_Components/PersonInfoHeader';
import {GENDERS} from './PersonInfoEditBlock';

const getGenderLabel = gender => {
  return (
    GENDERS.find(genderItem => genderItem.value === gender) || {label: ''}
  ).label;
};

const PersonInfoViewBlock = props => {
  const {
    coin,
    gender,
    contact_email,
    birthday,
    useMainEmail,
    mainEmail,
    rewards,
  } = props.personInfoBlockData;
  const onPressModifyButton = props.onPressModifyButton;

  const [buttonSize, setButtonSize] = useState(17);

  const hightlightButton = () => {
    let timer = setInterval(() => {
      setButtonSize(prevState => (prevState + 0.1 > 20 ? 20 : prevState + 0.1));
    }, 1);
    setTimeout(() => {
      clearInterval(timer);
      let timer2 = setInterval(() => {
        setButtonSize(prevState =>
          prevState - 0.1 < 17 ? 17 : prevState - 0.1,
        );
      }, 1);
      setTimeout(() => {
        clearInterval(timer2);
        setButtonSize(prevState =>
          prevState < 17 ? 17 : prevState > 20 ? 20 : prevState,
        );
      }, 500);
    }, 500);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={hightlightButton}>
      <PersonInfoHeader
        show_coins={!rewards.basic_data}
        coin={coin}
        mode={'view'}
        onPressModifyButton={onPressModifyButton}
        buttonStyle={{fontSize: buttonSize}}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemContainer}
        onPress={hightlightButton}>
        <Text style={styles.itemLabel}>{strings.PROFILE.HOME.GENDER}</Text>
        <Text style={styles.itemValue}>{getGenderLabel(gender)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemContainer}
        onPress={hightlightButton}>
        <Text style={styles.itemLabel}>{strings.PROFILE.HOME.EMAIL}</Text>
        <Text style={styles.itemValue}>
          {useMainEmail ? mainEmail : contact_email}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.itemContainer}
        onPress={hightlightButton}>
        <Text style={styles.itemLabel}>{strings.PROFILE.HOME.BIRTHDAY}</Text>
        <Text style={styles.itemValue}>{birthday}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
  },
  itemContainer: {
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 10,
  },
  itemLabel: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.gray,
  },
  itemValue: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 18,
    color: colors.darkGray,
  },
});

export default PersonInfoViewBlock;
