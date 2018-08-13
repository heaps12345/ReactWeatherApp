import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Today from './components/Today/Today';
import Forecast from './components/Forecast/Forecast';
import Graph from './components/Graph/Graph';
import './App.css';
import './css/weather-icons.min.css';

class App extends Component {
  state = {
    searchTerm: '',
    unit: 'F',
    graphData: [18, 35, 40, 24, 31, 33],
    latLng: [],
    navbarData: {},
    todayComponentData: {},
    forecastComponentData: [],
    graphComponentData: []
  };

  changeUnit = e => {
    const newUnit = e.target.textContent;
    this.setState({
      unit: newUnit
    }, this.notifyStateChange);
    
  };

  onSearchTermChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  onSubmitSearch = e => {
    e.preventDefault();
    this.handleSearch(this.state.searchTerm);
  };

  handleSearch = input => {
    this.setState(
      {
        searchTerm: input,
        latLng: []
      },
      this.notifyStateChange
    );
  };

  componentDidMount() {
    // 1. navigator.geolocation will provide coordinates
    const geolocation = navigator.geolocation;
    if (geolocation) {
      // 3. This will be called when location access allowed
      const permissionGranted = position => {
        // We got position. Add it to state.
        // call the notifyStateChange function to fetch data.
        this.setState(
          {
            latLng: [position.coords.latitude, position.coords.longitude]
          },
          this.notifyStateChange
        );
      };

      // 4. This is when denied
      const permissionDenied = () => {
        console.log('Permission Denied');
      };

      // 2. getCurrentPosition will propmpt the permission dialog
      geolocation.getCurrentPosition(permissionGranted, permissionDenied);
    } else {
      console.log('GeoLocation not supported...Update the browser fella');
    }
  }
  fetchWeatherForecast = hasLatLng => {
    const API_KEY = '789c7a808690dc32dbf1324ad4b2e1e3';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast/daily';
    const queryParams = hasLatLng
      ? `lat=${this.state.latLng[0]}&lon=${this.state.latLng[1]}`
      : `q=${this.state.searchTerm}`;
    const unitType = this.state.unit === 'F' ? 'imperial' : 'metric';

    const url = `${BASE_URL}?${queryParams}&units=${unitType}&cnt=7&appid=${API_KEY}`;

    return fetch(url)
      .then(res => res.json())   
      .catch(error => {
        console.log('Error:', error);
      });
  };

  notifyStateChange = () => {
    const hasLatLng = this.state.latLng.length > 0;
    const hasCityOrZipcode = this.state.searchTerm !== '';

    if (hasLatLng || hasCityOrZipcode) {
      this.fetchWeatherForecast(hasLatLng)
      // .then(forecastData => forecastData.json())
        .then(forecastData => {
          // console.log('Forecast Data:', forecastData);
          // Extract component specific data...
          const navbarData = this.extractDataForNavbar(forecastData);
          const todayComponentData = this.extractDataForTodayComponent(forecastData);
          const { forecastComponentData, graphComponentData } = this.extractDataForForecastAndGraphComponent(
            forecastData
          );

          this.setState({
            navbarData,
            todayComponentData,
            forecastComponentData,
            graphComponentData
          });
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }
  };

  extractDataForNavbar = forecastData => {
    return {
      city: `${forecastData.city.name}, ${forecastData.city.country}`
    };
  };

  extractDataForTodayComponent = forecastData => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const todayForecast = forecastData.list[0];

    const time = new Date(todayForecast.dt * 1000);
    const day = this.getDay(time);
    const date = `${monthNames[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`;

    const weatherId = todayForecast.weather[0].id;
    const description = todayForecast.weather[0].description;

    const hours = new Date().getHours();
    const isDayTime = hours > 6 && hours < 20;
    let mainTemp = isDayTime ? todayForecast.temp.day : todayForecast.temp.night;
    mainTemp = Math.round(mainTemp);
    const minTemp = Math.round(todayForecast.temp.min);
    const maxTemp = Math.round(todayForecast.temp.max);

    const pressure = todayForecast.pressure;
    const humidity = todayForecast.humidity;
    const windSpeed = todayForecast.speed;

    return {
      day,
      date,
      weatherId,
      description,
      mainTemp,
      minTemp,
      maxTemp,
      pressure,
      humidity,
      windSpeed
    };
  };

  // Takes date object or unix timestamp in ms and returns day string
  getDay = time => {
    const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday', 'Saturday'];
    return daysNames[new Date(time).getDay()];
  };

  extractDataForForecastAndGraphComponent = forecastData => {
    const forecastComponentData = [];
    const graphComponentData = [];

    forecastData.list.forEach(forecast => {
      let item = {};
      item.day = this.getDay(forecast.dt * 1000);
      item.weatherId = forecast.weather[0].id;
      item.description = forecast.weather[0].description;
      item.mainTemp = Math.round(forecast.temp.day);

      forecastComponentData.push(item);
      graphComponentData.push(forecast.temp.day);
    });

    // Remove first element as that represents today's weather
    // ForecastComponent displays next 6 days data
    forecastComponentData.shift();

    return {
      forecastComponentData,
      graphComponentData
    };
  };

  render() {
    const hasLatLng = this.state.latLng.length > 0;
    const hasCityOrZipcode = this.state.searchTerm !== '';
    const shouldRenderApp = hasLatLng || hasCityOrZipcode;

    const instructionLayout = (
      <div className="app-instruction">
        <p>Allow Location Access or type city name/zip code in search area to get started.</p>
      </div>
    );

    const mainAppLayout = (
      <React.Fragment>
        <div className="app-today">
          <Today data={this.state.todayComponentData} unit={this.state.unit} />
        </div>
        <div className="app-list-graph">
          <Forecast data={this.state.forecastComponentData} />
          <Graph data={this.state.graphComponentData} />
        </div>
      </React.Fragment>
    );
    return (
      <div className="app-wrapper">
        <div className="app-nav">
          <Navbar
            onSearchTermChange={this.onSearchTermChange}
            handleSearch={this.handleSearch}
            onSubmitSearch={this.onSubmitSearch}
            searchTerm={this.state.searchTerm}
            changeUnit={this.changeUnit}
            unit={this.state.unit}
            data={this.state.navbarData}
          />
        </div>
        {shouldRenderApp ? mainAppLayout : instructionLayout}
      </div>
    );
  }
}

export default App;
