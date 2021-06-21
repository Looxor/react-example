import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, constants, strings } from "../../config";
import FastImage from "react-native-fast-image";
import { CallServerPromise } from "../../utils/app/CallServer";
import ParsedText from "react-native-parsed-text";
import standardFunctions from "../../utils/app/StandardFunctions";

const QuestionsQualityScreen = props => {
  const [dispData, setDispData] = useState({
    image_url: '',
    title: '',
    text: '',
    loading: false,
    error: false,
  });
  const componentDidMount = () => {
    const loadData = async () => {
      try {
        setDispData({...dispData, loading: true});
        const request1 = await CallServerPromise.get_static_variable(
          'selexi_questions_quality_image',
        );
        const request2 = await CallServerPromise.get_static_variable(
          'selexi_questions_quality_title',
        );
        const request3 = await CallServerPromise.get_static_variable(
          'selexi_questions_quality_text',
        );

        if (request1.success && request2.success && request3.success) {
          setDispData({
            image_url: request1.data,
            title: request2.data,
            text: request3.data,
            loading: false,
            error: false,
          });
        } else setDispData({...dispData, loading: false, error: true});
      } catch (error) {
        setDispData({...dispData, loading: false, error: true});
      }
    };
    loadData();
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  useEffect(componentDidMount, []);
  return (
    <View style={styles.container}>
      {dispData.loading ? (
        <ActivityIndicator
          color={colors.THEFACULTY}
          style={styles.loadingIcon}
        />
      ) : null}
      <ScrollView>
        {dispData.image_url ? (
          <FastImage
            style={styles.mainImage}
            source={{uri: dispData.image_url}}
          />
        ) : null}
        {dispData.title ? (
          <>
            <Text style={[styles.text, styles.title]}>{dispData.title}</Text>
            <ParsedText
              parse={[
                {
                  type: 'url',
                  style: {color: colors.THEFACULTY},
                  onPress: url => {
                    standardFunctions.open_browser(url);
                  },
                },
              ]}
              style={[styles.text]}>
              {dispData.text}
            </ParsedText>
          </>
        ) : null}
        {dispData.error ? (
          <Text style={styles.error}>
            {strings.SETTINGS.QUESTIONS_QUALITY.ERROR_ON_GETTING_DATA}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
};

QuestionsQualityScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.QUESTIONS_QUALITY.TITLE,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  mainImage: {
    width: '100%',
    height: 200,
  },
  title: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    paddingTop: 20,
  },
  text: {
    fontFamily: constants.DEFAULT_FONT,
    flex: 1,
    fontSize: 16,
    padding: 20,
    paddingTop: 0,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  error: {
    fontSize: 16,
    color: colors.darkGray,
  },
  loadingIcon: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    marginLeft: -12.5,
    width: 25,
    height: 25,
    zIndex: 10,
  },
});

export default QuestionsQualityScreen;
