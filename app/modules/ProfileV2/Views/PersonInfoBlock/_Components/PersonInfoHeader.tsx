import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, constants, strings} from '../../../../../config';
import FastImage from 'react-native-fast-image';

const PersonInfoHeader = props => {
  const {coin, show_coins} = props;
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
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  headerLabelContainer: {
    flexDirection: 'row',
  },
  headerLabel: {
    marginTop: -2,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.DARK_ALOE_TF,
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
