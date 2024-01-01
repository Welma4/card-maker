import React from 'react';
import styles from '../ClearConfirm/ClearConfirm.module.css'

type ConfirmationDialogProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

const CustomConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className={styles.container}>
            <div className={styles.confirmWindow}>
                <p className={styles.warning}>Холст будет полностью очищен, продолжить?</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.choiceButton} onClick={onConfirm}>Да</button>
                    <button className={styles.choiceButton} onClick={onCancel}>Нет</button>
                </div>
            </div>
        </div>
    );
};

export default CustomConfirmationDialog;