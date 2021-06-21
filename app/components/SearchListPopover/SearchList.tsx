import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IntervalCheck from "../../utils/misc/IntervalCheck";
import { colors, constants, strings } from "../../config";
import AutoCompleteListUp from "../AutoCompleteListUp";
import { Item } from "native-base";
import SearchBoxItem from "../../modules/Test/CommonComponents/SearchBoxItem";

const SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS = 300;

const intervalCheck = new IntervalCheck();
let timeout: any = 0;

const SearchList = props => {
  const {onSelectItem, searchFunc, fetchSearchResultFunc, searchPlaceholder} =
    props;
  const [majorText, setMajorText] = useState('');
  const [majorList, setMajorList] = useState([]);
  const [majorListVisible, setMajorListVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState({});
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
            onPress={() => setSearching(false)}>
            <ActivityIndicator size="small" />
          </TouchableOpacity>
        )}
      </Item>
      <View style={{width: '95%', top: 10, alignSelf: 'center'}}>
        <AutoCompleteListUp
          visible={true}
          data={majorList}
          style={{top: 0, position: 'relative', borderRadius: 0}}
          onSelectItem={onMajorListSelect}
          selectedItem={selectedMajor}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.closeButton]}
          onPress={onClose}>
          <Text style={[styles.buttonText, styles.closeButtonText]}>
            {strings.OTHER.CLOSE.toUpperCase()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={onConfirmMajor}>
          <Text style={[styles.buttonText, styles.confirmButtonText]}>
            {strings.OTHER.CONFIRM.toUpperCase()}
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
    height: 45,
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
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    bottom: 0,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: constants.DEFAULT_FONT,
  },
  confirmButton: {
    backgroundColor: colors.THEFACULTY,
    width: '46%',
    marginHorizontal: '2%',
  },
  confirmButtonText: {
    color: colors.WHITE,
  },
  closeButton: {
    borderColor: colors.THEFACULTY,
    borderWidth: constants.onePixel,
    width: '46%',
    marginHorizontal: '2%',
  },
  closeButtonText: {
    color: colors.THEFACULTY,
  },
});

export default SearchList;
