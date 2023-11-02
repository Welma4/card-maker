import React from 'react';
import { Canvas } from "../../types";
import ImageView from "../ImageView/ImageView";
import styles from "./CanvasView.module.css";
import ArtObjectView from '../ArtObjectsView/ArtObjects';
import TextBlockView from '../TextView/TextView';
// import FilterView from "../FilterView/FilterView";

const CanvasView = (props: Canvas) => {
    const styleProps = {
        width: `${props.size.width}px`,
        height: `${props.size.height}px`,
    }
    const filter = props.filter.color;

    return (
        <div className={styles.page} style={{ ...styleProps, backgroundColor: filter}}>
            {props.objects.map((el, index) => {
                switch (el.type) {
                    case "image":
                        return <ImageView {...el} key={index} />;
                    case "art-object":
                        return <ArtObjectView {...el} key={index} />;
                    case "text":
                        return <TextBlockView {...el} key={index} />
                }
            })
            }
        </div>
    )
}

export default CanvasView;