import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Badge } from "react-native-elements";
import { Image, View } from "react-native";
import { colors } from "../../config";
import { routes } from "../rootNavigation/navigation.constants";
import HomeScreen from "../../modules/Home";
import BestOfHomeScreen from "../../modules/BestOfV2/HomeScreen/HomeScreen";
import { Observable } from "../../modules/_CommonModels/ViewModelBase";
import CouponsHomeV2Screen from "../../modules/Benefits/Views/Home";
import CircularBottomBar from "../../components/CircularBottomBar";
import { createStackNavigator } from "@react-navigation/stack";
import HomeCircularTopBar from "../../components/HomeCircularTopBar";
import standardFunctions from "../../utils/app/StandardFunctions";

interface BadgeProps {
  section: any;
}

interface BadgeState {
  already_verified: any;
  badge_text: string;
  badge_color: string;
  section: any;
}

export class RenderBadges extends React.Component<BadgeProps, BadgeState> {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.state = {
      already_verified: false,
      badge_text: '',
      badge_color: '',
      section: this.props.section,
    };
  }

  verify_notifications = () => {
    if (this.state.already_verified) {
      return;
    }
    this.setState({already_verified: true});

    if (this.state.section === 1) {
      // Verify BestOfs Notifications
    } else if (this.state.section === 3) {
      // Add "New" badge
      /*
        this.setState({
          badge_text: 'Novità',
          badge_color: colors.TEST.DEFAULT,
        });
       */
    }
  };

  componentDidMount() {
    this.verify_notifications();
  }

  render() {
    return (
      this.state.badge_text !== '' && (
        <Badge
          value={this.state.badge_text}
          textStyle={
            {
              //fontFamily: constants.DEFAULT_FONT,
              // fontSize: 10
            }
          }
          badgeStyle={{
            backgroundColor: this.state.badge_color,
            marginTop: 16,
            marginRight: -18,
          }}
          containerStyle={{position: 'absolute', top: -4, right: -4}}
        />
      )
    );
  }
}

const icon_width = 50,
  icon_height = 50;
const TabBarIcon = props => (
  <View
    testID={props.testID}
    style={[
      false &&
        props.focused && {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.DEFAULT_BACKGROUND,
          width: 80,
          height: 78,
          borderRadius: 40,
        },
    ]}>
    <Image
      resizeMode={'contain'}
      source={props.source}
      style={{
        width: props.focused ? icon_width : 42,
        height: props.focused ? icon_height : 42,
      }}
    />
    <RenderBadges section={props.section_number} />
  </View>
);

const BottomTab = createBottomTabNavigator();
const BottomTabs = () => (
  <BottomTab.Navigator
    tabBar={props => <CircularBottomBar {...props} />}
    tabBarOptions={{
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#999',
      activeTintColor: colors.THEFACULTY,
      style: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: 'transparent',
        height: 60,
        borderWidth: 0,
        borderTopWidth: 0,
      },
    }}>
    <BottomTab.Screen
      name={routes.HOME}
      component={HomeScreen}
      listeners={{
        tabPress:()=>{
          standardFunctions.play_tap_sound();
        }
      }}
      options={{
        tabBarLabel: ({focused}) => null,
        tabBarIcon: ({focused}) =>
          focused ? (
            <TabBarIcon
              section_number={0}
              focused={focused}
              source={require('../../../assets/images/icons/icn_bottom_home_new.png')}
            />
          ) : (
            <TabBarIcon
              section_number={0}
              focused={focused}
              source={require('../../../assets/images/icons/icn_bottom_home_new_disabled.png')}
            />
          ),
      }}
    />

    <BottomTab.Screen
      name={routes.BESTOF}
      component={BestOfHomeScreen}
      listeners={{
        tabPress: async e => {
          standardFunctions.play_tap_sound();
          await Observable.setReduxValue('BottomTabBestOfPressed', true);
          e.preventDefault();
        },
      }}
      options={{
        tabBarLabel: ({focused}) => null,
        tabBarIcon: ({focused}) =>
          focused ? (
            <TabBarIcon
              section_number={1}
              focused={focused}
              source={require('../../../assets/images/icons/icn_bottom_bestofs_new.png')}
            />
          ) : (
            <TabBarIcon
              section_number={1}
              focused={focused}
              source={require('../../../assets/images/icons/icn_bottom_bestofs_new_disabled.png')}
            />
          ),
      }}
    />

    <BottomTab.Screen
      name={routes.COUPONS}
      component={CouponsHomeV2Screen}
      listeners={{
        tabPress: e => {
          standardFunctions.play_tap_sound();
          // @ts-ignore
          global.couponsSelectedFlag = true;
        },
      }}
      options={{
        tabBarLabel: ({focused}) => null,
        tabBarIcon: ({focused}) =>
          focused ? (
            <TabBarIcon
              testID={'couponsTabBarIconFocused'}
              section_number={2}
              focused={focused}
              source={require('../../../assets/images/icons/icn_bottom_benefits_new.png')}
            />
          ) : (
            <TabBarIcon
              testID={'couponsTabBarIconUnFocused'}
              section_number={2}
              focused={focused}
              source={require('../../../assets/images/icons/icn_bottom_benefits_new_disabled.png')}
            />
          ),
      }}
    />
  </BottomTab.Navigator>
);
const TabStack = createStackNavigator();
const TabStackNavigator = () => (
  <TabStack.Navigator
    headerMode={'screen'}
    // @ts-ignore
    screenOptions={({navigation}) => {
      return {
        header: () => <HomeCircularTopBar navigation={navigation} />,
        /*
        headerLeft: <UserImageTopBar navigation={navigation}/>,
        headerRight:
        // @ts-ignore
          navigation && navigation._childrenNavigation ? (
            // @ts-ignore
            navigation._childrenNavigation.BestOf.isFocused() ? (
                <TopBarRightButtons4BestOf/>
              )
              // @ts-ignore
              : navigation._childrenNavigation.Benefits.isFocused() ? (
                <TopBarRightButtons4Coupons navigation={navigation}/>
              ) : (
                // ) : navigation._childrenNavigation.Contest.isFocused() ? (
                //   <TopBarRightButtons4Contest navigation={navigation} />
                <TopBarRightButtons/>
              )
          ) : (
            <TopBarRightButtons/>
          ),
         */
        headerStyle: {
          backgroundColor: colors.WHITE,
        },
      };
    }}>
    <TabStack.Screen name={'TabStackScreen'} component={BottomTabs} />
  </TabStack.Navigator>
);
export default TabStackNavigator;
