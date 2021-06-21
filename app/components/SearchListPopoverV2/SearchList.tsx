import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IntervalCheck from '../../utils/misc/IntervalCheck';
import {colors, constants, strings} from '../../config';
import AutoCompleteListUp from '../AutoCompleteListUp';
import {Item} from 'native-base';
import SearchBoxItem from './SearchBoxItem';

const SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS = 300;
const SELECTED_ICON = require('../../../assets/images/icons/icn_check_coupons_valid.png');
const intervalCheck = new IntervalCheck();
let timeout: any = 0;

const SearchList = props => {
  const {onSelectItem, searchFunc, fetchSearchResultFunc, searchPlaceholder} =
    props;
  const [majorText, setMajorText] = useState('');
  const [majorList, setMajorList] = useState([]);
  const [majorListVisible, setMajorListVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedMajor, setSelectedMajor]: any = useState({});
  // const searchInputRef: any = useRef();

  const componentDidMount = () => {
    // searchInputRef && searchInputRef.current.focus();
  };

  useEffect(componentDidMount, []);

  useEffect(() => {
    // setValidContinue(selectedMajor.id !== undefined);
  }, [selectedMajor]);

  const setMajorHandler = value => {
    setMajorText(value);

    if (intervalCheck.passedLessThan(SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS)) {
      timeout && clearInterval(timeout);
      timeout = setTimeout(
        () => sendRequest(value),
        SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS,
      );
    } else {
      sendRequest(value);
    }
    // IntervalCheck
  };

  const sendRequest = async value => {
    try {
      if (value && value.length > 2 && !searching) {
        setSearching(true);
        // const request = await CallServerPromise.search_majors({pattern: value});
        const request = await searchFunc(value);
        if (request.success && request.data) {
          const majorList = request.data.map(fetchSearchResultFunc);
          setMajorList(majorList);
          setMajorListVisible(majorList.length > 0);
        }
        setSearching(false);
      } else {
        setMajorList([]);
        setMajorListVisible(false);
      }
    } catch (e) {
      setSearching(false);
    }
  };

  const onMajorListSelect = major => {
    setSelectedMajor(major);
    setMajorText(major.name);
    setMajorListVisible(false);
  };

  const onConfirmMajor = () => {
    onSelectItem(selectedMajor);
  };

  const onClose = () => {
    props.onClose && props.onClose();
  };

  return (
    <View style={styles.inputContainer}>
      <Item style={styles.inputAuto}>
        <SearchBoxItem
          value={majorText}
          label={searchPlaceholder}
          onSearch={setMajorHandler}
        />
        {searching && (
          <TouchableOpacity
            style={{
              top: 23,
              right: 23,
              position: 'absolute',
              zIndex: 20,
              elevation: 20,
            }}
            activeOpacity={constants.ACTIVE_OPACITY}
            onPress={() => setSearching(false)}>
            <ActivityIndicator size="small" />
          </TouchableOpacity>
        )}
      </Item>
      <View
        style={{
          flex: 1,
          marginTop: 22,
          marginBottom: 5,
          width: '100%',
          alignSelf: 'center',
        }}>
        <AutoCompleteListUp
          visible={true}
          data={majorList}
          style={{borderRadius: 0, flex: 1}}
          onSelectItem={onMajorListSelect}
          selectedItem={selectedMajor}
          itemStyle={{
            borderRadius: 0,
            marginVertical: 0,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
          }}
          selectedItemStyle={{
            backgroundColor: colors.DARK_ALOE_TF,
          }}
          selectedItemTextStyle={{
            color: colors.WHITE,
          }}
          iconStyle={{
            position: 'relative',
            width: 20,
            height: 20,
          }}
          selectedIcon={SELECTED_ICON}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.confirmButton,
            selectedMajor && !selectedMajor.name && styles.disabledButton,
          ]}
          disabled={selectedMajor && !selectedMajor.name}
          activeOpacity={constants.ACTIVE_OPACITY}
          onPress={onConfirmMajor}>
          <Text style={[styles.buttonText, styles.confirmButtonText]}>
            {strings.OTHER.CONFIRM}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          activeOpacity={constants.ACTIVE_OPACITY}
          onPress={onClose}>
          <Text style={[styles.buttonText, styles.closeButtonText]}>
            {strings.OTHER.CANCEL}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  input: {
    width: '100%',
    height: 53,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  inputAuto: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    alignSelf: 'center',
    paddingHorizontal: 9,
    paddingTop: 4,
  },
  searchInput: {
    borderRadius: 5,
    backgroundColor: colors.WHITE,
    width: '96%',
    marginVertical: 5,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 2,
    fontFamily: constants.DEFAULT_FONT,
    fontSize: 16,
    paddingLeft: 10,
  },
  staticText: {
    fontFamily: constants.DEFAULT_FONT,
    marginHorizontal: 20,
    fontSize: 17,
  },
  staticTextChecked: {
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 20,
    fontSize: 17,
    color: colors.THEFACULTY,
  },
  cancelSearch: {
    borderWidth: 0,
    borderColor: colors.SILVER,
    backgroundColor: colors.WHITE,
    color: colors.gray,
    borderRadius: 5,
    lineHeight: 25,
    fontSize: 18,
    paddingTop: 2,
    width: 27,
    height: 27,
    paddingRight: 0,
    paddingLeft: 0,
    marginRight: 3,
    textAlign: 'center',
    shadowColor: colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
  },
  startSearch: {
    borderWidth: 0,
    borderColor: colors.SILVER,
    backgroundColor: colors.WHITE,
    color: colors.gray,
    borderRadius: 5,
    lineHeight: 25,
    fontSize: 18,
    paddingTop: 2,
    width: 27,
    height: 27,
    paddingRight: 0,
    paddingLeft: 0,
    marginRight: 8,
    textAlign: 'center',
    shadowColor: colors.BLACK,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 1,
  },
  buttonContainer: {
    // position: 'absolute',
    width: '100%',
    marginTop: 10,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: '2%',
    borderRadius: 16,
    flexDirection: 'row',
    shadowColor: colors.lightGray,
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 10,
    zIndex: 100,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT_BOLD,
  },
  confirmButton: {
    backgroundColor: colors.DARK_ALOE_TF,
    marginHorizontal: '2%',
  },
  confirmButtonText: {
    color: colors.WHITE,
  },
  disabledButton: {
    backgroundColor: colors.LIGHT_ALOE_TF,
    marginHorizontal: '2%',
  },
  closeButton: {
    width: '90%',
    height: 50,
    borderRadius: 16,
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 10,
    zIndex: 100,
  },
  closeButtonText: {
    color: colors.DARK_ALOE_TF,
  },
});

export default SearchList;
