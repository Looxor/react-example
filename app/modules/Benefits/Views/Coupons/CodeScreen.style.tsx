import { StyleSheet } from "react-native";
import { colors } from "../../../../config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeContainer: {
    marginTop: -20,
    width: '95%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.WHITE,
  },
  barcode: {
    backgroundColor: colors.WHITE,
    width: '100%',
    height: '90%',
  },
  qrcodeContainer: {},
});
