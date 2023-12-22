import React, { useState, ChangeEvent } from 'react';
import styles from './Header.module.css';
import logo from './logotype.png';
import photoIcon from '../../images/photo-icon.svg';
import textIcon from '../../images/text-icon.svg';
import rectangleIcon from '../../images/rectangle.svg';
import ellipseIcon from '../../images/ellipse.svg';
import triangleIcon from '../../images/triangle.svg';
import FontSizeMenu from '../FontSizeMenu/FontSizeMenu';
import underlinedIcon from '../../images/underlined-icon.svg';
import italicsIcon from '../../images/italics-icon.svg';
import boldIcon from '../../images/bold-icon.svg';
import clearIcon from '../../images/clear.svg'
import deleteIcon from '../../images/delete-icon.svg';
import FontFamilyMenu from '../FontFamilyMenu/FontFamilyMenu';

interface HeaderProps {
  onTextToolClick: () => void;
  onFileUpload: (Event: React.ChangeEvent<HTMLInputElement>) => void;
  onRectangleToolClick: () => void;
  onEllipseToolClick: () => void;
  onTriangleToolClick: () => void;
  onUnderlineToolClick: () => void;
  onItalicsToolClick: () => void;
  onBoldToolClick: () => void;
  onColorToolClick: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearCanvasClick: () => void;
  onDeleteElementClick: () => void;
  onChangeWidth: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeHeight: (event: React.ChangeEvent<HTMLInputElement>) => void;
  underlined: boolean,
  italics: boolean,
  bold: boolean,
  selectedValue: string;
  onSelectedValueChange: (value: string) => void;
  onSelectedFamilyChange: (value: string) => void;
}

export default function Header({ onTextToolClick,
  onFileUpload,
  onRectangleToolClick,
  onEllipseToolClick,
  onTriangleToolClick,
  onUnderlineToolClick,
  onItalicsToolClick,
  onBoldToolClick,
  onColorToolClick,
  onClearCanvasClick,
  onDeleteElementClick,
  onChangeWidth,
  onChangeHeight,
  underlined,
  italics,
  bold,
  onSelectedValueChange,
  onSelectedFamilyChange,

}: HeaderProps) {

  return (
    <header>
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo"></img>
        <div className={styles.tools}>
          <label>
            <img title="Очистить холст" src={clearIcon} className={styles.clearIcon} alt="clear-icon" />
            <button id="clear-canvas" className={styles.clearCanvas} onClick={onClearCanvasClick}></button>
          </label>
          <label>
            <img title="Удалить элемент" src={deleteIcon} className={styles.deleteIcon} alt="delete-icon" />
            <button id="delete-element" className={styles.deleteElement} onClick={onDeleteElementClick}></button>
          </label>
          <label>
            <img title="Добавить фото" src={photoIcon} className={styles.photo} alt="photo_icon"></img>
            <input type="file" id="file-upload" className={styles.photoUpload} onChange={onFileUpload}></input>
          </label>
          <label>
            <img title="Добавить текст" src={textIcon} className={styles.text} alt="text_icon"></img>
            <button id="text-upload" className={styles.upload} onClick={onTextToolClick}></button>
          </label>
          <label>
            <img title="Добавить прямоугольник" src={rectangleIcon} alt="rectangle_icon" className={styles.rectangleIcon} />
            <button id="rectangle-upload" className={styles.rectangleUpload} onClick={onRectangleToolClick}></button>
          </label>
          <label>
            <img title="Добавить эллипс" src={ellipseIcon} alt="ellipse_icon" className={styles.ellipseIcon} />
            <button id="ellipse-upload" className={styles.ellipseUpload} onClick={onEllipseToolClick}></button>
          </label>
          <label>
            <img title="Добавить треугольник" src={triangleIcon} alt="triangle_icon" className={styles.triangleIcon} />
            <button id="triangle-upload" className={styles.triangleUpload} onClick={onTriangleToolClick}></button>
          </label>
          <label>
            <img title="Подчёркивание" src={underlinedIcon} className={`${styles.underlineIcon} ${underlined ? styles.active : ''}`} alt="underlined_icon" />
            <button id="underline-text" className={styles.underlineButton} onClick={onUnderlineToolClick}></button>
          </label>
          <label>
            <img title="Курсив" src={italicsIcon} className={`${styles.italicsIcon} ${italics ? styles.active : ''}`} alt="italics_icon" />
            <button id="italics-text" className={styles.italicsButton} onClick={onItalicsToolClick}></button>
          </label>
          <label>
            <img title="Жирность" src={boldIcon} className={`${styles.boldIcon} ${bold ? styles.active : ''}`} alt="bold_icon" />
            <button id="bold-text" className={styles.boldButton} onClick={onBoldToolClick}></button>
          </label>
          <label>
            <input title="Изменить цвет" type="color" id="change-color" className={styles.colorInput} onChange={onColorToolClick}></input>
          </label>
          <FontSizeMenu onSelectedValueChange={onSelectedValueChange} />
          <FontFamilyMenu onSelectedFamilyChange={onSelectedFamilyChange} />
          <label>
            <input title="Ширина" type="number" id="change-width" className={styles.widthInput} onChange={onChangeWidth} />
          </label>
          <label>
            <input title="Высота" type="number" id="change-width" className={styles.heightInput} onChange={onChangeHeight} />
          </label>
          {/* <label>
            <button className={styles.changeSize} onClick={onChangeButtonClick}>Применить размеры</button>
          </label> */}
        </div>
      </div>
    </header>
  );
}
