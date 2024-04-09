import React from 'react';
import cls from './InfoBox.module.css';

export const InfoBox = (props) => {
  const { data, drawCanvas, text } = props;
  return (
    <div className={cls.info}>
      <h2>{text}:</h2>
      <p>
        Size: {Math.round(drawCanvas.width)} x {Math.round(drawCanvas.height)}
      </p>
      <span>X: {data.x} </span>
      <span>Y: {data.y}</span>
      <div
        className={cls.colorBox}
        style={{ backgroundColor: data.rgba, color: data.rgba }}
      >
        <p>{data.rgba}</p>
      </div>
    </div>
  );
};
