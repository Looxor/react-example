import React from "react";

import { Clipboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, strings } from "../../../../config";
import constants from "../../../../config/constants";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import { useNavigation } from "@react-navigation/native";

const LinkView = props => {
  const navigation = useNavigation();
  const {code, link_text, title} = props;

  const copyCodeToClipboard = () => {
    try {
      if (link_text !== undefined) return;
      Clipboard.setString(code.toString());
      standardFunctions.show_alert(
        strings.COUPONS.VIEW.CODE_COPIED_TITLE,
        strings.COUPONS.VIEW.LINK_POPUP_MESSAGE,
      );
    } catch (e) {}
  };

  const openPressHandler = () => {
    if (code.includes('?openInBrowser')) {
      standardFunctions.open_browser(code);
    } else {
      navigation.navigate(routes.COUPONS_NAVIGATOR, {
        screen: routes.GENERAL_WEBVIEW,
        params: {url: code, title: title},
      });
    }
  };
  return (
    <View style={[styles.container, props.style]}>
      {link_text === undefined && (
        <Text style={styles.description}>{strings.COUPONS.VIEW.LINK_DESC}</Text>
      )}
      <TouchableOpacity
        onLongPress={copyCodeToClipboard}
        onPress={openPressHandler}
        style={styles.linkContainerInternal}>
        <View style={styles.linkContainer}>
          <Text style={styles.linkValue}>
            {link_text !== undefined ? link_text : code}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 4,
    right: 10,
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 5,
  },
  button: {
    width: 55,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.WHITE,
  },
  icon: {
    marginLeft: 5,
    width: 80,
    height: 80,
  },
  text: {
    fontFamily: constants.DEFAULT_FONT,
    flex: 1,
    fontSize: 16,
    color: colors.LIGHT_SILVER,
    marginLeft: 15,
    marginBottom: 10,
    paddingVertical: 3,
    textAlign: 'left',
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 20,
    borderColor: '#DDDDDD',
    borderRadius: 18,
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
    shadowColor: colors.DARK_ALOE_TF,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    elevation: 8,
  },
  linkContainerInternal: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  linkValue: {
    padding: 10,
    color: colors.LIGHT_ALOE_TF,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default LinkView;
