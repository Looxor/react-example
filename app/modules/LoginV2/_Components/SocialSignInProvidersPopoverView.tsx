import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../config";
import SocialSignInButton from "./SocialSignInButton";
import { StandardButton } from "../../../components";
import standardFunctions from "../../../utils/app/StandardFunctions";

const SocialSignInProvidersPopoverView = (props: any = {}) => {
  let overlayIdOpened;
  return {
    show: ({navigation, providers}) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          providers,
          navigation,
        }),
      );
      overlayIdOpened = overlayId;
    },
    hide: () => {
      overlayIdOpened && Overlay.hide(overlayIdOpened);
    },
  };
};

const overlayView = ({getOverlayIdFunc, providers, navigation}) => (
  <Overlay.PullView
    containerStyle={styles.overlayContainer}
    side={'bottom'}
    modal={false}
    rootTransform={[]}>
    <OverlayChildView
      onHidePopoverView={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      getOverlayIdFunc={getOverlayIdFunc}
      providers={providers}
      navigation={navigation}
    />
  </Overlay.PullView>
);

const OverlayChildView = props => {
  const hideConfirmViewHandler = () => {
    props.onHidePopoverView();
  };

  const {providers, navigation} = props;
  return (
    <View style={styles.socialSignInProvidersContainer}>
      <Text style={styles.socialSignInProvidersTitle}>
        {providers.length === 1 && providers.includes('password')
          ? strings.SIGNUPV2.SOCIALSIGNUP.PASSWORD_PROVIDER_TITLE
          : strings.SIGNUPV2.SOCIALSIGNUP.OTHER_PROVIDERS_TITLE}
      </Text>
      <Text style={styles.socialSignInProvidersDescription}>
        {providers.length === 0
          ? strings.SIGNUPV2.SOCIALSIGNUP.ACCOUNT_ONLY_ON_DB_MESSAGE
          : providers.length === 1 && providers.includes('password')
          ? strings.SIGNUPV2.SOCIALSIGNUP.PASSWORD_PROVIDER_MESSAGE
          : strings.SIGNUPV2.SOCIALSIGNUP.OTHER_PROVIDERS_MESSAGE}
      </Text>
      {providers.length >= 1 &&
        (providers || []).map(
          (provider, index) =>
            ((provider === 'apple.com' &&
              parseInt(Platform.Version.toString(), 10) >= 13) ||
              (provider !== 'apple.com' && provider !== 'password')) && (
              <SocialSignInButton
                key={String(index)}
                onPress={() => {
                  standardFunctions.add_firebase_event_log(
                    'login',
                    'btn_other_social_clicked1',
                    {provider},
                  );
                  props.onHidePopoverView && props.onHidePopoverView();
                }}
                style={styles.socialSignInButton}
                type={provider}
                navigation={navigation}
              />
            ),
        )}
      {(providers.length === 0 ||
        (providers.length === 1 && providers.includes('password'))) && (
        <StandardButton
          style={{marginTop: 8}}
          label={strings.OTHER.CLOSE.toUpperCase()}
          onPress={hideConfirmViewHandler}
        />
      )}
    </View>
  );
};

/*
    <View style={styles.socialSignInProvidersContainer}>
      <Text style={styles.socialSignInProvidersTitle}>{strings.SIGNUPV2.SOCIALSIGNUP.OTHER_PROVIDERS_TITLE}</Text>
      {(providers || []).map((provider, index) => (
        <SocialSignInButton key={String(index)} onPress={() => props.onHidePopoverView && props.onHidePopoverView()}
                            style={styles.socialSignInButton} type={provider}
                            navigation={navigation}/>
      ))}
    </View>
 */

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  socialSignInProvidersContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    minWidth: 300,
    minHeight: 280,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40,
  },
  socialSignInProvidersTitle: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  socialSignInProvidersDescription: {
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 5,
    color: colors.gray,
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: constants.DEFAULT_FONT,
  },
  socialSignInButton: {
    width: '100%',
    marginBottom: 20,
  },
});

export default SocialSignInProvidersPopoverView;
