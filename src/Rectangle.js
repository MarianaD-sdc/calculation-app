import React, { useEffect } from 'react';

const Rectangle = ({ boardRef }: any) => {
  useEffect(() => {
    if (boardRef.current) {
      // Define the points of the rectangle
      const point1 = boardRef.current.create('point', [-3, 3]);
      const point2 = boardRef.current.create('point', [0, 3]);
      const point3 = boardRef.current.create('point', [0, 1]);
      const point4 = boardRef.current.create('point', [-3, 1],);

      // Create the rectangle (as a polygon)
      boardRef.current.create('polygon', [point1, point2, point3, point4], {
        borders: { strokeColor: 'green' },
        fillOpacity: 0.4,
        fixed: false,
        isDraggable: true,
        hasInnerPoints: true
      });
    }
  }, [boardRef]);

  return null; // This component doesn't render anything itself
};

export default Rectangle;
