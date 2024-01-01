import React, { useEffect, useState, ChangeEvent } from 'react'
import styles from './Footer.module.css'
import widthIcon from '../../images/width.svg'
import heightIcon from '../../images/height.svg'
import { ArtObjectBlock, TextBlock, ImageBlock, Canvas, Size } from '../../types';
import HandleSaveAsImage from '../SaveAsImage/SaveAsImage';
import SaveButton from '../SaveButton/SaveButton';
import LoadDocument from '../LoadButton/LoadButton';

interface FooterProps {
    onChangeCanvasSize: (newSize: Size) => void;
    onChangeCanvasOpacity: (newOpacity: number) => void;
    onChangeCanvasColor: (event: ChangeEvent<HTMLInputElement>) => void;
    canvasRef: React.RefObject<HTMLDivElement>;
    canvasData: Canvas;
    setCanvasData: React.Dispatch<React.SetStateAction<Canvas>>;
    setTexts: React.Dispatch<React.SetStateAction<TextBlock[]>>;
    setImages: React.Dispatch<React.SetStateAction<ImageBlock[]>>;
    setRectangles: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
    setEllipses: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
    setTriangles: React.Dispatch<React.SetStateAction<ArtObjectBlock[]>>;
    setCanvasColor: React.Dispatch<React.SetStateAction<string>>;
    setCanvasOpacity: React.Dispatch<React.SetStateAction<number>>;
    setCanvasSize: React.Dispatch<React.SetStateAction<Size>>;
    onToggleSaveWindow: (show: boolean) => void;
}

export default function Footer({ onChangeCanvasSize,
    onChangeCanvasOpacity,
    onChangeCanvasColor,
    canvasRef,
    setCanvasData,
    setTexts,
    setImages,
    setRectangles,
    setEllipses,
    setTriangles,
    setCanvasColor,
    setCanvasOpacity,
    setCanvasSize,
    canvasData,
    onToggleSaveWindow
}: FooterProps) {
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

    const handleSaveAsImageClick = () => {
        onToggleSaveWindow(true);
    }

    const handleDocumentLoad = (data: Canvas) => {
        setCanvasData(data);
        setTexts(data.objects.filter(obj => obj.type === 'text') as TextBlock[]);
        setImages(data.objects.filter(obj => obj.type === 'image') as ImageBlock[]);
        setRectangles(data.objects.filter(obj => obj.type === 'art-object' && obj.object === "rectangle") as ArtObjectBlock[]);
        setEllipses(data.objects.filter(obj => obj.type === 'art-object' && obj.object === "ellipse") as ArtObjectBlock[]);
        setTriangles(data.objects.filter(obj => obj.type === 'art-object' && obj.object === "triangle") as ArtObjectBlock[]);
        setCanvasColor(data.filter.color);
        setCanvasOpacity(data.filter.opacity);
        setCanvasSize(data.size)

        console.log("LOADED DATA: ", data)
    };

    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.saveContainer}>
                        <button className={styles.saveAsImageButton} onClick={handleSaveAsImageClick}>Сохранить изображение</button>
                    </div>
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
                    <div className={styles.canvasJson}>
                        <SaveButton data={canvasData} />
                        <LoadDocument onDocumentLoad={handleDocumentLoad} />
                    </div>
                </div>
            </div>
        </footer>
    );
}