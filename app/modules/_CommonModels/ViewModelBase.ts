import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReduxValue, setReduxValueWithKey } from "../../utils/redux/store";

class ViewModelBase {
  public props: any;
  public observableVariables: Array<string> = [];
  protected value: string = '';
  protected params: any;

  constructor() {
    this.params = {};
    this.observableVariables = [];
  }

  setUpdateMethod(updateView: any) {
    this.updateViewMethod = updateView;
  }

  setParams(params: any = {}) {
    this.params = params;
    this.props = params.props || {};
  }

  getParams() {
    return this.params;
  }

  public registerObservableVariables(variableName: any) {
    if (this.observableVariables.indexOf(variableName) === -1) {
      this.observableVariables.push(variableName);
    }
  }

  protected updateView = () => {
    this.updateViewMethod(+new Date());
  };

  protected updateViewMethod = (value: any) => {};

  protected onChangeVariable(callback: any, variables: any[] = []) {}

  protected componentDidMount() {}

  protected componentWillUnmount() {}
}

class Observable {
  static ObserveAction: any = {
    setValue: (key: any, value: any) => ({
      type: 'setObservableValue',
      key,
      value,
    }),
  };
  variableName: any;
  value: any;

  constructor(parent: ViewModelBase, variableName: string, defaultValue: any) {
    this.variableName = variableName;
    this.value = defaultValue;
    parent.registerObservableVariables(variableName);
  }

  // static
  static async setReduxValue(key: string, value: any = '') {
    await setReduxValueWithKey(Observable.ObserveAction.setValue, key, value);
  }

  // static
  static getReduxValue(key: string) {
    const reduxValue = getReduxValue('ObserveReducer') || {};
    return reduxValue[key];
  }

  static use(variableName: string, updateObservable: any) {
    const value = useSelector(
      (state: any) =>
        state && state.ObserveReducer && state.ObserveReducer[variableName],
    );
    value && updateObservable(value);
    return value;
  }

  public async setValue(value: any) {
    await setReduxValueWithKey(
      Observable.ObserveAction.setValue,
      this.variableName,
      value,
    );
  }

  public getValue() {
    return this.value;
  }
}

const useViewModel = (viewModel: any) => {
  return (params = {}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [view, updateView] = useState(0);
    viewModel.setParams(params);
    viewModel.setUpdateMethod(updateView);

    const observeValues = [];
    viewModel.observableVariables.map((obVariable: any) => {
      if (viewModel[obVariable]) {
        Observable.use(
          obVariable,
          (value: any) => (viewModel[obVariable].value = value),
        );
      }
      const observeValue = viewModel[obVariable].getValue();
      if (
        typeof observeValue === 'number' ||
        typeof observeValue === 'string'
      ) {
        observeValues.push(observeValue);
      }
    });

    const componentDidMount = () => {
      viewModel.componentDidMount();
      return componentWillUnmount;
    };
    const componentWillUnmount = () => {
      viewModel.componentWillUnmount();
    };
    const onChangeVariable = () => {
      viewModel.onChangeVariable();
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(componentDidMount, []);
    if (observeValues && observeValues.length > 0) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(onChangeVariable, observeValues);
    }
    return viewModel;
  };
};

const ObserveReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'setObservableValue':
      return {...state, [action.key]: action.value};
    default:
      return state;
  }
};

export {ViewModelBase, useViewModel, ObserveReducer, Observable};
