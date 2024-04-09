import React from 'react';
import cls from './Modal.module.css';
import { useRef } from 'react';
import { useState } from 'react';

export const Modal = ({ data, ResizeImg, drawCanvas, startSize }) => {
  const modal = useRef(null);
  const widthImage = useRef(null);
  const heightImage = useRef(null);
  const checkbox = useRef(null);
  const [selectedResize, setSelectedResize] = useState('px');

  const ChangeSize = (w, h) => {
    if (selectedResize === 'px') {
      if (checkbox.current.checked) {
        const ratio = drawCanvas.width / drawCanvas.height;
        ResizeImg(drawCanvas, w, w / ratio);
        heightImage.current.value = Math.round(w / ratio);
      } else {
        ResizeImg(drawCanvas, w, h);
      }
    } else {
      if (checkbox.current.checked) {
        const ratio = drawCanvas.width / drawCanvas.height;
        ResizeImg(
          drawCanvas,
          (w / 100) * drawCanvas.width,
          (w / 100) * drawCanvas.height
        );
        heightImage.current.value = w;
      } else {
        ResizeImg(
          drawCanvas,
          (w / 100) * drawCanvas.width,
          (h / 100) * drawCanvas.height
        );
      }
    }
  };

  return (
    <>
      <button onClick={() => modal.current.showModal()} className={cls.resize}>
        Изменить
      </button>
      <dialog ref={modal} className={cls.container}>
        <form method="dialog" className={cls.main}>
          <div className={cls.infoSizeBox}>
            <div>
              Начальный размер: {Math.round(startSize.width)} x{' '}
              {Math.round(startSize.height)}
            </div>
            <div>
              Текущий размер: {Math.round(data.width)} x{' '}
              {Math.round(data.height)}
            </div>
          </div>

          <div className={cls.selectBox}>
            <span>Единицы измерения: </span>
            <select onChange={(e) => setSelectedResize(e.target.value)}>
              <option value="px">пиксели</option>
              <option value="%">проценты</option>
            </select>
          </div>

          <div className={cls.resizeBox}>
            <label>
              <input placeholder="Высота" type="number" ref={widthImage} />
              {' ' + selectedResize}
            </label>
            <label>
              <input placeholder="Ширины" type="number" ref={heightImage} />
              {' ' + selectedResize}
            </label>
            <label>
              <div className={cls.checkboxBox}>
                <input type="checkbox" ref={checkbox} />
                Сохранять пропорции
              </div>
            </label>
            <span className={cls.tooltip}>
              <select class={cls.tooltipToggle}>
                <option disabled selected>
                  Алгоритм
                </option>
                <option> ближ. соседа</option>
              </select>
              <span class={cls.tooltipText}>
                Задается уровень тона по ближайшему пикселю
              </span>
            </span>
          </div>
          <button
            className={cls.aplly}
            onClick={() =>
              ChangeSize(widthImage.current.value, heightImage.current.value)
            }
          >
            Применить
          </button>
          <button onClick={() => modal.current.close()} className={cls.close}>
            X
          </button>
        </form>
      </dialog>
    </>
  );
};
