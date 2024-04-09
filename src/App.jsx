import { useState } from 'react';
import './App.css';
import { InfoBox } from './components/InfoBox/InfoBox';
import { CanvasContainer } from './components/CanvasContainer/CanvasContainer';
import { LoadPlace } from './components/LoadPlace/LoadPlace';
import { EditBox } from './components/EditBox/EditBox';

function App() {
  const [drawCanvas, setDrawCanvas] = useState();
  const [data, setData] = useState({ x: 0, y: 0, rgba: '255,255,255,1' });
  const [selected, setSelected] = useState({
    x: 0,
    y: 0,
    rgba: '255,255,255,1',
  });
  const [size, setSize] = useState(100);
  const [startSize, setStartSize] = useState(null);

  const loadFile = (event) => {
    const target = event.target;

    if (!FileReader) {
      alert('FileReader не поддерживается — облом');
      return;
    }

    if (!target.files.length) {
      alert('Ничего не загружено');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = function () {
      const image = new Image();
      image.src = fileReader.result;
      image.onload = function () {
        setDrawCanvas({
          src: fileReader.result,
          width: this.width,
          height: this.height,
        });
        setStartSize({
          width: this.width,
          height: this.height,
        });
      };
    };
    fileReader.readAsDataURL(target.files[0]);
  };
  const loadByUrl = (url) => {
    var image = new Image();
    image.crossOrigin = `Anonymous`;
    image.src = url;
    image.onload = function () {
      setDrawCanvas({ src: image.src, width: this.width, height: this.height });
      setStartSize({
        width: this.width,
        height: this.height,
      });
    };
  };

  const ResizeImg = (data, width, height) => {
    const image = new Image();
    image.crossOrigin = `Anonymous`;
    image.src = data.src;
    image.width = width;
    image.height = height;
    setDrawCanvas({
      src: image.src,
      width: width,
      height: height,
    });
  };

  return (
    <div className="App">
      <div className="main">
        <div className="content">
          <div className="drawContainer">
            <CanvasContainer
              drawCanvas={drawCanvas}
              setData={setData}
              setSelected={setSelected}
              size={size}
            />
            <LoadPlace loadByUrl={loadByUrl} loadFile={loadFile} />
          </div>

          {drawCanvas && (
            <div className="infContainer">
              <EditBox
                setSize={setSize}
                data={drawCanvas}
                ResizeImg={ResizeImg}
                drawCanvas={drawCanvas}
                startSize={startSize}
              />
              <InfoBox drawCanvas={drawCanvas} data={data} text="Hovered" />
              <InfoBox
                drawCanvas={drawCanvas}
                data={selected}
                text="Selected"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
