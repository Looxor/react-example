import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import PersonInfoViewBlock from "./PersonInfoViewBlock";
import PersonInfoEditBlock from "./PersonInfoEditBlock";
import { colors } from "../../../../config";

const PersonInfoBlock = props => {
  const {personInfoBlockData, onSavePersonInfoBlock, savingPersonInfoData} =
    props;
  const [mode, setMode] = useState('view');
  const showEditBlock = () => {
    setMode('edit');
  };
  const onSaveData = async () => {
    onSavePersonInfoBlock && (await onSavePersonInfoBlock());
    setMode('view');
  };
  return (
    <View style={styles.container}>
      <View style={styles.marginContainer}>
        {mode === 'view' && (
          <PersonInfoViewBlock
            personInfoBlockData={personInfoBlockData}
            onPressModifyButton={showEditBlock}
          />
        )}
        {mode === 'edit' && (
          <PersonInfoEditBlock
            personInfoBlockData={personInfoBlockData}
            savingPersonInfoData={savingPersonInfoData}
            onPressSaveButton={onSaveData}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  marginContainer: {
    marginHorizontal: 16,
  },
});

export default PersonInfoBlock;
