import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Clipboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, strings } from "../../../../config";
import QRCode from "react-native-qrcode-svg";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import constants from "../../../../config/constants";
import standardFunctions from "../../../../utils/app/StandardFunctions";

const QRCodeView = props => {
  const navigation = useNavigation();
  const {type, code, is_barcode_text, activation_barcode} = props;

  const showCodeScreenHandler = () => {
    navigation.navigate(routes.COUPONS_CODE, {
      title: strings.COUPONS.QRCODE,
      code,
      is_barcode_text,
      activation_barcode,
      type,
    });
  };

  const copyCodeToClipboard = () => {
    try {
      Clipboard.setString(code.toString());
      standardFunctions.show_alert(
        strings.COUPONS.VIEW.CODE_COPIED_TITLE,
        strings.COUPONS.VIEW.CODE_COPIED_MESSAGE,
      );
    } catch (e) {}
  };

  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onLongPress={copyCodeToClipboard}
      style={[styles.container, props.style]}>
      <Text style={styles.description}>{strings.COUPONS.VIEW.QRCODE_DESC}</Text>
      {code == undefined ? (
        <View />
      ) : (
        <TouchableOpacity
          onLongPress={copyCodeToClipboard}
          onPress={showCodeScreenHandler}
          style={styles.qrcodeContainer}>
          <QRCode size={120} value={code} />
          <Text style={[styles.description, {marginTop: 20}]}>
            {strings.COUPONS.VIEW.QRCODE_PROBLEM_DESC}
          </Text>
          <Text style={styles.text2}>{code}</Text>
        </TouchableOpacity>
      )}
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
  qrcodeContainer: {
    marginTop: 20,
    borderColor: '#DDDDDD',
    borderRadius: 16,
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: colors.WHITE,
    shadowColor: colors.DARK_ALOE_TF,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 8,
  },
  qrcodeContainerInternal: {
    width: '70%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrcode: {
    width: 80,
    height: 80,
  },
  text: {
    flex: 1,
    fontSize: 14,
    color: colors.LIGHT_SILVER,
    marginLeft: 15,
    marginBottom: 2,
    paddingVertical: 3,
    textAlign: 'center',
  },
  text2: {
    fontSize: 20,
    color: colors.DARK_ALOE_TF,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    marginTop: 10,
    lineHeight: 25,
  },
  description: {
    marginTop: 10,
    color: colors.DARK_ALOE_TF,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    textAlignVertical: 'center',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default QRCodeView;
