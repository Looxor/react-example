import React from "react";
import { StyleSheet, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants } from "../../config";
import SearchList from "./SearchList";

const SearchListPopover = (props: any = {}) => {
  return {
    show: ({
      onSelectItem,
      searchFunc,
      fetchSearchResultFunc,
      searchPlaceholder,
    }) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          onSelectItem,
          searchFunc,
          fetchSearchResultFunc,
          searchPlaceholder,
        }),
      );
    },
  };
};

const overlayView = ({
  getOverlayIdFunc,
  onSelectItem,
  searchFunc,
  fetchSearchResultFunc,
  searchPlaceholder,
}) => (
  <Overlay.View modal={true} style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      onSelectItem={onSelectItem}
      searchFunc={searchFunc}
      fetchSearchResultFunc={fetchSearchResultFunc}
      searchPlaceholder={searchPlaceholder}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const closePopover = () => {
    props.onHidePopover && props.onHidePopover();
  };

  const onSelectItem = major => {
    props.onSelectItem && props.onSelectItem(major);
    closePopover();
  };

  return (
    <View style={styles.overlay}>
      <SearchList
        onSelectItem={onSelectItem}
        searchFunc={props.searchFunc}
        fetchSearchResultFunc={props.fetchSearchResultFunc}
        searchPlaceholder={props.searchPlaceholder}
        onClose={closePopover}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  overlay: {
    width: '92%',
    marginHorizontal: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    height: 450,
  },
  container: {
    width: '96%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    marginTop: 10,
  },
  coinIcon: {
    width: 50,
    height: 50,
    marginVertical: 30,
  },
  descriptionText: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
  },
});

export default SearchListPopover;
