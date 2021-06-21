import { createAction, createTypes } from "../../utils/redux/actions";

const SAVE_BESTOF_TO_HISTORY = createTypes('THEFACULTY_SAVE_BESTOF_TO_HISTORY');

const saveBestOfToHistory = bestOf => {
  return dispatch => {
    const saveAction = {
      success: createAction(SAVE_BESTOF_TO_HISTORY.SUCCESS, {bestOf}),
    };
    dispatch(saveAction.success);
  };
};

export {SAVE_BESTOF_TO_HISTORY, saveBestOfToHistory};
