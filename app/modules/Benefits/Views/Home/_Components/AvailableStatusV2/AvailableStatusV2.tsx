import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { constants } from "../../../../../../config";
import standardFunctions from '../../../../../../utils/app/StandardFunctions';

const containerIcons = [
  require('../../../../../../../assets/images/icons/icn_benefits_bookmark.png'),
  require('../../../../../../../assets/images/icons/icn_safe_bookmark.png'),
];
const soundsBookmarks = [
  require('../../../../../../../assets/sounds/benefits/benefits_bookmark.wav'),
  require('../../../../../../../assets/sounds/benefits/safe_bookmark.wav'),
];
const disabledContainerIcon = require('../../../../../../../assets/images/icons/icn_benefits_bookmark2.png');
const icons = [
  require('../../../../../../../assets/images/icons/icn_benefits_bookmark_internal.png'),
  require('../../../../../../../assets/images/icons/icn_safe_bookmark_internal.png'),
];
const disabledIcons = [
  require('../../../../../../../assets/images/icons/icn_benefits_bookmark_internal_disabled.png'),
  require('../../../../../../../assets/images/icons/icn_safe_bookmark_internal_disabled.png'),
];

const StatusButton = props => {
  const {focused, status, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        standardFunctions.play_sound_effect(soundsBookmarks[status]);
        onPress(status);
      }}
      activeOpacity={constants.ACTIVE_OPACITY}
      style={{
        marginTop: -9,
        ...(focused ? {width: 80, height: 80} : {width: 65, height: 65}),
      }}>
      <FastImage
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={focused ? containerIcons[status] : disabledContainerIcon}>
        <FastImage
          source={focused ? icons[status] : disabledIcons[status]}
          resizeMode={'contain'}
          style={
            focused
              ? {width: 30, height: 30, marginBottom: 5}
              : {width: 25, height: 25}
          }
        />
      </FastImage>
    </TouchableOpacity>
  );
};

const AvailableStatusV2 = props => {
  const {onStatusChanged} = props;
  const [status, setStatus] = useState(props.status);
  const statusHandler = _status => {
    setStatus(_status);
    if (status !== _status) {
      onStatusChanged && onStatusChanged(_status);
    }
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View />
      <StatusButton status={0} focused={status === 0} onPress={statusHandler} />
      <StatusButton status={1} focused={status === 1} onPress={statusHandler} />
      <View />
    </View>
  );
};

export default AvailableStatusV2;
