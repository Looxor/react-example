import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../../../config";
import SocialSignInButton, { SOCIAL_PROVIDER_TYPE } from "../../../../LoginV2/_Components/SocialSignInButton";
import { has_apple, has_facebook, has_google } from "../../../_Functions/SocialSignIn";
import standardFunctions from "../../../../../utils/app/StandardFunctions";

const LinkedSocialPullView = (props: any = {}) => {
  return {
    show: ({navigation, socialProviders, email}) => {
      const overlayId = Overlay.show(
        overlayView({
          navigation,
          getOverlayIdFunc: () => overlayId,
          socialProviders,
          email,
        }),
      );
    },
  };
};

const overlayView = ({
  navigation,
  getOverlayIdFunc,
  socialProviders,
  email,
}) => {
  return (
    <Overlay.PullView
      containerStyle={styles.overlayContainer}
      side={'bottom'}
      modal={false}
      rootTransform={[]}>
      <OverlayChildView
        onCloseTerminateView={() => {
          const overlayId = getOverlayIdFunc();
          Overlay.hide(overlayId, true);
        }}
        // onTerminate={onTerminate}
        getOverlayIdFunc={getOverlayIdFunc}
        navigation={navigation}
        email={email}
        socialProviders={socialProviders}
      />
    </Overlay.PullView>
  );
};

const OverlayChildView = props => {
  const {socialProviders, navigation, email} = props;
  const _has_google = has_google(socialProviders);
  const _has_facebook = has_facebook(socialProviders);
  const _has_apple = has_apple(socialProviders);
  const onPressSocialButton = async socialType => {
    standardFunctions.add_firebase_event_log(
      'login',
      'btn_other_social_clicked2',
      {provider: socialType},
    );
    props.onCloseTerminateView();
    if (socialType === SOCIAL_PROVIDER_TYPE.GOOGLE) {
    }
  };
  return (
    <View style={styles.overlay}>
      <Text style={styles.alreadyLinkedSocialTitle}>
        {strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ALREADY_LINKED_SOCIAL}
      </Text>

      <Text style={styles.alreadyLinkedSocialDesc}>
        {strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.ALREADY_LINKED_SOCIAL_DESC}
      </Text>

      {_has_facebook && (
        <SocialSignInButton
          onPress={() => onPressSocialButton(SOCIAL_PROVIDER_TYPE.FACEBOOK)}
          navigation={navigation}
          type={SOCIAL_PROVIDER_TYPE.FACEBOOK}
          style={styles.socialButton}
        />
      )}
      {_has_google && (
        <SocialSignInButton
          onPress={() => onPressSocialButton(SOCIAL_PROVIDER_TYPE.GOOGLE)}
          type={SOCIAL_PROVIDER_TYPE.GOOGLE}
          navigation={navigation}
          style={styles.socialButton}
        />
      )}
      {_has_apple && (
        <SocialSignInButton
          onPress={() => onPressSocialButton(SOCIAL_PROVIDER_TYPE.APPLE)}
          type={SOCIAL_PROVIDER_TYPE.APPLE}
          navigation={navigation}
          style={styles.socialButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  overlay: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    minWidth: 300,
    minHeight: 250,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
  },
  alreadyLinkedSocialTitle: {
    fontSize: 20,
    fontWeight: 'normal',
    color: colors.darkGray,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    marginVertical: 20,
  },
  alreadyLinkedSocialDesc: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
    paddingHorizontal: 10,
    color: colors.darkGray,
    marginBottom: 20,
  },
  socialButton: {width: '100%', marginVertical: 7},
});

export default LinkedSocialPullView;
