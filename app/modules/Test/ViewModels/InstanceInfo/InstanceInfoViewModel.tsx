import React from "react";
import { useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import Block from "../../Models/_Common/Block";
import { routes } from "../../../../navigation/rootNavigation/navigation.constants";
import TestInstanceManager from "../_Common/TestInstanceManager";
import showError, { ERROR_TYPE } from "../../CommonFunctions/showError";
import { ActivityIndicator } from "react-native";
import { Overlay } from "teaset";
import { colors, strings } from "../../../../config";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import Subject from "../../Models/_Common/Subject";
import Strings from "../../../../utils/misc/TextComponents";
import TestInstance from "../../Models/TestInstance";
import Scoring from "../../Models/_Common/Scoring";
import { DEFAULT_SIMULATION_STATUS, showSimulationStatus } from "../CheckActiveSimulation/CheckActiveSimulation";
import standardFunctions from "../../../../utils/app/StandardFunctions";
import SimulationPolling from "../../CommonFunctions/SimulationPolling";

let OverlayOnQRCodeScreen = (
  <Overlay.View
    style={{alignItems: 'center', justifyContent: 'center'}}
    modal={true}
    overlayOpacity={0.7}>
    <ActivityIndicator size={30} color={colors.WHITE} />
  </Overlay.View>
);

class InstanceInfoViewModel extends ViewModelBase {
  test_instance: TestInstance;
  type: string;

  university_major_name: string = '';
  title: string = '';
  desc_minutes: number;
  desc_notes: string = '';
  blocksListData: Array<any> = [];

  constructor() {
    super();
  }

  getBlocksData() {
    return (this.test_instance.blocks || []).map((block: Block) => {
      const minutes = block.timeout.inMinutes();
      const subItems = (block.getQuestionsBySubjectName() || []).map(
        (subject: Subject) => {
          const {subject_name, topic_name} = subject;
          const number_of_questions = subject.getNumberOfQuestions(),
            questionTexts = subject.getQuestionTexts();
          return {subject_name, topic_name, number_of_questions, questionTexts};
        },
      );

      const scoring = block.scoring;

      const correct_answer = Scoring.withSign(scoring.correct);
      const wrong_answer = Scoring.withSign(scoring.wrong);
      const no_answer = Scoring.withSign(scoring.no_answer);

      return {minutes, subItems, correct_answer, wrong_answer, no_answer};
    });
  }

  onPressContinueButton(navigation) {
    const onReadCodeWithNavigation = async (code, navigation2) => {
      console.log('onReadCodeWithNavigation', code);
      let is_correct_code = code.startsWith('https://tfly.app/9znhq?uuid=');
      if (!is_correct_code) {
        standardFunctions.show_alert(
          strings.OTHER.WARNING,
          strings.TEST.INSTANCE_DETAIL.QRCODE_NOT_VALID,
        );
        return;
      }
      let overlayId = Overlay.show(OverlayOnQRCodeScreen);
      try {
        const instance_id = this.test_instance.getInstanceId();
        const request: any = await CallServerPromise.start_simulation(
          instance_id,
          code,
        );

        if (request.success) {
          overlayId && Overlay.hide(overlayId);
          const simulation_id = request.data.simulation_id;
          TestInstanceManager.setData('simulation_id', simulation_id);
          const simulationStatus = {
            ...DEFAULT_SIMULATION_STATUS,
            running: true,
            simulation_id,
            start_date: new Date().toISOString(),
          };
          await showSimulationStatus(simulationStatus);
          SimulationPolling.setSimulationStatus(simulationStatus);
          SimulationPolling.start();
          navigation2.replace(routes.TEST_ACTIVE_INSTANCE);
          // navigation2.dispatch(
          //     NavigationActions.navigate({
          //       routeName: routes.TEST_NAVIGATOR,
          //       action: NavigationActions.navigate({
          //         routeName: routes.TEST_ACTIVE_INSTANCE,
          //         params: {
          //           simulation_id: simulation_id
          //         }
          //       })
          //     })
          // );
        } else {
          // overlayId && Overlay.hide(overlayId)
          // const simulation_id = 'simulation_id_1simulati1';
          // TestInstanceManager.setData('simulation_id', simulation_id);
          // navigation2.replace(routes.TEST_ACTIVE_INSTANCE);
          let selexi_error = strings.TEST.ERROR_SELEXI_SERVER;
          let simulation_already_running =
            strings.TEST.ERROR_SIMULATION_ALREADY_RUNNING;
          let error_message =
            request.error === 'selexi server error'
              ? selexi_error
              : request.error === 'a simulation is already running'
              ? simulation_already_running
              : Strings.humanize(request.error || '');
          await showError(ERROR_TYPE.ERROR_STARTING_SIMULATION, error_message);
          overlayId && Overlay.hide(overlayId);
          // navigation2.goBack(null);
          console.log('request to scan qr code', request);
        }
      } catch (error) {
        console.log('error', error);
        await showError(ERROR_TYPE.ERROR_UNKNOWN);
        overlayId && Overlay.hide(overlayId);
      }
    };
    // @ts-ignore
    global.navigationData = {
      onReadCodeWithNavigation,
    };
    navigation.navigate(routes.TEST_CODE_READER, {
      is_qrcode: true,
      isForTestSection: true,
    });
  }

  componentDidMount() {
    this.test_instance = new TestInstance(this.params.test_instance);
    this.type = this.test_instance.type;
    this.title = this.test_instance.name;
    this.university_major_name = `${this.test_instance.test_university_name} - ${this.test_instance.test_major_name}`;
    this.desc_minutes = this.test_instance.getTimeoutOfBlocks().inMinutes();
    this.desc_notes = this.test_instance.notes;
    this.blocksListData = this.getBlocksData();
    this.updateView();
  }
}

export default useViewModel(new InstanceInfoViewModel());
