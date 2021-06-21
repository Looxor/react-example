import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../config";
import LinearGradient from "react-native-linear-gradient";
import StandardButtonWithIcon from "./StandardButtonWithIcon";
import StandardInputText from "../../../components/StandardInputText";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import standardFunctions from "../../../utils/app/StandardFunctions";
import { CallServerPromise } from "../../../utils/app/CallServer";

interface Props {
  background_start_color: string;
  background_finish_color: string;
  text_color: string;
  border_color: string;
  border_width: number;
  navigation: any;
  update_data: () => void;
}

interface State {
  referral_code: string;
}

class ReferralCodeBox extends React.Component<Props, State> {
  readonly state: State = {
    referral_code: '',
  };

  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleUserReferralCodeChange = (referral_code: string) => {
    this.setState({referral_code});
  };

  handleUserReferralCodeChangeForScan = (
    referral_code: string,
    navigation: any,
  ) => {
    navigation ? navigation.goBack() : null;
    this.setState({referral_code}, () => {
      this.onSuccess();
    });
  };

  onSuccess = async () => {
    if (this.state.referral_code == '') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_GENERIC,
        strings.ALERTS.ERRORS.REFERRAL_CODE.REFERRAL_CODE_EMPTY,
      );
      return;
    }

    try {
      let result: any = await CallServerPromise.insert_new_code(
        this.state.referral_code,
      );
      console.log(result);
      if (result.success) {
        this.handleSuccess(result.data);
      } else {
        this.handleError(result.error);
      }
    } catch (e) {
      console.log(e);
      this.handleError(e);
    }
  };

  handleSuccess = data => {
    this.props.update_data();
    if (data.title != '') {
      standardFunctions.show_alert(
        strings.ALERTS.REFERRAL_CODE.SUCCESS_TO_INSERT.TITLE,
        strings.ALERTS.REFERRAL_CODE.SUCCESS_TO_INSERT.MESSAGE_WITH_TITLE +
          ' ' +
          data.title,
      );
      this.setState({referral_code: ''});
    } else {
      standardFunctions.show_alert(
        strings.ALERTS.REFERRAL_CODE.SUCCESS_TO_INSERT.TITLE,
        strings.ALERTS.REFERRAL_CODE.SUCCESS_TO_INSERT.MESSAGE,
      );
      this.setState({referral_code: ''});
    }
  };

  handleError = error => {
    if (error == 'not a valid referral code') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_GENERIC,
        strings.ALERTS.ERRORS.REFERRAL_CODE.INVALID_REFERRAL_CODE,
      );
    } else if (error == 'no more available referral codes') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_GENERIC,
        strings.ALERTS.ERRORS.REFERRAL_CODE.NO_MORE_AVAILABLE,
      );
    } else if (error == 'not a verified esselunga customer') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_ESSELUNGA,
        strings.ALERTS.ERRORS.REFERRAL_CODE.NOT_A_VERIFIED_ESSELUNGA_CUSTOMER,
      );
    } else if (error == 'expired referral code') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_GENERIC,
        strings.ALERTS.ERRORS.REFERRAL_CODE.EXPIRED_REFERRAL_CODE,
      );
    } else if (error == 'user has not played a contest game') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_GENERIC,
        strings.ALERTS.ERRORS.REFERRAL_CODE.USER_HAS_NOT_PLAYED_A_CONTEST_GAME,
      );
    } else if (error == 'referral code has already been used') {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_GENERIC,
        strings.ALERTS.ERRORS.REFERRAL_CODE.ALREADY_USED,
      );
    } else {
      standardFunctions.show_alert(
        strings.ALERTS.ERRORS.REFERRAL_CODE.TITLE_GENERIC,
        strings.ALERTS.ERRORS.REFERRAL_CODE.ERROR_ON_APPLY_REFERRAL_CODE,
      );
    }
    this.setState({referral_code: ''});
  };

  barcodeScanPressHandler = () => {
    // @ts-ignore
    global.navigationData = {
      onReadCodeWithNavigation:
        this.handleUserReferralCodeChangeForScan.bind(this),
    };
    this.props.navigation.navigate(routes.QRCODESCANNER, {
      is_qrcode: true,
    });
  };

  render() {
    const {
      navigation,
      background_start_color,
      background_finish_color,
      text_color,
      border_color,
      border_width,
    } = this.props;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[background_start_color, background_finish_color]}
        style={[
          styles.view,
          {borderColor: border_color, borderWidth: border_width},
        ]}>
        <View style={{flexDirection: 'column'}}>
          <Text style={[styles.box_text, {color: text_color}]}>
            {strings.REFERRAL_CODE.PAGE_BOX_TEXT}
            {'\n'}
          </Text>
          <StandardButtonWithIcon
            style={{marginTop: 10, marginLeft: 10, marginRight: 10}}
            label={strings.REFERRAL_CODE.SCAN_BUTTON_TEXT}
            onPress={this.barcodeScanPressHandler}
          />
          <Text
            style={[
              {
                color: text_color,
                fontFamily: constants.DEFAULT_FONT,
                fontSize: 16,
                alignSelf: 'center',
              },
            ]}>
            {strings.REFERRAL_CODE.OR_LABEL}
          </Text>
          <StandardInputText
            value={this.state.referral_code}
            placeholder={strings.REFERRAL_CODE.INSERT_NEW_REFERRAL_CODE}
            onChangeText={this.handleUserReferralCodeChange}
            returnKeyType={'done'}
            extra_styles={{
              marginTop: 10,
              alignSelf: 'center',
              width: 320,
              flex: 0,
            }}
          />
          <TouchableOpacity onPress={this.onSuccess}>
            <Text
              style={{
                color: colors.THEFACULTY,
                fontFamily: constants.DEFAULT_FONT_BOLD,
                fontSize: 16,
                alignSelf: 'flex-end',
                marginTop: 10,
                marginBottom: 10,
                marginRight: 25,
              }}>
              {strings.REFERRAL_CODE.USE_NOW_BUTTON}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    height: 260,
    backgroundColor: colors.THEFACULTY,
    borderRadius: 18,
    marginTop: '4%',
    marginLeft: '4%',
    marginRight: '4%',
  },
  box_text: {
    top: 16,
    left: 18,
    right: 18,
    fontWeight: 'normal',
    marginRight: 68,
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    fontSize: 16,
    flexWrap: 'wrap',
  },
});

export default ReferralCodeBox;
