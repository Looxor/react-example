import React, { useEffect, useState } from "react";
import { Animated, Dimensions, SafeAreaView, StatusBar, View } from "react-native";
import styles from "./MatchMakingScreen.style";
import { colors, sounds } from "../../../config";
import PlayerBlock from "./_Components/PlayerBlock";
import WaitingIndicator from "./_Components/WaitingIndicator";
import useMatchMakingViewModel from "../_ViewModels/MatchMakingViewModel";
import CloseScreenButton from "../_Components/CloseScreenButton";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import SubjectsContainer from "./_Components/SubjectsContainer";
import standardFunctions from "../../../utils/app/StandardFunctions";

const MatchMakingScreen = props => {
  const view = useMatchMakingViewModel({props});
  const [initialized, setInitialized] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [allAnimationsFinished, setAllAnimationsFinished] = useState(false);
  const [subjectsContainerHeight, setSubjectsContainerHeight] = useState(0);
  const [userBlockSpaceBG, setUserBlockSpaceBG] = useState(0);
  const [marginVerticalSubjects, setMarginVerticalSubjects] = useState(35);
  const [leftAnimation, setLeftAnimation] = useState(new Animated.Value(0));

  const startAnimation = () => {
    let animatedValue = new Animated.Value(0);
    animatedValue.addListener(v => {
      setSubjectsContainerHeight(v.value);
    });

    Animated.timing(animatedValue, {
      toValue: (25 * Dimensions.get('window').height) / 100,
      duration: 125,
      useNativeDriver: true,
    }).start(() => {});

    standardFunctions.play_sound_effect(sounds.BESTOFS.WHOOSH);

    let animatedValueBG = new Animated.Value(subjectsContainerHeight);
    animatedValueBG.addListener(v => {
      setUserBlockSpaceBG(v.value);
    });

    Animated.timing(animatedValueBG, {
      toValue: 400,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {});

    /*
      let animatedValueSBJ = new Animated.Value(35);
      animatedValueSBJ.addListener((v) => {
        setMarginVerticalSubjects(v.value);
      });

      Animated.timing(animatedValueSBJ, {
        toValue: -60,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {

      });
      */
  };

  const startLeftAnimation = () => {
    Animated.timing(leftAnimation, {
      toValue: -2000,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {});
  };

  useEffect(() => {
    if (!initialized) {
      standardFunctions.play_sound_effect(sounds.BESTOFS.FINDING_OPPONENT);
      setTimeout(() => {
        setInitialized(true);
      }, 250);
    }
    if (animationFinished && !allAnimationsFinished) {
      startAnimation();
    }

    if (allAnimationsFinished) {
      setTimeout(() => {
        startLeftAnimation();
      }, 1200);
    }
  }, [animationFinished, allAnimationsFinished]);
  return (
    <View style={[styles.container]}>
      <LinearGradient
        style={styles.container}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={[colors.BESTOF2.BG2_1, colors.BESTOF2.BG2_2]}>
        <SafeAreaView
          style={{flex: 0, marginTop: -60, backgroundColor: colors.BESTOF2.BG1}}
        />
        <StatusBar
          backgroundColor={colors.BESTOF2.BG1}
          barStyle={userBlockSpaceBG > 200 ? 'dark-content' : 'light-content'}
        />
        <FastImage
          style={styles.mainImageBackground}
          source={require('../../../../assets/images/icons/bestofs_trasparent_background.png')}
        />
        <CloseScreenButton
          onPress={() => {
            view.onCloseHandler();
          }}
        />
        <Animated.View
          style={[{flex: 1, transform: [{translateX: leftAnimation}]}]}>
          <PlayerBlock
            marginVertical={marginVerticalSubjects}
            topSpace={userBlockSpaceBG}
            style={{paddingBottom: 5}}
            position={'up'}
            player={initialized && view.gameUser2 ? view.gameUser2 : null}
          />
          <WaitingIndicator
            setAnimationFinished={setAnimationFinished}
            enableFadeOut={
              initialized &&
              view.gameUser2 !== null &&
              view.gameUser2 !== undefined
            }
            startAfter={1300}
            style={{}}
            timeout={view.searchTime}
            onTimeout={() => view.onTimeout()}
          />
          <SubjectsContainer
            style={{height: subjectsContainerHeight}}
            questions={initialized && view.questions ? view.questions : null}
            user1={view.gameUser1}
            user2={view.gameUser2}
            setAllAnimationsFinished={setAllAnimationsFinished}
          />
          <PlayerBlock
            marginVertical={marginVerticalSubjects}
            topSpace={userBlockSpaceBG}
            style={{paddingTop: 5}}
            position={'down'}
            player={view.gameUser1}
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default MatchMakingScreen;
