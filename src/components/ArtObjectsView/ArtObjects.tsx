import { useState } from 'react'
import { ArtObjectBlock } from "../../types";
import style from "./ArtObjects.module.css";
import useDragAndDrop from '../DragAndDrop/DragAndDrop';
import useResizeAndDrag from '../Resize/Resize';

type Position = { x: number; y: number };

interface ImageViewProps extends ArtObjectBlock {
    selected: boolean | null;
    onSelect: (id: number, type: string) => void;
}

const ArtObjectView = (props: ImageViewProps) => {
    const [position, setPosition] = useState<Position>({ x: props.position.x, y: props.position.y });
    // const ref = useDragAndDrop(setPosition);
    const [size, setSize] = useState<{ width: number; height: number }>({ width: props.size.width, height: props.size.height });
    const ref = useResizeAndDrag(setPosition, setSize);

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

    const topLeft = { x: props.position.x, y: props.position.y };
    const bottomRight = { x: props.position.x + props.size.width, y: props.position.y + props.size.height };

    return (
        <div
            className={style.container}
            style={styleProps}
            ref={ref}
            onClick={handleClick}
        >
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
