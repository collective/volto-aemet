/**
 * Unit tests for Weather.js shared logic.
 * @module components/Aemet/Weather.test
 */

import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import moment from 'moment';

import { getWeatherIcon, weatherMessages, useWeatherData } from './Weather';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wrap a hook under test with an IntlProvider (required by useIntl). */
const wrapper = ({ children }) => (
  <IntlProvider locale="en" messages={{}}>
    {children}
  </IntlProvider>
);

// ---------------------------------------------------------------------------
// weatherMessages
// ---------------------------------------------------------------------------

describe('weatherMessages', () => {
  it('exports all required message keys', () => {
    const requiredKeys = [
      'minimumMaximum',
      'currentDay',
      'currentLocation',
      'currentTemperature',
      'currentTime',
      'loadingCurrent',
      'weatherNotAvailable',
      'weatherDescription',
    ];
    requiredKeys.forEach((key) => {
      expect(weatherMessages).toHaveProperty(key);
    });
  });

  it('every message has a non-empty string id and defaultMessage', () => {
    Object.values(weatherMessages).forEach((msg) => {
      expect(typeof msg.id).toBe('string');
      expect(msg.id.length).toBeGreaterThan(0);
      expect(typeof msg.defaultMessage).toBe('string');
      expect(msg.defaultMessage.length).toBeGreaterThan(0);
    });
  });
});

// ---------------------------------------------------------------------------
// getWeatherIcon
// ---------------------------------------------------------------------------

describe('getWeatherIcon', () => {
  it('returns a defined value for all known day codes', () => {
    const dayCodes = [
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '23',
      '24',
      '25',
      '26',
      '33',
      '34',
      '35',
      '36',
      '43',
      '44',
      '45',
      '46',
      '51',
      '52',
      '53',
      '54',
      '61',
      '62',
      '63',
      '64',
      '71',
      '72',
      '73',
      '74',
    ];
    dayCodes.forEach((code) => {
      const icon = getWeatherIcon(code);
      expect(icon).toBeDefined();
      expect(icon).not.toBeNull();
    });
  });

  it('returns a defined value for known night codes', () => {
    const nightCodes = [
      '11n',
      '12n',
      '13n',
      '14n',
      '15n',
      '16n',
      '17n',
      '23n',
      '24n',
      '25n',
      '26n',
      '33n',
      '34n',
      '35n',
      '36n',
      '43n',
      '44n',
      '45n',
      '46n',
      '51n',
      '52n',
      '54n',
      '61n',
      '62n',
      '63n',
      '64n',
      '71n',
      '72n',
    ];
    nightCodes.forEach((code) => {
      const icon = getWeatherIcon(code);
      expect(icon).toBeDefined();
      expect(icon).not.toBeNull();
    });
  });

  it('returns different icons for day and night when both exist', () => {
    expect(getWeatherIcon('11')).not.toBe(getWeatherIcon('11n'));
    expect(getWeatherIcon('46')).not.toBe(getWeatherIcon('46n'));
    expect(getWeatherIcon('61')).not.toBe(getWeatherIcon('61n'));
  });

  it('returns the same icon for 53 and 53n (no dedicated night icon)', () => {
    expect(getWeatherIcon('53n')).toBe(getWeatherIcon('53'));
  });

  it('returns the same icon for 73 and 73n', () => {
    expect(getWeatherIcon('73n')).toBe(getWeatherIcon('73'));
  });

  it('returns the same icon for 74 and 74n', () => {
    expect(getWeatherIcon('74n')).toBe(getWeatherIcon('74'));
  });

  it('trims surrounding whitespace from the input value', () => {
    expect(getWeatherIcon('  46  ')).toBe(getWeatherIcon('46'));
    expect(getWeatherIcon('  46n  ')).toBe(getWeatherIcon('46n'));
  });

  it('falls back to the day icon when only the night suffix is unknown', () => {
    // '11' is valid; pretend there is a code like '11X' whose day code exists
    // More directly: an uppercase N should not trip up the regex
    expect(getWeatherIcon('11N')).toBe(getWeatherIcon('11'));
  });

  it('returns the default icon (11) for an unknown sky-state code', () => {
    const defaultIcon = getWeatherIcon('11');
    expect(getWeatherIcon('999')).toBe(defaultIcon);
    expect(getWeatherIcon('abc')).toBe(defaultIcon);
    expect(getWeatherIcon('0')).toBe(defaultIcon);
  });

  it('returns the default icon for null input', () => {
    expect(getWeatherIcon(null)).toBe(getWeatherIcon('11'));
  });

  it('returns the default icon for undefined input', () => {
    expect(getWeatherIcon(undefined)).toBe(getWeatherIcon('11'));
  });

  it('returns the default icon for an empty string', () => {
    expect(getWeatherIcon('')).toBe(getWeatherIcon('11'));
  });
});

