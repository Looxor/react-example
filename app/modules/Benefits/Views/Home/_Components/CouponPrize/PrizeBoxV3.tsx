import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants, strings } from "../../../../../../config";
import FastImage from "react-native-fast-image";
import { routes } from "../../../../../../navigation/rootNavigation/navigation.constants";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";
import NavigationService from "../../../../../../utils/app/NavigationService";

const BOTTOM_ICONS = {
  COIN: {
    ACTIVE: require('../../../../../../../assets/images/icons/icn_three_new_tf_coins.png'),
    INACTIVE: require('../../../../../../../assets/images/icons/icn_three_new_tf_coins_gray.png'),
  },
  COINEURO: {
    ACTIVE: require('../../../../../../../assets/images/icons/icn_new_tf_coin_euro.png'),
    INACTIVE: require('../../../../../../../assets/images/icons/icn_new_tf_coin_euro_gray.png'),
  },
  EURO: {
    ACTIVE: require('../../../../../../../assets/images/icons/icn_new_tf_euro.png'),
    INACTIVE: require('../../../../../../../assets/images/icons/icn_new_tf_euro_gray.png'),
  },
};

interface Props {
  prize: any;
  index: any;
}

const PrizesListItem = (props: Props) => {
  const [fastLoad, setFastLoad] = useState(false);
  const {prize, index} = props;
  const {partner_image_url, title, denomDescription} = prize;
  const pressPrizeHandler = () => {
    standardFunctions.play_tap_sound();
    standardFunctions.add_firebase_event_log('prizes', 'prize_box_clicked', {
      prize_id: prize.prize_id,
    });
    NavigationService.navigate(routes.COUPONS_NAVIGATOR, {
      screen: routes.COUPONS_PRIZE_DETAIL,
      params: {prize},
    });
  };

  useEffect(() => {
    setFastLoad(true);
  }, []);

  if (!fastLoad) return null;

  return (
    <View
      style={[
        styles.boxContainer,
        index % 2 === 0 ? {marginLeft: 15} : {marginRight: 15},
      ]}>
      <TouchableOpacity
        onPress={pressPrizeHandler}
        activeOpacity={constants.ACTIVE_OPACITY}
        style={styles.buttonContainer}>
        <View style={[styles.container]}>
          <View style={styles.headerSubContainer}>
            <FastImage
              resizeMode={'contain'}
              style={styles.bottomIcon1}
              source={
                BOTTOM_ICONS.COIN[
                  prize.isCoinAvailable() ? 'ACTIVE' : 'INACTIVE'
                ]
              }
            />
            <FastImage
              resizeMode={'contain'}
              style={styles.bottomIcon2}
              source={
                BOTTOM_ICONS.COINEURO[
                  prize.isCoinEuroAvailable() ? 'ACTIVE' : 'INACTIVE'
                ]
              }
            />
          </View>
          <View />
          <FastImage
            resizeMode={'contain'}
            source={{uri: partner_image_url}}
            style={[styles.brandImage]}
          />
          <View style={styles.detailView}>
            {prize.seen !== true && (
              <Text style={styles.isNew}>{strings.COUPONS.IS_NEW}</Text>
            )}
            <Text style={styles.detailTitle}>{title}</Text>
            <Text style={styles.detailDesc}>{denomDescription}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    width: '44%',
    height: 225,
    elevation: 0,
    marginTop: 12,
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 12,
    elevation: 10,
  },
  ribbonImage: {
    width: 68,
    height: 68,
    position: 'absolute',
    zIndex: 2,
    elevation: 3,
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: colors.lightGray,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandImage: {
    width: '60%',
    height: 80,
    marginTop: -5,
  },
  detailView: {
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  isNew: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 14,
    color: colors.ORANGE_TF,
    marginBottom: 5,
  },
  detailTitle: {
    marginTop: 0,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 17,
    lineHeight: 18,
    color: colors.DARK_ALOE_TF,
  },
  detailDesc: {
    marginTop: 5,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 13,
    lineHeight: 15,
    color: colors.LIGHT_ALOE_TF,
    textAlign: 'left',
  },
  headerSubContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomIcon1: {
    marginLeft: 15,
    marginRight: 10,
    width: 20,
    height: 24,
  },
  bottomIcon2: {
    width: 28,
    height: 30,
  },
});
export default PrizesListItem;
