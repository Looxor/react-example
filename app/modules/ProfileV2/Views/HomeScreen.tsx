import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, constants, strings} from '../../../config';
import HeaderBlock from './HeaderBlock';
import PersonInfoBlock from './PersonInfoBlock';
import FacultyButtonBlock from './FacultyButtonBlock';
import UserTypeBlock from './UserTypeBlock';
import IOSScrollViewTweak from './HeaderBlock/_Components/IOSScrollViewTweak';
import useHomeScreenViewModel from '../ViewModels/HomeScreenViewModel';

const ProfileHomeScreen = props => {
  const view = useHomeScreenViewModel({props});
  const [autoScroll, setAutoScroll] = useState(false);
  const [autoScrollFaculty, setAutoScrollFaculty] = useState(false);

  const _scrollView: any = useRef();
  const componentDidMount = () => {
    const {
      route: {params},
    } = props;
    if (params) {
      setAutoScroll(params['auto_enable_university_type']);
      setAutoScrollFaculty(params['auto_enable_faculty']);
    }
  };

  const onRefresh = () => {
    view.onRefresh();
  };

  useEffect(componentDidMount, []);
  return (
    <SafeAreaView style={{backgroundColor: colors.WHITE, height: '100%'}}>
      {view.firstLoaded && !view.readyToShow && (
        <View style={styles.loadingIconContainer}>
          <Text style={styles.loadingText}>{strings.OTHER.LOADING}</Text>
          <ActivityIndicator style={styles.loadingIcon} color={colors.WHITE} />
        </View>
      )}
      <KeyboardAvoidingView
        style={{}}
        keyboardVerticalOffset={30}
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
        {view.firstLoaded && <IOSScrollViewTweak />}
        <ScrollView
          ref={_scrollView}
          refreshControl={
            <RefreshControl
              refreshing={view.loadingRefresh}
              tintColor={'white'}
              onRefresh={onRefresh}
            />
          }>
          {view.firstLoaded ? (
            <>
              <HeaderBlock
                onProfileImageChanged={() => view.onProfileImageChanged()}
                navigation={props.navigation}
                headerBlockData={view.headerBlockData}
              />
              <PersonInfoBlock
                personInfoBlockData={view.personInfoBlockData}
                savingPersonInfoData={view.savingPersonInfoData}
                onSavePersonInfo={data => view.savePersonInfo(data)}
                processEmailVerification={() => view.processEmailVerification()}
                view={view}
              />
              <FacultyButtonBlock
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  autoScrollFaculty &&
                    _scrollView &&
                    _scrollView.current &&
                    _scrollView.current.scrollTo({y: layout.y});
                  setAutoScrollFaculty(false);
                }}
                onAfterSaveFaculty={() => view.onAfterSaveFaculty()}
                faculty_name={view.faculty_name}
                user={view.user}
              />
              <View
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  autoScroll &&
                    _scrollView &&
                    _scrollView.current &&
                    _scrollView.current.scrollTo({y: layout.y});
                  setAutoScroll(false);
                }}>
                <UserTypeBlock
                  selectedButtonIndex={
                    view.userTypeBlockData.selectedButtonIndex
                  }
                  userTypeBlockData={view.userTypeBlockData}
                  savingUserTypeData={view.savingUserTypeData}
                  view={view}
                  onAfterConfirmedStudentEmail={() =>
                    view.onAfterConfirmedStudentEmail()
                  }
                  onAfterConfirmedStudentCard={() =>
                    view.onAfterConfirmedStudentCard()
                  }
                  onSaveUserTypeBlock={buttonIndex =>
                    view.saveUserTypeBlock(buttonIndex)
                  }
                  auto_enable_university_type={autoScroll}
                />
              </View>
            </>
          ) : (
            <ActivityIndicator
              color={colors.DARK_ALOE_TF}
              style={{marginTop: 200}}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 10,
    elevation: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(20,122,132, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  loadingIcon: {},
  loadingText: {
    fontFamily: constants.DEFAULT_FONT,
    color: colors.WHITE,
    marginRight: 7,
  },
});

ProfileHomeScreen.navigationOptions = ({navigation}) => {
  return {
    title: strings.PROFILE.HOME.YOUR_PROFILE_TITLE,
  };
};

export default ProfileHomeScreen;
