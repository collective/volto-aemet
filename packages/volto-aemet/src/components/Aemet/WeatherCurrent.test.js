/**
 * Unit tests for WeatherCurrent.jsx view component.
 * @module components/Aemet/WeatherCurrent.test
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { useWeatherData, getWeatherIcon } from './Weather.js';
import WeatherCurrent from './WeatherCurrent.jsx';

// ---------------------------------------------------------------------------
// Mocks (hoisted by babel-jest before imports)
// ---------------------------------------------------------------------------

jest.mock('./Weather.js', () => ({
  weatherMessages: {
    minimumMaximum: {
      id: 'minimum_maximum',
      defaultMessage: 'Minimum-Maximum',
    },
    currentDay: { id: 'current_day', defaultMessage: 'Current day' },
    currentLocation: {
      id: 'current_location',
      defaultMessage: 'Current location',
    },
    currentTemperature: {
      id: 'current_temperature',
      defaultMessage: 'Current temperature',
    },
    currentTime: { id: 'current_time', defaultMessage: 'Current time' },
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
  },
  getWeatherIcon: jest.fn(() => 'mocked-icon.png'),
  useWeatherData: jest.fn(),
}));

jest.mock('@plone/volto/components/theme/Image/Image', () => {
  const MockImage = ({ src, alt }) => <img src={src} alt={alt} />;
  return MockImage;
});

// Fix moment to a predictable point in time so clock assertions are stable.
jest.mock('moment', () => {
  const fixedTime = {
    format: jest.fn((pattern) => {
      if (pattern === 'HH:mm') return '14:30';
      if (pattern === 'ddd') return 'Fri';
      if (pattern === 'YYYY-MM-DD') return '2024-01-15';
      return '';
    }),
  };
  return jest.fn(() => fixedTime);
});

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

const MOCK_DAY = {
  currentHour: '14',
  date: '2024-01-15',
  name: 'Fuenlabrada',
  provinceName: 'Madrid',
  skyStateDescription: 'Clear sky',
  skyStateText: '11',
  minTemp: '18',
  maxTemp: '33',
  timePeriod: '12-18',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const renderComponent = () =>
  render(
    <IntlProvider locale="en" messages={{}}>
      <WeatherCurrent />
    </IntlProvider>,
  );

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('WeatherCurrent', () => {
  afterEach(() => {
    // clearAllMocks preserves mock implementations (including the moment factory)
    // while still resetting call counts. resetAllMocks would strip the
    // jest.fn(() => fixedTime) factory, making moment() return undefined.
    jest.clearAllMocks();
  });

  // -------------------------------------------------------------------------
  describe('loading state', () => {
    it('shows the loading message when isLoading is true', () => {
      useWeatherData.mockReturnValue({ forecast: [], isLoading: true });
      renderComponent();
      expect(screen.getByText(/Loading weather forecast/i)).toBeInTheDocument();
    });

    it('shows the loading message when forecast array is empty', () => {
      useWeatherData.mockReturnValue({ forecast: [], isLoading: false });
      renderComponent();
      expect(screen.getByText(/Loading weather forecast/i)).toBeInTheDocument();
    });

    it('does not render the forecast card while loading', () => {
      useWeatherData.mockReturnValue({ forecast: [], isLoading: true });
      const { container } = renderComponent();
      expect(
        container.querySelector('.weather-current-card'),
      ).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  describe('data state', () => {
    beforeEach(() => {
      useWeatherData.mockReturnValue({
        forecast: [MOCK_DAY],
        isLoading: false,
      });
    });

    it('does not show the loading message when data is available', () => {
      renderComponent();
      expect(
        screen.queryByText(/Loading weather forecast/i),
      ).not.toBeInTheDocument();
    });

    it('renders the current time in HH:mm format', () => {
      renderComponent();
      expect(screen.getByText('14:30')).toBeInTheDocument();
    });

    it('renders the day abbreviation in uppercase', () => {
      renderComponent();
      expect(screen.getByText('FRI')).toBeInTheDocument();
    });

    it('renders the name', () => {
      renderComponent();
      expect(screen.getByText(/Fuenlabrada/)).toBeInTheDocument();
    });

    it('renders the province name', () => {
      renderComponent();
      expect(screen.getByText(/Madrid/)).toBeInTheDocument();
    });

    it('renders the temperature range (min-max)', () => {
      renderComponent();
      expect(screen.getByText('18-33\u00ba')).toBeInTheDocument();
    });

    it('renders the maximum temperature', () => {
      renderComponent();
      expect(screen.getByText('33\u00ba')).toBeInTheDocument();
    });

    it('renders the weather icon with sky state description as alt text', () => {
      renderComponent();
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Clear sky');
    });

    it('sets the sky state description as the icon wrapper title', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.weather-current-icon')).toHaveAttribute(
        'title',
        'Clear sky',
      );
    });

    it('calls getWeatherIcon with the correct sky state text', () => {
      renderComponent();
      expect(getWeatherIcon).toHaveBeenCalledWith('11');
    });

    it('sets the currentTime title on the time span', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.weather-current-time')).toHaveAttribute(
        'title',
        'Current time',
      );
    });

    it('sets the currentDay title on the day span', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.weather-current-day')).toHaveAttribute(
        'title',
        'Current day',
      );
    });

    it('sets the currentLocation title on the city div', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.weather-current-city')).toHaveAttribute(
        'title',
        'Current location',
      );
    });
  });

  // -------------------------------------------------------------------------
  describe('fallbacks', () => {
    it('still renders province when name is missing', () => {
      useWeatherData.mockReturnValue({
        forecast: [{ ...MOCK_DAY, name: '' }],
        isLoading: false,
      });
      const { container } = renderComponent();
      expect(
        container.querySelector('.weather-current-city').textContent,
      ).toContain('Madrid');
    });

    it('still renders name when provinceName is missing', () => {
      useWeatherData.mockReturnValue({
        forecast: [{ ...MOCK_DAY, provinceName: '' }],
        isLoading: false,
      });
      const { container } = renderComponent();
      expect(
        container.querySelector('.weather-current-city').textContent,
      ).toContain('Fuenlabrada');
    });

    it('uses the weatherDescription default message as icon title when skyStateDescription is absent', () => {
      useWeatherData.mockReturnValue({
        forecast: [{ ...MOCK_DAY, skyStateDescription: '' }],
        isLoading: false,
      });
      const { container } = renderComponent();
      expect(container.querySelector('.weather-current-icon')).toHaveAttribute(
        'title',
        'Weather description',
      );
    });
  });

  // -------------------------------------------------------------------------
  describe('clock timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      useWeatherData.mockReturnValue({
        forecast: [MOCK_DAY],
        isLoading: false,
      });
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('registers a 60-second interval for the live clock', () => {
      const spy = jest.spyOn(global, 'setInterval');
      renderComponent();
      expect(spy).toHaveBeenCalledWith(expect.any(Function), 60000);
    });

    it('clears the interval on unmount to prevent memory leaks', () => {
      const clearSpy = jest.spyOn(global, 'clearInterval');
      const { unmount } = renderComponent();
      unmount();
      expect(clearSpy).toHaveBeenCalled();
    });
  });
});
