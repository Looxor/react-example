import React from "react";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { colors, strings } from "../../../../config";
import useResultViewModel, { ResultItemView } from "../../ViewModels/Result/ResultViewModel";
import FastImage from "react-native-fast-image";
import ResultItem from "./Components/ResultItem";
import FilterPopoverView from "./Components/FilterPopoverView";
import styles from "./Result.style";
import { useNavigation } from "@react-navigation/native";

const resultItemView = new ResultItemView();
const renderResultItem = (navigation, {item}) => {
  const {
    test_name,
    test_university_name,
    correct_answer_count,
    wrong_answer_count,
    simulation,
  } = item;
  const {instance_name, start_date} = simulation;
  return (
    <ResultItem
      onPressResultItem={() =>
        resultItemView.onPressResultItem(navigation, simulation)
      }
      correct_answer_count={correct_answer_count}
      wrong_answer_count={wrong_answer_count}
      test_item={item}
      test_name={test_name}
      test_university_name={test_university_name}
      instance_name={instance_name}
      start_date={start_date}
      style={styles.resultItem}
    />
  );
};

const Result = props => {
  const navigation = useNavigation();
  const view = useResultViewModel({props});

  const onPressFilterHandler = () => {
    const onApplyFilter = ({instance_type, major_id, start_date, end_date}) => {
      view.setFilterValue({instance_type, major_id, start_date, end_date});
      view.loadSimulations();
    };
    const {
      filter_instance_type,
      filter_major_id,
      filter_start_date,
      filter_end_date,
    } = view;
    FilterPopoverView({
      onApplyFilter,
      instance_type: filter_instance_type,
      major_id: filter_major_id,
      start_date: filter_start_date,
      end_date: filter_end_date,
    }).show();
  };

  return (
    <>
      {/*
      <TouchableOpacity
        onPress={() => onPressFilterHandler()}
        style={styles.filterContainer}>
        <FastImage
          style={styles.filterIcon}
          source={require('../../../../../assets/images/icons/icn_filter_blue.png')}
        />
        <Text style={styles.filterText}>
          {strings.TEST.RESULT_HOME.FILTER_TEXT}
        </Text>
      </TouchableOpacity>
      */}
      {view.dataLoaded() && (
        <>
          <FlatList
            contentContainerStyle={styles.container}
            data={view.simulations}
            renderItem={({item}) => renderResultItem(navigation, {item})}
            keyExtractor={index => String(index)}
            refreshControl={
              <RefreshControl
                refreshing={view.refreshing}
                onRefresh={() => view.onRefresh()}
              />
            }
          />
        </>
      )}
      {view.onWaiting() && (
        <ActivityIndicator
          style={styles.loadingIcon}
          color={colors.THEFACULTY}
        />
      )}
      {view.dataLoadedButNothing() && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={view.refreshing}
              onRefresh={() => view.onRefresh()}
            />
          }
          contentContainerStyle={styles.emptyContainer}>
          <View>
            <FastImage
              style={styles.emptyLogo}
              source={require('../../../../../assets/images/icons/icn_pc.png')}
            />
            <Text style={styles.emptyDescription}>
              {strings.TEST.RESULT_HOME.EMPTY_DESCRIPTION}
            </Text>
          </View>
          <View />
        </ScrollView>
      )}
    </>
  );
};

Result.navigationOptions = ({navigation}) => {
  return {
    title: strings.TEST.RESULT_HOME.TITLE,
  };
};

export default Result;
