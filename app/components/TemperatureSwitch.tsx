'use client';
import { useState } from 'react';
interface TemperatureSwitchProps {
  onChange: (unit: 'C' | 'F') => void;
}
const TemperatureSwitch = ({ onChange }: TemperatureSwitchProps) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleSwitch = () => {
    const newUnit = !isCelsius ? 'C' : 'F';
    setIsCelsius(!isCelsius);
    onChange(newUnit);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={!isCelsius} onChange={handleSwitch} />
        Fahrenheit
      </label>
      <label>
        <input type="checkbox" checked={isCelsius} onChange={handleSwitch} />
        Celsius
      </label>
    </div>
  );
};

export default TemperatureSwitch;
