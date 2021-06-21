import React from "react";
import { colors, constants, strings } from "../../../../config";
import { BackButtonTop, Button, StandardInputText } from "../../../../components";
import useNameInputViewModel from "../../ViewModels/EmailSignUp/NameInputViewModel";
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { styles } from "./NameInputScreen.style";
import FastImage from "react-native-fast-image";

const NameInputScreen = props => {
  const view = useNameInputViewModel({props});
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={colors.THEFACULTY}
      />
      <View style={styles.subTitle}>
        {Platform.OS === 'ios' && (
          <BackButtonTop
            navigation={props.navigation}
            color={'white'}
            style={{position: 'absolute', left: 0, top: 12}}
          />
        )}
        <Text style={styles.subTitleText}>
          {strings.SIGNUPV2.EMAILSIGNUP.NAME_INPUT.SUBTITLE}
        </Text>
      </View>
      <ScrollView
        style={styles.subContainer}
        contentContainerStyle={styles.scrollSubContainer}>
        <View style={styles.inputContainer}>
          <StandardInputText
            autoCapitalize={'none'}
            placeholder={strings.SIGNUPV2.EMAILSIGNUP.NAME_INPUT.NICKNAME}
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
            placeholder={strings.SIGNUPV2.EMAILSIGNUP.NAME_INPUT.FIRST_NAME}
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
            placeholder={strings.SIGNUPV2.EMAILSIGNUP.NAME_INPUT.LAST_NAME}
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
  title: strings.SIGNUPV2.EMAILSIGNUP.TITLE,
  headerLeft: () => <BackButtonTop navigation={navigation} color={'white'} />,
  headerRight: () => null,
  headerTitleStyle: {
    ...Platform.select({
      android: {
        paddingTop: 33,
        height: 70,
        fontSize: 17,
        elevation: 0,
        shadowOpacity: 0,
      },
    }),
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
  },
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: colors.THEFACULTY,
  },
  headerTintColor: colors.WHITE,
});

export default NameInputScreen;
