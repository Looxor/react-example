// Libraries //
import * as React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import ParsedText from "react-native-parsed-text";
// Configs //
import { styles } from "./ReferralCode.style";
import { CallServer } from "../../utils/app/CallServer";
import ReferralCodeBox from "./_Components/ReferralCodeBox";
import { colors, constants, strings } from "../../config";
import standardFunctions from "../../utils/app/StandardFunctions";
import { UserData } from "../../config/constants";
import { loadCouponList } from "../Benefits/_ReduxStore/_actions";
import { store } from "../../config/redux/store";
import { refreshTotalCoins } from "../Home/HomeScreen";

interface State {
  used_referral_codes: Array<{}>;
  show_esselunga_alert: boolean;
  is_loading: boolean;
}

const ReferralCodeCell = data => (
  <View
    style={{
      backgroundColor: colors.THEFACULTY,
      marginTop: 10,
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 13,
    }}>
    <Text
      style={{
        color: colors.WHITE,
        fontFamily: constants.DEFAULT_FONT,
        margin: 15,
        fontSize: 17,
        flex: 1,
      }}>
      {data.title != '' && (
        <Text style={{fontFamily: constants.DEFAULT_FONT_BOLD}}>
          {data.title}
          {'\n'}
        </Text>
      )}
      {data.text != '' && (
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
          style={[styles.box_text]}>
          {data.text}
          {'\n'}
          {'\n'}
        </ParsedText>
      )}
      <Text>
        {strings.REFERRAL_CODE.REFERRAL_CODE_BOX_LABEL}
        <Text style={{fontFamily: constants.DEFAULT_FONT_BOLD}}>
          <ParsedText
            parse={[
              {
                type: 'url',
                style: {color: colors.WHITE},
                onPress: url => {
                  standardFunctions.open_browser(url);
                },
              },
            ]}>
            {data.referral_code}
          </ParsedText>
        </Text>
      </Text>
      {'\n'}
      <Text>
        {strings.REFERRAL_CODE.WHEN_USED}
        <Text style={{fontFamily: constants.DEFAULT_FONT_BOLD}}>
          {standardFunctions.convert_date_from_rfc_to_string(data.usage_date)}
        </Text>
      </Text>
    </Text>
  </View>
);

class ReferralCodeScreen extends React.Component {
  readonly state: State = {
    used_referral_codes: [],
    show_esselunga_alert: false,
    is_loading: true,
  };

  willUnmount: boolean;

  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.willUnmount = false;
  }

  static navigationOptions = () => ({
    title: strings.REFERRAL_CODE.REFERRAL_CODE,
  });

  componentDidMount() {
    this.updateData();
  }

  componentWillUnmount() {
    this.willUnmount = true;
  }

  updateData() {
    refreshTotalCoins();
    store.dispatch(loadCouponList());
    CallServer.get_used_referral_codes(result => {
      if (!this.willUnmount) {
        this.setState({
          used_referral_codes: result.data ? result.data.reverse() : [],
          is_loading: false,
        });
      }
    });
  }

  // {!userData.is_student && <LockScreen navigation={navigation} />}
  render() {
    const userData = UserData.getUserData();
    // @ts-ignore
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {false && this.state.show_esselunga_alert && (
            <View style={styles.alert_box}>
              <FastImage
                resizeMode="contain"
                source={require('../../../assets/images/icons/icn_bottomnav_concorsi_enabled.png')}
                style={styles.alert_image}
              />
              <Text style={styles.alert_text}>
                {strings.REFERRAL_CODE.ALERT_ESSELUNGA}
              </Text>
            </View>
          )}
          <ReferralCodeBox
            navigation={navigation}
            background_start_color={colors.WHITE}
            background_finish_color={colors.WHITE}
            text_color={colors.BLACK}
            border_color={colors.THEFACULTY}
            border_width={1}
            update_data={() => {
              this.updateData();
            }}
          />
          {this.state.used_referral_codes.length == 0 && (
            <View style={{alignItems: 'center', marginTop: 50}}>
              <Image
                resizeMode={'contain'}
                source={require('../../../assets/images/icons/icn_code_small_light.png')}
                style={{width: 70, height: 70}}
              />
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: constants.DEFAULT_FONT,
                  color: '#888',
                }}>
                {(this.state.is_loading && strings.OTHER.LOADING) ||
                  (this.state.used_referral_codes.length == 0 &&
                    strings.REFERRAL_CODE.NO_USED_CODES)}
              </Text>
            </View>
          )}
          {this.state.used_referral_codes &&
            this.state.used_referral_codes.length > 0 &&
            this.state.used_referral_codes.map((item: any) => (
              <ReferralCodeCell key={item.referral_code} {...item} />
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ReferralCodeScreen;
