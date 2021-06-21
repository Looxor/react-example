import React, { useEffect, useState } from "react";

import { SafeAreaView, ScrollView, View } from "react-native";

import { colors } from "../../config";
import ProfileSettings from "./_Components/ProfileSettings";

import styles from "./HomeScreen.style";
import { UserData } from "../../config/constants";
import User from "./Models/User";

const HomeScreen = props => {
  // let user = new User(UserData.getUserData());
  const [user, setUser] = useState(null);
  const didFocus = () => {
    const user = new User(UserData.getUserData());
    setUser(user);
  };

  const componentDidMount = () => {
    props.navigation.addListener('focus', didFocus);

    didFocus();
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  //
  useEffect(componentDidMount, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: colors.white,
          width: '100%',
          height: '70%',
          position: 'absolute',
          zIndex: -2,
        }}
      />
      <ScrollView testID={'settingsHomeScreenScrollView'}>
        {user && (
          <>
            {/*<ProfileInfo user={user} />*/}
            <ProfileSettings user={user} navigation={props.navigation} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
