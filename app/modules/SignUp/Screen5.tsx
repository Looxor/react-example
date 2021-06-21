// Libraries //
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

import { Item, Text } from "native-base";
// Configs //
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { Button, StandardBoxWithImage, StandardInputText } from "../../components";

import AutoCompleteListUp from "../../components/AutoCompleteListUp";
import { colors, strings } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";

import { styles } from "./Screen5.style";

import IntervalCheck from "../../utils/misc/IntervalCheck";
import { searchMajorsAPI, signUpScreen5 } from "./_actions";

// redux actions

const SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS = 300;

const intervalCheck = new IntervalCheck();
let timeout: any = 0;
const Screen5 = props => {
  const [majorText, setMajorText] = useState('');
  const [majorList, setMajorList] = useState([]);
  const [majorListVisible, setMajorListVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState({});
  const [validContinue, setValidContinue] = useState(false);

  useEffect(() => {
    // @ts-ignore
    setValidContinue(selectedMajor.id !== undefined);
  }, [selectedMajor]);

  const setMajorHandler = value => {
    setMajorText(value);

    if (intervalCheck.passedLessThan(SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS)) {
      timeout && clearInterval(timeout);
      timeout = setTimeout(
        () => sendRequest(value),
        SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS,
      );
    } else {
      sendRequest(value);
    }
    // IntervalCheck
  };

  const sendRequest = async value => {
    try {
      if (value && value.length > 2 && !searching) {
        setSearching(true);
        const majorListServer = await searchMajorsAPI(value);
        if (majorListServer) {
          const majorList = majorListServer.map(major => {
            return {
              id: major.major_id,
              name: major.name,
              faculties: major.faculties,
            };
          });
          setMajorList(majorList);
          setMajorListVisible(majorList.length > 0);
        }
        setSearching(false);
      } else {
        setMajorListVisible(false);
      }
    } catch (e) {
      setSearching(false);
    }
  };

  const onMajorListSelect = major => {
    setSelectedMajor(major);
    setMajorText(major.name);
    setMajorListVisible(false);
  };

  const dispatch = useDispatch();
  const goNextScreen = () => {
    // @ts-ignore
    if (!selectedMajor.id) {
      standardFunctions.show_alert(
        strings.SIGNUP.FIFTH_SCREEN.PAGE_TITLE,
        strings.SIGNUP.FIFTH_SCREEN.FIRST_CELL_TEXT,
      );
      return;
    }
    dispatch(signUpScreen5(selectedMajor));
    props.navigation.navigate(routes.SIGNUP.SCREEN6);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <StandardBoxWithImage
          image={require('../../../assets/images/logo/icn_thefaculty_hat_2021.png')}
          background_start_color={colors.DEFAULT_BACKGROUND}
          background_finish_color={colors.DEFAULT_BACKGROUND}
          viewStyle={styles.logo}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.staticText}>
            {strings.SIGNUP.FIFTH_SCREEN.FIRST_CELL_TEXT}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <AutoCompleteListUp
            visible={majorListVisible}
            data={majorList}
            onSelectItem={onMajorListSelect}
          />
          <Item style={styles.inputAuto}>
            <StandardInputText
              value={majorText}
              placeholder={strings.SIGNUP.FIFTH_SCREEN.INPUT_MAJOR}
              onChangeText={setMajorHandler}
              returnKeyType={'go'}
              extra_styles={{
                margin: 0,
                width: Dimensions.get('window').width - 30,
              }}
            />
            {searching && (
              <TouchableOpacity
                style={{marginTop: 8, right: 55}}
                onPress={() => setSearching(false)}>
                <ActivityIndicator size="small" />
              </TouchableOpacity>
            )}
          </Item>
        </View>
      </View>

      <View style={styles.subContainer2}>
        <Button
          style={!validContinue ? styles.disabledButton : {}}
          onPress={goNextScreen}>
          {strings.SIGNUP.FIFTH_SCREEN.CONTINUE_BUTTON}
        </Button>
      </View>
    </SafeAreaView>
  );
};

Screen5.navigationOptions = {
  title: strings.SIGNUP.FIFTH_SCREEN.PAGE_TITLE,
};

export default Screen5;
