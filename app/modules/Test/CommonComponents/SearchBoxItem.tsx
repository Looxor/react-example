import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { colors, constants, strings } from "../../../config";

const SearchBoxItem = props => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.searchIcon}
        source={require('../../../../assets/images/icons/icn_search_gray.png')}
      />
      <TextInput
        value={props.value ? props.value : ''}
        autoCompleteType={'off'}
        placeholder={props.label ? props.label : strings.OTHER.SEARCH}
        style={styles.textInput}
        onChangeText={props.onSearch}
        selectionColor={colors.THEFACULTY}
        returnKeyType={'search'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: colors.WHITE,
    zIndex: 1,
    fontSize: 17,
    paddingLeft: 45,
    paddingRight: 10,
    fontFamily: constants.DEFAULT_FONT,
    marginTop: 5,
    marginBottom: 0,
    borderColor: colors.SILVER,
    borderRadius: 14,
    padding: 5,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  searchIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    left: 15,
    top: 19,
    zIndex: 2,
  },
});

export default React.memo(SearchBoxItem);
