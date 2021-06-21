import React from "react";
import { colors, constants, strings } from "../../../../config";
import { BackButtonTop, Button, StandardInputText } from "../../../../components";
import useNameInputViewModel from "../../ViewModels/SocialSignUp/NameInputViewModel";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { styles } from "./NameInputScreen.style";
import FastImage from "react-native-fast-image";
import profile_image from "../../../../utils/misc/ProfileImage";

const NameInputScreen = props => {
  const view = useNameInputViewModel({props});
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} barStyle={'light-content'} />
      <KeyboardAvoidingView
        style={[
          {flex: 1},
          Platform.OS === 'android' && {width: '100%', height: '100%'},
        ]}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        <View style={styles.subTitle}>
          {Platform.OS === 'ios' && (
            <BackButtonTop
              navigation={props.navigation}
              color={'white'}
              style={{position: 'absolute', left: 0, top: 12}}
            />
          )}
          <Text style={styles.subTitleText}>
            {strings.SIGNUPV2.SOCIALSIGNUP.NAME_INPUT.SUBTITLE}
          </Text>
        </View>
        <ScrollView
          style={styles.subContainer}
          contentContainerStyle={styles.scrollSubContainer}>
          {view.profile_image_url && (
            <View style={styles.profile_image_container}>
              <FastImage
                style={styles.profile_image}
                source={{
                  uri: view.showProfileImage
                    ? view.profile_image_url
                    : profile_image['O'],
                }}
              />
              <TouchableOpacity
                onPress={() => view.toggleProfileImage()}
                style={styles.profile_image_button}>
                <FastImage
                  style={styles.profile_image_button_icon}
                  resizeMode={'contain'}
                  source={
                    view.showProfileImage
                      ? require('../../../../../assets/images/icons/icn_delete_white.png')
                      : require('../../../../../assets/images/icons/icn_recover_white.png')
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.inputContainer}>
            <StandardInputText
              autoCapitalize={'none'}
              placeholder={strings.SIGNUPV2.SOCIALSIGNUP.NAME_INPUT.NICKNAME}
              textContentType={'nickname'}
              autoCompleteType={'name'}
              value={view.nickname}
              onChangeText={text => view.onChangeValue('nickname', text)}
              returnKeyType={'next'}
              extra_styles={{alignSelf: 'center', marginTop: 30}}
            />
            {view.nickNameExists && (
              <Text style={[styles.staticText, styles.warningText]}>
                {strings.ALERTS.ERRORS.SIGNUP.ERROR_NICKNAME_EXISTS}
              </Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <StandardInputText
              placeholder={strings.SIGNUPV2.SOCIALSIGNUP.NAME_INPUT.FIRST_NAME}
              textContentType={'name'}
              autoCompleteType={'name'}
              value={view.firstname}
              onChangeText={text => view.onChangeValue('firstname', text)}
              returnKeyType={'next'}
              extra_styles={{alignSelf: 'center'}}
            />
          </View>
          <View style={styles.inputContainer}>
            <StandardInputText
              placeholder={strings.SIGNUPV2.SOCIALSIGNUP.NAME_INPUT.LAST_NAME}
              textContentType={'name'}
              autoCompleteType={'name'}
              value={view.lastname}
              onChangeText={text => view.onChangeValue('lastname', text)}
              returnKeyType={'done'}
              extra_styles={{alignSelf: 'center'}}
            />
          </View>
          <View style={styles.signUpDescriptionContainer}>
            <FastImage
              source={require('../../../../../assets/images/icons/icn_info_gray.png')}
              style={styles.signUpDescriptionIcon}
            />
            <Text style={styles.signUpDescriptionText}>
              {strings.SIGNUPV2.SOCIALSIGNUP.NAME_INPUT.DESCRIPTION}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.subContainer2}>
        {view.loading ? (
          <Button disabled={true}>
            <ActivityIndicator size="small" color="white" />
          </Button>
        ) : (
          <Button
            disabled={!view.validContinue || view.loading}
            onPress={() => view.onPressContinue()}>
            {strings.SIGNUP.THIRD_SCREEN.CONTINUE_BUTTON}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

NameInputScreen.navigationOptions = ({navigation}) => ({
  title: strings.SIGNUPV2.SOCIALSIGNUP.TITLE,
  headerLeft: () => <BackButtonTop navigation={navigation} color={'white'} />,
  headerTitleStyle: {
    ...Platform.select({
      android: {
        fontFamily: constants.DEFAULT_FONT_MEDIUM,
        fontSize: 17,
        paddingTop: 33,
        height: 70,
        shadowOpacity: 0,
      },
    }),
  },
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: colors.THEFACULTY,
  },
  headerTintColor: colors.WHITE,
});

export default NameInputScreen;
