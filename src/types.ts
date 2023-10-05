type Canvas = {
    color: string;
    size: number;
    filter: Filter;
    objects: Array<TextBlock|ImageBlock|ArtObjectBlock>
}

type Char = {
    value: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    bold: boolean;
};

type Position = {
   x: number;
   y: number;
};

type Size = {
   width: number;
   height: number;
}

type Filter = 'grey' | 'red' | 'blue' | 'green' | null
 
type Block = {
    id: string;
    position: Position;
    size: Size;
};

type TextBlock = Block & {
   type: 'text';
   data: Array<Char>;
};

type ImageBlock = Block & {
   type: 'image';
   data: string;
};

type ArtObjectBlock = Block & {
   type: 'art-object';
   object: ArtObjects;
   color: string;
};

type ArtObjects = 'ellipse' | 'rectangle' | 'triangle' | 'cirlce' | 'star';
 
type Doc = {
    page: Canvas;
}

type ActionHistory = Array<Action>

type Action = {
    action: string;
}

type Template = {
    style: string;
    size: Size;
}

type ExportObject = {
    canvas: Canvas;
}

type Fragment = {
    position: Position;
    size: number;
}