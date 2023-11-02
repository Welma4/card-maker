import {Canvas, Size, ActionHistory, Doc, Filter } from './types'

const size: Size = {
    width: 1280,
    height: 800
}

const nullFilter: Filter = {
    color: 'white',
    opacity: 0
}

const canvas: Canvas = {
    name: 'nameless',
    color: 'white',
    size: size,
    filter: nullFilter,
    objects: [],
    format: 'PNG'
}

const ActHistory: ActionHistory = []

const doc: Doc = {
    page: canvas
}