import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import './App.css';
import { doc } from './maxData';
import { Canvas, TextBlock, Size, ImageBlock, ArtObjectBlock, Format } from './types';
import CanvasView from './components/CanvasView/CanvasView';
import SaveButton from './components/SaveButton/SaveButton';
import LoadDocument from './components/LoadButton/LoadButton';
import Header from './components/Header/Header';
import ClearConfirmationDialog from './components/ClearConfirm/ClearConfirm';
import Footer from './components/Footer/Footer';
import { newCanvasData, defaultCanvasSize, defaultCanvasColor, defaultCanvasOpacity, defaultCanvasFormat, defaultCanvasName } from './store/initialState'
import SaveConfirmationDialog from './components/SaveImageConfirm/SaveImageConfirm';
import HandleSaveAsImage from './components/SaveAsImage/SaveAsImage';

const App = () => {
  const [texts, setTexts] = useState<TextBlock[]>([]);
  const [textToolActive, setTextToolActive] = useState(false);
  const [underlined, setUnderlined] = useState(false);
  const [italics, setItalics] = useState(false);
  const [bold, setBold] = useState(false);
  const [color, setColor] = useState("#000000")
  const [images, setImages] = useState<ImageBlock[]>([]);
  const [imageWidth, setImageWidth] = useState(250);
  const [imageHeight, setImageHeight] = useState(250);
  const [rectangles, setRectangles] = useState<ArtObjectBlock[]>([]);
  const [rectangleToolActive, setRectangleToolActive] = useState(false);
  const [ellipses, setEllipses] = useState<ArtObjectBlock[]>([]);
  const [ellipseToolActive, setEllipseToolActive] = useState(false);
  const [triangles, setTriangles] = useState<ArtObjectBlock[]>([]);
  const [triangleToolActive, setTriangleToolActive] = useState(false);
  const [selectedObject, setSelectedObject] = useState<{ id: number, type: string } | null>(null);
  const [selectedValue, setSelectedValue] = useState('12');
  const [selectedFamily, setSelectedFamily] = useState('Oswald');
  const [showDialog, setShowDialog] = useState(false);
  const [showSaveWindow, setShowSaveWindow] = useState(false);
  const [marginWidth, setMarginWidth] = useState<number>(0);
  const [marginHeight, setMarginHeight] = useState<number>(0);

  const [canvasSize, setCanvasSize] = useState<Size>(defaultCanvasSize)
  const [canvasColor, setCanvasColor] = useState(defaultCanvasColor)
  const [canvasOpacity, setCanvasOpacity] = useState(defaultCanvasOpacity)
  const [canvasName, setCanvasName] = useState('new-canvas');
  const [canvasFormat, setCanvasFormat] = useState<Format>("PNG");

  const [canvasData, setCanvasData] = useState<Canvas>(newCanvasData);

  const [undoStack, setUndoStack] = useState<Canvas[]>([]);
  const [redoStack, setRedoStack] = useState<Canvas[]>([]);

  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updatedCanvasData: Canvas = {
      name: canvasName,
      size: { width: canvasSize.width, height: canvasSize.height },
      filter: { color: canvasColor, opacity: canvasOpacity },
      objects: [...texts, ...images, ...rectangles, ...ellipses, ...triangles],
      format: canvasFormat
    }
    setCanvasData(updatedCanvasData);
  }, [texts, images, rectangles, ellipses, triangles, canvasColor, canvasOpacity, canvasSize, canvasFormat, canvasName])

  const handleSelectedValueChange = (value: string) => {
    setSelectedValue(value);
    if (selectedObject && selectedObject.type === 'text') {
      const updatedTexts = texts.map((text) => {
        if (text.id === selectedObject.id) {
          return {
            ...text,
            fontSize: +value,
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    }
  };

  const handleSelectedFamilyChange = (value: string) => {
    setSelectedFamily(value);
    if (selectedObject && selectedObject.type === 'text') {
      const updatedTexts = texts.map((text) => {
        if (text.id === selectedObject.id) {
          return {
            ...text,
            fontFamily: value,
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    }
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
    if (selectedObject) {
      switch (selectedObject.type) {
        case 'text':
          const updatedTexts = texts.map((text) => {
            if (text.id === selectedObject.id) {
              return {
                ...text,
                color: event.target.value,
              };
            }
            return text;
          });
          setTexts(updatedTexts);
          break;
        case 'rectangle':
          const updatedRectangles = rectangles.map((rectangle) => {
            if (rectangle.id === selectedObject.id) {
              return {
                ...rectangle,
                color: event.target.value,
              };
            }
            return rectangle;
          });
          setRectangles(updatedRectangles);
          break;
        case 'ellipse':
          const updatedEllipses = ellipses.map((ellipse) => {
            if (ellipse.id === selectedObject.id) {
              return {
                ...ellipse,
                color: event.target.value,
              };
            }
            return ellipse;
          });
          setEllipses(updatedEllipses);
          break;
        case 'triangle':
          const updatedTriangles = triangles.map((triangle) => {
            if (triangle.id === selectedObject.id) {
              return {
                ...triangle,
                color: event.target.value,
              };
            }
            return triangle;
          });
          setTriangles(updatedTriangles);
          break;
        default:
          break;
      }
    }
  };

  const handleTextToolClick = () => {
    setTextToolActive(true);
  };

  const handleUnderlineToolClick = () => {
    setUnderlined(!underlined);

    if (selectedObject && selectedObject.type === 'text') {
      const updatedTexts = texts.map((text) => {
        if (text.id === selectedObject.id) {
          return {
            ...text,
            underlined: !text.underlined,
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    }
  };

  const handleItalicsToolClick = () => {
    setItalics(!italics);
    if (selectedObject && selectedObject.type === 'text') {
      const updatedTexts = texts.map((text) => {
        if (text.id === selectedObject.id) {
          return {
            ...text,
            italics: !text.italics,
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    }
  }

  const handleBoldToolClick = () => {
    setBold(!bold);
    if (selectedObject && selectedObject.type === 'text') {
      const updatedTexts = texts.map((text) => {
        if (text.id === selectedObject.id) {
          return {
            ...text,
            bold: !text.bold,
          };
        }
        return text;
      });
      setTexts(updatedTexts);
    }
  }

  const handleClearCanvas = () => {
    setShowDialog(true);
  }

  const handleConfirmClear = () => {
    setShowDialog(false);
    setTexts([]);
    setImages([]);
    setRectangles([]);
    setEllipses([]);
    setTriangles([]);
    setSelectedObject(null);
    setCanvasSize(defaultCanvasSize);
    setCanvasColor(defaultCanvasColor);
    setCanvasOpacity(defaultCanvasOpacity);
  };

  const handleCancelClear = () => {
    setShowDialog(false);
  };

  const handleDeleteElement = () => {
    if (selectedObject) {
      if (selectedObject.type === "text") {
        setTexts((prevTexts) => prevTexts.filter((text) => text.id !== selectedObject.id));
      } else if (selectedObject.type === "image") {
        setImages((prevImages) => prevImages.filter((image) => image.id !== selectedObject.id));
      } else if (selectedObject.type === "rectangle") {
        setRectangles((prevRectangles) => prevRectangles.filter((rectangle) => rectangle.id !== selectedObject.id));
      } else if (selectedObject.type === "ellipse") {
        setEllipses((prevEllipses) => prevEllipses.filter((ellipse) => ellipse.id !== selectedObject.id));
      } else if (selectedObject.type === "triangle") {
        setTriangles((prevTriangles) => prevTriangles.filter((triangle) => triangle.id !== selectedObject.id));
      }
      setSelectedObject(null);
    }
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (textToolActive) {
      const newText: TextBlock = {
        id: Date.now(),
        position: { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY, z: 1 },
        size: { width: 200, height: 80 },
        type: 'text',
        data: [''],
        fontSize: +selectedValue,
        fontFamily: selectedFamily,
        color: color,
        underlined: underlined ? true : false,
        italics: italics ? true : false,
        bold: bold ? true : false
      }

      setTexts((prevTexts) => [...prevTexts, newText]);
      setTextToolActive(false);
    }

  };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        const imageUrl = URL.createObjectURL(file);
        const newImage: ImageBlock = {
          type: 'image',
          url: imageUrl,
          id: Date.now(),
          size: { width: imageWidth, height: imageHeight },
          position: { x: (canvasSize.width) / 2 - imageWidth / 2, y: (canvasSize.height) / 2 - imageHeight / 2, z: 1 },
        };

        setImages((prevImages) => [...prevImages, newImage]);
      }
      else {
        console.log("Файл не был выбран либо неверный формат! Допустимые форматы: png, jpeg.")
      }

    }
  };


  const handleRectangleToolClick = () => {
    setEllipseToolActive(false);
    setRectangleToolActive(true);
    setTriangleToolActive(false);
  }

  const handlePlaceRectangle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (rectangleToolActive) {
      const newRectangle: ArtObjectBlock = {
        id: Date.now(),
        position: { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY, z: 1 },
        size: { width: imageWidth, height: imageHeight },
        type: 'art-object',
        object: 'rectangle',
        color: color
      }

      setRectangles((prevRectangles) => [...prevRectangles, newRectangle]);
      setRectangleToolActive(false);
    }
  }

  const handleEllipseToolClick = () => {
    setEllipseToolActive(true);
    setRectangleToolActive(false);
    setTriangleToolActive(false);
  }

  const handlePlaceEllipse = (event: React.MouseEvent<HTMLDivElement>) => {
    if (ellipseToolActive) {
      const newEllipse: ArtObjectBlock = {
        id: Date.now(),
        position: { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY, z: 1 },
        size: { width: imageWidth, height: imageHeight },
        type: 'art-object',
        object: 'ellipse',
        color: color
      };

      setEllipses((prevEllipses) => [...prevEllipses, newEllipse]);
      setEllipseToolActive(false);
    }
  };

  const handleTriangleToolClick = () => {
    setEllipseToolActive(false);
    setRectangleToolActive(false);
    setTriangleToolActive(true);
  }

  const handlePlaceTriangle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (triangleToolActive) {
      const newTriangle: ArtObjectBlock = {
        id: Date.now(),
        position: { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY, z: 1 },
        size: { width: imageWidth, height: imageHeight },
        type: 'art-object',
        object: 'triangle',
        color: color
      };

      setTriangles((prevTriangles) => [...prevTriangles, newTriangle]);
      setTriangleToolActive(false);
    }
  };


  const handleImageWidthToolClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageWidth(parseInt(event.target.value));
  }

  const handleImageHeightToolClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageHeight(parseInt(event.target.value));
  }


  const handleCanvasSizeChange = (newSize: Size) => {
    setCanvasSize(newSize);
  };

  const handleCanvasColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCanvasColor(event.target.value)
  }

  const handleCanvasOpacityChange = (newOpacity: number) => {
    setCanvasOpacity(newOpacity);
  };

  useEffect(() => {
    const marginWidthCalc = (window.innerWidth - canvasSize.width) / 2;
    const marginHeightCalc = (window.innerHeight - canvasSize.height) / 2 - canvasSize.height / 5;

    setMarginWidth(marginWidthCalc);
    setMarginHeight(marginHeightCalc);
  }, [canvasSize, window.innerWidth, window.innerHeight]);


  // отмена последнего действия 
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousCanvasData = undoStack[undoStack.length - 4];
      if (previousCanvasData) {
        setCanvasData(previousCanvasData);
        setTexts(previousCanvasData.objects.filter(obj => obj.type === 'text') as TextBlock[]);
        setImages(previousCanvasData.objects.filter(obj => obj.type === 'image') as ImageBlock[]);
        setRectangles(previousCanvasData.objects.filter(obj => obj.type === 'art-object' && obj.object === "rectangle") as ArtObjectBlock[]);
        setEllipses(previousCanvasData.objects.filter(obj => obj.type === 'art-object' && obj.object === "ellipse") as ArtObjectBlock[]);
        setTriangles(previousCanvasData.objects.filter(obj => obj.type === 'art-object' && obj.object === "triangle") as ArtObjectBlock[]);
        setCanvasSize(previousCanvasData.size);
        setCanvasColor(previousCanvasData.filter.color);
        setCanvasOpacity(previousCanvasData.filter.opacity);
      }
      setUndoStack(undoStack.slice(0, undoStack.length - 4));
      setRedoStack([canvasData, ...redoStack]);
    }
  };

  // применение последнего отмененного действия
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextCanvasData = redoStack[redoStack.length - 1];
      if (nextCanvasData) {
        setCanvasData(nextCanvasData);
        setTexts(nextCanvasData.objects.filter(obj => obj.type === 'text') as TextBlock[]);
        setImages(nextCanvasData.objects.filter(obj => obj.type === 'image') as ImageBlock[]);
        setRectangles(nextCanvasData.objects.filter(obj => obj.type === 'art-object' && obj.object === "rectangle") as ArtObjectBlock[]);
        setEllipses(nextCanvasData.objects.filter(obj => obj.type === 'art-object' && obj.object === "ellipse") as ArtObjectBlock[]);
        setTriangles(nextCanvasData.objects.filter(obj => obj.type === 'art-object' && obj.object === "triangle") as ArtObjectBlock[]);
        setCanvasSize(nextCanvasData.size);
        setCanvasColor(nextCanvasData.filter.color);
        setCanvasOpacity(nextCanvasData.filter.opacity);
      }
      setRedoStack(redoStack.slice(0, redoStack.length - 1));
      setUndoStack([canvasData, ...undoStack]);
    }
  };


  // сохраняем слепок холста при изменении холста
  useEffect(() => {
    setUndoStack(prevUndoStack => [...prevUndoStack, canvasData]);
    console.log(canvasData)
  }, [canvasData]);


  // ссылка на холст для последующего скачивания в формате PNG/JPEG
  const handleSetCanvasRef = (newRef: React.RefObject<HTMLDivElement>) => {
    canvasRef.current = newRef.current;
  }

  const handleToggleSaveWindow = (show: boolean) => {
    setShowSaveWindow(show);
  }

  // получаем введенное название 
  const handleImageNameChange = (name: string) => {
    setCanvasName(name);
  };

  // получаем выбранный формат
  const handleImageFormatChange = (format: Format) => {
    setCanvasFormat(format);
  };

  // если пользователь подтвердил загрузку, вызываем функцию для скачивания и передаем туда полученные название и формат
  const handleConfirmSave = () => {
    HandleSaveAsImage(canvasRef, canvasName, canvasFormat);
    setShowSaveWindow(false);
  }

  const handleCancelSave = () => {
    setShowSaveWindow(false);
  }

  return (
    <div className="App" >
      <Header
        onTextToolClick={handleTextToolClick}
        onRectangleToolClick={handleRectangleToolClick}
        onEllipseToolClick={handleEllipseToolClick}
        onTriangleToolClick={handleTriangleToolClick}
        onFileUpload={handleFileUpload}
        onUnderlineToolClick={handleUnderlineToolClick}
        onItalicsToolClick={handleItalicsToolClick}
        onBoldToolClick={handleBoldToolClick}
        onColorToolClick={handleColorChange}
        onClearCanvasClick={handleClearCanvas}
        onDeleteElementClick={handleDeleteElement}
        onChangeWidth={handleImageWidthToolClick}
        onChangeHeight={handleImageHeightToolClick}
        onSelectedValueChange={handleSelectedValueChange}
        onSelectedFamilyChange={handleSelectedFamilyChange}
        underlined={underlined}
        italics={italics}
        bold={bold}
        selectedValue={selectedValue}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      <div className='wrapper' style={{ margin: `${marginHeight}px ${marginWidth}px` }} onClick={handleCanvasClick}>
        <div onClick={handlePlaceRectangle}>
          <div onClick={handlePlaceEllipse}>
            <div onClick={handlePlaceTriangle}>
              <CanvasView {...canvasData}
                canv={canvasData}
                setCanvasData={setCanvasData}
                texts={texts}
                setTexts={setTexts}
                rectangles={rectangles}
                setRectangles={setRectangles}
                ellipses={ellipses}
                setEllipses={setEllipses}
                triangles={triangles}
                setTriangles={setTriangles}
                images={images}
                setImages={setImages}
                selectedObject={selectedObject}
                setSelectedObject={setSelectedObject}
                handleCanvasClick={handleCanvasClick}
                setCanvasRef={handleSetCanvasRef}
              />
              {showDialog && (
                <ClearConfirmationDialog
                  onConfirm={handleConfirmClear}
                  onCancel={handleCancelClear}
                />
              )}
              {/* окно подтверждения загрузки */}
              {showSaveWindow && (
                <SaveConfirmationDialog
                  onConfirm={handleConfirmSave}
                  onCancel={handleCancelSave}
                  onImageNameChange={handleImageNameChange}
                  onImageFormatChange={handleImageFormatChange}
                  canvasName={canvasName}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer
        setCanvasData={setCanvasData}
        setTexts={setTexts}
        setImages={setImages}
        setRectangles={setRectangles}
        setEllipses={setEllipses}
        setTriangles={setTriangles}
        setCanvasColor={setCanvasColor}
        setCanvasOpacity={setCanvasOpacity}
        setCanvasSize={setCanvasSize}
        canvasRef={canvasRef}
        canvasData={canvasData}
        onChangeCanvasSize={handleCanvasSizeChange}
        onChangeCanvasColor={handleCanvasColorChange}
        onChangeCanvasOpacity={handleCanvasOpacityChange}
        onToggleSaveWindow={handleToggleSaveWindow}
      />
    </div>
  );
}

export default App;
