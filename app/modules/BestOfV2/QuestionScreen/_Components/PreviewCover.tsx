import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, constants, strings } from "../../../../config";

const PreviewCover = props => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      {false && (
        <Text style={styles.loadingLabel}>
          {strings.BESTOF2.QUESTION_SCREEN.PREVIEW_LABEL}
        </Text>
      )}
      {false && <ActivityIndicator size={'large'} style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0,
  },
  loading: {
    position: 'absolute',
    zIndex: 3,
    elevation: 6,
    top: '50%',
    alignSelf: 'center',
  },
  loadingLabel: {
    padding: 16,
    height: 50,
    position: 'absolute',
    zIndex: 3,
    elevation: 6,
    top: '43%',
    alignSelf: 'center',
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.WHITE,
    fontSize: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
});

export default PreviewCover;
