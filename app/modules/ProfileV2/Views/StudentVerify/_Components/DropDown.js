import React from 'react';
import ModalDropdown from './ModalDropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

import {StyleSheet, Text, View} from 'react-native';

import {colors} from '../../../../../config';
import constants from '../../../../../config/constants';

class DropDown extends React.Component {
  static defaultProps = {
    placeholder: 'Please Select...',
    selectedIndex: -1,
    color: colors.primary,
    borderColor: colors.primary,
  };

  state = {
    isOpened: false,
  };

  _openModal = () => {
    this.setState({isOpened: true});
  };

  _closeModal = () => {
    this.setState({isOpened: false});
  };

  render() {
    const {
      // @ts-ignore
      items,
      color,
      // @ts-ignore
      onSelect,
      style,
      borderColor,
      selectedIndex,
      // @ts-ignore
      placeholder,
      placeholderStyle,
    } = this.props;

    let dd_color =
      selectedIndex > -1 && items[selectedIndex]
        ? 'black'
        : colors.DEFAULT_PLACEHOLDER;
    return (
      <ModalDropdown
        options={items}
        onDropdownWillShow={this._openModal}
        onDropdownWillHide={this._closeModal}
        dropdownStyle={{
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 5,
          shadowOpacity: 1.0,
          dropdownWidth: 200,
        }}
        adjustFrame={params => {
          // eslint-disable-next-line no-param-reassign
          params.borderRadius = 10;
          params.left = 15;
          params.right = 15;
          // eslint-disable-next-line no-param-reassign
          return params;
        }}
        renderRow={(text, index) => (
          <View
            // onPress={()=> {
            //   onSelect(index, text);
            //   this._closeModal();
            // }}
            style={{margin: 7, paddingHorizontal: 10, paddingVertical: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: constants.DEFAULT_FONT,
                color: colors.BLACK,
              }}>
              {text}
            </Text>
          </View>
        )}
        onSelect={onSelect}>
        <View style={[styles.container, style && style, {borderColor}]}>
          <Text
            style={{
              ...placeholderStyle,
              fontFamily: constants.DEFAULT_FONT,
              color: dd_color,
            }}>
            {selectedIndex > -1 && items[selectedIndex]
              ? items[selectedIndex]
              : placeholder}
          </Text>
          <Icon
            name={this.state.isOpened ? 'angle-up' : 'angle-down'}
            color={color}
            size={20}
            style={styles.icon}
          />
        </View>
      </ModalDropdown>
    );
  }
}

const styles = {
  container: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 0,
    height: 45,
    backgroundColor: colors.WHITE,
    borderColor: colors.SILVER,
    borderRadius: 8,
    padding: 5,
    fontSize: 17,
    fontFamily: constants.DEFAULT_FONT,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
};

export default DropDown;
