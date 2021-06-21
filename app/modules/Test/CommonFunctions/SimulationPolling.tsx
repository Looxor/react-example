import { CallServerPromise } from "../../../utils/app/CallServer";
import { getSimulationStatus, setSimulationStatus } from "../ViewModels/CheckActiveSimulation/CheckActiveSimulation";
import Simulation from "../Models/Simulation";
import { gotoEndedResultScreenWithSimulation } from "../../../utils/app/PushNotification";

const POLLING_INTERVAL = 1000 * 5;

class SimulationPolling {
  timerId: any;
  lastShownSimulationId: string;
  simulationStatus: any;

  constructor() {
    this.timerId = 0;
    this.lastShownSimulationId = '';
    this.simulationStatus = null;
  }

  refreshSimulationStatus() {
    this.setSimulationStatus(getSimulationStatus());
  }

  setSimulationStatus(simulationStatus) {
    this.simulationStatus = simulationStatus;
  }

  resume() {
    const simulationStatus: any = getSimulationStatus();
    console.log('resumeStartedSimulation', simulationStatus);
    if (simulationStatus && simulationStatus.simulation_id) {
      this.setSimulationStatus(simulationStatus);
      this.start();
    }
  }

  start() {
    this.stop();
    this.timerId = setInterval(async () => {
      console.log('const simulationStatus = await this.getActiveSimulation();');
      const request = await CallServerPromise.get_simulations_filtered({
        simulation_id: this.simulationStatus.simulation_id,
      });
      if (request.success) {
        if (request.data && request.data.length > 0) {
          const simulation = new Simulation(request.data[0]);
          const ended = simulation.active === false;
          const successful_ended =
            ended &&
            !simulation.force_terminated === true &&
            !simulation.auto_terminated;
          if (ended) {
            await setSimulationStatus({simulation_id: ''});
            this.refreshSimulationStatus();
            this.stop();
          }
          if (successful_ended) {
            gotoEndedResultScreenWithSimulation(simulation);
          }
        } else if (request.data && request.data.length === 0) {
          await setSimulationStatus({simulation_id: ''});
          this.refreshSimulationStatus();
        }
      }
    }, POLLING_INTERVAL);
  }

  stop() {
    clearInterval(this.timerId);
  }
}

export default new SimulationPolling();
