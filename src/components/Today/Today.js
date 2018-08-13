import React from 'react'
import { getIconClassName } from '../../utils/Utils';
import './Today.css';



const Today = ({data, unit}) => {
  const {
    day, date,
    weatherId, description,
    mainTemp, minTemp, maxTemp,
    pressure, humidity, windSpeed } = data;

  const iconClass = getIconClassName(weatherId);
  const windSpeedUnit = (unit === 'F') ? 'mph' : 'm/s';

  return (
    <div className="today-wrapper">
    <div className="date-wrapper">
      <div>{day}</div>
      <div>{date}</div>
    </div>

    <div className="icon-desc-wrapper">
      <div className="icon-wrapper">
        <i className={`wi wi-owm-${weatherId} weather-icon ${iconClass}`} ></i>
      </div>
      <div className="weather-desc">{description}</div>
    </div>

    <div className="temp-wrapper">
      <div className="temp-text">
        <span>{mainTemp}</span>
        <i className="wi wi-degrees"></i>
      </div>
      <div className="high-low-wrapper">
        <div className="high-low-item">
          <span>
            <i className="wi wi-direction-up" ></i>
          </span>
          <span>Max</span>
          <span>
            <span>{maxTemp}&#x00B0;</span>
          </span>
        </div>
        <div className="high-low-item">
          <span>
            <i className="wi wi-direction-down" ></i>
          </span>
          <span>Min</span>
          <span>
            <span>{minTemp}&#x00B0;</span>
          </span>
        </div>
      </div>
    </div>

    <div className="extra-info-wrapper">
      <div className="extra-info-item">
        <span><i className="wi wi-humidity"></i></span>
        <span>Humidity</span>
        <span>{humidity}%</span>
      </div>
      <div className="extra-info-item">
        <span><i className="wi wi-barometer"></i></span>
        <span>Pressure</span>
        <span>{pressure} hPa</span>
      </div>
      <div className="extra-info-item">
        <span><i className="wi wi-strong-wind"></i></span>
        <span>Wind Speed</span>
        <span>{windSpeed} {windSpeedUnit}</span>
      </div>
    </div>
  </div>
  )
}

export default Today;