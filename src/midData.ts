import { Canvas, Size, ActionHistory, Doc, Action, Char, Position, Block, TextBlock, Color, Filter } from './types'

const canvSize: Size = {
    width: 1280,
    height: 800
}

const text1Pos: Position = {
    x: 20,
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
    color: 'black',
    underlined: false,
    italics: false,
    bold: false
}

const nullFilter: Filter = {
    color: 'white',
    opacity: 0
}

const canvas: Canvas = {
    name: 'nameless',
    size: canvSize,
    filter: nullFilter,
    objects: [textBlock1],
    format: 'PNG'
}

const act1: Action = {
    id: 1,
    action: 'addPic'
}

const act2: Action = {
    id: 2,
    action: 'addText'
}

const act3: Action = {
    id: 3,
    action: 'delPic'
}

const ActHistory: ActionHistory = [act1, act2, act3]

const doc: Doc = {
    page: canvas
}