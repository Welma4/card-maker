import React, { useState, useEffect, useContext } from 'react';
import useDragAndDrop from '../DragAndDrop/DragAndDrop';
import style from "./TextView.module.css";
import { TextBlock, Canvas } from '../../types';
import '../FontFamilyMenu/fonts.css';
import useResizeAndDrag from '../Resize/Resize';

interface TextBlockViewProps extends TextBlock {
  selected: boolean | null;
  onSelect: (id: number, type: string) => void;
  canvTexts: TextBlock[];
  setTexts: React.Dispatch<React.SetStateAction<TextBlock[]>>;
  canvasData: Canvas;
  setCanvasData: React.Dispatch<React.SetStateAction<Canvas>>;
}

const TextBlockView = (props: TextBlockViewProps) => {
  const [position, setPosition] = useState({ x: props.position.x, y: props.position.y });
  const [data, setData] = useState<string>(props.data.join(""));
  const [size, setSize] = useState<{ width: number; height: number }>({ width: props.size.width, height: props.size.height });
  const ref = useResizeAndDrag(setPosition, setSize);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value);
  };

  useEffect(() => {
    if (props.id !== undefined) {
      const updatedTexts = props.canvTexts.map((text) => {
        if (text.id === props.id) {
          return {
            ...text,
            data: [data],
            position: { x: position.x, y: position.y, z: 1 },
            size: { width: size.width, height: size.height },
          };
        }
        return text;
      });
      props.setTexts(updatedTexts);
    }
  }, [data, position, size]);

  const textBlockData = {
    id: props.id,
    type: props.type,
    data: props.data,
  };

  const styleProps: React.CSSProperties = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    left: `${position.x}px`,
    top: `${position.y}px`,
    fontSize: `${props.fontSize}px`,
    fontFamily: `${props.fontFamily}`,
    color: `${props.color}`,
    textDecoration: props.underlined ? "underline" : "none",
    fontStyle: props.italics ? "italic" : "normal",
    fontWeight: props.bold ? "bold" : "normal",
  };

  const selectedProps: React.CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    border: props.selected ? '2px dashed red' : 'none',
  }

  const handleClick = () => {
    props.onSelect(props.id, 'text');
  };

  return (
    <div className={style.textContainer} ref={ref} style={selectedProps} onClick={handleClick}>
      {props.selected && (
        <>
          <div className={`${style.handle} ${style.topLeft}`} />
          <div className={`${style.handle} ${style.topRight}`} />
          <div className={`${style.handle} ${style.bottomLeft}`} />
          <div className={`${style.handle} ${style.bottomRight}`} />
        </>
      )}
      <textarea
        className={style.TextBlock}
        style={styleProps}
        value={data}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default TextBlockView;
