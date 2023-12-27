import React, { useEffect, useState } from 'react';
import styles from '../SaveImageConfirm/SaveImageConfirm.module.css';
import { Format } from '../../types';

type ConfirmationDialogProps = {
    onImageNameChange: (name: string) => void;
    onImageFormatChange: (format: Format) => void;
    onConfirm: () => void;
    onCancel: () => void;
    canvasName: string;
};

const CustomConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    onImageNameChange,
    onImageFormatChange,
    onConfirm,
    onCancel,
    canvasName
}) => {
    const defaultName = 'new-canvas';
    const [selectedName, setSelectedName] = useState(defaultName);
    const [selectedFormat, setSelectedFormat] = useState<Format>('PNG');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        onImageNameChange(newName);
        setSelectedName(newName);
    };

    const onPngClick = () => {
        onImageFormatChange('PNG');
        setSelectedFormat('PNG');
    };

    const onJpegClick = () => {
        onImageFormatChange('JPEG');
        setSelectedFormat('JPEG');
    };

    return (
        <div className={styles.container}>
            <div className={styles.confirmWindow}>
                <p className={styles.warning}>Выберите формат и название холста</p>
                <div className={styles.buttonContainer}>
                    <div className={styles.nameContainer}>
                        <p className={styles.name}>Название</p>
                        <input defaultValue={canvasName} className={styles.nameInput} type="text" onChange={handleNameChange} />
                    </div>
                    <div className={styles.formatContainer}>
                        <p className={styles.format}>Формат</p>
                        <div className={styles.formatButtonsContainer}>
                            <button onClick={onPngClick} className={selectedFormat === 'PNG' ? styles.selectedFormatButton : styles.formatButton}>
                                PNG
                            </button>
                            <button onClick={onJpegClick} className={selectedFormat === 'JPEG' ? styles.selectedFormatButton : styles.formatButton}>
                                JPEG
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.choiceButtons}>
                    <button onClick={onConfirm} className={styles.choiceButton}>
                        Сохранить
                    </button>
                    <button onClick={onCancel} className={styles.choiceButton}>
                        Отменить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomConfirmationDialog;