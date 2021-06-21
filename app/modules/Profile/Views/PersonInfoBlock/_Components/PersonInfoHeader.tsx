import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../../config";
import FastImage from "react-native-fast-image";

const PersonInfoHeader = props => {
  const {
    mode,
    coin,
    show_coins,
    onPressModifyButton,
    onPressSaveButton,
    disableSaveButton,
    savingPersonInfoData,
    buttonStyle,
  } = props;
  const onPressHeaderButton = () => {
    if (mode === 'view') onPressModifyButton && onPressModifyButton();
    else if (mode === 'edit') onPressSaveButton && onPressSaveButton();
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLabelContainer}>
        <Text style={styles.headerLabel}>{strings.PROFILE.HOME.YOUR_DATA}</Text>
        {show_coins && (
          <FastImage
            style={styles.coinIcon}
            resizeMode={'contain'}
            source={require('../../../../../../assets/images/icons/icn_new_tf_coin.png')}
          />
        )}
        {show_coins && (
          <Text style={styles.headerCoinLabel}>+{coin || '20'}</Text>
        )}
      </View>
      {savingPersonInfoData ? (
        <ActivityIndicator color={colors.THEFACULTY} />
      ) : (
        <TouchableOpacity
          disabled={disableSaveButton}
          style={styles.headerButton}
          onPress={onPressHeaderButton}>
          <Text
            style={[
              styles.headerButtonText,
              disableSaveButton ? styles.disableSaveButtonText : null,
              buttonStyle,
            ]}>
            {mode === 'view' && strings.PROFILE.HOME.MODIFY_BUTTON}
            {mode === 'edit' && strings.PROFILE.HOME.SAVE_BUTTON}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  headerButton: {
    position: 'absolute',
    right: 5,
  },
  headerButtonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 17,
    color: colors.THEFACULTY,
  },
  disableSaveButtonText: {
    color: colors.lightGray,
  },
  headerLabelContainer: {
    flexDirection: 'row',
  },
  headerLabel: {
    marginTop: -2,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.BLACK,
  },
  headerCoinLabel: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
    marginLeft: 5,
    color: colors.COUPONS.DEFAULT,
  },
  coinIcon: {
    width: 18,
    height: 18,
    marginLeft: 15,
    marginTop: 2,
  },
});

export default PersonInfoHeader;
