import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useCheckActiveSimulation from "../ViewModels/CheckActiveSimulation";
import { colors, constants, strings } from "../../../config";
import { StandardBoxWithComponent } from "../../../components";
import { CommonActions as NavigationActions, useNavigation } from "@react-navigation/native";
import { routes } from "../../../navigation/rootNavigation/navigation.constants";

const CheckActiveSimulation = props => {
  const navigation = useNavigation();
  const {componentName} = props;
  if (!componentName) return null;

  const view = useCheckActiveSimulation({componentName});
  const status = view.ActiveSimulationStatus.getValue();

  const onTerminate = simulation_id => {
    if (simulation_id === status.simulation_id) {
      view.checkActiveSimulation();
    }
  };

  const pressActiveBarHandler = () => {
    // MISSING
    NavigationActions.navigate(routes.TEST_NAVIGATOR, {
      screen: routes.TEST_ACTIVE_INSTANCE,
      params: {
        simulation_id: status.simulation_id,
        onTerminate,
      },
    });
  };

  return status.running ? (
    <TouchableOpacity activeOpacity={0.6} onPress={pressActiveBarHandler}>
      <StandardBoxWithComponent
        background_start_color={colors.primaryGradientStart}
        background_finish_color={colors.primaryGradientEnd}
        viewStyle={styles.headerBox}>
        <View style={styles.headerCircle} />
        <Text style={styles.headerBoxText}>
          {strings.TEST.ACTIVE_SIMULATION.CAPTION}
        </Text>
      </StandardBoxWithComponent>
    </TouchableOpacity>
  ) : null;
  // <Text>{status.test_value}</Text>;
};

const styles = StyleSheet.create({
  headerBox: {
    width: '100%',
    height: 35,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderRadius: 0,
    padding: 5,
    margin: 0,
    flexDirection: 'row',
  },
  headerCircle: {
    width: 12,
    height: 12,
    borderRadius: 7.5,
    backgroundColor: colors.green,
    marginRight: 10,
  },
  headerBoxText: {
    fontSize: 14,
    color: colors.WHITE,
    fontFamily: constants.DEFAULT_FONT,
  },
});

export default CheckActiveSimulation;
