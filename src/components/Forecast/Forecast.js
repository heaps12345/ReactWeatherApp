import React from 'react';
import SingleDay from './SingleDay';
import './Forecast.css'

const Forecast = ({data}) => {
  const items = data.map(singleDayData => (<SingleDay key={singleDayData.day} data={singleDayData} />))
    return (
      <div className="forecast-wrapper">
        {items}
      </div>
    );

}

export default Forecast;