import { Observable, useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import { setReduxValueWithKey } from "../../../../utils/redux/store";

const DEFAULT_SIMULATION_STATUS = {
  running: false,
  simulation_id: '',
  start_date: '',
  test_value: '',
};

const getActiveSimulation = async () => {
  let simulationStatus = {...DEFAULT_SIMULATION_STATUS};
  try {
    const request = await CallServerPromise.get_active_simulation();
    if (request.success && request.data) {
      if (request.data.simulation_id) {
        simulationStatus = {
          running: true,
          simulation_id: request.data.simulation_id,
          start_date: request.data.start_date,
          test_value: '',
        };
      } else {
        simulationStatus.running = false;
        simulationStatus.test_value = String(Math.random());
      }
      return simulationStatus;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

class CheckActiveSimulationViewModel extends ViewModelBase {
  running: boolean;
  interval: any;
  ActiveSimulationStatus: Observable;

  constructor() {
    super();
    this.running = false;
    this.ActiveSimulationStatus = new Observable(
      this,
      'ActiveSimulationStatus',
      DEFAULT_SIMULATION_STATUS,
    );
  }

  componentDidMount() {
    // if (!this.running) this.run();
  }

  componentWillUnmount() {}
}

const getSimulationStatus = () => {
  return Observable.getReduxValue('ActiveSimulationStatus');
};

const setSimulationStatus = async (simulationStatus = {}) => {
  const _simulationStatus = {
    ...DEFAULT_SIMULATION_STATUS,
    ...simulationStatus,
  };
  await setReduxValueWithKey(
    Observable.ObserveAction.setValue,
    'ActiveSimulationStatus',
    _simulationStatus,
  );
};

const hideSimulationStatus = async () => {
  const simulationStatus = {
    ...DEFAULT_SIMULATION_STATUS,
    running: false,
    simulation_id: '',
  };
  await setSimulationStatus(simulationStatus);
};

const showSimulationStatus = async (simulationStatus = {}) => {
  await setSimulationStatus(simulationStatus);
};

export default useViewModel(new CheckActiveSimulationViewModel());
export {
  DEFAULT_SIMULATION_STATUS,
  hideSimulationStatus,
  showSimulationStatus,
  getActiveSimulation,
  setSimulationStatus,
  getSimulationStatus,
};
