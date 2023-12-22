import React, { useState } from 'react';
import useDragAndDrop from './DragAndDrop/DragAndDrop';

const DraggableComponent = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  // const ref = useDragAndDrop(setPos);

  return (
    <div
      // ref={ref}
      style={{ position: 'absolute', left: pos.x, top: pos.y, border: '1px solid black' }}
    >
      TEST BLOCK
    </div>
  );
};

export default DraggableComponent;
