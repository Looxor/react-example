import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../rootNavigation/navigation.constants";
import { stackConfig } from "./MainTabNavigator";
import TestHome from "../../modules/Test/Views/Home";
import CourseOfStudy from "../../modules/Test/Views/CourseOfStudy";
import SelectUniversity from "../../modules/Test/Views/SelectUniversity";
import NewInstance from "../../modules/Test/Views/NewInstance";
import InstanceDetail from "../../modules/Test/Views/InstanceDetail";
import InstanceMenu from "../../modules/Test/Views/InstanceMenu";
import InstanceInfo from "../../modules/Test/Views/InstanceInfo";
import CodeReaderScreen from "../../modules/Settings/CodeReaderScreen";
import ActiveInstance from "../../modules/Test/Views/ActiveInstance";
import EndedResult from "../../modules/Test/Views/EndedResult";
import ResultHome from "../../modules/Test/Views/Result";
import ResultDetail from "../../modules/Test/Views/ResultDetail";
import ResultQuestion from "../../modules/Test/Views/ResultDetail/ResultQuestion";
import WalletMain from "../../modules/Wallet/Views/Main";
import WalletShop from "../../modules/Wallet/Views/Shop";

const TestStack = createStackNavigator();
const TestStackScreens = () => (
  <TestStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={stackConfig.defaultNavigationOptions}>
    <TestStack.Screen
      name={routes.TEST_HOME}
      component={TestHome}
      // @ts-ignore
      options={TestHome.navigationOptions}
    />
    <TestStack.Screen
      name={routes.TEST_COURSE_OF_STUDY}
      component={CourseOfStudy}
    />
    <TestStack.Screen
      name={routes.TEST_SELECT_UNIVERSITY}
      component={SelectUniversity}
    />
    <TestStack.Screen name={routes.TEST_NEW_INSTANCE} component={NewInstance} />
    <TestStack.Screen
      name={routes.TEST_INSTANCE_DETAIL}
      component={InstanceDetail}
    />
    <TestStack.Screen
      name={routes.TEST_INSTANCE_MENU}
      component={InstanceMenu}
    />
    <TestStack.Screen
      name={routes.TEST_INSTANCE_INFO}
      component={InstanceInfo}
    />
    <TestStack.Screen
      name={routes.TEST_CODE_READER}
      component={CodeReaderScreen}
      // @ts-ignore
      options={CodeReaderScreen.navigationOptions}
    />
    <TestStack.Screen
      name={routes.TEST_ACTIVE_INSTANCE}
      component={ActiveInstance}
    />
    <TestStack.Screen name={routes.TEST_ENDED_RESULT} component={EndedResult} />
    <TestStack.Screen name={routes.TEST_RESULT_HOME} component={ResultHome} />
    <TestStack.Screen
      name={routes.TEST_RESULT_DETAIL}
      component={ResultDetail}
    />
    <TestStack.Screen
      name={routes.TEST_RESULT_QUESTION}
      component={ResultQuestion}
    />
    <TestStack.Screen name={routes.WALLET_MAIN} component={WalletMain} />
    <TestStack.Screen name={routes.WALLET_SHOP} component={WalletShop} />
  </TestStack.Navigator>
);
export default TestStackScreens;
