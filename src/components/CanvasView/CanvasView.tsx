import React, { useState, useEffect } from 'react';
import { Canvas, TextBlock, ImageBlock, Position, ArtObjectBlock } from "../../types";
import ImageView from "../ImageView/ImageView";
import styles from "./CanvasView.module.css";
import ArtObjectView from '../ArtObjectsView/ArtObjects';
import TextBlockView from '../TextView/TextView';
import { useRef } from 'react';

export interface CanvasViewProps extends Canvas {
  canv: Canvas;
  setCanvasData: React.Dispatch<React.SetStateAction<Canvas>>;
  texts: TextBlock[];
  setTexts: React.Dispatch<React.SetStateAction<TextBlock[]>>;
  rectangles: ArtObjectBlock[];
  setRectangles: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
  ellipses: ArtObjectBlock[];
  setEllipses: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
  triangles: ArtObjectBlock[];
  setTriangles: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
  images: ImageBlock[];
  setImages: React.Dispatch<React.SetStateAction<ImageBlock[]>>;
  selectedObject: { id: number, type: string } | null;
  setSelectedObject: (obj: { id: number, type: string } | null) => void;
  handleCanvasClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  setCanvasRef: (canvasDivRef: React.RefObject<HTMLDivElement>) => void;
}

const CanvasView = (props: CanvasViewProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState({ r: 255, g: 255, b: 255, a: 1 });

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
  }, [filter, opacity]);

  useEffect(() => {
    if (divRef.current) {
      props.setCanvasRef(divRef);
    }
  }, [divRef]);

  return (
    <div
      ref={divRef}
      className={styles.page}
      style={{ ...styleProps, backgroundColor: `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})` }}
      onClick={handleCanvasClick}
    >
      {props.canv.objects.map((object, index) => {
        switch (object.type) {
          case 'image':
            return <ImageView
              key={index + object.type + object.id}
              {...object}
              selected={props.selectedObject && props.selectedObject.id === object.id && props.selectedObject.type === 'image'}
              onSelect={handleObjectClick}
              canvImages={props.images}
              setImages={props.setImages}
            />;
          case 'text':
            return <TextBlockView
              key={index + object.type + object.id}
              {...object}
              selected={props.selectedObject && props.selectedObject.id === object.id && props.selectedObject.type === "text"}
              onSelect={handleObjectClick}
              canvTexts={props.texts}
              setTexts={props.setTexts}
              canvasData={props.canv}
              setCanvasData={props.setCanvasData}
            />;
          case 'art-object':
            switch (object.object) {
              case "rectangle":
              case "ellipse":
              case "triangle":
                return <ArtObjectView
                  setRectangles={props.setRectangles}
                  setEllipses={props.setEllipses}
                  setTriangles={props.setTriangles}
                  rectangles={props.rectangles}
                  ellipses={props.ellipses}
                  triangles={props.triangles}
                  key={index + object.object + object.id}
                  {...object}
                  selected={props.selectedObject && props.selectedObject.id === object.id}
                  onSelect={id => handleObjectClick(id, object.object)}
                />;
              default:
                return null;
            }
          default:
            return null;
        }
      })}
      {/* {props.images.map((image) => (
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
      ))} */}
    </div>
  );
};

export default CanvasView;