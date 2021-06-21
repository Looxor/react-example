import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors, constants, strings} from '../../../../../config';
import standardFunctions from '../../../../../utils/app/StandardFunctions';
import AnnosPickerItem from './AnnosPickerItem';

const AnnosPicker = props => {
  const {selectedAnno, annos, onSelectAnno, style} = props;

  const [open, setOpen] = useState(false);
  const [newSelectedAnno, setNewSelectedAnno] = useState({}) as any;
  const selectAnnoHandler = (anno, selected) => {
    standardFunctions.play_tap_sound();
    setNewSelectedAnno(anno);
    onSelectAnno(anno);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => {
          standardFunctions.play_tap_sound();
          setOpen(!open);
        }}
        activeOpacity={constants.ACTIVE_OPACITY}
        style={[styles.pickerButton, open && styles.pickerButtonSelected]}>
        <Text style={styles.subjectsText} numberOfLines={1}>
          {selectedAnno ? selectedAnno.label : strings.PROFILE.USER_TYPE.ANNO}
        </Text>
        <FastImage
          resizeMode={'contain'}
          style={styles.arrowIcon}
          source={
            open
              ? require('../../../../../../assets/images/icons/icn_dropdown_blue_close.png')
              : require('../../../../../../assets/images/icons/icn_dropdown_blue_open.png')
          }
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.pickerBody}>
          {annos.map((anno, index) => (
            <AnnosPickerItem
              key={String(index)}
              containerStyle={[{height: 40}]}
              selected={selectedAnno && selectedAnno.value === anno.value}
              anno={anno}
              onSelectAnno={selectAnnoHandler}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    backgroundColor: colors.WHITE,
    zIndex: 1,
  },
  pickerButton: {
    width: '100%',
    height: 53,
    borderRadius: 16,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 10,
    zIndex: 100,
  },
  pickerButtonSelected: {},
  subjectsText: {
    alignSelf: 'center',
    color: colors.DARK_ALOE_TF,
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 16,
    marginRight: 46,
  },
  arrowIcon: {
    position: 'absolute',
    right: 15,
    width: 18,
    height: 18,
    alignSelf: 'center',
  },
  pickerBody: {
    width: '100%',
    marginTop: 10,
    paddingTop: 15,
    borderRadius: 16,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    backgroundColor: colors.WHITE,
    zIndex: 102,
    elevation: 11,
  },
  pickerBodySelected: {},
  pickerScrollView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 0,
    zIndex: 103,
    elevation: 103,
  },
  subjectsSubtitle: {
    marginTop: 15,
    marginBottom: 25,
    color: colors.LIGHT_ALOE_TF,
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    marginLeft: 26,
  },
});

export default AnnosPicker;
