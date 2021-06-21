import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import useMatchResultViewModel from "../_ViewModels/MatchResultViewModel";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../config";
import styles from "./FinalResultScreen.style";
import PlayerBlock from "../_Components/PlayerBlock";
import ScoreBlock from "../_Components/ScoreBlock";
import CloseScreenButton from "../_Components/CloseScreenButton";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { CallServerPromise } from "../../../utils/app/CallServer";
import standardFunctions from "../../../utils/app/StandardFunctions";
import BestOf from "../_Models/BestOf";
import BestOfHistory from "../_Models/BestOfHistory";
import TouchableScale from "react-native-touchable-scale";
import FadeInView from "../MatchMakingScreen/_Components/FadeInView";
import CacheManager from "../../../utils/app/CacheManager";
import NavigationService from "../../../utils/app/NavigationService";

const FinalResultScreen = props => {
  let sheetRef: any = useRef();
  const view = useMatchResultViewModel({props});
  const [scoresViewOpened, setScoresViewOpened] = useState(false);
  const [showPopover, setShowPopover] = useState({
    praise: false,
    avg: false,
    check: false,
  });
  const [loadingNewBestOf, setLoadingNewBestOf] = useState(false);

  const startBestOfHandler = async () => {
    let same_faculty = CacheManager.get('same_faculty_bestof');
    standardFunctions.add_firebase_event_log('bestofs', 'play_agn');
    if (loadingNewBestOf) return;
    setLoadingNewBestOf(true);
    let request: any = await CallServerPromise.start_bestof_v2({same_faculty});
    if (!request.success) {
      setLoadingNewBestOf(false);
      if (request.error === 'missing faculty') {
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.BESTOF2.MATCH_MAKING_SCREEN.NEED_TO_SET_FACULTY,
        );
      } else if (request.error === 'already playing') {
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.BESTOF2.MATCH_MAKING_SCREEN.ALREADY_PLAYING,
        );
      } else {
        await standardFunctions.show_alert_async(
          strings.OTHER.WARNING,
          strings.BESTOF2.MATCH_MAKING_SCREEN.UNKNOWN_ERROR.replace(
            '{ERROR_CODE}',
            request.error,
          ),
        );
        console.log('error on start bestof', request);
      }
    } else {
      BestOf.init();
      BestOf.set(request.data);
      await BestOfHistory.set(request.data);
      setLoadingNewBestOf(false);
      NavigationService.navigate(routes.BESTOF2_NAVIGATOR, {
        screen: routes.BESTOF2_MATCHMAKING,
      });
    }
  };

  const closePopover = () => {
    if (showPopover.praise || showPopover.avg) {
      setShowPopover({praise: false, avg: false, check: true});
    } else {
      setShowPopover({praise: false, avg: false, check: false});
    }
  };

  const showSummaryHandler = () => {
    standardFunctions.add_firebase_event_log('bestofs', 'smmr_opnd');
    props.navigation.navigate(routes.BESTOF2_SUMMARY);
  };

  const handleBackButtonClick = () => {
    view.onCloseHandler(false);
    return true;
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  };

  const renderHeader = () => (
    <>
      <TouchableOpacity
        onPress={() => {
          if (sheetRef) {
            sheetRef.current.snapTo(scoresViewOpened ? 1 : 0);
          }
          setScoresViewOpened(!scoresViewOpened);
        }}
        activeOpacity={1.0}
        style={styles.scoresPanelHeader}>
        <FastImage
          resizeMode={'contain'}
          style={{
            width: Dimensions.get('window').width,
            height: 55,
            marginBottom: -5,
          }}
          source={
            scoresViewOpened
              ? require('../../../../assets/images/icons/icn_close_panel_view.png')
              : require('../../../../assets/images/icons/icn_open_panel_view.png')
          }
        />
      </TouchableOpacity>
    </>
  );

  const renderContent = () => (
    <>
      <View style={styles.scoresPanelContent}>
        <View
          style={{
            paddingBottom: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: colors.WHITE,
          }}>
          <PlayerBlock
            player={view.meIsUser1 ? view.gameUser1 : view.gameUser2}
            style={{marginLeft: -45, width: '60%'}}
          />
          <PlayerBlock
            player={view.meIsUser1 ? view.gameUser2 : view.gameUser1}
            style={{marginRight: -45, width: '60%'}}
          />
        </View>
        {view.scores &&
          view.scores.map((score, index) => (
            <ScoreBlock
              alwaysToShow={true}
              enabled={true}
              user1First={view.meIsUser1}
              score={score}
            />
          ))}

        <View
          style={{
            backgroundColor: colors.BESTOF2.BG1,
            width: '100%',
            height: 2,
            borderRadius: 2,
            marginVertical: 15,
          }}
        />
        <ScoreBlock
          alwaysShow={true}
          enabled={false}
          score={view.avgScore}
          containerStyle={{width: '100%'}}
          textStyle={{color: colors.ORANGE_TF, fontSize: 28}}
          isAverage={true}
          user1First={view.meIsUser1}
        />
      </View>
    </>
  );

  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.container} onTouchStart={closePopover}>
      <StatusBar backgroundColor={'rgb(246, 246, 246)'} />
      <FastImage
        resizeMode={'contain'}
        source={require('../../../../assets/images/icons/bestofs_trasparent_background_blue.png')}
        style={styles.imageBackgroundContainer}>
        {view.loaded && (
          <View
            style={{
              flex: 1,
              width: '95%',
              marginTop: 25,
              marginBottom: 0,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CloseScreenButton
              onPress={() => view.onCloseHandler(false)}
              style={{
                top: Platform.select({
                  android: 20,
                  ios: -20,
                }),
                marginRight: -10,
              }}
            />
            <FadeInView
              duration={500}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FastImage
                style={{width: 50, height: 50}}
                source={require('../../../../assets/images/icons/icn_new_bestofs.png')}
              />
              <Text style={styles.questionCountText}>
                {view.isWon && strings.BESTOF2.FINAL_RESULT_SCREEN.YOU_WON}
                {!view.isWon &&
                  view.isLost &&
                  strings.BESTOF2.FINAL_RESULT_SCREEN.YOU_LOST}
                {!view.isWon &&
                  !view.isLost &&
                  strings.BESTOF2.FINAL_RESULT_SCREEN.YOU_PAREGED}
              </Text>
            </FadeInView>
            <FadeInView
              duration={1000}
              startAfter={600}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: -30,
                marginBottom: 35,
              }}>
              <PlayerBlock
                player={view.meIsUser1 ? view.gameUser1 : view.gameUser2}
                style={{width: '48%'}}
                hasCrown={view.isWon}
                isBigger={view.isWon || (!view.isWon && !view.isLost)}
                showFaculty={true}
              />
              <PlayerBlock
                player={view.meIsUser1 ? view.gameUser2 : view.gameUser1}
                style={{width: '48%'}}
                hasCrown={view.isLost}
                isBigger={view.isLost || (!view.isWon && !view.isLost)}
                showFaculty={true}
              />
            </FadeInView>

            <ScoreBlock
              alwaysShow={false}
              enabled={true}
              startAfter={1700}
              duration={800}
              showAlsoIconFade={true}
              score={view.avgScore}
              user1First={view.meIsUser1}
              containerStyle={{width: '70%', marginTop: 55}}
              textStyle={{color: colors.ORANGE_TF, fontSize: 28}}
              isAverage={true}
              showPraise={view.isWon}
              showAverageLabel={false}
              showPopover={showPopover}
              setShowPopover={setShowPopover}
            />

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: '70%', marginTop: 5}}>
              {view.scores &&
                view.scores.map((score, index) => (
                  <ScoreBlock
                    key={String(index)}
                    containerStyle={{marginBottom: 2}}
                    enabled={true}
                    startAfter={2300}
                    duration={800}
                    user1First={view.meIsUser1}
                    score={score}
                    showAlsoIconFade={true}
                  />
                ))}
            </ScrollView>
            <FadeInView
              duration={800}
              startAfter={2800}
              style={{
                opacity: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 15,
                width: Dimensions.get('window').width + 1,
                backgroundColor: colors.WHITE,
                zIndex: 101,
                elevation: 101,
              }}>
              <TouchableScale
                activeScale={0.96}
                onPress={() => startBestOfHandler()}
                style={{
                  borderRadius: 15,
                  backgroundColor: colors.BESTOF2.BG1,
                  width: '85%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  paddingVertical: 12,
                  borderWidth: 0,
                  shadowColor: colors.lightGray,
                  shadowOpacity: 0.4,
                  shadowOffset: {width: 0, height: 0},
                  shadowRadius: 5,
                  elevation: 2,
                }}>
                {loadingNewBestOf ? (
                  <ActivityIndicator style={{}} color={colors.WHITE} />
                ) : (
                  <Text
                    style={{
                      fontFamily: constants.DEFAULT_FONT_BOLD,
                      lineHeight: 22,
                      color: colors.WHITE,
                      textAlign: 'center',
                      fontSize: 18,
                    }}>
                    {strings.BESTOF2.FINAL_RESULT_SCREEN.PLAY_AGAIN}
                  </Text>
                )}
              </TouchableScale>
              <TouchableScale
                activeScale={0.96}
                onPress={showSummaryHandler}
                style={{
                  borderRadius: 15,
                  backgroundColor: colors.WHITE,
                  width: '85%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  paddingVertical: 12,
                  borderWidth: 0,
                  shadowColor: colors.lightGray,
                  shadowOpacity: 0.4,
                  shadowOffset: {width: 0, height: 0},
                  shadowRadius: 5,
                  elevation: 2,
                }}>
                <Text
                  style={{
                    fontFamily: constants.DEFAULT_FONT_BOLD,
                    lineHeight: 22,
                    color: colors.BESTOF2.BG1,
                    textAlign: 'center',
                    fontSize: 18,
                  }}>
                  {strings.BESTOF2.FINAL_RESULT_SCREEN.QUESTION_SUMMARY}
                </Text>
              </TouchableScale>
            </FadeInView>
          </View>
        )}
      </FastImage>
    </SafeAreaView>
  );
};

/*
            <BottomSheet
                ref={sheetRef}
                initialSnap={1}
                snapPoints={[Dimensions.get('window').height-50, 200]}
                borderRadius={0}
                onOpenEnd={() => {setScoresViewOpened(true)}}
                onCloseEnd={() => {setScoresViewOpened(false)}}
                renderHeader={renderHeader}
                renderContent={renderContent}
            />
 */

FinalResultScreen.navigationOptions = ({navigation}) => ({
  header: null,
});
export default FinalResultScreen;
