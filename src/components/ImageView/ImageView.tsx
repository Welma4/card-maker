import React from 'react';
import { ImageBlock, Position, Size } from "../../types"; 
import style from "./ImageView.module.css"

const ImageView = (props: ImageBlock) => {
  const styleProps = {
    width: `${props.size.width}px`,
    height: `${props.size.height}px`,
    left: `${props.position.x}px`,
    top: `${props.position.y}px`,
  };

  return (
    <div>
      <img
        style={styleProps}
        className={style.image}
        src={props.url}
        alt={`Image ${props.id}`}
      />
    </div>
  );
}

export default ImageView;