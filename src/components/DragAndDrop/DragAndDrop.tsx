import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

type Position = { x: number; y: number };

const useDragAndDrop = (setPos: Dispatch<SetStateAction<Position>>) => {
    const ref = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    let startPos: Position = { x: 0, y: 0 };
    let modelPos: Position = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
        if (ref.current) {
            isDragging.current = true;
            startPos = { x: e.pageX, y: e.pageY };
            const rect = ref.current.getBoundingClientRect();
            modelPos = { x: rect.left, y: rect.top };
        }
    };
    
    const handlePointerMove = (e: PointerEvent) => {
        if (isDragging.current) {
            const deltaX = e.pageX - startPos.x;
            const deltaY = e.pageY - startPos.y;
            setPos(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
            startPos = { x: e.pageX, y: e.pageY }; 
        }
    };
    
    const handlePointerUp = () => {
        isDragging.current = false;
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
    }, [ref, setPos]);
    

    return ref;
};

export default useDragAndDrop;
