/**
 * Weather shared logic — data fetching and icon mapping.
 * @module components/Aemet/Weather
 */

import { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import moment from 'moment';
import config from '@plone/volto/registry';

import climate11Icon from 'volto-aemet/icons/weather/temps/11.png';
import climate11nIcon from 'volto-aemet/icons/weather/temps/11n.png';
import climate12Icon from 'volto-aemet/icons/weather/temps/12.png';
import climate12nIcon from 'volto-aemet/icons/weather/temps/12n.png';
import climate13Icon from 'volto-aemet/icons/weather/temps/13.png';
import climate13nIcon from 'volto-aemet/icons/weather/temps/13n.png';
import climate14Icon from 'volto-aemet/icons/weather/temps/14.png';
import climate14nIcon from 'volto-aemet/icons/weather/temps/14n.png';
import climate15Icon from 'volto-aemet/icons/weather/temps/15.png';
import climate15nIcon from 'volto-aemet/icons/weather/temps/15n.png';
import climate16Icon from 'volto-aemet/icons/weather/temps/16.png';
import climate16nIcon from 'volto-aemet/icons/weather/temps/16n.png';
import climate17Icon from 'volto-aemet/icons/weather/temps/17.png';
import climate17nIcon from 'volto-aemet/icons/weather/temps/17n.png';
import climate23Icon from 'volto-aemet/icons/weather/temps/23.png';
import climate23nIcon from 'volto-aemet/icons/weather/temps/23n.png';
import climate24Icon from 'volto-aemet/icons/weather/temps/24.png';
import climate24nIcon from 'volto-aemet/icons/weather/temps/24n.png';
import climate25Icon from 'volto-aemet/icons/weather/temps/25.png';
import climate25nIcon from 'volto-aemet/icons/weather/temps/25n.png';
import climate26Icon from 'volto-aemet/icons/weather/temps/26.png';
import climate26nIcon from 'volto-aemet/icons/weather/temps/26n.png';
import climate33Icon from 'volto-aemet/icons/weather/temps/33.png';
import climate33nIcon from 'volto-aemet/icons/weather/temps/33n.png';
import climate34Icon from 'volto-aemet/icons/weather/temps/34.png';
import climate34nIcon from 'volto-aemet/icons/weather/temps/34n.png';
import climate35Icon from 'volto-aemet/icons/weather/temps/35.png';
import climate35nIcon from 'volto-aemet/icons/weather/temps/35n.png';
import climate36Icon from 'volto-aemet/icons/weather/temps/36.png';
import climate36nIcon from 'volto-aemet/icons/weather/temps/36n.png';
import climate43Icon from 'volto-aemet/icons/weather/temps/43.png';
import climate43nIcon from 'volto-aemet/icons/weather/temps/43n.png';
import climate44Icon from 'volto-aemet/icons/weather/temps/44.png';
import climate44nIcon from 'volto-aemet/icons/weather/temps/44n.png';
import climate45Icon from 'volto-aemet/icons/weather/temps/45.png';
import climate45nIcon from 'volto-aemet/icons/weather/temps/45n.png';
import climate46Icon from 'volto-aemet/icons/weather/temps/46.png';
import climate46nIcon from 'volto-aemet/icons/weather/temps/46n.png';
import climate51Icon from 'volto-aemet/icons/weather/temps/51.png';
import climate51nIcon from 'volto-aemet/icons/weather/temps/51n.png';
import climate52Icon from 'volto-aemet/icons/weather/temps/52.png';
import climate52nIcon from 'volto-aemet/icons/weather/temps/52n.png';
import climate53Icon from 'volto-aemet/icons/weather/temps/53.png';
// import climate53nIcon from 'volto-aemet/icons/weather/temps/53n.png';
import climate54Icon from 'volto-aemet/icons/weather/temps/54.png';
import climate54nIcon from 'volto-aemet/icons/weather/temps/54n.png';
import climate61Icon from 'volto-aemet/icons/weather/temps/61.png';
import climate61nIcon from 'volto-aemet/icons/weather/temps/61n.png';
import climate62Icon from 'volto-aemet/icons/weather/temps/62.png';
import climate62nIcon from 'volto-aemet/icons/weather/temps/62n.png';
import climate63Icon from 'volto-aemet/icons/weather/temps/63.png';
import climate63nIcon from 'volto-aemet/icons/weather/temps/63n.png';
import climate64Icon from 'volto-aemet/icons/weather/temps/64.png';
import climate64nIcon from 'volto-aemet/icons/weather/temps/64n.png';
import climate71Icon from 'volto-aemet/icons/weather/temps/71.png';
import climate71nIcon from 'volto-aemet/icons/weather/temps/71n.png';
import climate72Icon from 'volto-aemet/icons/weather/temps/72.png';
import climate72nIcon from 'volto-aemet/icons/weather/temps/72n.png';
import climate73Icon from 'volto-aemet/icons/weather/temps/73.png';
// import climate73nIcon from 'volto-aemet/icons/weather/temps/73n.png';
import climate74Icon from 'volto-aemet/icons/weather/temps/74.png';
// import climate74nIcon from 'volto-aemet/icons/weather/temps/74n.png';

// ---------------------------------------------------------------------------
// i18n messages
// ---------------------------------------------------------------------------

export const weatherMessages = defineMessages({
  minimumMaximum: {
    id: 'minimum_maximum',
    defaultMessage: 'Minimum-Maximum',
  },
  currentDay: {
    id: 'current_day',
    defaultMessage: 'Current day',
  },
  currentLocation: {
    id: 'current_location',
    defaultMessage: 'Current location',
  },
  currentTemperature: {
    id: 'current_temperature',
    defaultMessage: 'Current temperature',
  },
  currentTime: {
    id: 'current_time',
    defaultMessage: 'Current time',
  },
  loadingCurrent: {
    id: 'loading_weather_forecast',
    defaultMessage: 'Loading weather forecast...',
  },
  weatherNotAvailable: {
    id: 'not_available',
    defaultMessage: 'Not available',
  },
  weatherDescription: {
    id: 'weather_description',
    defaultMessage: 'Weather description',
  },
});

// ---------------------------------------------------------------------------
// Icon mapping
// ---------------------------------------------------------------------------

const weatherIconMap = {
  11: climate11Icon,
  '11n': climate11nIcon,
  12: climate12Icon,
  '12n': climate12nIcon,
  13: climate13Icon,
  '13n': climate13nIcon,
  14: climate14Icon,
  '14n': climate14nIcon,
  15: climate15Icon,
  '15n': climate15nIcon,
  16: climate16Icon,
  '16n': climate16nIcon,
  17: climate17Icon,
  '17n': climate17nIcon,
  23: climate23Icon,
  '23n': climate23nIcon,
  24: climate24Icon,
  '24n': climate24nIcon,
  25: climate25Icon,
  '25n': climate25nIcon,
  26: climate26Icon,
  '26n': climate26nIcon,
  33: climate33Icon,
  '33n': climate33nIcon,
  34: climate34Icon,
  '34n': climate34nIcon,
  35: climate35Icon,
  '35n': climate35nIcon,
  36: climate36Icon,
  '36n': climate36nIcon,
  43: climate43Icon,
  '43n': climate43nIcon,
  44: climate44Icon,
  '44n': climate44nIcon,
  45: climate45Icon,
  '45n': climate45nIcon,
  46: climate46Icon,
  '46n': climate46nIcon,
  51: climate51Icon,
  '51n': climate51nIcon,
  52: climate52Icon,
  '52n': climate52nIcon,
  53: climate53Icon,
  '53n': climate53Icon, // Note: using same icon for day/night
  54: climate54Icon,
  '54n': climate54nIcon,
  61: climate61Icon,
  '61n': climate61nIcon,
  62: climate62Icon,
  '62n': climate62nIcon,
  63: climate63Icon,
  '63n': climate63nIcon,
  64: climate64Icon,
  '64n': climate64nIcon,
  71: climate71Icon,
  '71n': climate71nIcon,
  72: climate72Icon,
  '72n': climate72nIcon,
  73: climate73Icon,
  '73n': climate73Icon, // Note: using same icon for day/night
  74: climate74Icon,
  '74n': climate74Icon, // Note: using same icon for day/night
};

/**
 * Returns the weather icon image for a given AEMET sky-state value.
 * The value can be numeric ("46") or include a night suffix ("46n").
 */
export const getWeatherIcon = (skyStateValue) => {
  const cleanValue = skyStateValue?.trim();

  if (weatherIconMap[cleanValue]) {
    return weatherIconMap[cleanValue];
  }

  // Fallback: strip the night suffix and try again
  const numericValue = cleanValue?.replace(/n$/i, '');
  if (weatherIconMap[numericValue]) {
    return weatherIconMap[numericValue];
  }

  return climate11Icon;
};

// ---------------------------------------------------------------------------
// Data-fetching hook
// ---------------------------------------------------------------------------

/**
 * Custom hook that fetches today's weather forecast from the AEMET backend
 * endpoint and returns the transformed data.
 *
 * @returns {{ forecast: Array, isLoading: boolean }}
 */
export const useWeatherData = () => {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiPath = config.settings.apiPath;
  const intl = useIntl();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiUrl = `${apiPath}/++api++/@aemet-weather-forecast`;

        const response = await fetch(apiUrl, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.forecast && data.forecast.length > 0) {
          const todayForecast = data.forecast.find(
            (day) => day.date === moment().format('YYYY-MM-DD'),
          );

          if (todayForecast) {
            setForecast([
              {
                currentHour: todayForecast.currentHour,
                date: todayForecast.date,
                name: todayForecast.name,
                provinceName: todayForecast.province,
                skyStateDescription: todayForecast.skyState,
                skyStateText: todayForecast.skyStateValue,
                minTemp: todayForecast.tempMin,
                maxTemp: todayForecast.tempMax,
                timePeriod: todayForecast.timePeriod,
              },
            ]);
          } else {
            throw new Error('No forecast data available for today');
          }
        } else {
          throw new Error('Invalid response format from backend');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching weather data:', error.message);

        setForecast([
          {
            currentHour: moment().date(),
            date: moment().format('YYYY-MM-DD'),
            name: 'Sevilla',
            provinceName: 'Sevilla',
            skyStateDescription: intl.formatMessage(
              weatherMessages.weatherNotAvailable,
            ),
            skyStateText: '11',
            minTemp: '--',
            maxTemp: '--',
            timePeriod: intl.formatMessage(weatherMessages.weatherNotAvailable),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [intl, apiPath]);

  return { forecast, isLoading };
};
