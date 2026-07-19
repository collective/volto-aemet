/**
 * Aemet Weather Forecast Messages.
 */

import { defineMessages } from 'react-intl';

const messages = defineMessages({
  aemetWeatherForecastBlock: {
    id: 'AEMET Weather Forecast',
    defaultMessage: 'AEMET Weather Forecast',
  },
  locationID: {
    id: 'Location ID',
    defaultMessage: 'Location ID',
  },
  locationIDHelp: {
    id: "The Location ID of the AEMET service, for example '41091' to Sevilla location ID.",
    defaultMessage:
      "The Location ID of the AEMET service, for example '41091' to Sevilla location ID.",
  },
  province: {
    id: 'Province',
    defaultMessage: 'Province',
  },
  provinceHelp: {
    id: 'The name of the province of the location (in lowercase) of the AEMET service.',
    defaultMessage:
      'The name of the province of the location (in lowercase) of the AEMET service.',
  },
  defaultFieldset: {
    id: 'Default',
    defaultMessage: 'Default',
  },
});

export default messages;
