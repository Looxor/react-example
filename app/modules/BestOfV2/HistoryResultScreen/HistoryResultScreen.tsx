import React, { useEffect, useRef, useState } from "react";
import {
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
import useHistoryResultViewModel from "../_ViewModels/HistoryResultViewModel";
import FastImage from "react-native-fast-image";
import { colors, strings } from "../../../config";
import styles from "./HistoryResultScreen.style";
import PlayerBlock from "../_Components/PlayerBlock";
import ScoreBlock from "../_Components/ScoreBlock";
import CloseScreenButton from "../_Components/CloseScreenButton";
import FadeInView from "../MatchMakingScreen/_Components/FadeInView";

const HistoryResultScreen = props => {
  let sheetRef: any = useRef();
  const view = useHistoryResultViewModel({props});
  const [scoresViewOpened, setScoresViewOpened] = useState(false);
  const [showPopover, setShowPopover] = useState({
    praise: false,
    avg: false,
    check: false,
  });

  const closePopover = () => {
    if (showPopover.praise || showPopover.avg) {
      setShowPopover({praise: false, avg: false, check: true});
    } else {
      setShowPopover({praise: false, avg: false, check: false});
    }
  };

  const handleBackButtonClick = () => {
    view.onCloseHandler();
    return true;
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      let bestof_id = props.navigation.getParam('bestof_data').bestof_data
        ? props.navigation.getParam('bestof_data').bestof_data.bestof_id
        : '';
      if (bestof_id && bestof_id !== '') {
        view.loadData(bestof_id);
      }
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
      <CloseScreenButton
        onPress={() => view.onCloseHandler()}
        style={{
          top:
            45 - (Platform.OS === 'android' ? StatusBar.currentHeight - 10 : 0),
          marginRight: -10,
        }}
      />
      <FastImage
        resizeMode={'contain'}
        source={require('../../../../assets/images/icons/bestofs_trasparent_background_blue.png')}
        style={styles.imageBackgroundContainer}>
        {view.loaded && (
          <>
            <View
              style={{
                flex: 1,
                width: '95%',
                marginTop: 25,
                marginBottom: 0,
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <FadeInView
                duration={500}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FastImage
                  style={{width: 60, height: 60}}
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
                  marginTop: -15,
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
                containerStyle={{width: '70%', marginTop: 80}}
                textStyle={{color: colors.ORANGE_TF, fontSize: 28}}
                isAverage={true}
                showPraise={view.isWon}
                showAverageLabel={false}
                showPopover={showPopover}
                setShowPopover={setShowPopover}
              />

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{width: '70%', marginTop: 10}}>
                {view.scores &&
                  view.scores.map((score, index) => (
                    <ScoreBlock
                      enabled={true}
                      startAfter={2300}
                      duration={800}
                      user1First={view.meIsUser1}
                      score={score}
                      showAlsoIconFade={true}
                    />
                  ))}
              </ScrollView>
            </View>
          </>
        )}
      </FastImage>
    </SafeAreaView>
  );
};

/*
<View style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor:
              colors.WHITE,
              width: Dimensions.get('window').width,
              height: 20,
              zIndex: 101,
              elevation: 101,
            }}/>
          <BottomSheet
              ref={sheetRef}
              initialSnap={1}
              snapPoints={[Dimensions.get('window').height-80, 80]}
              borderRadius={0}
              onOpenEnd={() => {setScoresViewOpened(true)}}
              onCloseEnd={() => {setScoresViewOpened(false)}}
              renderHeader={renderHeader}
              renderContent={renderContent}
          />
 */

HistoryResultScreen.navigationOptions = ({navigation}) => ({
  header: null,
});
export default HistoryResultScreen;
