import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, constants } from "../../../../config";
import BestOf from "../../_Models/BestOf";

const SubjectBlock = props => {
  return (
    <Animated.View style={[{flexDirection: 'row'}, props.style]}>
      <View style={styles.subjectView}>
        <Text style={styles.subjectText}>
          {props.opened ? props.name : '       '}
        </Text>
      </View>
    </Animated.View>
  );
};

const SubjectsContainer = props => {
  const [topUserSubjects, setTopUserSubjects] = useState([]);
  const [commonUserSubjects, setCommonUserSubjects] = useState([]);
  const [bottomUserSubjects, setBottomUserSubjects] = useState([]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [animationsAlreadyStarted, setAnimationsAlreadyStarted] =
    useState(false);

  const [subjectAnimations, setSubjectAnimations] = useState([]);

  const getSubjects = user => {
    let match_subjects = props.questions.map(question => question.subject_id);
    if (
      props.user1 &&
      props.user2 &&
      props.user1.subjects &&
      props.user2.subjects
    ) {
      let user1_subjects = props.user1.subjects.map(
        subject => subject.subject_id,
      );
      let user2_subjects = props.user2.subjects.map(
        subject => subject.subject_id,
      );
      let common_subjects = match_subjects.filter(
        subject_id =>
          user1_subjects.includes(subject_id) &&
          user2_subjects.includes(subject_id),
      );
      if (user === 'user1') {
        return match_subjects.filter(
          subject_id =>
            user1_subjects.includes(subject_id) &&
            !common_subjects.includes(subject_id),
        );
      } else if (user === 'user2') {
        return match_subjects.filter(
          subject_id =>
            user2_subjects.includes(subject_id) &&
            !common_subjects.includes(subject_id),
        );
      } else if (user === 'common') {
        return match_subjects.filter(
          subject_id =>
            user1_subjects.includes(subject_id) &&
            user2_subjects.includes(subject_id),
        );
      }
    }
    return [];
  };

  const getSubjectsToShow = user => {
    let user1_subjects = getSubjects('user1');
    let user2_subjects = getSubjects('user2');
    if (user === 'user1' && BestOf.isUser1()) {
      return user1_subjects;
    } else if (user === 'user2' && !BestOf.isUser1()) {
      return user2_subjects;
    } else if (user === 'user1' && !BestOf.isUser1()) {
      return user1_subjects.filter(
        subject_id => !user2_subjects.includes(subject_id),
      );
    } else if (user === 'user2' && BestOf.isUser1()) {
      return user2_subjects.filter(
        subject_id => !user1_subjects.includes(subject_id),
      );
    }
  };

  const getSubjectNameFromID = subject_id => {
    let subject_data_array = props.questions.filter(
      question => question.subject_id === subject_id,
    );
    if (subject_data_array.length > 0) {
      return subject_data_array[0].subject_name;
    }
    return '';
  };

  const startSubjectAnimation = index => {
    if (subjectAnimations[index]) {
      let animation = subjectAnimations.find(
        a => a.index === subjectAnimations[index].index,
      );
      let isCommonAnimation = animation.index.endsWith('UCT');

      if (isCommonAnimation) {
        let animation2 = subjectAnimations.find(
          a => a.index === subjectAnimations[index + 1].index,
        );
        Animated.parallel([
          Animated.timing(animation.value, {
            toValue: 0,
            duration: 420,
            useNativeDriver: true,
          }),
          Animated.timing(animation2.value, {
            toValue: 0,
            duration: 420,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (index + 2 < subjectAnimations.length) {
            startSubjectAnimation(index + 2);
          } else {
            props.setAllAnimationsFinished(true);
          }
        });
      } else {
        Animated.timing(animation.value, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }).start(() => {
          if (index + 1 < subjectAnimations.length) {
            startSubjectAnimation(index + 1);
          } else {
            props.setAllAnimationsFinished(true);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (props.questions && !animationsAlreadyStarted) {
      if (BestOf.isUser1()) {
        setTopUserSubjects(getSubjectsToShow('user2'));
        setBottomUserSubjects(getSubjectsToShow('user1'));
      } else {
        setTopUserSubjects(getSubjectsToShow('user1'));
        setBottomUserSubjects(getSubjectsToShow('user2'));
      }
      setCommonUserSubjects(getSubjects('common'));

      topUserSubjects.forEach((subject, index) => {
        let temp_animations_array = subjectAnimations;
        let animation = subjectAnimations.find(a => a.index === index + 'UT');
        if (!animation) {
          temp_animations_array.push({
            index: index + 'UT',
            subject_id: subject,
            value: new Animated.Value(
              -105 - (topUserSubjects.length - index - 1) * 50,
            ),
          });
          setSubjectAnimations(temp_animations_array);
        }
      });

      commonUserSubjects.forEach((subject, index) => {
        let temp_animations_array = subjectAnimations;
        let animation = subjectAnimations.find(a => a.index === index + 'UCT');
        let animation2 = subjectAnimations.find(
          a => a.index === 100 - index + 'UCB',
        );
        let lTop = topUserSubjects.length;
        let lBottom = bottomUserSubjects.length;
        let lCommon = commonUserSubjects.length;

        if (!animation && !animation2) {
          temp_animations_array.push({
            index: index + 'UCT',
            subject_id: subject,
            value: new Animated.Value(-105 - (lTop + index) * 50),
          });
          temp_animations_array.push({
            index: 100 - index + 'UCB',
            subject_id: subject,
            value: new Animated.Value(
              105 + (lBottom + (lCommon - index - 1)) * 50,
            ),
          });
          setSubjectAnimations(temp_animations_array);
        }
      });

      bottomUserSubjects.forEach((subject, index) => {
        let temp_animations_array = subjectAnimations;
        let animation = subjectAnimations.find(a => a.index === index + 'UB');
        if (!animation) {
          temp_animations_array.push({
            index: index + 'UB',
            subject_id: subject,
            value: new Animated.Value(
              105 + (bottomUserSubjects.length - index - 1) * 50,
            ),
          });
          setSubjectAnimations(temp_animations_array);
        }
      });

      if (!isAnimating && subjectAnimations.length > 0) {
        setIsAnimating(true);
        setTimeout(() => {
          startSubjectAnimation(0);
        }, 1200);
      }
    }
  }, [props]);
  return (
    <View style={[styles.container, {...props.style}]}>
      {topUserSubjects.map((subject_id, index) => {
        let s = subjectAnimations.filter(
          i => i.index === topUserSubjects.length - 1 - index + 'UT',
        );
        let an = null;
        if (s.length > 0) {
          an = s[0].value;
        }
        return (
          <SubjectBlock
            key={String(index)}
            opened={true}
            enableFadeIn={false}
            startAfter={0}
            name={getSubjectNameFromID(subject_id)}
            style={an ? {transform: [{translateY: an}]} : {}}
            user1_profile_image_url={
              props.user1 && props.user2
                ? BestOf.isUser1()
                  ? props.user2.profile_image_url
                  : props.user1.profile_image_url
                : ''
            }
            user2_profile_image_url={''}
          />
        );
      })}
      {commonUserSubjects.map((subject_id, index) => {
        let sT = subjectAnimations.filter(i => i.index === index + 'UCT');
        let sB = subjectAnimations.filter(i => i.index === 100 - index + 'UCB');
        let anT = null,
          anB = null;
        if (sT.length > 0) {
          anT = sT[0].value;
        }

        if (sB.length > 0) {
          anB = sB[0].value;
        }
        return (
          <View
            key={String(index)}
            style={[styles.subjectView, {backgroundColor: 'transparent'}]}>
            <SubjectBlock
              opened={true}
              enableFadeIn={true}
              startAfter={(index + 2.5) * 1000}
              name={getSubjectNameFromID(subject_id)}
              style={anT ? {transform: [{translateY: anT}]} : {}}
              user1_profile_image_url={
                props.user1 && props.user2
                  ? BestOf.isUser1()
                    ? props.user2.profile_image_url
                    : props.user1.profile_image_url
                  : ''
              }
              user2_profile_image_url={
                props.user1 && props.user2
                  ? BestOf.isUser1()
                    ? props.user1.profile_image_url
                    : props.user2.profile_image_url
                  : ''
              }
            />
            <SubjectBlock
              opened={true}
              enableFadeIn={true}
              startAfter={(index + 2.5) * 1000}
              name={getSubjectNameFromID(subject_id)}
              style={
                anB
                  ? {position: 'absolute', transform: [{translateY: anB}]}
                  : {position: 'absolute'}
              }
              user1_profile_image_url={
                props.user1 && props.user2
                  ? BestOf.isUser1()
                    ? props.user2.profile_image_url
                    : props.user1.profile_image_url
                  : ''
              }
              user2_profile_image_url={
                props.user1 && props.user2
                  ? BestOf.isUser1()
                    ? props.user1.profile_image_url
                    : props.user2.profile_image_url
                  : ''
              }
            />
          </View>
        );
      })}
      {bottomUserSubjects.map((subject_id, index) => {
        let s = subjectAnimations.filter(i => i.index === index + 'UB');
        let an = null;
        if (s.length > 0) {
          an = s[0].value;
        }
        return (
          <SubjectBlock
            key={String(index)}
            opened={true}
            enableFadeIn={false}
            startAfter={0}
            name={getSubjectNameFromID(subject_id)}
            style={an ? {transform: [{translateY: an}]} : {}}
            user1_profile_image_url={''}
            user2_profile_image_url={
              props.user1 && props.user2
                ? BestOf.isUser1()
                  ? props.user1.profile_image_url
                  : props.user2.profile_image_url
                : ''
            }
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10,
  },
  subjectView: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    margin: 5,
    zIndex: -200,
    elevation: -200,
  },
  subjectText: {
    fontFamily: constants.DEFAULT_FONT_MEDIUM,
    fontSize: 12,
    color: colors.BESTOF2.BG1,
    paddingVertical: 4,
    paddingHorizontal: 5,
    margin: 2,
    shadowColor: colors.lightGray,
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 1,
  },
});

export default SubjectsContainer;
