import React from "react";

import { useNavigation } from "@react-navigation/native";

import { Clipboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, strings } from "../../../../config";
import RNJSBarcode from "rn-jsbarcode";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import constants from "../../../../config/constants";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const BarCodeView = props => {
  const navigation = useNavigation();
  const {type, code, is_barcode_text, activation_barcode} = props;

  const format =
    type === 'barcode' || type === 'barcode+text' ? 'EAN13' : 'CODE128';
  // const format = type === 'barcode' ? 'EAN13' : type === 'barcode+text' ? 'CODE128' : "EAN13";

  const getBarcodeData = () => {
    var temp_format = format;
    var temp_code = is_barcode_text ? activation_barcode : code;
    if (format === 'EAN13') {
      if (temp_code.match(/[a-z]/i)) {
        temp_code = '';
        temp_format = 'CODE128';
      }
      if (temp_code.length === 8) {
        temp_format = 'EAN8';
      }
    }
    return {code: temp_code, format: temp_format};
  };

  const showCodeScreenHandler = () => {
    navigation.navigate(routes.COUPONS_NAVIGATOR, {
      screen: routes.COUPONS_CODE,
      params: {
        title: strings.COUPONS.BARCODE,
        code: getBarcodeData().code,
        is_barcode_text,
        activation_barcode,
        type,
      },
    });
  };

  const copyCodeToClipboard = () => {
    try {
      Clipboard.setString(
        (is_barcode_text ? activation_barcode : code).toString(),
      );
      standardFunctions.show_alert(
        strings.COUPONS.VIEW.CODE_COPIED_TITLE,
        strings.COUPONS.VIEW.CODE_COPIED_MESSAGE,
      );
    } catch (e) {}
  };

  const barcode_data = getBarcodeData();
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onLongPress={copyCodeToClipboard}
      style={[styles.container, props.style]}>
      <Text style={styles.description}>
        {strings.COUPONS.VIEW.BARCODE_DESC}
      </Text>
      {!(is_barcode_text ? activation_barcode : code) ? (
        <View />
      ) : (
        <View style={styles.barcodeContainer}>
          <TouchableOpacity
            onLongPress={copyCodeToClipboard}
            onPress={showCodeScreenHandler}
            style={[
              is_barcode_text
                ? styles.barcodeTextContainerInternal
                : styles.barcodeContainerInternal,
            ]}>
            {(is_barcode_text ? activation_barcode : code) && (
              <>
                {barcode_data && barcode_data.code && (
                  <RNJSBarcode
                    style={styles.barcode}
                    value={barcode_data.code}
                    format={barcode_data.format}
                  />
                )}
                <Text style={styles.text2}>
                  {barcode_data.format !== 'EAN13' && barcode_data.code}
                </Text>
              </>
            )}
            {is_barcode_text && (
              <>
                <Text style={[styles.description, {marginTop: 20}]}>
                  {strings.COUPONS.VIEW.BARCODE_ACTIVATION_CODE}
                </Text>
                <Text style={styles.text2}>{code}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
      {/*
    <Text style={styles.text}>
      {coupon_code && (
        <Text style={styles.text2}>
          {'\n'}
          {(is_barcode_text ? activation_barcode : coupon_code)}
        </Text>
      )}
    </Text>
         */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barcodeContainer: {
    marginTop: 20,
    borderColor: '#DDDDDD',
    borderRadius: 16,
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    shadowColor: colors.DARK_ALOE_TF,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 8,
  },
  barcodeContainerInternal: {
    width: '80%',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeTextContainerInternal: {
    width: '80%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcode: {
    backgroundColor: colors.DEFAULT_BACKGROUND,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 14,
    color: colors.LIGHT_SILVER,
    marginLeft: 15,
    marginBottom: 2,
    paddingVertical: 3,
    textAlign: 'center',
    flex: 1,
  },
  text2: {
    fontSize: 20,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    color: colors.DARK_ALOE_TF,
    marginTop: 15,
    lineHeight: 25,
  },
  description: {
    marginTop: 10,
    color: colors.DARK_ALOE_TF,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default BarCodeView;
