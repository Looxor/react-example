import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import GradientBackground from './_Components/GradientBackground';
import PersonInfoBox from './_Components/PersonInfoBox';
import ProfileProgressBox from './_Components/ProfileProgressBox';
import {colors} from '../../../../config';

const HeaderBlock = props => {
  const {
    nickName,
    fullName,
    email,
    progress,
    descriptionDesc,
    profile_image_url,
  } = props.headerBlockData;
  const {navigation, onProfileImageChanged} = props;
  return (
    <View style={[styles.container, progress < 100 ? {} : {height: 180}]}>
      <GradientBackground progress={progress} />
      <PersonInfoBox
        onProfileImageChanged={onProfileImageChanged}
        navigation={navigation}
        nickName={nickName}
        fullName={fullName}
        email={email}
        profile_image_url={profile_image_url}
      />
      {progress < 100 && (
        <ProfileProgressBox
          progress={progress}
          descriptionDesc={descriptionDesc}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
    marginTop: 20,
    backgroundColor: colors.WHITE,
  },
});

export default HeaderBlock;
