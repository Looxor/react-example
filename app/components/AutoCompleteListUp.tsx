import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ListItem, Text } from "native-base";
import { colors, constants } from "../config";
import FastImage from "react-native-fast-image";

export default props => {
  const {
    itemStyle, selectedItemStyle, selectedItemTextStyle,
    selectedIcon, iconStyle
  } = props;
  return (
    <View
      style={[
        styles.container,
        {width: props.visible ? '100%' : 0, opacity: props.visible ? 1 : 0},
        props.style,
      ]}>
      <FlatList
        data={props.data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          const selected =
            props.selectedItem && props.selectedItem.id === item.id;
          return (
            <ListItem
              noBorder={true}
              noIndent
              style={{
                minHeight: 50,
                backgroundColor: colors.WHITE,
                borderRadius: 14,
                marginVertical: 2,
                ...itemStyle,
                ...(selected ? selectedItemStyle : null)
              }}
              button
              underlayColor={'transparent'}
              onPress={() => props.onSelectItem(item)}>
              <Text
                style={{
                  fontFamily: constants.DEFAULT_FONT,
                  fontSize: 17,
                  lineHeight: 22,
                  flex: 1,
                  marginRight: 10,
                  flexWrap: 'wrap',
                  ...(selected && selectedItemTextStyle)
                }}>
                {item.name}
              </Text>
              {selected && (
                <FastImage
                  style={[styles.iconRight, iconStyle]}
                  source={
                    selectedIcon ||
                    require('../../assets/images/icons/icn_selected_blue.png')
                  }
                />
              )}
            </ListItem>
          );
        }}
      />
    </View>
  );
};

/*{ ((item.name).length > 36) ?
    (((item.name).substring(0, 33)) + '...') :
    item.name }*/

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: 'transparent', //'rgba(0,125,0,0.8)',
    width: '100%',
    height: 326,
    zIndex: 1,
  },
  iconRight: {
    position: 'absolute',
    width: 25,
    height: 25,
    right: 10,
  },
});
