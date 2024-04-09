import React, { useRef } from 'react';
import cls from './LoadPlace.module.css';

export const LoadPlace = (props) => {
  const { loadFile, loadByUrl } = props;
  const ref = useRef();
  return (
    <div className={cls.container}>
      <label class={cls.inputFile}>
        <input type="file" name="file" onChange={loadFile} />
        <span class={cls.inputFileBtn}>Выберите файл</span>
      </label>
      <span>Или укажите ссылку</span>
      <label className={cls.inputUrl}>
        <input type="text" ref={ref} className={cls.input} />
        <button
          onClick={() => loadByUrl(ref.current.value)}
          className={cls.btnLoad}
        >
          Загрузить
        </button>
      </label>
    </div>
  );
};
