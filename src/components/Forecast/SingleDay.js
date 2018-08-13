import React from 'react';
import { getIconClassName } from '../../utils/Utils';


const SingleDay = ({data}) => {
  const { day, weatherId, description, mainTemp } = data;
  const iconClass = getIconClassName(weatherId);

  return (
    <div className="single-list-item">
      <div className="info-wrapper">
        <div className="day">{day}</div>
        <div className="temp">{mainTemp}&#x00B0;</div>
        <div className="desc">{description}</div>
      </div>
      <div className="forecast-weather-icon">
        <i className={`wi wi-owm-${weatherId} ${iconClass}`} />
      </div>
    </div>
  );
};

export default SingleDay;
