import React, { useEffect, useState } from "react";

import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "./FaqScreen.style";
import { colors, constants, strings } from "../../config";
import { CallServerPromise } from "../../utils/app/CallServer";
import SearchBoxItem from "../Test/CommonComponents/SearchBoxItem";
import { openEmailComposeScreen } from "./_Components/ProfileSettings.func";
import { Icon, Left, ListItem, Right } from "native-base";
import User from "./Models/User";
import { UserData } from "../../config/constants";
import standardFunctions from "../../utils/app/StandardFunctions";

const FaqScreen = props => {
  const [state, setState] = useState({
    faqTexts: [],
    loading: false,
  });
  const [searchText, setSearchText] = useState('');
  const setState2 = state2 => setState({...state, ...state2});

  const componentDidMount = () => {
    const loadFaqText = async () => {
      setState({faqTexts: [], loading: true});
      try {
        const request = await CallServerPromise.get_faq_text();
        if (request.success) {
          let temp_array = [];
          let first_split = request.data.split('[bold]');
          first_split.map((fs, index) => {
            let temp_faq = fs.split('[/bold]');
            let obj = {};
            if (temp_faq[0] !== '' && temp_faq[1] !== '') {
              obj['title'] = temp_faq[0];
              obj['text'] = temp_faq[1].replace('\n\n', '');
              obj['show'] = true;
              obj['opened'] = false;
              temp_array.push(obj);
            }
          });
          setState({faqTexts: temp_array, loading: false});
        }
      } catch (error) {}
    };
    loadFaqText();
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  const open_item = async index => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log('settings', 'faq_opened', {
      question: state.faqTexts[index].title,
    });
    state.faqTexts[index].opened = !state.faqTexts[index].opened;
    setState2(state.faqTexts);
  };

  const search_question = async search_text => {
    setSearchText(search_text);
    search_text = search_text.toLowerCase();
    state.faqTexts.map((faqText, index) => {
      var res = search_text.split(' ').every(function (itm) {
        return (
          faqText.title.toLowerCase().indexOf(itm) > -1 ||
          faqText.text.toLowerCase().indexOf(itm) > -1
        );
      });
      if (res || search_text === '') {
        faqText.show = true;
        faqText.opened = search_text !== '';
      } else {
        faqText.show = false;
        faqText.opened = false;
      }
    });
    setState2(state.faqTexts);
  };

  // props.navigation.addListener('focus', didFocus);
  useEffect(componentDidMount, []);

  return state.faqTexts ? (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{alignItems: 'center'}}>
        {console.log(searchText)}
        {!state.loading && (
          <SearchBoxItem
            value={searchText}
            label={strings.SETTINGS.FAQ.SEARCH_PLACEHOLDER}
            onSearch={searchKey => {
              search_question(searchKey);
            }}
          />
        )}
        <View style={{height: 20}} />
        {state.faqTexts &&
          state.faqTexts.length > 0 &&
          state.faqTexts.map(
            (faqText, index) =>
              faqText !== undefined &&
              faqText.title !== '' &&
              faqText.text !== '' &&
              faqText.show && (
                <TouchableOpacity
                  activeOpacity={constants.ACTIVE_OPACITY}
                  onPress={() => {
                    open_item(index);
                  }}
                  style={styles.faqBox}>
                  <Text style={styles.title}>
                    {faqText.title}
                    {
                      <Text style={styles.text}>
                        {faqText.opened ? '\n' + faqText.text : ''}
                      </Text>
                    }
                  </Text>
                  {/*<Image resizeMode={"contain"} style={[{width: 10, height: 8, alignSelf: 'center', position: 'absolute', right: 15}]} source={faqText.opened ? require("../../../assets/images/icons/icn_open_above.png") : require("../../../assets/images/icons/icn_close_under.png")}></Image>*/}
                </TouchableOpacity>
              ),
          )}
        {!state.loading && state.faqTexts.filter(obj => obj.show).length === 0 && (
          <View style={styles.noQuestionsFound}>
            <Text style={[styles.text, {marginBottom: 5}]}>
              {strings.SETTINGS.FAQ.NOTHING_FOUND}
            </Text>
            <ListItem
              underlayColor={'transparent'}
              style={[styles.faqBox]}
              noIndent
              button
              onPress={() =>
                openEmailComposeScreen(new User(UserData.getUserData()))
              }>
              <Left>
                <Text style={styles.text}>{strings.SETTINGS.HOME.SUPPORT}</Text>
              </Left>
              <Right>
                <Icon style={{marginRight: 5}} active name="arrow-forward" />
              </Right>
            </ListItem>
          </View>
        )}
        {state.loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.gray} style={styles.loading} />
          </View>
        )}
        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  ) : null;
};

FaqScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.FAQ.TITLE,
});

export default FaqScreen;
