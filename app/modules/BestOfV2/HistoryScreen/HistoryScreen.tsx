import React, { useEffect, useState } from "react";
import { Clipboard, SafeAreaView, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import styles from "./HistoryScreen.style";
import BestOfHistory from "../_Models/BestOfHistory";
import { Button } from "../../../components";
import { CallServerPromise } from "../../../utils/app/CallServer";

const BestOfHistoryItem = props => {
  const bestof = (props.bestof || {}).bestof_data;
  console.log('current time', +new Date());
  return bestof ? (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <TouchableOpacity
          onLongPress={() => {
            Clipboard.setString(bestof.bestof_id);
            ToastAndroid.show('Copied', ToastAndroid.SHORT);
          }}>
          <Text>{bestof.bestof_id}</Text>
        </TouchableOpacity>
        <Text style={{flexWrap: 'wrap'}}>
          {bestof.user1_nickname} {bestof.user1_university_name}{' '}
          {bestof.user1_faculty_name}
        </Text>
        <Text style={{flexWrap: 'wrap'}} numberOfLines={2}>
          {bestof.user2_nickname} {bestof.user2_university_name}{' '}
          {bestof.user2_faculty_name} {'\n'}
        </Text>
        <Text>{JSON.stringify(bestof.questions)}</Text>
      </View>
      <Button
        onPress={props.onPress}
        style={{width: 70, height: 30}}
        textStyle={{fontSize: 14}}>
        Reject
      </Button>
    </View>
  ) : null;
};

const HistoryScreen = props => {
  const [bestofs, setBestofs] = useState([]);
  const loadData = async () => {
    try {
      // console.log('const loadData = async () => {', Firebase_IDToken.firebase_idToken)
      // const request = await CallServerPromise.reject_bestof_v2('5fcf4508daedac5dcadf3579')
      // console.log('request', request);

      const bestofs = await BestOfHistory.get();
      console.log('bestofs 2', JSON.stringify(bestofs));
      setBestofs(bestofs);
    } catch (e) {
      console.log('error on loading data', e);
    }
  };

  const leaveBestOfHandler = async bestof_id => {
    try {
      const request = await CallServerPromise.leave_bestof_v2(bestof_id);
      console.log('request', request);
    } catch (e) {
      console.log('error on leave', e);
    }
  };

  const clearHistoryHandler = () => {
    BestOfHistory.clear();
  };

  const componentDidMount = () => {
    const didFocus = async () => {};

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    loadData();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={clearHistoryHandler}>Clear</Button>
      <ScrollView contentContainerStyle={styles.subContainer}>
        {bestofs &&
          bestofs.map((bestof, index) => (
            <BestOfHistoryItem
              key={String(index)}
              onPress={() => leaveBestOfHandler(bestof.bestof_data.bestof_id)}
              bestof={bestof}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
