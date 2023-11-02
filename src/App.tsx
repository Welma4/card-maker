import React from 'react';
import './App.css';
import ImageView from './components/ImageView/ImageView';
import { image1Block } from './maxData';
import { doc } from './maxData';
import { Canvas } from './types';
import CanvasView from './components/CanvasView/CanvasView';



const App = () => {
  const Canv: Canvas = {
      name: doc.page.name,
      color: doc.page.color,
      size: doc.page.size,
      filter: doc.page.filter,
      objects: [...doc.page.objects],
      format: doc.page.format

  } 
  return (
    <div className="App">
       <CanvasView {...Canv} />
    </div>
    
  );
}

export default App;
