import React, { useState } from 'react';

export default function ColorConverter() {
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [error, setError] = useState(null);

  const handleHexChange = (event) => {
    const inputHex = event.target.value;
    setHexColor(inputHex);

    if (event.target.value.length === 7) {
      if (/^#[0-9A-Fa-f]{6}$/.test(inputHex)) {
        setError(null);
        const hex = inputHex.substring(1);
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        setRgbColor(`rgb(${r}, ${g}, ${b})`);
        document.body.style.backgroundColor = inputHex;
      } else {
        setRgbColor('');
        document.body.style.backgroundColor = '#f54b42';
        setError('Ошибка!');
      }
    } else {
      setError(null);
      setRgbColor('');
      document.body.style.backgroundColor = '#ffffff';
    }
  };

  return (
    <div>
      <input
        className="input"
        type="text"
        value={hexColor}
        onChange={handleHexChange}
        maxLength="7"
      />
      {error && <p className="message">{error}</p>}
      {rgbColor && <p className="message">{rgbColor}</p>}
    </div>
  );
};
