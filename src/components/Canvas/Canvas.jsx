import React, { memo, useEffect, useRef } from 'react';
import cls from './Canvas.module.css';
import { useState } from 'react';

export const Canvas = memo((props) => {
  const { src, width, height } = props.drawCanvas;
  const { size } = props;
  const canvasRef = useRef(null);

  const dowlandCanvas = () => {
    console.log('ok');
    const canvasUrl = canvasRef.current.toDataURL('image/png');
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = 'download-this-canvas';
    createEl.click();
    createEl.remove();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const image = new Image();
    image.crossOrigin = `Anonymous`;
    image.src = src;

    image.onload = () => {
      if (size === '50') {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width / 2;
        canvas.height = image.height / 2;
        context.setTransform(0.5, 0, 0, 0.5, 0, 0);
      } else if (size === '200') {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = width * 2;
        canvas.height = height * 2;
        context.scale(2, 2);
      } else if (size === '100') {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;
        canvas.height = image.height;
        context.setTransform(1, 0, 0, 1, 0, 0);
        console.log('ok');
      }
      let x = (canvas.width - image.width) / 2;
      let y = (canvas.height - image.height) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, width, height);
      image.style.display = 'none';
      const getPixelData = (event) => {
        const context = canvas.getContext('2d', { willReadFrequently: true });
        const x = event.offsetX - 0;
        const y = event.offsetY;
        const pixel = context.getImageData(x, y, 1, 1);
        const data = pixel.data;
        const rgba =
          'rgba(' +
          data[0] +
          ', ' +
          data[1] +
          ', ' +
          data[2] +
          ', ' +
          data[3] / 255 +
          ')';
        return { x, y, rgba };
      };
      const onEvent = (event, word) => {
        const result = getPixelData(event);
        word === 'click' ? props.setSelected(result) : props.setData(result);
      };
      const move = canvas.addEventListener('mousemove', (event) =>
        onEvent(event, 'hover')
      );
      const click = canvas.addEventListener('click', (event) =>
        onEvent(event, 'click')
      );
      return () => {
        canvas.removeEventListener(move);
        canvas.removeEventListener(click);
      };
    };
  }, [props, size, src]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={cls.canvas}
        width={width}
        height={height}
      />
      <button onClick={dowlandCanvas} className={cls.download}>
        Скачать
      </button>
    </>
  );
});