// ---------------------------------------------------------------------------
// useWeatherData
// ---------------------------------------------------------------------------

describe('useWeatherData', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    // Suppress expected console.error calls from error-path tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('starts with isLoading=true and an empty forecast array', () => {
    global.fetch.mockImplementation(() => new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useWeatherData(), { wrapper });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.forecast).toEqual([]);
  });

  it('populates forecast with today data on a successful fetch', async () => {
    const today = moment().format('YYYY-MM-DD');
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        forecast: [
          {
            currentHour: '14',
            date: today,
            name: 'Fuenlabrada',
            province: 'Madrid',
            skyState: 'Partly cloudy',
            skyStateValue: '46',
            tempMin: '19',
            tempMax: '36',
            timePeriod: '12-18',
          },
        ],
      }),
    });

    const { result } = renderHook(() => useWeatherData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.forecast).toHaveLength(1);
    const [day] = result.current.forecast;
    expect(day.currentHour).toBe('14');
    expect(day.date).toBe(today);
    expect(day.name).toBe('Fuenlabrada');
    expect(day.provinceName).toBe('Madrid');
    expect(day.skyStateDescription).toBe('Partly cloudy');
    expect(day.skyStateText).toBe('46');
    expect(day.minTemp).toBe('19');
    expect(day.maxTemp).toBe('36');
    expect(day.timePeriod).toBe('12-18');
  });

  it('calls the correct API endpoint with the proper headers', async () => {
    const today = moment().format('YYYY-MM-DD');
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        forecast: [
          {
            currentHour: '14',
            date: today,
            name: 'Fuenlabrada',
            province: 'Madrid',
            skyState: 'Sunny',
            skyStateValue: '11',
            tempMin: '20',
            tempMax: '38',
            timePeriod: '12-18',
          },
        ],
      }),
    });

    renderHook(() => useWeatherData(), { wrapper });

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/Plone/++api++/@aemet-weather-forecast',
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }),
      ),
    );
  });

  it('sets isLoading to false after a successful fetch', async () => {
    const today = moment().format('YYYY-MM-DD');
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        forecast: [
          {
            currentHour: '14',
            date: today,
            name: 'Sevilla',
            province: 'Sevilla',
            skyState: 'Clear',
            skyStateValue: '11',
            tempMin: '18',
            tempMax: '33',
            timePeriod: '12-18',
          },
        ],
      }),
    });

    const { result } = renderHook(() => useWeatherData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isLoading).toBe(false);
  });

  it('uses fallback data when the HTTP response is not ok', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, status: 500 });

    const { result } = renderHook(() => useWeatherData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const [fallback] = result.current.forecast;
    expect(fallback.name).toBe('Sevilla');
    expect(fallback.provinceName).toBe('Sevilla');
    expect(fallback.minTemp).toBe('--');
    expect(fallback.maxTemp).toBe('--');
    expect(fallback.skyStateText).toBe('11');
  });

  it('uses fallback data when fetch throws a network error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network failure'));

    const { result } = renderHook(() => useWeatherData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.forecast[0].name).toBe('Sevilla');
    expect(result.current.forecast[0].provinceName).toBe('Sevilla');
    expect(result.current.forecast[0].maxTemp).toBe('--');
  });

  it('uses fallback data when the API response has no forecast key', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useWeatherData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.forecast[0].name).toBe('Sevilla');
    expect(result.current.forecast[0].provinceName).toBe('Sevilla');
    expect(result.current.forecast[0].maxTemp).toBe('--');
  });

  it('uses fallback data when forecast array is empty', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ forecast: [] }),
    });

    const { result } = renderHook(() => useWeatherData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.forecast[0].name).toBe('Sevilla');
    expect(result.current.forecast[0].provinceName).toBe('Sevilla');
    expect(result.current.forecast[0].maxTemp).toBe('--');
  });

  it('uses fallback data when today is not in the forecast list', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        forecast: [
          {
            currentHour: '14',
            date: '2000-01-01', // deliberately not today
            name: 'Barcelona',
            province: 'Barcelona',
            skyState: 'Clear',
            skyStateValue: '11',
            tempMin: '10',
            tempMax: '20',
            timePeriod: '12-18',
          },
        ],
      }),
    });

    const { result } = renderHook(() => useWeatherData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.forecast[0].name).toBe('Sevilla');
    expect(result.current.forecast[0].provinceName).toBe('Sevilla');
    expect(result.current.forecast[0].maxTemp).toBe('--');
    expect(result.current.forecast[0].minTemp).toBe('--');
  });

  it('sets isLoading to false even when the fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Timeout'));

    const { result } = renderHook(() => useWeatherData(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isLoading).toBe(false);
  });
});
