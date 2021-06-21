import React from "react";
import { colors, strings } from "../../../../config";
import { styles } from "./EmailInputScreen.style";
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { BackButtonTop, Button, StandardInputText } from "../../../../components";
import useEmailInputViewModel from "../../ViewModels/EmailSignUp/EmailInputViewModel";

const EmailInputScreen = props => {
  const view = useEmailInputViewModel({props});
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
          {strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.SUBTITLE}
        </Text>
      </View>
      <ScrollView
        style={styles.subContainer}
        contentContainerStyle={styles.scrollSubContainer}>
        <View style={styles.inputContainer}>
          <StandardInputText
            placeholder={strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.EMAIL}
            textContentType={'emailAddress'}
            autoCompleteType={'email'}
            value={view.email}
            onChangeText={text => view.onChangeValue('email', text)}
            returnKeyType={'next'}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            extra_styles={{alignSelf: 'center', marginTop: 30}}
          />
          {view.emailExists && (
            <Text style={[styles.staticText, styles.warningText]}>
              {strings.ALERTS.ERRORS.SIGNUP.EMAIL_IN_USE}
            </Text>
          )}
          {view.isUniversityEmail && (
            <Text style={[styles.staticText, styles.warningText]}>
              {strings.ALERTS.ERRORS.SIGNUP.UNIVERSITY_EMAIL}
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <StandardInputText
            value={view.password}
            onChangeText={text => view.onChangeValue('password', text)}
            placeholder={strings.SIGNUP.THIRD_SCREEN.INPUT_PASSWORD}
            autoCapitalize={'none'}
            textContentType={'password'}
            hasEye={true}
            returnKeyType={'done'}
            autoCompleteType={'password'}
            clearButtonMode={'never'}
            extra_styles={{alignSelf: 'center'}}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.staticText}>
            {'\n' + strings.SIGNUP.THIRD_SCREEN.LEGEND_DESCRIPTION}
          </Text>
          <Text
            style={
              view.legendCheck1 ? styles.staticTextChecked : styles.staticText
            }>
            {view.legendCheck1
              ? strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.LEGEND_1_CHECKED
              : strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.LEGEND_1_UNCHECKED}
          </Text>
          <Text
            style={
              view.legendCheck2 ? styles.staticTextChecked : styles.staticText
            }>
            {view.legendCheck2
              ? strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.LEGEND_2_CHECKED
              : strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.LEGEND_2_UNCHECKED}
          </Text>
          <Text
            style={
              view.legendCheck3 ? styles.staticTextChecked : styles.staticText
            }>
            {view.legendCheck3
              ? strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.LEGEND_3_CHECKED
              : strings.SIGNUPV2.EMAILSIGNUP.EMAIL_INPUT.LEGEND_3_UNCHECKED}
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

EmailInputScreen.navigationOptions = ({navigation}) => {
  return {
    title: strings.SIGNUPV2.EMAILSIGNUP.TITLE,
    headerLeft: () => <BackButtonTop navigation={navigation} color={'white'} />,
    headerRight: () => null,
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: colors.THEFACULTY,
    },
    headerTintColor: colors.WHITE,
  };
};

export default EmailInputScreen;
