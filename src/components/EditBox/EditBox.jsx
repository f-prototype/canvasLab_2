import React from 'react';
import cls from './EditBox.module.css';
import { Modal } from '../Modal/Modal';

export const EditBox = ({
  setSize,
  data,
  ResizeImg,
  drawCanvas,
  startSize,
}) => {
  return (
    <div className={cls.editBox}>
      <div className={cls.scale}>
        <p>Масштаб:</p>
        <select onChange={(e) => setSize(e.target.value)}>
          <option value={50}>50%</option>
          <option selected value={100}>
            100%
          </option>
          <option value={200}>200%</option>
        </select>
      </div>
      <Modal
        data={data}
        ResizeImg={ResizeImg}
        drawCanvas={drawCanvas}
        startSize={startSize}
      />
    </div>
  );
};
