import React from "react";
import { Observable, useViewModel, ViewModelBase } from "../../../_CommonModels/ViewModelBase";
import TestManager, { TestCase, TestEvent } from "../_Common/TestManager";
import Wayback from "../../Models/Test/Wayback";
import CloneBlock from "../../Models/Test/CloneBlock";
import Block from "../../Models/_Common/Block";
import { CallServerPromise } from "../../../../utils/app/CallServer";
import showError, { ERROR_TYPE } from "../../CommonFunctions/showError";
import Subject from "../../Models/_Common/Subject";
import { setReduxValueWithKey } from "../../../../utils/redux/store";
import Scoring from "../../Models/_Common/Scoring";
import { delay } from "../../../../utils/misc/Timer";
import { refreshTotalCoins } from "../../../Home/HomeScreen";
import CreateTestAlreadyBoughtPullView from "../../Views/InstanceDetail/Components/CreateTestAlreadyBoughtPullView";

class InstanceDetailViewModel extends ViewModelBase {
  test_id: string = '';
  wayback: Wayback;
  university_major_name: string = '';
  wayback_name: string = '';
  wayback_number: number = 0;
  title: string = '';
  desc_minutes: number;
  notes: string = '';
  blocksListData: Array<any> = [];
  creating: boolean = false;
  price: string;
  test_case: number;
  type: string;
  test_name: string;
  enough: boolean;
  total_coins: Observable;

  constructor() {
    super();
    this.total_coins = new Observable(this, 'total_coins', 0);
  }

  init() {
    const test = this.props.navigation.getParam('test');
    this.test_id = test.getTestId();
    // this.title = test.getName() || '';
    this.title = test.clone_name.replace(
      '{index}',
      String(this.wayback_number + 1),
    );
    this.university_major_name = `${test.getUniversityName()} - ${test.getMajorName()}`;
    this.desc_minutes = test.getTimeoutOfCloneBlocks().inMinutes();
    this.notes = test.getCloneNotes();
    this.blocksListData = this.getCloneBlocksData(test);
    this.price = String(test.clone_price);
    this.wayback = null;
    this.type = 'clone';
    this.test_name = test.name;
    this.enough = +this.total_coins.getValue() >= test.clone_price;
  }

  initWithWayback(wayback) {
    const test = this.props.navigation.getParam('test');
    this.test_id = test.getTestId();
    this.wayback = wayback;
    this.wayback_name = wayback.getName();
    this.wayback_number = wayback.getWaybackNumber();
    // this.title = test.clone_name.replace('{index}', String(this.wayback_number + 1));
    this.title = wayback.getName();
    this.university_major_name = `${test.getUniversityName()} - ${test.getMajorName()}`;
    this.desc_minutes = wayback.getTimeoutOfBlocks().inMinutes();
    this.notes = wayback.notes;
    this.blocksListData = this.getWaybackBlocksData();
    this.price = String(wayback.price);
    this.type = 'wayback';
    this.test_name = test.name;
    this.enough = +this.total_coins.getValue() >= wayback.price;
  }

  getWaybackBlocksData() {
    return (this.wayback.getBlocks() || []).map((block: Block) => {
      const minutes = block.timeout.inMinutes();
      const subItems = (block.getQuestionsBySubjectName() || []).map(
        (subject: Subject) => {
          const {subject_name, topic_name} = subject;
          const number_of_questions = subject.getNumberOfQuestions();
          const questionTexts = subject.getQuestionTexts();
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

  getCloneBlocksData(test) {
    return (test.getCloneBlocks() || []).map((cloneBlock: CloneBlock) => {
      const minutes = cloneBlock.timeout.inMinutes();
      const subItems = cloneBlock.getExtractionGuidelinesGroupedBySubjectName();

      const scoring = cloneBlock.scoring;
      const correct_answer = Scoring.withSign(scoring.correct);
      const wrong_answer = Scoring.withSign(scoring.wrong);
      const no_answer = Scoring.withSign(scoring.no_answer);

      return {minutes, subItems, correct_answer, wrong_answer, no_answer};
    });
  }

  async onPressCreateButton(navigation, type, tn) {
    const handleCaughtError = async error => {
      if (error == 'wayback already bought') {
        await CreateTestAlreadyBoughtPullView().show();
        //await showError(ERROR_TYPE.ERROR_ALREADY_BOUGHT);
      } else {
        await showError(ERROR_TYPE.ERROR_WHILE_SAVING_DATA);
      }
      this.creating = false;
      this.updateView();
    };
    const handleKnownError = async (error = '') => {
      if (error == 'wayback already bought') {
        await CreateTestAlreadyBoughtPullView().show();
        //await showError(ERROR_TYPE.ERROR_ALREADY_BOUGHT);
      } else {
        await showError(ERROR_TYPE.ERROR_WHILE_SAVING_DATA);
      }
      this.creating = false;
      this.updateView();
    };

    try {
      const test_id = this.test_id,
        wayback_number = this.wayback_number;
      this.creating = true;
      this.updateView();
      const request: any = await CallServerPromise.buy_test_instance({
        test_id,
        type,
        ...(type === 'wayback' && {wayback_number}),
      });
      await delay(1000);
      if (request.success) {
        const test_instance_id = request.data.test_instance_id;
        const test_name =
          request.data.test_name != undefined ? request.data.test_name : tn;
        try {
          const request: any =
            await CallServerPromise.get_bought_test_instances();
          refreshTotalCoins();
          if (request.success) {
            if (request.data) {
              await setReduxValueWithKey(
                Observable.ObserveAction.setValue,
                'test_instances',
                request.data,
              );
            }
            if (TestManager.test_case === TestCase.FIRST) {
              navigation.pop(4);
              navigation.goBack(null);
              TestManager.emitEvent(TestEvent.onCreatedTestInstance, {
                test_name,
              });
            } else if (TestManager.test_case === TestCase.NOT_FIRST) {
              navigation.pop(2);
              TestManager.emitEvent(TestEvent.onCreatedTestInstance, {
                test_instance_id,
              });
            }
          } else {
            await handleKnownError(request.error);
          }
        } catch (error) {
          await handleCaughtError(error);
        }
      } else {
        await handleKnownError(request.error);
      }
    } catch (error) {
      await handleCaughtError(error);
    }
  }

  onCreating() {
    return this.creating;
  }

  componentDidMount() {
    const props = this.params.props;
    const wayback: Wayback = props.navigation.getParam('wayback');
    if (wayback) {
      this.initWithWayback(wayback);
    } else {
      this.init();
    }
    refreshTotalCoins().then(r => r);
    this.test_case = TestManager.test_case;
    this.creating = false;
    this.updateView();
  }
}

export default useViewModel(new InstanceDetailViewModel());
