import React, { useState, useEffect, useContext } from 'react';
import useDragAndDrop from '../DragAndDrop/DragAndDrop';
import style from "./TextView.module.css";
import { TextBlock } from '../../types';
import '../FontFamilyMenu/fonts.css';
import useResizeAndDrag from '../Resize/Resize';

interface TextBlockViewProps extends TextBlock {
  selected: boolean | null;
  onSelect: (id: number, type: string) => void;
}

const TextBlockView = (props: TextBlockViewProps) => {
  const [position, setPosition] = useState({ x: props.position.x, y: props.position.y });
  // const ref = useDragAndDrop(setPosition);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: props.size.width, height: props.size.height });
  const ref = useResizeAndDrag(setPosition, setSize);

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
    // width: `${size.width}px`,
    // height: `${size.height}px`,
    left: `${position.x}px`,
    top: `${position.y}px`,
    border: props.selected ? '2px dashed red' : 'none',
  }
  
  // const selectedProps: React.CSSProperties = {
  //   left: `${position.x}px`,
  //   top: `${position.y}px`,
  //   width: `${props.size.width}px`,
  //   height: `${props.size.height}px`,
  //   border: props.selected ? '1px dashed red' : 'none',
  // }

  const handleClick = () => {
    props.onSelect(props.id, 'text');
  };

  return (
    <div className={style.textContainer} ref={ref} style={selectedProps} onClick={handleClick}>
      <textarea
        className={style.TextBlock}
        style={styleProps}
      >
        {textBlockData.data.join(" ")}
      </textarea>
    </div>
  );
};

export default TextBlockView;
