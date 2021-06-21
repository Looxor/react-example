import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import {colors, constants, strings} from '../../config';

const SearchBoxItem = props => {
  return (
    <View style={styles.container}>
      <TextInput
        value={props.value ? props.value : ''}
        autoCompleteType={'off'}
        placeholder={props.label ? props.label : strings.OTHER.SEARCH}
        style={styles.textInput}
        onChangeText={props.onSearch}
        selectionColor={colors.LIGHT_ALOE_TF}
        returnKeyType={'search'}
      />
      <Image
        style={styles.searchIcon}
        source={require('../../../assets/images/icons/icn_bestofs_search.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    height: 60,
  },
  textInput: {
    width: '100%',
    height: 53,
    backgroundColor: colors.WHITE,
    zIndex: 1,
    paddingLeft: 15,
    paddingRight: 45,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 18,
    color: colors.DARK_ALOE_TF,
    marginTop: 15,
    marginBottom: 0,
    borderColor: colors.LIGHT_ALOE_TF,
    borderRadius: 14,
    borderWidth: 3,
    shadowColor: colors.lightGray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  searchIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: 19,
    top: 31,
    zIndex: 2,
  },
});

export default React.memo(SearchBoxItem);
