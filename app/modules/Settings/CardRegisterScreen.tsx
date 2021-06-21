import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StatusBar, Text, View } from "react-native";

import { Button, StandardBoxWithImage } from "../../components";

import styles from "./CardRegisterScreen.style";
import { colors, strings } from "../../config";
import FirestoreUploadComponent from "./_Components/FirestoreUploadComponent";

import WithIDCard from "./ViewModels/WithIDCard";
import WithTaxCard from "./ViewModels/WithTaxCard";

const CardRegisterScreen = props => {
  const cardType = props.navigation.getParam('cardType');
  const [state, setState] = useState({
    loading: false,
    card1_image_url: '',
    card2_image_url: '',
  });

  let withCard: any;
  if (cardType === WithIDCard.CARD_TYPE) {
    withCard = WithIDCard;
  } else if (cardType === WithTaxCard.CARD_TYPE) {
    withCard = WithTaxCard;
  }

  const {onContinue, labels, constants} = withCard(props, state);

  const setState2 = state2 => setState({...state, ...state2});

  const continueButtonPressHandler = async () => {
    if (onContinue) {
      setState2({loading: true});
      await onContinue();
      setState2({loading: false});
    }
  };

  const uploadCompleteHandler4Card1 = firestoreUrl => {
    setState2({card1_image_url: firestoreUrl});
  };

  const uploadCompleteHandler4Card2 = firestoreUrl => {
    setState2({card2_image_url: firestoreUrl});
  };

  const componentDidMount = () => {
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.scrollContainer}>
          <StandardBoxWithImage
            image={require('../../../assets/images/icons/icn_id_card.png')}
            background_start_color={colors.GENERAL.START}
            background_finish_color={colors.GENERAL.FINISH}
            viewStyle={styles.logo}
            iconStyle={{width: '30%'}}
          />
          <View style={styles.subContainer}>
            <Text style={styles.headerLabelText}>{labels['headerLabel']}</Text>
            <Text style={styles.cardContainerHeaderText}>{withCard.TITLE}</Text>
            <View style={styles.cardContainer}>
              <FirestoreUploadComponent
                disabled={state.loading}
                label={labels['placeHolder1']}
                label_uploaded={labels['placeHolder1_uploaded']}
                firestore_dest_path={constants['card1_dest_path']}
                onUploadComplete={uploadCompleteHandler4Card1}
              />
              <FirestoreUploadComponent
                disabled={state.loading}
                style={styles.uploadComponent2}
                label={labels['placeHolder2']}
                label_uploaded={labels['placeHolder2_uploaded']}
                firestore_dest_path={constants['card2_dest_path']}
                onUploadComplete={uploadCompleteHandler4Card2}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          disabled={state.loading}
          onPress={continueButtonPressHandler}
          style={[styles.button, styles.continueButton]}>
          {state.loading ? (
            <ActivityIndicator color={colors.WHITE} />
          ) : (
            strings.SETTINGS.CARD_REGISTER_ID.CONTINUE_BUTTON
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

CardRegisterScreen.navigationOptions = ({navigation}) => {
  const cardType = navigation.getParam('cardType');

  let title: string;
  if (cardType === WithIDCard.CARD_TYPE) {
    title = WithIDCard.TITLE;
  } else if (cardType === WithTaxCard.CARD_TYPE) {
    title = WithTaxCard.TITLE;
  }

  return {title};
};

export default CardRegisterScreen;
