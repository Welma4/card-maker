import { TextBlock } from "../../types";

export const setTexts = (texts: TextBlock[]) => ({
    type: 'SET_TEXTS',
    payload: texts
  });