import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig4BestOf } from "./MainTabNavigator";
import BestOfQuestionScreen from "../../modules/BestOfV2/QuestionScreen";
import MatchMakingScreenScreen from "../../modules/BestOfV2/MatchMakingScreen";
import BestOfMatchResultScreen from "../../modules/BestOfV2/MatchResultScreen";
import BestOfFinalResultScreen from "../../modules/BestOfV2/FinalResultScreen";
import BestOfHistoryScreen from "../../modules/BestOfV2/HistoryScreen";
import BestOfHistoryResultScreen from "../../modules/BestOfV2/HistoryResultScreen";
import BestOfHistoryFilterScreen from "../../modules/BestOfV2/HistoryFilterScreen";
import BestOfSummaryScreen from "../../modules/BestOfV2/SummaryScreen";
import BestOfChooseFacultyScreen from "../../modules/BestOfV2/Onboarding/ChooseFacultyScreen";
import BestOfChooseSubjectsScreen from "../../modules/BestOfV2/Onboarding/ChooseSubjectsScreen";
import BestOfFinalOnboardingScreen from "../../modules/BestOfV2/Onboarding/FinalOnboardingScreen";

const BestOfStack = createStackNavigator();
const BestOfStackScreens = () => (
  <BestOfStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig4BestOf.defaultNavigationOptions}>
    <BestOfStack.Screen
      name={routes.BESTOF2_QUESTION}
      component={BestOfQuestionScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_MATCHMAKING}
      component={MatchMakingScreenScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_MATCH_RESULT}
      component={BestOfMatchResultScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_FINAL_RESULT}
      component={BestOfFinalResultScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_HISTORY}
      component={BestOfHistoryScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_HISTORY_RESULT_SCREEN}
      component={BestOfHistoryResultScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_HISTORY_FILTER}
      component={BestOfHistoryFilterScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_SUMMARY}
      component={BestOfSummaryScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_CHOOSE_FACULTY}
      component={BestOfChooseFacultyScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_CHOOSE_SUBJECTS}
      component={BestOfChooseSubjectsScreen}
      options={{gestureEnabled: false}}
    />
    <BestOfStack.Screen
      name={routes.BESTOF2_FINAL_ONBOARDING_SCREEN}
      component={BestOfFinalOnboardingScreen}
      options={{gestureEnabled: false}}
    />
  </BestOfStack.Navigator>
);

export default BestOfStackScreens;
