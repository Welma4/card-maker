import { useState, useEffect } from 'react'
import { ArtObjectBlock } from "../../types";
import style from "./ArtObjects.module.css";
import useResizeAndDrag from '../Resize/Resize';

type Position = { x: number; y: number };

interface ArtObjectViewProps extends ArtObjectBlock {
    selected: boolean | null;
    onSelect: (id: number, type: string) => void;
    rectangles: ArtObjectBlock[];
    ellipses: ArtObjectBlock[];
    triangles: ArtObjectBlock[];
    setRectangles: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
    setEllipses: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
    setTriangles: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
}

const ArtObjectView = (props: ArtObjectViewProps) => {
    const [position, setPosition] = useState<Position>({ x: props.position.x, y: props.position.y });
    const [size, setSize] = useState<{ width: number; height: number }>({ width: props.size.width, height: props.size.height });
    const ref = useResizeAndDrag(setPosition, setSize);

    useEffect(() => {
        if (props.id !== undefined) {
            let updatedObjects: ArtObjectBlock[];
            switch (props.object) {
                case "rectangle":
                    updatedObjects = props.rectangles.map((obj) => {
                        if (obj.id === props.id) {
                            return {
                                ...obj,
                                position: { x: position.x, y: position.y, z: props.position.z },
                                size: { width: size.width, height: size.height }
                            };
                        }
                        return obj;
                    });
                    props.setRectangles(updatedObjects);
                    break;
                case "ellipse":
                    updatedObjects = props.ellipses.map((obj) => {
                        if (obj.id === props.id) {
                            return {
                                ...obj,
                                position: { x: position.x, y: position.y, z: props.position.z },
                                size: { width: size.width, height: size.height }
                            };
                        }
                        return obj;
                    });
                    props.setEllipses(updatedObjects);
                    break;
                case "triangle":
                    updatedObjects = props.triangles.map((obj) => {
                        if (obj.id === props.id) {
                            return {
                                ...obj,
                                position: { x: position.x, y: position.y, z: props.position.z },
                                size: { width: size.width, height: size.height }
                            };
                        }
                        return obj;
                    });
                    props.setTriangles(updatedObjects);
                    break;
                default:
                    break;
            }
        }
    }, [position, size]);

    const obj = props.object;
    const svgStyleProps = {
        color: props.color,
        width: `${size.width}px`,
        height: `${size.height}px`,
        x: props.position.x,
        y: props.position.y,
        z: props.position.z,
        border: props.selected ? '1px dashed red' : 'none',
    }

    const dimensions = {
        width: size.width,
        height: size.height
    }

    const styleProps = {
        width: dimensions.width,
        height: dimensions.height,
        left: `${position.x}px`,
        top: `${position.y}px`,

    }

    const handleClick = () => {
        props.onSelect(props.id, props.type);
    }

    return (
        <div
            className={style.container}
            style={styleProps}
            ref={ref}
            onClick={handleClick}
        >
            {props.selected && (
                <>
                    <div className={`${style.handle} ${style.topLeft}`} />
                    <div className={`${style.handle} ${style.topRight}`} />
                    <div className={`${style.handle} ${style.bottomLeft}`} />
                    <div className={`${style.handle} ${style.bottomRight}`} />
                </>
            )}
            {obj === "rectangle" && (
                <div className={style.rectangle}>
                    <svg style={svgStyleProps}>
                        <rect
                            x={0}
                            y={0}
                            width={svgStyleProps.width}
                            height={svgStyleProps.height}
                            fill="none"
                            stroke={svgStyleProps.color}
                        />
                    </svg>
                </div>
            )}
            {obj === "ellipse" && (
                <div className={style.ellipse}>
                    <svg style={svgStyleProps}>
                        <ellipse
                            cx={dimensions.width / 2}
                            cy={dimensions.height / 2}
                            rx={dimensions.width / 2}
                            ry={dimensions.height / 2}
                            fill="none"
                            stroke={svgStyleProps.color}
                        />
                    </svg>
                </div>
            )}
            {obj === "triangle" && (
                <div className={style.triangle}>
                    <svg style={svgStyleProps}>
                        <polygon
                            points={`0,${dimensions.height} 
                            ${dimensions.width / 2},0 
                            ${dimensions.width},${dimensions.height}`}
                            fill="none"
                            stroke={svgStyleProps.color}
                        />
                    </svg>
                </div>
            )}
        </div>
    );

}

export default ArtObjectView;
