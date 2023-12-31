import { useEffect, useRef, useState } from 'react';
import chroma from 'chroma-js';
import { Button } from './components/Button';
import { SliderLabelValue } from './components/Slider';
import iro from '@jaames/iro';
import { getFontColor } from './utils/color.util';
import { numList } from './utils/list.utils';
import { ThemeModeToggle } from './components/ThemeModeToggle';

function App() {
  const colorPickerRef = useRef(null);

  const [numColors, setNumColors] = useState(3);
  const [rotation, setRotation] = useState(360);
  const [separation, setSeparation] = useState(360);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [locked, setLocked] = useState([false, false, false, false]);

  const interval = separation / numColors;

  useEffect(() => {
    if (!colorPickerRef.current) return;
    const interval = separation / numColors;
    const colorPicker = iro.ColorPicker(colorPickerRef.current, {
      layout: [{ component: iro.ui.Wheel }],
      colors: numList(numColors).map(i => ({
        h: (rotation + interval * i) % 360,
        s: saturation * 100,
        v: brightness * 100,
      })),
    });
    return () => {
      colorPicker.base?.remove();
    };
  }, [colorPickerRef, rotation, interval, numColors, separation, saturation, brightness]);

  const colorComponents = numList(numColors).map(i => {
    const color = chroma.hsv((rotation + interval * i) % 360, saturation, brightness);
    return (
      <div
        key={i}
        className="w-64 h-12 flex justify-center items-center rounded-lg"
        style={{ background: color.hex() }}
      >
        <p style={{ color: getFontColor(color) }}>{color.hex()}</p>
      </div>
    );
  });

  return (
    <div>
      <div className="fixed top-2 right-2">
        <ThemeModeToggle />
      </div>
      <div className="flex flex-row justify-center space-x-4 flex-wrap m-16">
        <div className="space-y-4 mb-4 w-72">
          <div className="flex space-x-2">
            <Button
              className="flex-1"
              variant="outline"
              disabled={numColors == 1}
              onClick={() => setNumColors(numColors - 1)}
            >
              Remove Color
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setNumColors(numColors + 1)}
            >
              Add Color
            </Button>
          </div>
          <SliderLabelValue
            label="Rotation"
            locked={locked[0]}
            value={rotation}
            max={360}
            step={1}
            onValueChange={setRotation}
            onLockChange={value => setLocked(arr => arr.map((l, i) => (i == 0 ? value : l)))}
          />
          <SliderLabelValue
            label="Separation"
            locked={locked[1]}
            value={separation}
            max={360}
            step={1}
            onValueChange={setSeparation}
            onLockChange={value => setLocked(arr => arr.map((l, i) => (i == 1 ? value : l)))}
          />
          <SliderLabelValue
            label="Saturation"
            locked={locked[2]}
            value={saturation}
            max={1}
            step={0.01}
            onValueChange={setSaturation}
            onLockChange={value => setLocked(arr => arr.map((l, i) => (i == 2 ? value : l)))}
          />
          <SliderLabelValue
            label="Brightness"
            locked={locked[3]}
            value={brightness}
            max={1}
            step={0.01}
            onValueChange={setBrightness}
            onLockChange={value => setLocked(arr => arr.map((l, i) => (i == 3 ? value : l)))}
          />
          <div className="flex space-x-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => {
                setNumColors(3);
                setRotation(360);
                setSeparation(360);
                setSaturation(1);
                setBrightness(1);
              }}
            >
              Reset
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => {
                if (!locked[0]) setRotation(Math.floor(Math.random() * 360));
                if (!locked[1]) setSeparation(Math.floor(Math.random() * 360));
                if (!locked[2]) setSaturation(Number(Math.random().toFixed(2)));
                if (!locked[3]) setBrightness(Number(Math.random().toFixed(2)));
              }}
            >
              Randomize
            </Button>
          </div>
        </div>
        <div className="space-y-2 mb-4">{colorComponents}</div>
        <div ref={colorPickerRef} style={{ pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

export default App;
