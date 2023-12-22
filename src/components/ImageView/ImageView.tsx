import { useState } from 'react';
import useDragAndDrop from '../DragAndDrop/DragAndDrop';
import style from "./ImageView.module.css";
import { ImageBlock } from '../../types';
import useResize from '../Resize/Resize';

type Position = { x: number; y: number };

interface ImageViewProps extends ImageBlock {
  selected: boolean | null;
  onSelect: (id: number, type: string) => void;
}

const ImageView = (props: ImageViewProps) => {
  const [position, setPosition] = useState<Position>({ x: props.position.x, y: props.position.y });
  const [size, setSize] = useState<{ width: number; height: number }>({ width: props.size.width, height: props.size.height });
  const ref = useResize(setPosition, setSize);
  // const ref = useDragAndDrop(setPosition)

  const styleProps: React.CSSProperties = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    left: `${position.x}px`,
    top: `${position.y}px`,
    position: 'absolute',
    border: props.selected ? '2px dashed red' : 'none',
  };

  const handleClick = () => {
    props.onSelect(props.id, 'image');
  };

  return (
    <div
      ref={ref}
      draggable={false}
      style={styleProps}
      className={style.imageContainer}
      onClick={handleClick}
    >
       {props.type === "image" && (
          <img
            draggable={false}
            width={styleProps.width}
            height={styleProps.height}
            className={style.image}
            src={props.url}
            alt={`Image ${props.id}`}
          />
      )}
    </div>
  );
}

export default ImageView;
