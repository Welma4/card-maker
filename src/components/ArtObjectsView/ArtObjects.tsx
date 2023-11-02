import { ArtObjectBlock } from "../../types";
import style from "./ArtObjects.module.css";
import rectangle from "../../images/rectangle.svg";
import triangle from "../../images/triangle.svg";
import ellipse from "../../images/ellipse.svg";

const ArtObjectView = (props: ArtObjectBlock) => {
    const styleProps = {
        color: props.color,
        width: `${props.size.width}px`,
        height: `${props.size.height}px`,
        left: props.position.x,
        top: props.position.y
    }
    const obj = props.object;

    return (
        <div className={style.image}>
            {obj === "rectangle" && (
                <img src={rectangle} alt={props.type} style={styleProps} className={style.rectangle}/>
            )}
            {obj === "triangle" && (
                <img src={triangle} alt={triangle} style={styleProps} className={style.triangle} />
            )}
            {obj === "ellipse" && (
                <img src={ellipse} alt={ellipse} style={styleProps} className={style.ellipse} />
            )}
            {/* {obj === "rectangle" && (
                <svg>
                    <rect
                        x={styleProps.x}
                        y={styleProps.y}
                        width={styleProps.width}
                        height={styleProps.height}
                        fill="none"
                        stroke={styleProps.color}
                        strokeWidth={2}
                    />
                </svg>
            )} */}
        </div>
    );
}

export default ArtObjectView;
