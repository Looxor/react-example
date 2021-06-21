import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../../../config";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";
import PartnersPickerItem from "./PartnersPickerItem";

const PartnersPicker = props => {
  const {selectedPartners, partners, onSelectPartners, style} = props;

  const [open, setOpen] = useState(false);
  const [newSelectedPartners, setNewSelectedPartners] =
    useState(selectedPartners);

  const selectPartnerHandler = (partner, selected) => {
    let partners2 = [...newSelectedPartners];
    if (selected) {
      !partners2.some(
        partner_item => partner_item.partner_id === partner.partner_id,
      ) && partners2.push(partner);
      setNewSelectedPartners(partners2);
      onSelectPartners && onSelectPartners(partners2);
    } else {
      const existingIndex = partners2.findIndex(
        partner_item => partner_item.partner_id === partner.partner_id,
      );
      if (existingIndex > -1) {
        partners2.splice(existingIndex, 1);
        setNewSelectedPartners(partners2);
        onSelectPartners && onSelectPartners(partners2);
      }
    }
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
          {partners
            .map(partner =>
              newSelectedPartners.some(
                selectedPartner =>
                  selectedPartner.partner_id === partner.partner_id,
              )
                ? partner.partner_name
                : '',
            )
            .filter(partner_name => partner_name != '')
            .join(', ')}
          {newSelectedPartners.length === 0
            ? strings.COUPONS.FILTER_SCREEN.SELECT_PARTNERS
            : ''}
        </Text>
        <FastImage
          resizeMode={'contain'}
          style={styles.arrowIcon}
          source={
            open
              ? require('../../../../../../../assets/images/icons/icn_dropdown_blue_close.png')
              : require('../../../../../../../assets/images/icons/icn_dropdown_blue_open.png')
          }
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.pickerBody}>
          <ScrollView style={styles.pickerScrollView}>
            {partners.map((partner, index) => (
              <PartnersPickerItem
                key={String(index)}
                containerStyle={[{height: 40}]}
                selected={newSelectedPartners.some(
                  partner_item =>
                    partner_item.partner_id === partner.partner_id,
                )}
                partner={partner}
                onSelectPartner={selectPartnerHandler}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
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
    color: colors.LIGHT_ALOE_TF,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 16,
    marginRight: 46,
  },
  arrowIcon: {
    position: 'absolute',
    right: 20,
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  pickerBody: {
    marginTop: 15,
    width: '100%',
    height: 200,
    paddingVertical: 15,
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
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    marginLeft: 26,
  },
});

export default PartnersPicker;
