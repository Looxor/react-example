import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './EditFacultyScreen.style';
import {colors, constants, sounds, strings} from '../../config';
import {CallServerPromise} from '../../utils/app/CallServer';
import standardFunctions from '../../utils/app/StandardFunctions';
import Faculty from './Models/Faculty';
import FastImage from 'react-native-fast-image';
import UserManager from './Models/UserManager';
import {Button} from '../../components';

const FacultyComponent2 = props => {
  const {faculty, selected} = props;
  return (
    <TouchableOpacity
      activeOpacity={constants.ACTIVE_OPACITY}
      style={[styles.userTypeButton, selected && styles.userTypeButtonSelected]}
      onPress={() => props.onSelect(faculty)}>
      <FastImage
        resizeMode={'contain'}
        style={styles.userTypeButtonImage}
        source={{uri: faculty.d('image_url')}}
      />
      <Text style={styles.userTypeButtonText}>{faculty.d('name')}</Text>
    </TouchableOpacity>
  );
};

const EditFacultyScreen = props => {
  // @ts-ignore
  const navigationData = global.navigationData;
  if (!navigationData) return null;
  const onAfterSaveFaculty = navigationData['onAfterSaveFaculty'];
  const user = navigationData['user'];

  const original_faculty_id =
    user.faculty_id !== undefined ? user.d('faculty_id') : '';
  const [faculties, setFaculties] = useState([]);
  const [saving, setSaving] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] =
    useState(original_faculty_id);
  const disabled = original_faculty_id === selectedFacultyId;

  const componentDidMount = () => {
    const loadAllFaculties = async () => {
      try {
        const request = await CallServerPromise.get_all_faculties();
        if (request.success)
          setFaculties(request.data.map(faculty => new Faculty(faculty)));
      } catch (error) {}
    };
    loadAllFaculties();
    const componentWillUnmount = () => {};
    return componentWillUnmount;
  };

  const saveFacultyHandler = async () => {
    setSaving(true);
    const updatedFaculty = await UserManager.updateFaculty(selectedFacultyId);
    setSaving(false);
    if (!updatedFaculty) {
      await standardFunctions.show_alert_async(
        strings.ALERTS.ERRORS.STANDARD.OOPS,
        strings.SETTINGS.EDIT_FACULTY.ERROR_WHILE_UPDATING_FACULTY,
      );
    } else {
      await standardFunctions.show_alert_async(
        strings.SETTINGS.EDIT_FACULTY.TITLE,
        strings.SETTINGS.EDIT_FACULTY.SUCCESS_TO_UPDATING_FACULTY,
      );
      onAfterSaveFaculty && onAfterSaveFaculty();
    }
    props.navigation.goBack(null);
  };

  // props.navigation.addListener('focus', didFocus);
  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          padding: 5,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {/*
          <HomeBoxWithComponent
              text={strings.SETTINGS.EDIT_FACULTY.YOUR_FACULTY}
              name={user.d('faculty_name')}
          />
        <Text
          style={styles.allFacultiesText}>

        </Text>
        */}
        {faculties && faculties.length > 0 ? (
          faculties.map(
            (faculty, index) =>
              faculty.d('faculty_id') === user.faculty_id && (
                <FacultyComponent2
                  key={String(index)}
                  selected={faculty.d('faculty_id') === selectedFacultyId}
                  onSelect={faculty => {
                    standardFunctions.play_sound_effect(
                      sounds.PROFILE.FACULTIES[faculty.d('faculty_id')],
                    );
                    setSelectedFacultyId(faculty.d('faculty_id'));
                  }}
                  faculty={faculty}
                />
              ),
          )
        ) : (
          <></>
        )}
        {faculties && faculties.length > 0 ? (
          faculties.map(
            (faculty, index) =>
              faculty.d('faculty_id') !== user.faculty_id && (
                <FacultyComponent2
                  key={String(index)}
                  selected={faculty.d('faculty_id') === selectedFacultyId}
                  onSelect={faculty => {
                    standardFunctions.play_sound_effect(
                      sounds.PROFILE.FACULTIES[faculty.d('faculty_id')],
                    );
                    setSelectedFacultyId(faculty.d('faculty_id'));
                  }}
                  faculty={faculty}
                />
              ),
          )
        ) : (
          <></>
        )}
      </ScrollView>
      {!(faculties && faculties.length > 0) && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <ActivityIndicator size={'large'} color={colors.DARK_ALOE_TF} />
        </View>
      )}
      {!disabled && (
        <View style={styles.buttonContainer}>
          <Button
            onPress={saveFacultyHandler}
            disabled={disabled || saving}
            textStyle={styles.saveButtonText}
            style={[styles.saveButton, disabled && styles.saveButtonDisabled]}>
            {saving ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              strings.SETTINGS.EDIT_FACULTY.BUTTON_TITLE
            )}
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

EditFacultyScreen.navigationOptions = ({navigation}) => ({
  title: strings.SETTINGS.EDIT_FACULTY.TITLE,
});

export default EditFacultyScreen;
