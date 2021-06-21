import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { strings } from "../../../../config";
import styles from "./EndedResult.style";
import useEndedResultViewModel from "../../ViewModels/EndedResult/EndedResultViewModel";
import { Overlay } from "teaset";
import FlowerParticleView from "./Components/FlowerParticleView";
import PointItem, { POINT_TYPE } from "./Components/PointItem";
import FastImage from "react-native-fast-image";
import { Button } from "../../../../components";

const EndedResult = props => {
  const {navigation} = props;
  const view = useEndedResultViewModel({props});
  console.log(view);
  const overlayId = Overlay.show(FlowerParticleView);
  const im_exists =
    view.simulation !== undefined &&
    view.simulation.instance_mappings.references !== undefined &&
    view.simulation.instance_mappings.references.length !== 0;
  setTimeout(() => Overlay.hide(overlayId), 6000);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.subtitleText}>
          {strings.TEST.ENDED_RESULT.SUBTITLE}
        </Text>
        <View style={styles.pointContainer}>
          <PointItem
            type={POINT_TYPE.CORRECT}
            value={view.correct_answer_point}
            count={view.correct_answer_count}
          />
          <PointItem
            type={POINT_TYPE.WRONG}
            value={view.wrong_answer_point}
            count={view.wrong_answer_count}
          />
          <PointItem
            type={POINT_TYPE.NO_ANSWER}
            value={view.no_answer_point}
            count={view.no_answer_count}
          />
          <View style={styles.totalPointContainer}>
            <Text style={styles.totalPointText}>
              {strings.TEST.ENDED_RESULT.TOTAL_RESULT_TITLE}
            </Text>
            <Text style={styles.totalPointValue}>
              {view.total_point}{' '}
              {strings.TEST.ENDED_RESULT.UNIT_POINT.toLowerCase()}
            </Text>
          </View>
        </View>
        {view.instance_type === 'clone' && (
          <View style={styles.cloneInfoContainer}>
            <FastImage
              style={styles.cloneInfoImage}
              source={require('../../../../../assets/images/icons/icn_info.png')}
            />
            <Text style={styles.cloneInfoTitle}>
              {strings.TEST.ENDED_RESULT.CLONE_INFO_TITLE}
            </Text>
          </View>
        )}

        {view.instance_type === 'wayback' &&
          view.simulation !== undefined &&
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
        <Button
          onPress={() => {
            view.gotoResultDetailScreen();
          }}
          style={styles.detailButton}>
          {strings.TEST.ENDED_RESULT.DETAIL_BUTTON}
        </Button>
        <Button
          onPress={() => {
            navigation.pop(2);
            navigation.goBack(null);
          }}
          style={styles.homeButton}
          textStyle={styles.homeButtonText}>
          {strings.TEST.ENDED_RESULT.HOME_BUTTON}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

EndedResult.navigationOptions = ({navigation}) => ({
  title: strings.TEST.ENDED_RESULT.TITLE,
  headerLeft: null,
});

export default EndedResult;
