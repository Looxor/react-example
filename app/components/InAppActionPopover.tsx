import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Overlay } from "teaset";

import { colors, constants, strings } from "../config";
import Strings from "../utils/misc/TextComponents";
import standardFunctions from "../utils/app/StandardFunctions";
import FastImage from "react-native-fast-image";
import { Observable } from "../modules/_CommonModels/ViewModelBase";

const InAppActionPopoverView = (props: any = {}) => {
  return {
    show: ({
      navigation,
      title,
      description,
      action_title,
      action,
      actionFunction = undefined,
      negativeActionFunction = undefined,
      buttonsColumn = false,
      negativeAction = () => {},
      negativeLabel = strings.OTHER.CANCEL,
      icon = undefined,
      smallIcon = undefined,
      extraTitleStyle = undefined,
      extraDescriptionStyle = undefined,
      extraMainButtonStyle = undefined,
      extraMainButtonTextStyle = undefined,
      extraNegativeButtonStyle = undefined,
      extraNegativeButtonTextStyle = undefined,
    }) => {
      const overlayId = Overlay.show(
        overlayView({
          getOverlayIdFunc: () => overlayId,
          navigation,
          title,
          description,
          action_title,
          action,
          actionFunction,
          buttonsColumn,
          negativeAction,
          negativeActionFunction,
          negativeLabel,
          icon,
          smallIcon,
          extraTitleStyle,
          extraDescriptionStyle,
          extraMainButtonStyle,
          extraMainButtonTextStyle,
          extraNegativeButtonStyle,
          extraNegativeButtonTextStyle,
        }),
      );
    },
  };
};

const overlayView = ({
  getOverlayIdFunc,
  navigation,
  title,
  description,
  action_title,
  action,
  actionFunction,
  negativeActionFunction,
  buttonsColumn,
  negativeAction,
  negativeLabel,
  icon,
  smallIcon,
  extraTitleStyle,
  extraDescriptionStyle,
  extraMainButtonStyle,
  extraMainButtonTextStyle,
  extraNegativeButtonStyle,
  extraNegativeButtonTextStyle,
}) => (
  <Overlay.View style={styles.overlayContainer}>
    <OverlayChildView
      onHidePopover={() => {
        const overlayId = getOverlayIdFunc();
        Overlay.hide(overlayId, true);
        negativeAction();
      }}
      navigation={navigation}
      title={title}
      description={description}
      action_title={action_title}
      action={action}
      actionFunction={actionFunction}
      negativeActionFunction={negativeActionFunction}
      buttonsColumn={buttonsColumn}
      negativeLabel={negativeLabel}
      icon={icon}
      smallIcon={smallIcon}
      extraTitleStyle={extraTitleStyle}
      extraDescriptionStyle={extraDescriptionStyle}
      extraMainButtonStyle={extraMainButtonStyle}
      extraMainButtonTextStyle={extraMainButtonTextStyle}
      extraNegativeButtonStyle={extraNegativeButtonStyle}
      extraNegativeButtonTextStyle={extraNegativeButtonTextStyle}
      getOverlayIdFunc={getOverlayIdFunc}
    />
  </Overlay.View>
);

const OverlayChildView = props => {
  const {
    navigation,
    title,
    description,
    action_title,
    action,
    actionFunction,
    negativeActionFunction,
    buttonsColumn,
    negativeLabel,
    icon,
    smallIcon,
    extraTitleStyle,
    extraDescriptionStyle,
    extraMainButtonStyle,
    extraMainButtonTextStyle,
    extraNegativeButtonStyle,
    extraNegativeButtonTextStyle,
  } = props;

  const closePopover = () => {
    props.onHidePopover && props.onHidePopover();
  };

  const run_main_action = () => {
    standardFunctions.play_tap_sound();
    closePopover();
    if (actionFunction) {
      actionFunction();
    } else {
      standardFunctions.open_inapp_action(navigation, action);
    }
  };

  const run_negative_action = () => {
    standardFunctions.play_tap_sound();
    closePopover();
    if (negativeActionFunction) {
      negativeActionFunction();
    } else {
      standardFunctions.open_inapp_action(navigation, action);
    }
  };

  useEffect(() => {
    let overlayId = props.getOverlayIdFunc();
    if (action === 'LEAVE_POPUP') {
      Observable.setReduxValue('overlay_leave_popup', overlayId);
    }
  });
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {smallIcon && (
          <FastImage
            resizeMode={'contain'}
            style={[styles.smallIcon]}
            source={smallIcon}
          />
        )}
        <Text style={[styles.titleText, extraTitleStyle]}>{title}</Text>
        {icon && (
          <FastImage
            resizeMode={'contain'}
            style={[styles.icon]}
            source={icon}
          />
        )}
        {Strings.makeBold(
          description,
          buttonsColumn
            ? {
                style: {
                  ...styles.descriptionTextColumn,
                  ...extraDescriptionStyle,
                },
              }
            : {style: {...styles.descriptionTextRow, ...extraDescriptionStyle}},
        )}
      </View>
      <View
        style={
          buttonsColumn
            ? styles.buttonsContainerColumn
            : styles.buttonsContainerRow
        }>
        <TouchableOpacity
          style={[
            buttonsColumn ? styles.closeButtonColumn : styles.closeButtonRow,
            extraNegativeButtonStyle,
          ]}
          onPress={run_negative_action}>
          <Text
            style={[
              styles.closeButtonText,
              action_title === '' && {textAlign: 'center'},
              extraNegativeButtonTextStyle,
            ]}>
            {negativeLabel !== undefined ? negativeLabel : strings.OTHER.CANCEL}
          </Text>
        </TouchableOpacity>
        {action_title !== '' && (
          <TouchableOpacity
            style={[
              buttonsColumn
                ? styles.actionButtonColumn
                : styles.actionButtonRow,
              extraMainButtonStyle,
            ]}
            onPress={run_main_action}>
            <Text style={[styles.actionButtonText, extraMainButtonTextStyle]}>
              {action_title}
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
    borderRadius: 18,
    minHeight: '28%',
    maxHeight: '90%',
  },
  container: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 22,
    marginTop: 10,
  },
  descriptionTextRow: {
    marginTop: 30,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
  },
  descriptionTextColumn: {
    marginTop: 15,
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
  },
  buttonsContainerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonsContainerColumn: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 30,
  },
  closeButtonRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonColumn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonColumn: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.THEFACULTY,
  },
  actionButtonText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontFamily: constants.DEFAULT_FONT_BOLD,
    fontSize: 18,
    color: colors.THEFACULTY,
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 15,
  },
  smallIcon: {
    width: 28,
    height: 28,
    marginTop: 0,
  },
});

export default InAppActionPopoverView;
