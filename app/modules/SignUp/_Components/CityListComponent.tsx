import React, { useState } from "react";
import { FlatList, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import FastImage from "react-native-fast-image";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../config";

const ITEM_HEIGHT = 40;

const renderOverlayListItem = ({item, selected, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.overlayListItem}>
      <Text style={styles.overlayListItemText}>{item}</Text>
      {selected && (
        <FastImage
          style={[styles.overlayCheckIcon]}
          source={require('../../../../assets/images/icons/icn_selected_blue.png')}
        />
      )}
    </TouchableOpacity>
  );
};

const CityListComponent = props => {
  let listRef;
  const [state, setState] = useState({
    // @ts-ignore
    selectedIndex: global.selectedIndex,
    clicked: false,
  });
  // @ts-ignore
  global.selectedIndex = state.selectedIndex;
  const donePressHandler = () => {
    props.onSelect && props.onSelect(props.cities[state.selectedIndex]);
    // @ts-ignore
    Overlay.hide(global.overlayKey);
  };
  const itemPressHandler = index => {
    setState({
      ...state,
      selectedIndex: index,
      clicked: true,
    });
  };
  setTimeout(() => {
    !state.clicked &&
      state.selectedIndex &&
      state.selectedIndex > -1 &&
      listRef &&
      listRef.scrollToIndex({animated: false, index: state.selectedIndex});
  }, 100);
  return (
    <Overlay.PullView
      key="ConfirmDeleteAccountOverlay"
      containerStyle={styles.overlayContainer}
      side={'bottom'}
      modal={true}
      onCloseRequest={() => {
        // @ts-ignore
        Overlay.hide(global.overlayKey);
      }}
      rootTransform={[]}>
      <View style={styles.overlay}>
        <View style={styles.overlayMain}>
          <View style={styles.overlayHeader}>
            <Text style={styles.overlayHeaderText}>
              {strings.SIGNUP.STUDENT1.OEVERLAY_HEADER}
            </Text>
            <TouchableOpacity
              onPress={donePressHandler}
              style={styles.overlayHeaderButton}>
              <Text style={styles.overlayHeaderButtonText}>
                {strings.SIGNUP.STUDENT1.OEVERLAY_DONE}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            initialNumToRender={100}
            data={props.cities}
            keyExtractor={(_, index) => String(index)}
            style={styles.overlayList}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            ref={ref => (listRef = ref)}
            renderItem={({item, index}) =>
              renderOverlayListItem({
                item,
                selected: state.selectedIndex === index,
                onPress: () => itemPressHandler(index),
              })
            }
          />
        </View>
      </View>
    </Overlay.PullView>
  );
};

const StudyTownListOverlay = (listData, onSelect) => {
  return <CityListComponent cities={listData} onSelect={onSelect} />;
};

const openCityTownOverlay = (listData, onSelect) => {
  // @ts-ignore
  global.overlayKey = Overlay.show(StudyTownListOverlay(listData, onSelect));
};

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: 'transparent',
  },
  overlay: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    height: 320,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 0,
  },
  overlayLogo: {
    width: 90,
    height: 90,
  },
  overlayText: {
    fontSize: 15,
    fontFamily: constants.DEFAULT_FONT,
    textAlign: 'center',
  },
  overlayMain: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 2,
  },
  overlayHeader: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayHeaderText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    alignSelf: 'center',
  },
  overlayHeaderButton: {
    position: 'absolute',
    right: 5,
    zIndex: 10,
    width: 50,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayHeaderButtonText: {
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    alignSelf: 'center',
    color: colors.THEFACULTY,
  },
  overlayList: {},
  overlayListItem: {
    height: 45,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.SILVER,
    borderBottomWidth: 1.5 / PixelRatio.get(),
    marginLeft: 10,
    marginRight: 15,
  },
  overlayListItemText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    marginLeft: 5,
  },
  overlayCheckIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default CityListComponent;
export {openCityTownOverlay};
