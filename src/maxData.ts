import { Canvas, Size, ActionHistory, Doc, Action, Position, Block, TextBlock, ArtObjectBlock, ArtObjects, Color, ImageBlock, Filter } from './types'

const canvSize: Size = {
    width: 1580,
    height: 880
}

const filter: Filter =
{
    color: 'white',
    opacity: 0.5
}

const text1Pos: Position = {
    x: 220,
    y: 50,
    z: 0
}

const text1Size: Size = {
    width: 60,
    height: 20
}

const text1: Block = {
    id: 1,
    position: text1Pos,
    size: text1Size
}

const textBlock1: TextBlock = {
    ...text1,
    type: 'text',
    data: ["ASASDDSADSA", "TEXT"],
    fontSize: 18,
    fontFamily: 'Georgia',
    color: 'green',
    underlined: false,
    italics: false,
    bold: false
}


const ellipse: ArtObjects = 'ellipse'

const ellipsePos: Position = {
    x: 100,
    y: 100,
    z: 0
}

const ellipseSize: Size = {
    width: 30,
    height: 30
}

const ellipseColor: Color = 'green'

const ellipseArt: Block = {
    id: 2,
    position: ellipsePos,
    size: ellipseSize
}

const ellipseBlock: ArtObjectBlock = {
    ...ellipseArt,
    type: 'art-object',
    object: ellipse,
    color: ellipseColor
}

const rectangle: ArtObjects = 'rectangle'

const rectanglePos: Position = {
    x: 122,
    y: 255,
    z: 0
}

const rectangleSize: Size = {
    width: 170,
    height: 155
}

const rectangleColor: Color = 'blue'

const rectangleArt: Block = {
    id: 3,
    position: rectanglePos,
    size: rectangleSize
}

const rectangleBlock: ArtObjectBlock = {
    ...rectangleArt,
    type: 'art-object',
    object: rectangle,
    color: rectangleColor
}

const triangle: ArtObjects = 'triangle'

const trianglePos: Position = {
    x: 140,
    y: 150,
    z: 0
}

const triangleSize: Size = {
    width: 240,
    height: 35
}

const triangleColor: Color = 'black'

const triangleArt: Block = {
    id: 4,
    position: trianglePos,
    size: triangleSize
}

const triangleBlock: ArtObjectBlock = {
    ...triangleArt,
    type: 'art-object',
    object: triangle,
    color: triangleColor
}

const image1Pos: Position = {
    x: 16,
    y: 224,
    z: 1
};

const image1Size: Size = {
    width: 900,
    height: 600
};

const image1: Block = {
    id: 5,
    position: image1Pos,
    size: image1Size
};

export const image1Block: ImageBlock = {
    ...image1,
    type: 'image',
    url: 'IMG_2582.png'
};


const addText: Action = {
    id: 1,
    action: 'addText'
}

const addEllipse: Action = {
    id: 2,
    action: 'addEllipse'
}

const addRectangle: Action = {
    id: 3,
    action: 'addRectangle'
}
const addTriangle: Action = {
    id: 4,
    action: 'addTriangle'
}
const addImage: Action = {
    id: 5,
    action: 'addImage'
}
const changeTextColor: Action = {
    id: 6,
    action: 'changeTextColor'
}
const changeEllipseColor: Action = {
    id: 7,
    action: 'changeEllipseColor'
}
const changeRectangleColor: Action = {
    id: 8,
    action: 'changeRectangleColor'
}
const changeTrianglecolor: Action = {
    id: 9,
    action: 'changeTrianglecolor'
}
const makeTextBold: Action = {
    id: 10,
    action: 'makeTextBold'
}
const makeTextItalics: Action = {
    id: 11,
    action: 'makeTextItalics'
}
const makeTextUnderlined: Action = {
    id: 12,
    action: 'makeTextUnderlined'
}
const changeTextFontFamily: Action = {
    id: 13,
    action: 'changeTextFontFamily'
}
const changeTextFontSize: Action = {
    id: 14,
    action: 'changeTextFontSize'
}

const delImage: Action = {
    id: 15,
    action: 'delImage'
}
const delTriangle: Action = {
    id: 16,
    action: 'delTriangle'
}


const ActHistory: ActionHistory = [addText, addEllipse, addRectangle, addTriangle, changeTextColor, changeEllipseColor, changeRectangleColor, changeTrianglecolor, makeTextBold, makeTextItalics, makeTextUnderlined, changeTextFontFamily, changeTextFontSize, delImage, delTriangle]

const canvas: Canvas = {
    name: 'nameless',
    color: 'white',
    size: canvSize,
    filter: filter,
    objects: [textBlock1, ellipseBlock, rectangleBlock, triangleBlock, image1Block],
    format: 'PNG'
}

export const doc: Doc = {
    page: canvas
}