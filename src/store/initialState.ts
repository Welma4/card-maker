const initialState = {
    texts: [],
    textToolActive: false,
    underlined: false,
    italics: false,
    bold: false,
    color: "#000000",
    canvasData: null,
    images: [],
    imageWidth: 250,
    imageHeight: 250,
    rectangles: [],
    rectangleToolActive: false,
    ellipses: [],
    ellipseToolActive: false,
    triangles: [],
    triangleToolActive: false,
    selectedObject: null,
    selectedValue: '12',
    selectedFamily: 'Oswald',
    showDialog: false,
    canvasSize: { width: 1200, height: 700 }
  };
  
  export default initialState;