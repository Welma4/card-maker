import React, { useEffect, useState, ChangeEvent } from 'react'
import styles from './Footer.module.css'
import widthIcon from '../../images/width.svg'
import heightIcon from '../../images/height.svg'
import { Size } from '../../types';


interface FooterProps {
    onChangeCanvasSize: (newSize: Size) => void;
    onChangeCanvasOpacity: (newOpacity: number) => void;
    onChangeCanvasColor: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Footer({ onChangeCanvasSize, onChangeCanvasOpacity , onChangeCanvasColor }: FooterProps) {
    const [canvasWidth, setCanvasWidth] = useState<number>(1200);
    const [canvasHeight, setCanvasHeight] = useState<number>(700);
    const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCanvasWidth(Number(event.target.value));
    };

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCanvasHeight(Number(event.target.value));
    };
    const handleApplySize = () => {
        const newSize: Size = { width: canvasWidth, height: canvasHeight };
        onChangeCanvasSize(newSize);
    };

    const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = Number(event.target.value) / 100; 
        onChangeCanvasOpacity(newOpacity); 
    };    

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.colorContainer}>
                        <input id='canvas-color' className={styles.colorInput} type="color" onChange={onChangeCanvasColor} />
                    </div>
                    <div className={styles.widthContainer} title="Ширина холста">
                        <img className={styles.widthIcon} src={widthIcon} alt="width-icon" />
                        <input
                            type="number"
                            id="change-canvas-width"
                            className={styles.widthInput}
                            onChange={handleWidthChange}
                            value={canvasWidth}
                        />
                    </div>
                    <button className={styles.applyButton} onClick={handleApplySize}>
                        Применить размеры
                    </button>
                    <div className={styles.heightContainer} title="Высота холста">
                        <input
                            type="number"
                            id="change-canvas-height"
                            className={styles.heightInput}
                            onChange={handleHeightChange}
                            value={canvasHeight}
                        />
                        <img className={styles.heightIcon} src={heightIcon} alt="height-icon" />
                    </div>
                    <div className={styles.canvasOpacity}>
                        <input id='canvas-opacity' className={styles.opacityInput} type="range" onChange={handleOpacityChange} />
                    </div>
                </div>
            </div>
        </footer>
    );
}