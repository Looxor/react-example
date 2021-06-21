import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./ScoreboardScreen.style";
import { colors, strings } from "../../../../config";
import { Observable } from "../../../_CommonModels/ViewModelBase";
import { Popover } from "teaset";
import Strings from "../../../../utils/misc/TextComponents";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import ScoreboardFlatList from "../_Components/ScoreboardFlatList";

const PopoverItem = props => {
  return (
    <Popover
      style={styles.infoPopoverContainer}
      arrow={'top'}
      paddingCorner={50}>
      {Strings.makeBold(props.text, {style: styles.popoverTextStyle})}
    </Popover>
  );
};

const ScoreboardScreen = props => {
  const [showPopover, setShowPopover] = useState({
    info: false,
    check: false,
  });
  const [missingBestOfs, setMissingBestOfs] = useState(0);
  const [loading, setLoading] = useState(true);

  const closePopover = () => {
    if (showPopover.info) {
      setShowPopover({info: false, check: true});
    } else {
      setShowPopover({info: false, check: false});
    }
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      const bestof_scoreboard_score_and_rank = Observable.getReduxValue(
        'bestof_scoreboard_score_and_rank',
      );
      if (
        bestof_scoreboard_score_and_rank &&
        bestof_scoreboard_score_and_rank.rank === '--'
      ) {
        const responseBestOfs: any =
          await CallServerPromise.get_finished_bestofs({limit: 10});
        if (responseBestOfs.success) {
          setMissingBestOfs(10 - responseBestOfs.data.length);
        } else {
          setMissingBestOfs(10);
        }
      }
      setLoading(false);
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  const getItemLayout = (data, index) => ({
    length: 150,
    offset: 150 * index,
    index,
  });

  useEffect(componentDidMount, []);
  const bestof_scoreboard_score_and_rank = Observable.getReduxValue(
    'bestof_scoreboard_score_and_rank',
  );
  return (
    <View style={styles.globalContainer} onTouchStart={closePopover}>
      {showPopover.info && (
        <PopoverItem
          text={
            bestof_scoreboard_score_and_rank &&
            bestof_scoreboard_score_and_rank.rank !== '--'
              ? strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN.INFO_DESCRIPTION
              : strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN
                  .INFO_DESCRIPTION_NOT_IN_SCOREBOARD
          }
        />
      )}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (!showPopover.check) {
            setShowPopover({
              info: !showPopover.info,
              check: false,
            });
          }
        }}
        style={styles.header}>
        <Text style={styles.headerText}>
          {strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN.SCOREBOARD_TEXT}
        </Text>
        <View style={styles.globalView}>
          <FastImage
            source={require('../../../../../assets/images/icons/icn_header_scoreboard_global.png')}
            style={styles.globalIcon}
          />
          <Text style={styles.headerTitle}>
            {strings.BESTOF2.HOME_SCREEN.SCOREBOARD_SCREEN.GLOBAL_TEXT}
          </Text>
        </View>
      </TouchableOpacity>
      {loading && (
        <View
          style={{
            width: '100%',
            height: '60%',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={colors.WHITE} />
        </View>
      )}
      {!loading && (
        <ScoreboardFlatList
          loading={loading}
          missingBestOfs={missingBestOfs}
          hideLoading={() => {
            setLoading(false);
          }}
          setSelectedBookmark={props.setSelectedBookmark}
        />
      )}
      <View style={{width: '100%', height: 0}} />
    </View>
  );
};

export default ScoreboardScreen;
