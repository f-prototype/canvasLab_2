import React from 'react';
import cls from './CanvasContainer.module.css';
import { Canvas } from '../Canvas/Canvas';

export const CanvasContainer = (props) => {
  return (
    <div className={cls.container}>
      {props.drawCanvas && <Canvas {...props} />}
    </div>
  );
};
