import React, { useState, useEffect } from 'react';
import { Canvas, TextBlock, ImageBlock, Position, ArtObjectBlock } from "../../types";
import ImageView from "../ImageView/ImageView";
import styles from "./CanvasView.module.css";
import ArtObjectView from '../ArtObjectsView/ArtObjects';
import TextBlockView from '../TextView/TextView';
// import { Format } from '../../types';

export interface CanvasViewProps extends Canvas {
  // name: string | undefined,
  // format: Format | undefined,
  textTools: TextBlock[];
  rectangles: ArtObjectBlock[];
  ellipses: ArtObjectBlock[];
  triangles: ArtObjectBlock[];
  images: ImageBlock[];
  selectedObject: { id: number, type: string } | null;
  setSelectedObject: (obj: { id: number, type: string } | null) => void;
  handleCanvasClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onUpdateCanvasData: (canvasData: Canvas | null) => void;
}

const CanvasView = (props: CanvasViewProps) => {
  const [canvasData, setCanvasData] = useState<Canvas | null>(null)
  const [backgroundColor, setBackgroundColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  
  useEffect(() => {
    const newCanvasData: Canvas = {
      name: 'new-canvas',
      color: 'white',
      size: {width: 800, height: 600},
      filter: {color: 'white', opacity: 0},
      objects: [...props.textTools, ...props.images, ...props.rectangles, ...props.ellipses, ...props.triangles ],
      format: 'PNG'
    };
    setCanvasData(newCanvasData);
    props.onUpdateCanvasData(canvasData);
  }, [props.textTools, props.rectangles, props.ellipses, props.triangles, props.images]);

  const handleCanvasClick = () => {
    if (props.selectedObject) {
      props.setSelectedObject(null);
    }
  };
  const styleProps = {
    width: `${props.size.width}px`,
    height: `${props.size.height}px`,
  };


  const handleObjectClick = (id: number, type: string) => {
    props.setSelectedObject({ id, type });
  };

  const filter = props.filter.color;
  const opacity = props.filter.opacity;

  const parseColor = (colorString: string) => {
    const hex = colorString.replace('#', '');
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  };

  useEffect(() => {
    const parsedColor = parseColor(filter);
    setBackgroundColor({
      r: parsedColor.r,
      g: parsedColor.g,
      b: parsedColor.b,
      a: opacity
    });
  }, [canvasData, filter, opacity]);

  return (
    <div
      className={styles.page}
      style={{ ...styleProps, backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})` }}
      onClick={handleCanvasClick}
    >
      {props.images.map((image) => (
        <ImageView
          key={image.id}
          {...image}
          selected={props.selectedObject && props.selectedObject.id === image.id && props.selectedObject.type === 'image'}
          onSelect={handleObjectClick}
        />
      ))}
      {props.rectangles.map((rectangle) => (
        <ArtObjectView
          key={rectangle.id}
          {...rectangle}
          selected={props.selectedObject?.id === rectangle.id && props.selectedObject.type === 'rectangle'}
          onSelect={id => handleObjectClick(id, 'rectangle')}
        />
      ))}
      {props.ellipses.map((ellipse) => (
        <ArtObjectView
          key={ellipse.id}
          {...ellipse}
          selected={props.selectedObject?.id === ellipse.id && props.selectedObject.type === 'ellipse'}
          onSelect={id => handleObjectClick(id, 'ellipse')}
        />
      ))}
      {props.triangles.map((triangle) => (
        <ArtObjectView
          key={triangle.id}
          {...triangle}
          selected={props.selectedObject?.id === triangle.id && props.selectedObject.type === 'triangle'}
          onSelect={id => handleObjectClick(id, 'triangle')}
        />
      ))}
      {props.textTools.map((text) => (
        <TextBlockView
          key={text.id}
          {...text}
          selected={props.selectedObject?.id === text.id && props.selectedObject.type === "text"}
          onSelect={id => handleObjectClick(id, 'text')}
        />
      ))}
    </div>
  );
};

export default CanvasView;