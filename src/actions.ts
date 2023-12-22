import { ActionTypes, TextBlock } from "./types";


export const setTexts = (texts: TextBlock[]) => ({
    type: ActionTypes.SET_TEXTS,
    payload: texts,
  });
  
  export const setTextToolActive = (isActive: boolean) => ({
    type: ActionTypes.SET_TEXT_TOOL_ACTIVE,
    payload: isActive,
  });