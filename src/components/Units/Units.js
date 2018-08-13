import React from 'react';
import './Units.css'

const Units = ({ unit, changeUnit }) => {
  return (
    <div className="unit-container">
      <span className={`unit-value ${unit === 'F' ? 'active-unit' : ''}`} onClick={changeUnit}>
        F
      </span>
      <span className={`unit-value ${unit === 'C' ? 'active-unit' : ''}`} onClick={changeUnit}>
        C
      </span>
    </div>
  );
};

export default Units;
