import {Canvas, Size, ActionHistory, CanceledActions, Doc } from './types'

const size: Size = {
    width: 1280,
    height: 800
}

const canvas: Canvas = {
    name: 'nameless',
    color: 'white',
    size: size,
    filter: null,
    objects: [],
    format: 'PNG'
}

const ActHistory: ActionHistory = []
const CanceledAct: CanceledActions = []

const doc: Doc = {
    page: canvas
}