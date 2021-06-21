import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { colors } from "../../../config";
import HeaderBlock from "./HeaderBlock";
import PersonInfoBlock from "./PersonInfoBlock";
import FacultyButtonBlock from "./FacultyButtonBlock";
import UserTypeBlock from "./UserTypeBlock";
import IOSScrollViewTweak from "./HeaderBlock/_Components/IOSScrollViewTweak";
import useHomeScreenViewModel from "../ViewModels/HomeScreenViewModel";

const HomeScreen = props => {
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
  if (view.readyToShow) {
    return (
      <SafeAreaView>
        <KeyboardAvoidingView
          style={{}}
          keyboardVerticalOffset={30}
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
          {Platform.OS === 'ios' && <IOSScrollViewTweak />}
          <ScrollView
            ref={_scrollView}
            refreshControl={
              <RefreshControl
                refreshing={view.loadingRefresh}
                tintColor={'white'}
                onRefresh={onRefresh}
              />
            }>
            <HeaderBlock
              onProfileImageChanged={() => view.onProfileImageChanged()}
              navigation={props.navigation}
              headerBlockData={view.headerBlockData}
            />
            <PersonInfoBlock
              personInfoBlockData={view.personInfoBlockData}
              savingPersonInfoData={view.savingPersonInfoData}
              onSavePersonInfoBlock={() => view.savePersonInfoBlock()}
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
                selectedIndex={view.selectedButtonIndex}
                userTypeBlockData={view.userTypeBlockData}
                savingUserTypeData={view.savingUserTypeData}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  } else {
    return (
      <ActivityIndicator style={styles.loadingIcon} color={colors.THEFACULTY} />
    );
  }
};

const styles = StyleSheet.create({
  loadingIcon: {
    marginTop: 150,
  },
});

export default HomeScreen;
