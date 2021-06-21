import React from "react";
import { Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./AllenamentoTab.style";
import { strings } from "../../../../../config";

const AllenamentoTab = props => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.emptyLogo}
        source={require('../../../../../../assets/images/icons/icn_pc.png')}
      />
      <Text style={styles.emptyDescription}>
        {strings.TEST.ALLENAMENTO_HOME.EMPTY_DESCRIPTION}
      </Text>
    </View>
  );
};
export default React.memo(AllenamentoTab);
