import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { colors, constants, sounds, strings } from "../../../../config";
import FastImage from "react-native-fast-image";
import FadeInView from "./FadeInView";
import ScoreText from "../../_Components/ScoreText";
import standardFunctions from "../../../../utils/app/StandardFunctions";

export const USER_BLOCK_HEIGHT = 95;
const UserInfoBlock = props => {
  const [cardExitAnimation, setCardExitAnimation] = useState(
    new Animated.Value(-Dimensions.get('window').width),
  );
  const [cardEnterAnimation, setCardEnterAnimation] = useState(
    new Animated.Value(1000),
  );

  const OFFSET = 20;
  const PHOTO_SIZE = USER_BLOCK_HEIGHT + OFFSET;
  const MARGIN_HORIZONTAL = 20;
  const {player, position, fade = false} = props;
  const isLeft = position === 'up';

  useEffect(() => {
    if (props.player && position === 'up') {
      standardFunctions.play_sound_effect(sounds.BESTOFS.OPPONENT_FOUND);
      Animated.sequence([
        Animated.timing(cardExitAnimation, {
          toValue: -Dimensions.get('window').width + 10,
          duration: 30,
          useNativeDriver: true,
        }),
        Animated.timing(cardExitAnimation, {
          toValue: -1000,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(cardEnterAnimation, {
          toValue: -10,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(cardEnterAnimation, {
          toValue: 0,
          duration: 30,
          useNativeDriver: true,
        }),
      ]).start(async () => {});
    }
  }, [props.player]);
  return (
    <View style={{flexDirection: 'row'}}>
      <Animated.View
        style={[
          {
            width: '100%',
          },
          position === 'up' && {
            justifyContent: 'flex-end',
            transform: [{translateX: cardEnterAnimation}],
          },
        ]}>
        <FadeInView
          duration={!fade ? 0 : 1000}
          style={{
            height: USER_BLOCK_HEIGHT,
            backgroundColor: colors.WHITE,
            margin: MARGIN_HORIZONTAL,
            ...(isLeft
              ? {
                  marginLeft: PHOTO_SIZE / 2,
                  paddingLeft: PHOTO_SIZE - MARGIN_HORIZONTAL * 1.2,
                  paddingRight: 10,
                }
              : {
                  marginRight: PHOTO_SIZE / 2,
                  paddingRight: PHOTO_SIZE - MARGIN_HORIZONTAL * 1.2,
                  paddingLeft: 10,
                  alignItems: 'flex-end',
                }),
            borderRadius: 15,
            justifyContent: 'space-around',
            paddingVertical: 10,
            shadowColor: colors.lightGray,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 10,
            elevation: 6,
            marginVertical: props.marginVertical ? props.marginVertical : 35,
          }}>
          <FastImage
            resizeMode={'cover'}
            source={{uri: player ? player.profile_image_url : ''}}
            style={{
              borderWidth: constants.onePixel,
              borderColor: colors.gray,
              backgroundColor: colors.WHITE,
              width: PHOTO_SIZE,
              height: PHOTO_SIZE,
              borderRadius: PHOTO_SIZE,
              position: 'absolute',
              top: -OFFSET / 2,
              ...(isLeft
                ? {left: -PHOTO_SIZE / 2 + MARGIN_HORIZONTAL}
                : {right: -PHOTO_SIZE / 2 + MARGIN_HORIZONTAL}),
              shadowColor: colors.darkGray,
              shadowOpacity: 0.2,
              shadowOffset: {width: -5, height: -5},
              shadowRadius: 10,
              // @ts-ignore
              elevation: 4,
            }}
          />
          <View />
          <Text
            style={[
              styles.text,
              !isLeft && {textAlign: 'right'},
              styles.nameText,
            ]}>
            {player ? player.nickname : ''}
          </Text>
          <Text
            style={[
              styles.text,
              !isLeft && {textAlign: 'right'},
              styles.univNameText,
            ]}>
            {player ? player.university_name : ''}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              source={require('../../../../../assets/images/icons/icn_hat.png')}
              style={{width: 18, height: 18}}
              resizeMode={'cover'}
            />
            <ScoreText
              style={[styles.text, styles.marksText]}
              minorFontSize={12}
              score={player ? player.avg_score : ''}
            />
          </View>
          <View />
          <View
            style={{
              width: 45,
              height: 45,
              borderRadius: 16,
              position: 'absolute',
              bottom: -5,
              ...(isLeft ? {right: -5} : {left: -5}),
              zIndex: 10,
              backgroundColor: colors.WHITE,
              shadowColor: colors.darkGray,
              shadowOpacity: 0.2,
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 5,
              elevation: 4,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage
              resizeMode={'cover'}
              source={{uri: player ? player.faculty_image_url : ''}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        </FadeInView>
      </Animated.View>
      {position === 'up' && (
        <Animated.View
          style={{
            marginTop: 80,
            width: Dimensions.get('window').width,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{translateX: cardExitAnimation}],
          }}>
          <FastImage
            style={{width: 120, height: 120, marginTop: 0}}
            source={require('../../../../../assets/images/icons/icn_globe.png')}
          />
          <Text style={styles.loadingPlayerText}>
            {strings.BESTOF2.MATCH_MAKING_SCREEN.LOADING_PLAYER}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.BESTOF2.BG1,
  },
  loadingPlayerText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 20,
    color: colors.BESTOF2.LOADING,
  },
  nameText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 16,
  },
  univNameText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 13,
    lineHeight: 15,
    color: colors.LIGHT_ALOE_TF,
  },
  marksText: {
    fontSize: 15,
    fontFamily: 'Kalam-Bold',
    color: colors.ORANGE_TF,
    marginLeft: 4,
  },
});

export default UserInfoBlock;
