import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../../../../../config";
import { Button } from "../../../../../components";
import Strings from "../../../../../utils/misc/TextComponents";

const MessagePopoverView = (props: any = {}) => {
  const {title, content} = props;
  return {
    show: () => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          title,
          content,
        }),
      );
    },
  };
};

const overlayView = ({getOverlayIdFunc, title, content}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePullView={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
      }}
      getOverlayIdFunc={getOverlayIdFunc}
      title={title}
      content={content}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const hideConfirmViewHandler = () => {
    props.onHidePullView();
  };

  const {title} = props;
  let content = props.content;
  content = content.replace(/0,/gi, '0.');

  return (
    <View style={styles.overlay}>
      {props.title && (
        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}>
          {title}
        </Text>
      )}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContainer}>
        {content && (
          <View style={styles.contentTextWrapper}>
            <Text style={[styles.content, title ? {} : {paddingVertical: 13}]}>
              {Strings.makeMathJaxText(content)}
            </Text>
          </View>
        )}
      </ScrollView>
      <Button
        onPress={hideConfirmViewHandler}
        style={styles.closeButton}
        textStyle={styles.closeButtonText}>
        {strings.OTHER.CLOSE.toUpperCase()}
      </Button>
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
    width: '90%',
    marginHorizontal: 20,
    backgroundColor: colors.DEFAULT_BACKGROUND,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    maxHeight: '80%',
  },
  title: {
    marginTop: 30,
    color: colors.darkGray,
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    height: 45,
    alignSelf: 'flex-start',
    textAlignVertical: 'center',
    paddingHorizontal: 20,
  },
  content: {
    color: colors.darkGray,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
  },
  contentTextWrapper: {
    width: '100%',
    paddingLeft: 15,
  },
  scrollContainer: {
    width: '95%',
  },
  closeButton: {
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    width: '80%',
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.THEFACULTY,
  },
});

export default MessagePopoverView;
