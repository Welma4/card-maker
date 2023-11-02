import { TextBlock } from "../../types";
import style from "./TextView.module.css";

const TextBlockView = (props: TextBlock) => {
    const textBlockData = {
      id: props.id,
      type: props.type,
      data: props.data,
    };
    const styleProps = {
        left: `${props.position.x}px`,
        top: `${props.position.y}px`,
        fontSize: `${props.fontSize}px`,
        fontFamily: `${props.fontFamily}`,
        color: `${props.color}`,
        textDecoration: props.underlined ? "underline" : "none",
        fontStyle: props.italics ? "italic" : "normal",
        fontWeight: props.bold ? "bold" : "normal",
    };

    return (
        <p className={style.TextBlock} style={styleProps}>
            {textBlockData.data.join(" ")}
        </p>
    );
};

export default TextBlockView;