import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./HistoryFilterScreen.style";
import { colors, strings } from "../../../config";
import CheckBox from "../../../components/CheckBox";
import RadioBox2 from "../../../components/RadioBox2";
import CloseScreenButton from "../_Components/CloseScreenButton";
import { Button } from "../../../components";
import CacheManager from "../../../utils/app/CacheManager";
import { CallServerPromise } from "../../../utils/app/CallServer";
import UniversityPicker from "./_Components/UniversityPicker";
import FacultyPicker from "./_Components/FacultyPicker";
import InAppLoadingPopover from "../../../components/InAppLoadingPopover";
import { Observable } from "../../_CommonModels/ViewModelBase";
import standardFunctions from "../../../utils/app/StandardFunctions";

const DEFAULT_DATE_FILTER = 'recent';
const DEFAULT_ENDINGS_FILTER = ['winner', 'loser', 'tie'];

const HistoryFilterScreen = props => {
  const onApplyFilter = props.navigation.getParam('onApplyFilter');
  const onRemoveFilter = props.navigation.getParam('onRemoveFilter');

  const [endingsFilter, setEndingsFilter] = useState(DEFAULT_ENDINGS_FILTER);
  const [dateFilter, setDateFilter] = useState('');

  const [facultyPickerOpened, setFacultyPickerOpened] = useState(false);
  const [selectedOpponentFacultyID, setSelectedOpponentFacultyID] =
    useState('');
  const [opponentsFaculties, setOpponentsFaculties] = useState([]);

  const [universityPickerOpened, setUniversityPickerOpened] = useState(false);
  const [selectedOpponentUniversityID, setSelectedOpponentUniversityID] =
    useState('');
  const [opponentsUniversities, setOpponentsUniversities] = useState([]);

  const applyPressHandler = () => {
    let loading_popover_view_history = InAppLoadingPopover().show({
      navigation: props.navigation,
    });
    Observable.setReduxValue(
      'loading_popover_view_history',
      loading_popover_view_history,
    );

    onApplyFilter &&
      onApplyFilter({
        dateFilter,
        endingsFilter,
        selectedOpponentFacultyID,
        selectedOpponentUniversityID,
      });
    CacheManager.set('cachedDateFilter', dateFilter);
    CacheManager.set('cachedEndingsFilter', endingsFilter);
    CacheManager.set('cachedFacultyIDFilter', selectedOpponentFacultyID);
    CacheManager.set('cachedUniversityIDFilter', selectedOpponentUniversityID);
    props.navigation.dismiss();
  };

  const removePressHandler = () => {
    let loading_popover_view_history = InAppLoadingPopover().show({
      navigation: props.navigation,
    });
    Observable.setReduxValue(
      'loading_popover_view_history',
      loading_popover_view_history,
    );

    onRemoveFilter && onRemoveFilter();
    CacheManager.set('cachedDateFilter', undefined);
    CacheManager.set('cachedEndingsFilter', undefined);
    CacheManager.set('cachedFacultyIDFilter', undefined);
    CacheManager.set('cachedUniversityIDFilter', undefined);
    props.navigation.dismiss();
  };

  const loadCachedFilters = () => {
    const cachedDateFilter = CacheManager.get('cachedDateFilter')
      ? CacheManager.get('cachedDateFilter')
      : '';
    const cachedEndingsFilter = CacheManager.get('cachedEndingsFilter')
      ? CacheManager.get('cachedEndingsFilter')
      : DEFAULT_ENDINGS_FILTER;
    const cachedFacultiesFilter = CacheManager.get('cachedFacultyIDFilter')
      ? CacheManager.get('cachedFacultyIDFilter')
      : '';
    const cachedUniversitiesFilter = CacheManager.get(
      'cachedUniversityIDFilter',
    )
      ? CacheManager.get('cachedUniversityIDFilter')
      : '';
    setDateFilter(cachedDateFilter);
    setEndingsFilter(cachedEndingsFilter);
    setSelectedOpponentFacultyID(cachedFacultiesFilter);
    setSelectedOpponentUniversityID(cachedUniversitiesFilter);
  };

  const _setSelectedOpponentsFacultyID = faculty_id => {
    standardFunctions.add_firebase_event_log('bestofs', 'flts_slct', {
      filter: 'faculty',
      faculty_id,
    });
    if (faculty_id !== selectedOpponentFacultyID) {
      setSelectedOpponentFacultyID(faculty_id);
    } else {
      setSelectedOpponentFacultyID('');
    }
  };

  const _setSelectedOpponentsUniversityID = university_id => {
    standardFunctions.add_firebase_event_log('bestofs', 'flts_slct', {
      filter: 'university',
      university_id,
    });
    if (university_id !== selectedOpponentUniversityID) {
      setSelectedOpponentUniversityID(university_id);
    } else {
      setSelectedOpponentUniversityID('');
    }
  };

  const componentDidMount = () => {
    const didFocus = async () => {
      loadCachedFilters();
      let filtersRequest: any =
        await CallServerPromise.get_finished_bestofs_opponents_faculties_universities();
      setOpponentsFaculties(filtersRequest.data.opponents_faculties);
      setOpponentsUniversities(filtersRequest.data.opponents_universities);
    };

    const didBlur = () => {};

    props.navigation.addListener('blur', didBlur);
    props.navigation.addListener('focus', didFocus);
    didFocus();
    return componentWillUnmount;
  };

  const componentWillUnmount = () => {};

  useEffect(componentDidMount, []);
  return (
    <View style={styles.container}>
      <CloseScreenButton
        onPress={() => props.navigation.dismiss()}
        style={{marginTop: -36, marginRight: -10}}
      />
      <Text style={styles.screenTitle}>
        {strings.BESTOF2.HISTORY_FILTER.FILTER}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainer}>
        {false && (
          <View style={styles.searchInputContainer}>
            <TextInput
              placeholder={strings.BESTOF2.HISTORY_FILTER.SEARCH_PLACEHOLDER}
              placeholderTextColor={colors.BESTOF2.BG2_2}
              style={styles.searchInputText}
              textAlignVertical={'center'}
            />
            <FastImage
              style={styles.searchInputIcon}
              source={require('../../../../assets/images/icons/icn_bestofs_search.png')}
            />
          </View>
        )}

        {/* Picker for Area */}
        <View style={styles.labelContainer}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../assets/images/icons/icn_bestofs_faculty.png')}
          />
          <Text style={styles.labelText}>
            {strings.BESTOF2.HISTORY_FILTER.AREA_LABEL}
          </Text>
        </View>
        <FacultyPicker
          faculties={opponentsFaculties}
          selectedFacultyID={selectedOpponentFacultyID}
          setSelectedFacultyID={_setSelectedOpponentsFacultyID}
          pickerOpened={facultyPickerOpened}
          setOpened={setFacultyPickerOpened}
        />

        {/* Picker for University */}
        <View style={styles.labelContainer}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../assets/images/icons/icn_bestofs_university.png')}
          />
          <Text style={[styles.labelText, {marginTop: 2}]}>
            {strings.BESTOF2.HISTORY_FILTER.UNIVERSITY_LABEL}
          </Text>
        </View>
        <UniversityPicker
          universities={opponentsUniversities}
          selectedUniversityID={selectedOpponentUniversityID}
          setSelectedUniversityID={_setSelectedOpponentsUniversityID}
          pickerOpened={universityPickerOpened}
          setOpened={setUniversityPickerOpened}
        />

        {/* Checkbox for Challenge Result */}
        <View style={[styles.labelContainer, {marginTop: 20}]}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../assets/images/icons/icn_bestofs_checklist.png')}
          />
          <Text style={styles.labelText}>
            {strings.BESTOF2.HISTORY_FILTER.CHALLENGE_RESULT_LABEL}
          </Text>
        </View>
        <CheckBox
          checkedIcon={require('../../../../assets/images/icons/icn_checkbox_checked.png')}
          uncheckedIcon={require('../../../../assets/images/icons/icn_checkbox_unchecked.png')}
          data={[
            {
              value: 'winner',
              text: strings.BESTOF2.HISTORY_FILTER.CHALLENGE_RESULT_WON,
            },
            {
              value: 'loser',
              text: strings.BESTOF2.HISTORY_FILTER.CHALLENGE_RESULT_LOST,
            },
            {
              value: 'tie',
              text: strings.BESTOF2.HISTORY_FILTER.CHALLENGE_RESULT_PAREGED,
            },
          ]}
          textStyle={{color: colors.BESTOF2.BG1, marginLeft: 5}}
          iconStyle={{
            width: 18,
            height: 18,
          }}
          containerStyle={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          itemStyle={{
            marginHorizontal: 8,
          }}
          onChangeValue={value => {
            standardFunctions.add_firebase_event_log('bestofs', 'flts_slct', {
              filter: 'endings',
              endings: value,
            });
            setEndingsFilter(value);
          }}
          defaultCheckedValues={endingsFilter}
        />

        {/* Selectbox for Date */}
        <View style={[styles.labelContainer, {marginTop: 20}]}>
          <FastImage
            resizeMode={'contain'}
            style={styles.hatIcon}
            source={require('../../../../assets/images/icons/icn_bestofs_calendar.png')}
          />
          <Text style={[styles.labelText, {marginTop: 1}]}>
            {strings.BESTOF2.HISTORY_FILTER.DATE_LABEL}
          </Text>
        </View>
        <RadioBox2
          data={[
            {value: 'recent', text: strings.BESTOF2.HISTORY_FILTER.VIEW_RECENT},
            {value: 'old', text: strings.BESTOF2.HISTORY_FILTER.VIEW_OLD},
          ]}
          containerStyle={{
            alignSelf: 'center',
            marginVertical: 10,
            marginBottom: 20,
          }}
          defaultSelectedValue={dateFilter || DEFAULT_DATE_FILTER}
          onChangeValue={value => {
            standardFunctions.add_firebase_event_log('bestofs', 'flts_slct', {
              filter: 'sorting',
              sorting: value,
            });
            setDateFilter(value);
          }}
          iconStyle={{
            width: 50,
            height: 25,
          }}
          textStyle={{
            lineHeight: 22,
          }}
        />
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={applyPressHandler}
          style={styles.applyButton}
          textStyle={styles.applyButtonText}>
          {strings.BESTOF2.HISTORY_FILTER.APPLY}
        </Button>
        <Button
          onPress={removePressHandler}
          style={styles.removeButton}
          textStyle={styles.removeButtonText}>
          {strings.BESTOF2.HISTORY_FILTER.REMOVE_LABEL}
        </Button>
      </View>
    </View>
  );
};

export default HistoryFilterScreen;
