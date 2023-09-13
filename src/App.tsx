import { useEffect, useRef, useState } from "react";
import chroma from "chroma-js";
import { Button } from "./components/Button";
import { Slider } from "./components/Slider";
import { Label } from "./components/Label";
import iro from "@jaames/iro";
import { getFontColor } from "./utils/color.util";

function App() {
  const colorPickerRef = useRef(null);
  const [r, setR] = useState(0);
  const [s, setS] = useState(1);
  const [v, setV] = useState(1);
  const [numColors, setNumColors] = useState(3);

  const interval = 360 / numColors;

  useEffect(() => {
    if (!colorPickerRef.current) return;
    const colorPicker = iro.ColorPicker(colorPickerRef.current, {
      layout: [{ component: iro.ui.Wheel }],
      colors: Array.from({ length: numColors }, (_, index) => index).map(
        (index) => ({
          h: (r + interval * index) % 360,
          s: s * 100,
          v: v * 100,
        })
      ),
    });
    return () => {
      colorPicker.base?.remove();
    };
  }, [colorPickerRef, r, interval, numColors, s, v]);

  const colorComponents = Array.from(
    { length: numColors },
    (_, index) => index
  ).map((index) => {
    const color = chroma.hsv((r + interval * index) % 360, s, v);
    return (
      <div
        key={index}
        className="w-64 h-16 flex justify-center items-center"
        style={{ background: color.hex() }}
      ><p style={{color: getFontColor(color)}}>{color.hex()}</p></div>
    );
  });

  return (
    <div className="flex flex-row justify-center space-x-4 flex-wrap m-16">
      <div className="space-y-4 mb-4">
        <div className="flex space-x-2">
          <Button
            disabled={numColors == 1}
            onClick={() => setNumColors(numColors - 1)}
          >
            Remove Color
          </Button>
          <Button onClick={() => setNumColors(numColors + 1)}>Add Color</Button>
        </div>
        <div className="space-y-2">
          <Label>Rotation</Label>
          <Slider
            value={[r]}
            max={interval}
            step={interval/100}
            onValueChange={(value) => setR(value[0])}
          />
        </div>
        <div className="space-y-2">
          <Label>Saturation</Label>
          <Slider
            value={[s]}
            max={1}
            step={0.01}
            onValueChange={(value) => setS(value[0])}
          />
        </div>
        <div className="space-y-2">
          <Label>Brightness</Label>
          <Slider
            value={[v]}
            max={1}
            step={0.01}
            onValueChange={(value) => setV(value[0])}
          />
        </div>
      </div>
      <div className="space-y-2 mb-4">{colorComponents}</div>
      <div ref={colorPickerRef} style={{ pointerEvents: "none" }} />
    </div>
  );
}

export default App;
