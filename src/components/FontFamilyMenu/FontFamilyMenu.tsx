import React, { useState } from 'react';
import './FontFamilyMenu.css';
import './fonts.css';

type FontFamilyMenuProps = {
    onSelectedFamilyChange: (value: string) => void;
  };


  const FontFamilyMenu: React.FC<FontFamilyMenuProps> = ({ onSelectedFamilyChange }) => {
    // const [selectedFont, setSelectedFont] = useState('Oswald');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFamily, setSelectedFamily] = useState('Oswald');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const selectFont = (value: string) => {
        onSelectedFamilyChange(value);
        setSelectedFamily(value);
        // console.log("value", value);
        // console.log("selectedFont", selectedFamily);
        setIsOpen(false);
    };
    

    return (
        <ul title="Шрифт" className='menu list-reset'>
            <li className='menu__item'>
                <button onClick={toggleMenu} className='menu__button' style={{ fontFamily: selectedFamily }}>{selectedFamily}</button>
                <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                    <ul className='dropdown__list list-reset'>
                        <li className='dropdown__item'>
                            <button onClick={() => selectFont('Oswald')} className='dropdown__item_value' style={{ fontFamily: 'Oswald, sans-serif' }}>Oswald</button>
                        </li>
                        <li className='dropdown__item'>
                            <button onClick={() => selectFont('Dancing Script')} className='dropdown__item_value' style={{ fontFamily: 'Dancing Script, cursive', fontSize: '14px' }}>Dancing Script</button>
                        </li>
                        <li className='dropdown__item'>
                            <button onClick={() => selectFont('Teko')} className='dropdown__item_value' style={{ fontFamily: 'Teko, sans-serif' }}>Teko</button>
                        </li>
                        <li className='dropdown__item'>
                            <button onClick={() => selectFont('Arvo')} className='dropdown__item_value' style={{ fontFamily: 'Arvo, serif' }}>Arvo</button>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    );
}

export default FontFamilyMenu;