import React from 'react';
import { Canvas } from '../../types';
import styles from './SaveButton.module.css';

const SaveButton: React.FC<{ data: Canvas | null }> = ({ data }) => {
  const saveJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'card.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button className={styles.button} onClick={saveJSON}>
      Save as JSON
    </button>
  );
};

export default SaveButton;