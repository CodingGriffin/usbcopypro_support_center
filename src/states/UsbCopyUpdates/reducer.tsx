import actions from "./actions";

const initialState = {
  updates: [],
  updatable: {},
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.CHECK_UPDATES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.CHECK_UPDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        updatable: action.payload,
      };
    case actions.CHECK_UPDATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.ADD_DIAGNOSTIC:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.ADD_DIAGNOSTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actions.ADD_DIAGNOSTIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default Reducer;
