import React from "react";

import { Dimensions, View } from "react-native";
import RNJSBarcode from "rn-jsbarcode";
import QRCode from "react-native-qrcode-svg";
import styles from "./CodeScreen.style";

const CouponCodeScreen = props => {
  const {
    route: {params = {}},
  } = props;
  const {is_barcode_text, code, activation_barcode, type} = params;
  let format =
    type === 'barcode' || type === 'barcode+text' ? 'EAN13' : 'CODE128';
  const value = is_barcode_text ? activation_barcode : code;
  if (value.length === 8) format = 'EAN8';
  const windowWidth = Dimensions.get('window').width;
  console.log('barcode ===', format, is_barcode_text, activation_barcode, code);
  return (
    <View style={styles.container}>
      <View style={styles.barcodeContainer}>
        {(type === 'barcode' ||
          type === 'barcode_code128' ||
          type === 'barcode+text') && (
          <RNJSBarcode style={styles.barcode} value={value} format={format} />
        )}
        {type === 'qrcode' && (
          <View style={styles.qrcodeContainer}>
            <QRCode size={windowWidth - 50} value={code} />
          </View>
        )}
      </View>
    </View>
  );
};

CouponCodeScreen.navigationOptions = props => {
  const {
    route: {params = {}},
  } = props;
  const title = params['title'];
  return {
    title,
  };
};

export default CouponCodeScreen;
