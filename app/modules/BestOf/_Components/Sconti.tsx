import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

import { colors, strings } from "../../../config";
import { CallServerPromise } from "../../../utils/app/CallServer";
import constants from "../../../config/constants";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";
import { useNavigation } from "@react-navigation/native";

const pressPartnerImagesHandler = navigation => {
  navigation.navigate(routes.COUPONS);
};

const renderItem = ({item, index, navigation}) => (
  <ImageBackground
    source={require('../../../../assets/images/icons/icn_camera_white.png')}
    style={styles.scontiItem}>
    <TouchableOpacity onPress={() => pressPartnerImagesHandler(navigation)}>
      <FastImage source={{uri: item.image_url}} style={styles.scontiImage} />
    </TouchableOpacity>
  </ImageBackground>
);

const HomeLogoBox = props => {
  const navigation = useNavigation();
  const [partnersList, setPartnersList] = useState([]);
  const componentDidMount = () => {
    const loadPartners = async () => {
      const loadPartnersRequest = await CallServerPromise.get_partners();
      if (loadPartnersRequest.success) {
        setPartnersList(loadPartnersRequest.data);
      }
    };
    loadPartners();
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};

  useEffect(componentDidMount, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => pressPartnerImagesHandler(navigation)}>
        <View style={styles.scontiHeader}>
          <Text style={styles.scontiHeaderText}>
            {strings.BESTOF.HOME_SCREEN_PARTNERS_TEXT}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.scontiContainerTop}>
        {props.isLoaded && (
          <FlatList
            horizontal={true}
            data={partnersList}
            keyExtractor={(item, index) => String(index)}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) =>
              renderItem({item, index, navigation})
            }
            style={styles.scontiContainer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    flex: 1,
    borderWidth: 0.0,
    borderColor: colors.BESTOF.DEFAULT,
    padding: 0,
    backgroundColor: colors.WHITE,
    borderRadius: 0,
    marginHorizontal: 0,
    paddingBottom: 15,
  },
  scontiHeader: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scontiHeaderText: {
    flex: 1,
    flexWrap: 'wrap',
    padding: 10,
    marginLeft: 5,
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    color: colors.darkGray,
    fontSize: 17,
  },
  scontiHeaderImage: {
    width: 0, // 25
    height: 0, // 25
  },
  scontiContainerTop: {
    marginTop: 5,
  },
  scontiContainer: {
    flexDirection: 'row',
  },
  scontiItem: {
    width: 70,
    height: 70,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scontiImage: {
    width: 60,
    height: 60,
  },
});

export default HomeLogoBox;
