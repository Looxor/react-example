import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, constants } from "../../../../../../config";
import standardFunctions from "../../../../../../utils/app/StandardFunctions";

export const static_categories = [
  {label: 'Tutti', value: 'All'},
  {label: 'Sconti', value: 'sconti'},
  {label: 'GiftCard', value: 'giftcard'},
  {label: 'Cashback', value: 'cashback'},
  {label: 'Riusabili', value: 'multiple_use'},
];

const CategoriesList = props => {
  const {
    categories = static_categories,
    selectedCategory,
    onCategorySelected,
  } = props;
  const [selectedValue, setSelectedValue] = useState(
    selectedCategory !== undefined ? selectedCategory : 'All',
  );

  const renderItem = ({item, index, selected}) => (
    <TouchableOpacity
      onPress={() => {
        standardFunctions.add_firebase_event_log(
          'benefits',
          'safe_category_switched',
          {
            category: item.value,
          },
        );
        setSelectedValue(item.value);
        onCategorySelected && onCategorySelected(item.value);
      }}
      activeOpacity={constants.ACTIVE_OPACITY}
      style={[
        styles.categoryItem,
        selected && styles.categoryItemSelected,
        index === 0 && {marginLeft: 1},
        index + 1 === categories.length && {marginRight: 15},
      ]}>
      <Text
        style={[
          styles.categoryItemText,
          selected && styles.categoryItemTextSelected,
        ]}>
        {String(item.label)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        style={{elevation: 0}}
        showsHorizontalScrollIndicator={false}
        horizontal
        nestedScrollEnabled={true}
        data={categories}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) =>
          renderItem({item, index, selected: item.value === selectedValue})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: 45,
    elevation: 0,
  },
  categoryItem: {
    minWidth: 85,
    marginRight: 10,
    height: 35,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 25,
    borderColor: colors.gray,
    borderWidth: 0,
    elevation: 5,
    shadowColor: colors.lightGray,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  categoryItemText: {
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    color: colors.DARK_ALOE_TF,
  },
  categoryItemSelected: {
    borderWidth: 3,
    borderColor: colors.DARK_ALOE_TF,
  },
  categoryItemTextSelected: {
    // color: colors.WHITE,
  },
});

export default CategoriesList;
