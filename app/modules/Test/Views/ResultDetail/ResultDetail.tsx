import React from "react";
import { Animated, BackHandler, SafeAreaView, Text, View } from "react-native";
import { compose, withProps, withState } from "recompose";
import AnimatedHeader from "./AnimatedComponents/AnimatedHeader";
import styles from "./ResultDetail.style";
import useResultDetailViewModel from "../../ViewModels/ResultDetail/ResultDetailViewModel";
import { strings } from "../../../../config";
import BlockItem from "./Components/BlockItem";
import { BackButtonTop, Button } from "../../../../components";
import CheckActiveSimulation from "../../CommonComponents/CheckActiveSimulation";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";

export const scrollRangeForAnimation = 250;

const HeaderPlaceholder = (
  <View style={{flex: 0, height: 195, width: '100%'}} />
);
let _scrollView = null;
const onScrollEndSnapToEdge = event => {
  const y = event.nativeEvent.contentOffset.y;
  if (0 < y && y < scrollRangeForAnimation / 2) {
    if (_scrollView) {
      _scrollView.scrollTo({y: 0});
    }
  } else if (scrollRangeForAnimation / 2 <= y && y < scrollRangeForAnimation) {
    if (_scrollView) {
      _scrollView.scrollTo({y: scrollRangeForAnimation});
    }
  }
};

const ResultDetail = props => {
  const {scrollY, animationRange} = props;
  const simulation = props.navigation.getParam('simulation');
  const view = useResultDetailViewModel({props, simulation, gotoTestHome});
  const im_exists =
    view.simulation !== undefined &&
    view.simulation.instance_mappings.references !== undefined &&
    view.simulation.instance_mappings.references.length !== 0;
  return (
    <SafeAreaView style={styles.container}>
      <CheckActiveSimulation componentName={'ResultDetail'} />
      <Animated.ScrollView
        style={styles.scrollView}
        ref={scrollView => {
          _scrollView = scrollView;
        }}
        onScrollEndDrag={onScrollEndSnapToEdge}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {
            useNativeDriver: true,
          },
        )}>
        {HeaderPlaceholder}

        {view.simulation !== undefined &&
          view.simulation.instance_mappings !== undefined && (
            <View style={styles.waybackInfoContainer}>
              <Text style={styles.waybackRankingTitle}>
                {strings.TEST.ENDED_RESULT.WAYBACK_RANKING_TITLE}
              </Text>
              {im_exists && (
                <Text style={styles.waybackRankingTitle}>
                  {strings.TEST.ENDED_RESULT.WAYBACK_RANKING_TITLE2}
                </Text>
              )}
              {im_exists && (
                <Text style={styles.waybackRankingValue}>
                  {view.simulated_ranking}
                  {strings.TEST.ENDED_RESULT.RANKING_UNIT}
                </Text>
              )}
              <Text style={styles.waybackComplimentText}>
                {im_exists &&
                view.simulation.score >=
                  view.simulation.instance_mappings.score_cutoff
                  ? strings.TEST.ENDED_RESULT.WAYBACK_CUTOFF_COMPLIMENT
                  : !im_exists &&
                    view.simulation.score >=
                      view.simulation.instance_mappings.score_cutoff
                  ? strings.TEST.ENDED_RESULT.WAYBACK_CUTOFF_COMPLIMENT2
                  : im_exists &&
                    view.simulation.score <
                      view.simulation.instance_mappings.score_cutoff
                  ? strings.TEST.ENDED_RESULT.WAYBACK_CUTOFF_NOT_COMPLIMENT
                  : !im_exists &&
                    view.simulation.score <
                      view.simulation.instance_mappings.score_cutoff
                  ? strings.TEST.ENDED_RESULT.WAYBACK_CUTOFF_NOT_COMPLIMENT2
                  : ''}
              </Text>
            </View>
          )}

        {view.blocks_with_subjects &&
          view.blocks_with_subjects.length > 0 &&
          view.blocks_with_subjects.map(subjects => (
            <BlockItem style={{marginHorizontal: 10}} subjects={subjects} />
          ))}

        <Button
          onPress={() => view.closeButtonHandler()}
          style={styles.closeButton}>
          {strings.TEST.RESULT_DETAIL.CLOSE_BUTTON}
        </Button>
        <Text>{'\n'.repeat(26)}</Text>
      </Animated.ScrollView>
      <AnimatedHeader view={view} animationRange={animationRange} />
    </SafeAreaView>
  );
};

const enhance = compose(
  withState('scrollY', 'setScrollY', () => new Animated.Value(0)),
  withProps(({scrollY}) => ({
    animationRange: scrollY.interpolate({
      inputRange: [0, scrollRangeForAnimation],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  })),
);

const gotoTestHome = navigation => {
  navigation.goBack(null);
  navigation.navigate(routes.TEST);
};

const ResultDetailScreen = enhance(ResultDetail);
ResultDetailScreen.navigationOptions = ({navigation}) => {
  const DIRECTLY_OPEN = navigation.getParam('DIRECTLY_OPEN');

  const removeBackPressHandler = () => {
    // @ts-ignore
    global.backHandler && global.backHandler.remove();
  };
  const addBackPressHandler = () => {
    removeBackPressHandler();
    // @ts-ignore
    global.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        gotoTestHome(navigation);
        removeBackPressHandler();
        return true;
      },
    );
  };

  if (DIRECTLY_OPEN === true) {
    addBackPressHandler();
  }
  return {
    ...(DIRECTLY_OPEN === true
      ? {
          headerLeft: (
            <BackButtonTop
              navigation={navigation}
              onBackPress={() => gotoTestHome(navigation)}
            />
          ),
        }
      : {}),
    title: strings.TEST.RESULT_DETAIL.TITLE,
  };
};

export default ResultDetailScreen;
