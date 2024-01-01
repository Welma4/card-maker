import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

type Position = { x: number; y: number };
type Size = { width: number; height: number };

const useResizeAndDrag = (
  setPos: Dispatch<SetStateAction<Position>>,
  setSize: Dispatch<SetStateAction<Size>>,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  let startPos: Position = { x: 0, y: 0 };
  let startSize: Size = { width: 0, height: 0 };
  let modelPos: Position = { x: 0, y: 0 };
  let resizeSide: 'left' | 'right' | 'top' | 'bottom' | null = null;

  const handlePointerDown = (e: PointerEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const resizeBorder = 20;
      const offsetX = e.pageX - rect.left;
      const offsetY = e.pageY - rect.top;

      if (offsetX < resizeBorder) {
        resizeSide = 'left';
      } else if (rect.width - offsetX < resizeBorder) {
        resizeSide = 'right';
      } else if (offsetY < resizeBorder) {
        resizeSide = 'top';
      } else if (rect.height - offsetY < resizeBorder) {
        resizeSide = 'bottom';
      }

      if (resizeSide) {
        isResizing.current = true;
        startPos = { x: e.pageX, y: e.pageY };
        startSize = { width: ref.current.offsetWidth, height: ref.current.offsetHeight };
        modelPos = { x: rect.left, y: rect.top };
      } else {
        isDragging.current = true;
        startPos = { x: e.pageX, y: e.pageY };
        modelPos = { x: rect.left, y: rect.top };
      }
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (isResizing.current) {
      const deltaX = e.pageX - startPos.x;
      const deltaY = e.pageY - startPos.y;

      if (resizeSide === 'left') {
        setSize(prevSize => ({ width: prevSize.width - deltaX, height: prevSize.height }));
        setPos(prev => ({ x: prev.x + deltaX, y: prev.y }));
      } else if (resizeSide === 'right') {
        setSize(prevSize => ({ width: prevSize.width + deltaX, height: prevSize.height }));
      } else if (resizeSide === 'top') {
        setSize(prevSize => ({ width: prevSize.width, height: prevSize.height - deltaY }));
        setPos(prev => ({ x: prev.x, y: prev.y + deltaY }));
      } else if (resizeSide === 'bottom') {
        setSize(prevSize => ({ width: prevSize.width, height: prevSize.height + deltaY }));
      }

      startPos = { x: e.pageX, y: e.pageY };
    } else if (isDragging.current) {
      const deltaX = e.pageX - startPos.x;
      const deltaY = e.pageY - startPos.y;
      setPos(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      startPos = { x: e.pageX, y: e.pageY };
    }
  };

  const handlePointerUp = () => {
    isResizing.current = false;
    isDragging.current = false;
    resizeSide = null;
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('pointerdown', handlePointerDown);
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('pointerdown', handlePointerDown);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      }
    };
  }, [ref, setPos, setSize]);

  return ref;
};

export default useResizeAndDrag;
