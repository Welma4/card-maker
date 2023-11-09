import { ArtObjectBlock } from "../../types";
import style from "./ArtObjects.module.css";
import rectangle from "../../images/rectangle.svg";
import triangle from "../../images/triangle.svg";
import ellipse from "../../images/ellipse.svg";

const ArtObjectView = (props: ArtObjectBlock) => {
    const obj = props.object;
    const svgStyleProps = {
        color: props.color,
        width: `${props.size.width}px`,
        height: `${props.size.height}px`,
        x: props.position.x,
        y: props.position.y,
        z: props.position.z
    }
    const dimensions = {
        width: props.size.width,
        height: props.size.height
    }
    const styleProps = {
        width: props.position.x + dimensions.width,
        height: props.position.y + dimensions.height,
        left: props.position.x,
        top: props.position.y,
    }
    const topLeft = { x: props.position.x, y: props.position.y };
    const bottomRight = { x: props.position.x + props.size.width, y: props.position.y + props.size.height };

    return (
        <div>
            {obj === "rectangle" && (
                <svg className={style.rectangle} style={styleProps} width="1000px">
                    <rect
                        x={svgStyleProps.x}
                        y={svgStyleProps.y}
                        width={svgStyleProps.width}
                        height={svgStyleProps.height}
                        fill="none"
                        stroke={svgStyleProps.color}
                    />
                </svg>
            )}
            {obj === "ellipse" && (
                <svg className={style.ellipse} style={styleProps}>
                    <ellipse
                        cx={svgStyleProps.x + dimensions.width / 2}
                        cy={svgStyleProps.y + dimensions.height / 2}
                        rx={dimensions.width / 2}
                        ry={dimensions.height / 2}
                        fill="none"
                        stroke={svgStyleProps.color}
                    />
                </svg>
            )}
            {obj === "triangle" && (
                <svg className={style.triangle} style={styleProps}>
                    {/* <polygon
                        points={`${Number(svgStyleProps.x)},${Number(svgStyleProps.y) + Number(svgStyleProps.height)} 
                     ${Number(svgStyleProps.x) + Number(svgStyleProps.width) / 2},${Number(svgStyleProps.y)} 
                     ${Number(svgStyleProps.x) + Number(svgStyleProps.width)},${Number(svgStyleProps.y) + Number(svgStyleProps.height)}`}
                        fill="none"
                        stroke={svgStyleProps.color}
                    /> */}
                    <polygon
                        points={`${topLeft.x},${bottomRight.y} 
             ${topLeft.x + props.size.width / 2},${topLeft.y} 
             ${bottomRight.x},${bottomRight.y}`}
                        fill="none"
                        stroke={svgStyleProps.color}
                    />
                </svg>
            )}

        </div>
    );
}

export default ArtObjectView;
