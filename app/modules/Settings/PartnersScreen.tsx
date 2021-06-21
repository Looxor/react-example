import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import PartnerBoxComponent from "./_Components/PartnerBoxComponent";
import { colors, constants, strings } from "../../config";
import { CallServerPromise } from "../../utils/app/CallServer";
import FastImage from "react-native-fast-image";

const PartnerComponent = props => {
  const {name, image_url} = props.partner;
  return (
    <View style={styles.partnerItem}>
      <FastImage style={styles.partnerImage} source={{uri: image_url}} />
      <Text style={styles.partnerName} numberOfLines={3}>
        {name}
      </Text>
    </View>
  );
};

const PartnersScreen = props => {
  const [dispData, setDispData] = useState({
    loading: false,
    partners: [],
    error: false,
  });
  const componentDidMount = () => {
    const loadPartners = async () => {
      try {
        setDispData({...dispData, loading: true});
        const request = await CallServerPromise.get_partners_ads();
        if (request.success) {
          setDispData({
            ...dispData,
            partners: request.data,
            error: false,
            loading: false,
          });
        } else {
          setDispData({...dispData, loading: false, error: true});
        }
      } catch (error) {
        setDispData({...dispData, loading: false, error: true});
      }
    };
    loadPartners();
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  //
  useEffect(componentDidMount, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollContainer}>
        <PartnerBoxComponent style={{marginHorizontal: 4, marginTop: 5}} />
        {dispData.loading ? (
          <ActivityIndicator
            color={colors.THEFACULTY}
            style={styles.loadingIcon}
          />
        ) : dispData.error ? (
          <Text style={styles.error}>
            {strings.SETTINGS.PARTNERS.ERROR_ON_GETTING_DATA}
          </Text>
        ) : (
          dispData.partners &&
          dispData.partners.map(partner => (
            <PartnerComponent partner={partner} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

PartnersScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.PARTNERS.TITLE,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  scrollContainer: {
    height: '100%',
    backgroundColor: colors.DEFAULT_BACKGROUND,
  },
  loadingIcon: {
    marginTop: 100,
  },
  error: {
    marginTop: 50,
  },
  partnerItem: {
    borderRadius: 18,
    marginHorizontal: 7,
    height: 85,
    marginVertical: 4,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  partnerName: {
    flex: 1,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    marginLeft: 10,
  },
  partnerImage: {
    width: 70,
    height: 70,
  },
});

export default PartnersScreen;
