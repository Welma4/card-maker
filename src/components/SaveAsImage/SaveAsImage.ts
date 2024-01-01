import html2canvas from 'html2canvas';
import { Format } from '../../types';

export default function HandleSaveAsImage (divRef: React.RefObject<HTMLDivElement>, name: string, format: Format) {
    if (divRef.current) {
      html2canvas(divRef.current).then((canvas) => {
        const imgData = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.download = `${name}.${format}`;
        link.href = imgData;
        link.click();
      });
    }
  };