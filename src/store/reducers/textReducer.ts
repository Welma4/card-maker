import initialState from "../initialState";

const textReducer = (state = initialState.texts, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'SET_TEXTS':
      return action.payload;
    // Другие case для текстовых блоков...
    default:
      return state;
  }
};

export default textReducer;



// import { TextBlock } from "../../types";

// interface TextBlockReducer extends TextBlock {
//     texts: TextBlock[],
//     textToolActive: boolean
// }

// const initialText: TextBlockReducer = {
//     texts: [],
//     textToolActive: false,
//     type: "text",
//     data: [""],
//     id: 0,
//     position: {x: 0, y: 0, z: 0},
//     size: {width: 100, height: 100},
//     underlined: false,
//     italics: false,
//     bold: false,
//     color: "#000000",
//     fontSize: 12,
//     fontFamily: 'Oswald'
// }

// const textsReducer = (state: TextBlockReducer = initialText, action: {type: string, payload: boolean}) => {
//     switch (action.type) {
//       case 'SET_TEXT_TOOL_ACTIVE':
//         return {
//           ...state,
//           textToolActive: action.payload
//         };
//       default:
//         return state;
//     }
//   };

// export default textsReducer