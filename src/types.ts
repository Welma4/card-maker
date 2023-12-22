export const ActionTypes = {
    SET_TEXTS: 'SET_TEXTS',
    SET_TEXT_TOOL_ACTIVE: 'SET_TEXT_TOOL_ACTIVE',
  };


export type Canvas = {
    name: string | undefined;
    color: Color;
    size: Size;
    filter: Filter;
    objects: Array<TextBlock | ImageBlock | ArtObjectBlock>;
    format: Format | undefined;
};

export type Char = {
    value: string;
    fontSize: number;
    fontFamily: string;
    color: Color;
    underlined: boolean;
    italics: boolean;
    bold: boolean;
};

export type Format = 'PNG' | 'JPEG'

export type Position = {
    x: number;
    y: number;
    z: number;
};

export type Size = {
    width: number;
    height: number;
};

export type Filter = {
    color: Color;
    opacity: number;
}

// export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple' | 'white' | 'black' | '#d9a8a8'
export type Color = string

export type Block = {
    id: number;
    position: Position;
    size: Size;
};

export type TextBlock = Block & {
    type: 'text';
    data: Array<string>;
    fontSize: number,
    fontFamily: string,
    color: string,
    underlined: boolean,
    italics: boolean,
    bold: boolean
};

export type ImageBlock = Block & {
    type: 'image';
    url: string;
};

export type ArtObjectBlock = Block & {
    type: 'art-object';
    object: ArtObjects;
    color: string;
};

export type ArtObjects = 'ellipse' | 'rectangle' | 'triangle' | 'star';

export type Doc = {
    page: Canvas;
}

export type ActionHistory = Array<Action>

export type Action = {
    id: number;
    action: string;
}

export type Template = {
    style: string;
    color: Color;
    size: Size;
}

export type ExportObject = {
    canvas: Canvas;
}

export type Fragment = {
    position: Position;
    size: number;
}
