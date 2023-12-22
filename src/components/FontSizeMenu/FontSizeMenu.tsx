import React, { useState, createContext, ReactNode } from 'react';
import './FontSizeMenu.css';

type FontSizeMenuProps = {
    onSelectedValueChange: (value: string) => void;
  };


const FontSizeMenu: React.FC<FontSizeMenuProps> = ({ onSelectedValueChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('12');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const selectValue = (value: string) => {
        onSelectedValueChange(value);
        setSelectedValue(value);
        setIsOpen(false);
    };

    return (
            <ul title="Размер шрифта" className='menu list-reset'>
                <li className='menu__item'>
                    <button onClick={toggleMenu} className='menu__buttonn'>{selectedValue}</button>
                    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                        <ul className='dropdown__list list-reset'>
                            <li className='dropdown__item'>
                                <button onClick={() => selectValue('12')} className='dropdown__item_value'>12</button>
                            </li>
                            <li className='dropdown__item'>
                                <button onClick={() => selectValue('18')} className='dropdown__item_value'>18</button>
                            </li>
                            <li className='dropdown__item'>
                                <button onClick={() => selectValue('24')} className='dropdown__item_value'>24</button>
                            </li>
                            <li className='dropdown__item'>
                                <button onClick={() => selectValue('40')} className='dropdown__item_value'>40</button>
                            </li>
                            <li className='dropdown__item'>
                                <button onClick={() => selectValue('56')} className='dropdown__item_value'>56</button>
                            </li>
                            <li className='dropdown__item'>
                                <button onClick={() => selectValue('72')} className='dropdown__item_value'>72</button>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
    )
}

export default FontSizeMenu;