import { CommonActions, NavigationState, StackActions } from "@react-navigation/native";

let _navigator;

const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

const getNavigation = () => {
  return _navigator;
};

const navigate = (routeName, params = {}) => {
  _navigator.dispatch(CommonActions.navigate(routeName, params));
};

const goBack = () => {
  _navigator.dispatch(CommonActions.goBack());
};

const _getActiveRouteState = function (
  route: NavigationState,
): NavigationState {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[
    route.index
  ] as unknown as NavigationState;
  return _getActiveRouteState(childActiveRoute);
};

const getActiveRouteName = () => {
  return (_getActiveRouteState(_navigator.state.nav) || {})['routeName'];
};

const reset = (params = null) => {
  _navigator.dispatch(CommonActions.reset(params));
};
const replace = (routeName, params = {}) => {
  _navigator.dispatch(StackActions.replace(routeName, params));
};
const popToTop = () => {
  _navigator.dispatch(StackActions.popToTop());
};

export default {
  setTopLevelNavigator,
  getNavigation,
  getActiveRouteName,
  navigate,
  goBack,
  reset,
  replace,
  popToTop,
};
