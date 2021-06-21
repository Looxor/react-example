import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../config";

const ChooseFacultyPicker = props => {
  const {
    selectedFaculty,
    faculties,
    pickerOpened,
    setOpened,
    setSelectedFaculty,
  } = props;

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setOpened(!pickerOpened);
        }}
        style={styles.pickerContainer}>
        <Text style={styles.facultyText}>
          {selectedFaculty
            ? selectedFaculty.name
            : strings.BESTOF2.ONBOARDING.CHOOSE_FACULTY
                .CHOOSE_FACULTY_PICKER_PLACEHOLDER}
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
              faculties.map((faculty, index) => {
                return (
                  <TouchableOpacity
                    key={String(index)}
                    onPress={() => {
                      setSelectedFaculty && setSelectedFaculty(faculty);
                    }}
                    style={[
                      styles.facultyContainer,
                      selectedFaculty.faculty_id === faculty.faculty_id &&
                        styles.selectedFacultyContainer,
                    ]}>
                    <Text
                      style={[
                        styles.facultyName,
                        selectedFaculty.faculty_id === faculty.faculty_id &&
                          styles.selectedFacultyName,
                      ]}>
                      {faculty.name}
                    </Text>
                    <FastImage
                      resizeMode={'contain'}
                      style={styles.facultyIcon}
                      source={{uri: faculty.image_url}}
                    />
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginTop: 30,
    width: '85%',
    height: 53,
    borderRadius: 16,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
  },
  facultyText: {
    alignSelf: 'center',
    color: colors.LIGHT_ALOE_TF,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT,
    marginLeft: 16,
  },
  arrowIcon: {
    position: 'absolute',
    right: 20,
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  pickerBody: {
    marginTop: 10,
    width: '85%',
    minHeight: '25%',
    maxHeight: '46%',
    backgroundColor: colors.WHITE,
    borderRadius: 16,
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
  facultyIcon: {
    position: 'absolute',
    right: 20,
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});

export default ChooseFacultyPicker;
