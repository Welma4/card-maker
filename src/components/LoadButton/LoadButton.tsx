import React, { useState } from 'react';
import { Canvas } from '../../types';
import styles from './LoadButton.module.css'

const LoadDocument: React.FC<{ onDocumentLoad: (data: Canvas) => void }> = ({ onDocumentLoad }) => {
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null); 

        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try 
                {
                    const contents = e.target?.result as string;
                    const jsonData = JSON.parse(contents);
                    if 
                    (
                        jsonData &&
                        typeof jsonData.name === 'string' &&
                        typeof jsonData.color === 'string' &&
                        Array.isArray(jsonData.objects) &&
                        typeof jsonData.format === 'string'
                    ) 
                    {
                        onDocumentLoad(jsonData);
                        // console.log('JSON Data:', jsonData);
                    } 
                    else 
                    {
                        setError('Invalid JSON format or file structure');
                        console.log("WRONG DATA!");
                    }
                } 
                catch (error) 
                {
                    setError('Invalid JSON format or file');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <label>
            <input type="file" onChange={handleFileChange} accept=".json" className={styles.button} />
            {error && <div className={styles.error}>{error}</div>}
        </label>
    );
};

export default LoadDocument;