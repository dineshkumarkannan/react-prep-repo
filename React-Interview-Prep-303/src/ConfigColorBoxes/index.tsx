import React, { useRef, useState } from "react";
import "./index.css";

type BoxConfig = {
  color: string;
  width: string;
};

const INITIAL_BOX_CONFIG: BoxConfig[] = [
  { color: "blue", width: "33.3%" },
  { color: "green", width: "33.3%" },
  { color: "yellow", width: "33.3%" },
  { color: "orange", width: "60%" },
  { color: "gray", width: "40%" },
  { color: "purple", width: "20%" },
  { color: "brown", width: "80%" },
];

const Box = ({
  config,
  onClick,
}: {
  config: BoxConfig;
  onClick: (conf: BoxConfig) => void;
}) => (
  <div
    onClick={() => onClick(config)}
    className="box"
    style={{
      width: config.width,
      backgroundColor: config.color,
      cursor: "pointer",
    }}
    title={`Click to see color: ${config.color}`}
    tabIndex={0}
    role="button"
    aria-label={`Box with color ${config.color} and width ${config.width}`}
    onKeyPress={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick(config);
    }}
  >
    {config.width}
  </div>
);

const BoxForm = ({
  onCreate,
}: {
  onCreate: (color: string, width: string) => void;
}) => {
  const inputColorRef = useRef<HTMLInputElement>(null);
  const inputWidthRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const color = inputColorRef.current?.value.trim();
    const width = inputWidthRef.current?.value.trim();
    if (
      color &&
      width &&
      !isNaN(Number(width)) &&
      Number(width) > 0 &&
      Number(width) <= 100
    ) {
      onCreate(color, width + "%");
      if (inputColorRef.current) inputColorRef.current.value = "";
      if (inputWidthRef.current) inputWidthRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="box-form">
      <input
        type="text"
        name="color"
        ref={inputColorRef}
        placeholder="color"
        aria-label="Box color"
        required
      />
      <input
        type="number"
        name="width"
        max={100}
        min={1}
        ref={inputWidthRef}
        placeholder="width (%)"
        aria-label="Box width percentage"
        required
      />
      <button type="submit">Create</button>
    </form>
  );
};

const ConfigColorBoxes = () => {
  const [boxConfig, setBoxConfig] = useState<BoxConfig[]>(INITIAL_BOX_CONFIG);

  function handleBoxClick(conf: BoxConfig) {
    alert(`Box clicked color is ${conf.color}`);
  }

  function handleCreate(color: string, width: string) {
    setBoxConfig((prev) => [...prev, { color, width }]);
  }

  return (
    <>
      <div className="box-container">
        {boxConfig.map((config, idx) => (
          <Box
            key={config.color + config.width + idx}
            config={config}
            onClick={handleBoxClick}
          />
        ))}
      </div>
      <BoxForm onCreate={handleCreate} />
    </>
  );
};

export default ConfigColorBoxes;
