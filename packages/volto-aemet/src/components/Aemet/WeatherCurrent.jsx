/**
 * WeatherCurrent component — card widget with time, day, city and temperature.
 * @module components/Aemet/WeatherCurrent
 */

import React, { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import moment from 'moment';
import Image from '@plone/volto/components/theme/Image/Image';
import { weatherMessages, getWeatherIcon, useWeatherData } from './Weather.js'; // explicit .js — shared logic, not the view

const WeatherCurrent = (props) => {
  const { forecast, isLoading } = useWeatherData();
  const intl = useIntl();
  const [currentTime, setCurrentTime] = useState(moment());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="weather-current-wrapper">
      {isLoading || forecast.length === 0 ? (
        <p>
          🌡️{' '}
          <FormattedMessage
            id="loading_weather_forecast"
            defaultMessage="Loading weather forecast..."
          />
        </p>
      ) : (
        forecast.slice(0, 1).map((day, i) => (
          <div key={i} className="weather-current-card">
            <div className="weather-current-time-row">
              <span
                className="weather-current-time"
                title={intl.formatMessage(weatherMessages.currentTime)}
              >
                {currentTime.format('HH:mm')}
              </span>
              <span
                className="weather-current-day"
                title={intl.formatMessage(weatherMessages.currentDay)}
              >
                {currentTime.format('ddd').toUpperCase()}
              </span>
            </div>
            <div
              className="weather-current-city"
              title={intl.formatMessage(weatherMessages.currentLocation)}
            >
              {`${day.name}, ${day.provinceName}` || 'Sevilla, Spain.'}
            </div>
            <div className="weather-current-bottom">
              <span
                className="weather-current-temp"
                title={intl.formatMessage(weatherMessages.minimumMaximum)}
              >
                {day.minTemp}-{day.maxTemp}º
              </span>
            </div>
            <div className="weather-current-bottom">
              <span
                className="weather-current-temp"
                title={intl.formatMessage(weatherMessages.currentTemperature)}
              >
                {day.maxTemp}º
              </span>
              <div
                className="weather-current-icon"
                title={
                  day.skyStateDescription ||
                  intl.formatMessage(weatherMessages.weatherDescription)
                }
              >
                <Image
                  src={getWeatherIcon(day.skyStateText)}
                  alt={
                    day.skyStateDescription ||
                    intl.formatMessage(weatherMessages.weatherDescription)
                  }
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WeatherCurrent;
