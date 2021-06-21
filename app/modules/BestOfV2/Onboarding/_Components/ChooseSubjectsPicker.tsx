import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { colors, constants, strings } from "../../../../config";
import SelectSubjectBox from "../../_Components/SelectSubjectBox";

const ChooseSubjectsPicker = props => {
  const {
    selectedFaculty,
    selectedSubjects,
    selectedSubjectNames,
    setSelectedSubjects,
    suggestedSubjects,
    pickerOpened,
    setOpened,
  } = props;

  const setSelected = subject => {
    var tempSubjects = selectedSubjects ? selectedSubjects : [];
    var tempSubjectNames = selectedSubjectNames ? selectedSubjectNames : [];
    if (!tempSubjects.includes(subject.subject_id)) {
      tempSubjects.push(subject.subject_id);
    } else {
      const indexID = tempSubjects.indexOf(subject.subject_id);
      if (indexID > -1) {
        tempSubjects.splice(indexID, 1);
      }
    }

    if (!tempSubjectNames.includes(subject.name)) {
      tempSubjectNames.push(subject.name);
    } else {
      const indexName = tempSubjectNames.indexOf(subject.name);
      if (indexName > -1) {
        tempSubjectNames.splice(indexName, 1);
      }
    }

    setSelectedSubjects(tempSubjects, tempSubjectNames);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setOpened(!pickerOpened);
        }}
        style={styles.pickerContainer}>
        <Text style={styles.subejctsText} numberOfLines={1}>
          {selectedSubjectNames &&
            selectedSubjectNames.length === 0 &&
            strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS
              .CHOOSE_SUBJECTS_PICKER_PLACEHOLDER}
          {selectedSubjectNames &&
            selectedSubjectNames.length !== 0 &&
            selectedSubjectNames.map((subject_name, index) => {
              return (
                subject_name +
                (index === selectedSubjectNames.length - 1 ? '' : ', ')
              );
            })}
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
            {selectedFaculty && (
              <>
                <Text
                  style={[
                    styles.subjectsSubtitle,
                    suggestedSubjects && {marginTop: 20},
                  ]}>
                  {strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS.FACULTY_SUBJECTS_TEXT.replace(
                    '{FACULTY_NAME}',
                    selectedFaculty.name,
                  )}
                </Text>
              </>
            )}
            {selectedFaculty &&
              selectedFaculty.subjects &&
              selectedFaculty.subjects.map((facultySubject, index) => {
                if (
                  suggestedSubjects &&
                  suggestedSubjects.includes(facultySubject.subject_id)
                )
                  return;
                return (
                  <SelectSubjectBox
                    key={String(index)}
                    containerStyle={[{height: 50}]}
                    selected={selectedSubjects.includes(
                      facultySubject.subject_id,
                    )}
                    subject={facultySubject}
                    setSelected={setSelected}
                  />
                );
              })}

            {suggestedSubjects && (
              <Text style={styles.subjectsSubtitle}>
                {
                  strings.BESTOF2.ONBOARDING.CHOOSE_SUBJECTS
                    .GENERAL_SUBJECTS_TEXT
                }
              </Text>
            )}
            {suggestedSubjects &&
              suggestedSubjects.map((suggestedSubject, index) => {
                return (
                  <SelectSubjectBox
                    key={String(index)}
                    containerStyle={[{height: 50}]}
                    selected={selectedSubjects.includes(
                      suggestedSubject.subject_id,
                    )}
                    subject={suggestedSubject}
                    setSelected={setSelected}
                  />
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
    marginTop: 25,
    width: '85%',
    height: 53,
    borderRadius: 16,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
  },
  subejctsText: {
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
    marginTop: 10,
    width: '85%',
    minHeight: '25%',
    maxHeight: '44%',
    backgroundColor: colors.WHITE,
    borderRadius: 16,
  },
  pickerScrollView: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  subjectsSubtitle: {
    marginTop: 15,
    marginBottom: 25,
    color: colors.LIGHT_ALOE_TF,
    fontSize: 16,
    fontFamily: constants.DEFAULT_FONT_BOLD,
    marginLeft: 26,
  },
});

export default ChooseSubjectsPicker;
