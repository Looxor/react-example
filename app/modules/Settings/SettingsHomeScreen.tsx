import React from "react";
import { Image, View } from "react-native";
import { Body, Content, Icon, Left, ListItem, Right, Text } from "native-base";
import { Overlay } from "teaset";
import FastImage from "react-native-fast-image";

import styles from "./SettingsHomeScreen.style";
import { strings } from "../../config";

import SettingsHomeBoxComponent from "./_Components/SettingsHomeBoxComponent";
import { routes } from "../../navigation/rootNavigation/navigation.constants";
import { StandardButton } from "../../components";

const SettingsHomeScreen = props => {
  let overlayKey = '';
  const ConfirmDeleteAccountOverlay = props => {
    const {type} = props;
    return (
      <Overlay.PullView
        key="ConfirmDeleteAccountOverlay"
        containerStyle={styles.overlayContainer}
        side={'bottom'}
        modal={false}
        rootTransform={[]}>
        <View style={styles.overlay}>
          <FastImage
            style={styles.overlayLogo}
            source={require('../../../assets/images/icons/icn_big_sad_light.png')}
          />
          <Text style={styles.overlayText}>
            {strings.SETTINGS.DELETE_ACCOUNT.CONFIRM_MESSAGE}
          </Text>
          <StandardButton
            style={{marginTop: 8, width: '60%'}}
            label={strings.SETTINGS.DELETE_ACCOUNT.CONFIRM_BUTTON}
            onPress={() => {
              overlayKey && Overlay.hide(overlayKey);
              props.navigation.navigate(routes.SETTINGS_DELETE_ACCOUNT);
            }}
          />
        </View>
      </Overlay.PullView>
    );
  };
  const notificationSettingsHandler = () => {
    props.navigation.navigate(routes.SETTINGS_SETTINGS_NOTIFICATION);
  };
  const openChangePasswordScreenHandler = () => {
    props.navigation.navigate(routes.SETTINGS_CHANGE_PASSWORD);
  };
  const deleteAccountHandler = () => {
    overlayKey = Overlay.show(
      ConfirmDeleteAccountOverlay({navigation: props.navigation}),
    );
  };
  return (
    <View style={styles.container}>
      <SettingsHomeBoxComponent />
      <Content contentContainerStyle={styles.container2}>
        <ListItem
          style={styles.item}
          icon
          first
          onPress={notificationSettingsHandler}>
          <Left>
            <FastImage
              style={styles.icon}
              source={require('../../../assets/images/icons/icn_bell.png')}
            />
          </Left>
          <Body>
            <Text style={styles.itemText}>
              {strings.SETTINGS.SETTINGS_HOME.NOTIFICATION_SETTINGS}
            </Text>
          </Body>
          <Right>
            <Icon style={styles.icon} name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem style={styles.item} icon last onPress={deleteAccountHandler}>
          <Left>
            <Image
              style={[styles.icon, {width: 25, height: 25, marginLeft: -3}]}
              resizeMode={'contain'}
              source={require('../../../assets/images/icons/icn_delete_icon.png')}
            />
          </Left>
          <Body>
            <Text style={styles.itemText}>
              {strings.SETTINGS.SETTINGS_HOME.DELETE_ACCOUNT}
            </Text>
          </Body>
          <Right>
            <Icon style={styles.icon} name="arrow-forward" />
          </Right>
        </ListItem>
      </Content>
    </View>
  );
};

/*
<ListItem
  style={styles.item}
  icon
  onPress={openChangePasswordScreenHandler}>
  <Left>
    <FastImage
      style={styles.icon}
      source={require('../../../assets/images/icons/icn_lock.png')}
    />
  </Left>
  <Body>
    <Text style={styles.itemText}>
      {strings.SETTINGS.SETTINGS_HOME.CHANGE_PASSWORD}
    </Text>
  </Body>
  <Right>
    <Icon style={styles.icon} name="arrow-forward" />
  </Right>
</ListItem>
*/

SettingsHomeScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.SETTINGS_HOME.TITLE,
});

export default SettingsHomeScreen;
