import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const RightButtonTop = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RightButtonTop;
