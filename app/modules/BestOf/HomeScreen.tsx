import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import HomeLogoBox from "./_Components/HomeLogoBox";
import FirstPullView from "./_Components/FirstPullView";
import Sconti from "./_Components/Sconti";
import HomeButtons from "./_Components/HomeButtons";
import styles from "./HomeScreen.style";
import FastImage from "react-native-fast-image";
import { strings } from "../../config";
import { CallServerPromise } from "../../utils/app/CallServer";

const HomeScreen = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBestOfAvailable, setIsBestOfAvailable] = useState(true);

  const componentDidMount = () => {
    const didFocus = async () => {
      const requestIsBestOfAvailable: any =
        await CallServerPromise.get_is_bestof_available();
      setIsBestOfAvailable(requestIsBestOfAvailable.data);
      setIsLoaded(true);
    };
    const didBlur = () => {
      setIsLoaded(false);
    };

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <HomeLogoBox isLoaded={isLoaded} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {isBestOfAvailable && (
          <>
            <Sconti isLoaded={isLoaded} />
            <View style={{height: 20}} />
            <HomeButtons navigation={props.navigation} isLoaded={isLoaded} />
          </>
        )}
        {!isBestOfAvailable && (
          <>
            <FastImage
              style={styles.emptyLogo}
              source={require('../../../assets/images/icons/icn_game_red.png')}
            />
            <Text style={styles.emptyDescription}>
              {strings.BESTOF.EMPTY_DESCRIPTION}
            </Text>
          </>
        )}
      </ScrollView>
      <FirstPullView type={0} />
    </View>
  );
};

export default HomeScreen;
