import type { AppState } from "../interfaces/appStateInterface";
import { SET_REGISTERUSER, type ActionTypes } from "../types/actionTypes";

export const appReducer = (state: AppState, action: ActionTypes): AppState => {
  switch (action.type) {
    case SET_REGISTERUSER:
      return { ...state, registerUser: action.payload };
    default:
      return state;
  }
};
