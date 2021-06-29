import { DISABLE_ALERT, ENABLE_ALERT, SET_ALERT } from "../actions/alert";

const initialState = {
  alertEnabledStocks: {},
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_ALERT:
      state.alertEnabledStocks[action.stockId] = {
        stockId: action.stockId,
        priceTarget: action.priceTarget,
        volumeTarget: action.volumeTarget,
      };
      return state;
    case DISABLE_ALERT:
      return state;
    case SET_ALERT:
      return { alertEnabledStocks: action.alerts };
    default:
      return initialState;
  }
};

export default alertReducer;
