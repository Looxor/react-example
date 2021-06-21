import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Svg, {LinearGradient, Path, Stop} from 'react-native-svg';
import {colors, constants, sounds} from '../config';
import FastImage from 'react-native-fast-image';
import {UserData} from '../config/constants';
import profile_image from '../utils/misc/ProfileImage';
import {Observable} from '../modules/_CommonModels/ViewModelBase';
import {routes} from '../navigation/rootNavigation/navigation.constants';
import TextCounter from './TextCounter';
import EventCenter from '../utils/misc/EventCenter';
import standardFunctions from '../utils/app/StandardFunctions';
import NavigationService from '../utils/app/NavigationService';
import DeviceInfo from 'react-native-device-info';

const getStatusBarHeight = () => {
  const dimen = Dimensions.get('window');
  const hasNotch = DeviceInfo.hasNotch();
  return Platform.select({
    ios: hasNotch ? 20 : 0,
    android: 0,
    default: 0,
  });
};

const width = Dimensions.get('window').width + 1;
const height = 86 + getStatusBarHeight();
const archHeight = 8;

const HomeCircularTopBar = props => {
  const navigation = useNavigation();
  const [showCoinsAnimation, setShowCoinsAnimation] = useState(false);
  const [totalCoins, setTotalCoins] = useState(
    Observable.getReduxValue('total_coins'),
  );
  let willUnMount = false;
  const [previousTotalCoins, setPreviousTotalCoins] = useState(
    Observable.getReduxValue('previous_total_coins'),
  );

  let user_profile_image_url = UserData.getUserData().profile_image_url;
  let standard_images_url = [
    profile_image['M'],
    profile_image['F'],
    profile_image['O'],
    undefined,
    '',
  ];
  let image_to_show = standard_images_url.includes(user_profile_image_url)
    ? {uri: profile_image['O']}
    : {uri: UserData.getUserData().profile_image_url};

  const handleProfileImagePressed = () => {
    standardFunctions.play_tap_sound();
    NavigationService.navigate(routes.PROFILE_NAVIGATOR, {
      screen: routes.PROFILE_HOME,
    });
  };

  const handleWalletPressed = navigation => {
    standardFunctions.play_tap_sound();
    navigation.navigate(routes.WALLET);
  };

  const handleSettingsPressed = navigation => {
    standardFunctions.play_tap_sound();
    NavigationService.navigate(routes.SETTINGS_NAVIGATOR, {
      screen: routes.SETTINGS_HOME,
    });
  };

  const componentWillUnmount = () => {
    willUnMount = true;
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      EventCenter.on('coins_value_changed', () => {
        if (willUnMount) return;
        standardFunctions.play_sound_effect(sounds.BESTOFS.EARNED_COINS);
        setShowCoinsAnimation(true);
        setPreviousTotalCoins(Observable.getReduxValue('previous_total_coins'));
        setTotalCoins(Observable.getReduxValue('total_coins'));

        setTimeout(async () => {
          setShowCoinsAnimation(false);
          await Observable.setReduxValue(
            'previous_total_coins',
            Observable.getReduxValue('total_coins'),
          );
          setPreviousTotalCoins(Observable.getReduxValue('total_coins'));
        }, 1800);
      });
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  useEffect(componentDidMount, [
    Observable.getReduxValue('total_coins'),
    Observable.getReduxValue('previous_total_coins'),
  ]);
  return (
    <View style={styles.container}>
      <Svg
        viewBox={`0 0 ${width} ${height + archHeight}`}
        style={{width, height: height + archHeight, ...styles.navBarShadow}}>
        <Path
          fill={'url(#gradient)'}
          d={`
            m0,0 
            L0,${height} 
            C100 ${height + archHeight},${width - 100} ${
            height + archHeight
          },${width} ${height} 
            l0,-${height}z`}
        />
        <LinearGradient id="gradient" x1={0} y1={0} x2={1} y2={0}>
          <Stop offset="0" stopColor={colors.WHITE} />
          <Stop offset="1" stopColor={colors.WHITE} />
        </LinearGradient>
      </Svg>

      <View style={[styles.navBarContainer, {marginTop: getStatusBarHeight()}]}>
        <TouchableOpacity
          onPress={() => handleProfileImagePressed()}
          style={styles.profileImageContainer}>
          <FastImage source={image_to_show} style={styles.profileImage} />
        </TouchableOpacity>

        <View style={styles.textsContainer}>
          <Text style={styles.nicknameText}>
            {UserData.getUserData().nickname}
          </Text>
          <TouchableOpacity
            onPress={() => handleWalletPressed(navigation)}
            style={styles.coinsContainer}>
            <FastImage
              resizeMode={'contain'}
              style={styles.coinsImage}
              source={require('../../assets/images/icons/icn_new_tf_coin.png')}
            />
            {showCoinsAnimation && (
              <FastImage
                resizeMode={'contain'}
                style={[
                  {
                    width: 195,
                    height: 195,
                    position: 'absolute',
                    top: -22,
                    left: -37.5,
                  },
                ]}
                source={require('../../assets/images/animations/icn_earned_coins.gif')}
              />
            )}
            <Text style={styles.coinsText}>
              <TextCounter
                start={previousTotalCoins}
                end={totalCoins}
                time={600}
                startAfter={100}
                easing={'linear'}
              />
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.settingsButtonContainer}
          onPress={() => handleSettingsPressed(navigation)}>
          <FastImage
            resizeMode={'contain'}
            style={styles.settingsButton}
            source={require('../../assets/images/icons/icn_settings_2.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height,
    backgroundColor: 'transparent',
  },
  navBarContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    elevation: 100,
  },
  navBarShadow: {
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
    elevation: 0,
  },
  profileImageContainer: {
    marginTop: 28,
    marginLeft: 30,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textsContainer: {
    width: '50%',
    height: 60,
    marginTop: 28,
    marginLeft: 20,
    flexDirection: 'column',
  },
  nicknameText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    color: colors.DARK_ALOE_TF,
  },
  coinsText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 20,
    marginTop: -2,
    marginLeft: 5,
    color: colors.LIGHT_ALOE_TF,
  },
  coinsContainer: {
    flexDirection: 'row',
  },
  coinsImage: {
    width: 22,
    height: 22,
  },
  settingsButtonContainer: {
    position: 'absolute',
    marginTop: 37,
    right: 25,
  },
  settingsButton: {
    width: 35,
    height: 35,
  },
});

export default HomeCircularTopBar;
