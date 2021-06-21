import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../config";

const FacultyPicker = props => {
  const {
    faculties,
    selectedFacultyID,
    setSelectedFacultyID,
    pickerOpened,
    setOpened,
  } = props;

  const setSelected = faculty_id => {
    setSelectedFacultyID(faculty_id);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setOpened(!pickerOpened);
        }}
        style={styles.pickerContainer}>
        <Text style={styles.placeholderText} numberOfLines={1}>
          {faculties.find(f => f.faculty_id === selectedFacultyID)
            ? faculties.find(f => f.faculty_id === selectedFacultyID).name
            : strings.BESTOF2.HISTORY_FILTER.AREA_PLACEHOLDER}
        </Text>
        <FastImage
          resizeMode={'contain'}
          style={styles.arrowIcon}
          source={
            pickerOpened
              ? require('../../../../../assets/images/icons/icn_dropdown_blue_close.png')
              : require('../../../../../assets/images/icons/icn_dropdown_blue_open.png')
          }
        />
      </TouchableOpacity>
      {pickerOpened && (
        <View style={styles.pickerBody}>
          <ScrollView style={styles.pickerScrollView}>
            {faculties &&
              faculties.map(faculty => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelected && setSelected(faculty.faculty_id);
                    }}
                    style={[
                      styles.facultyContainer,
                      selectedFacultyID === faculty.faculty_id &&
                        styles.selectedFacultyContainer,
                    ]}>
                    <Text
                      style={[
                        styles.facultyName,
                        selectedFacultyID === faculty.faculty_id &&
                          styles.selectedFacultyName,
                      ]}>
                      {faculty.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}
    </>
  );
};
/*

                <SelectBox
                  containerStyle={[{height: 45}]}
                  selected={faculty.faculty_id === selectedFacultyID}
                  id={faculty.faculty_id}
                  name={faculty.name}
                  setSelected={setSelected}
                />
 */

const styles = StyleSheet.create({
  pickerContainer: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '95%',
    height: 53,
    borderRadius: 16,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    shadowColor: colors.lightGray,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5.5,
    elevation: 4,
  },
  placeholderText: {
    alignSelf: 'center',
    color: colors.LIGHT_ALOE_TF,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 16,
    marginRight: 46,
  },
  arrowIcon: {
    position: 'absolute',
    right: 20,
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  pickerBody: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    width: '95%',
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    shadowColor: colors.lightGray,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5.5,
    elevation: 4,
  },
  pickerScrollView: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  facultyContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
  },
  selectedFacultyContainer: {
    backgroundColor: colors.BESTOF2.BG1,
  },
  facultyName: {
    color: colors.BESTOF2.BG1,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 30,
  },
  selectedFacultyName: {
    color: colors.WHITE,
  },
});

export default FacultyPicker;
