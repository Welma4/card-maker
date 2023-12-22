import { SET_TEXTS, SET_TEXT_TOOL_ACTIVE } from '../actions/actions';

const initialState = {
  texts: [],
  textToolActive: false,
};

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
      case SET_TEXTS:
        return { ...state, texts: action.texts };
      case SET_TEXT_TOOL_ACTIVE:
        return { ...state, textToolActive: action.active };
      default:
        return state;
    }
  }
  
  export default rootReducer;