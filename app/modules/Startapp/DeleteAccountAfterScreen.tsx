import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { colors, constants, strings } from "../../config";
import FastImage from "react-native-fast-image";

import { StandardButton } from "../../components";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import NavigationService from "../../utils/app/NavigationService";

const DeleteAccountAfter = props => {
  const gotoLoginHandler = () => {
    NavigationService.replace(routes.AUTH);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        networkActivityIndicatorVisible={true}
        backgroundColor="transparent"
      />
      <View style={styles.logoContainer}>
        <FastImage
          style={styles.mainImage}
          source={require('../../../assets/images/icons/icn_delete_account_big.png')}
        />
        <Text style={styles.logoTitle}>
          {strings.SETTINGS.DELETE_ACCOUNT_AFTER.TITLE}
        </Text>
        <Text style={styles.logoText}>
          {strings.SETTINGS.DELETE_ACCOUNT_AFTER.DESCRIPTION}
        </Text>
      </View>
      <StandardButton
        label={strings.SETTINGS.DELETE_ACCOUNT_AFTER.CLOSE_BUTTON}
        onPress={gotoLoginHandler}
        style={styles.closeButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  logoTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    paddingHorizontal: 30,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15,
  },
  logoText: {
    fontFamily: constants.DEFAULT_FONT,
    paddingHorizontal: 30,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  closeButton: {
    width: '92%',
    alignSelf: 'center',
  },
});

export default DeleteAccountAfter;
