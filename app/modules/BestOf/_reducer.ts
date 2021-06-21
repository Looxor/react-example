import { SAVE_BESTOF_TO_HISTORY } from "./_actions";
import BestOfHistoryManager from "./Models/BestOfHistoryManager";

const initialState = {BestOfHistory: []};
export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_BESTOF_TO_HISTORY.SUCCESS:
      // return initialState;
      if (!state.BestOfHistory) {
        state.BestOfHistory = initialState.BestOfHistory;
      }
      BestOfHistoryManager.init(state.BestOfHistory);
      if (BestOfHistoryManager.doesNotContain(action.bestOf)) {
        return {
          ...state,
          BestOfHistory: state.BestOfHistory.concat(action.bestOf),
        };
      } else return state;
    default:
      return state;
  }
};
