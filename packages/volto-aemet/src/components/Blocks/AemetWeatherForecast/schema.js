/**
 * Aemet Weather Forecast Schema.
 */

import messages from './messages';

export function AemetWeatherForecastSchema({ props, intl }) {
  const schema = {
    title: intl.formatMessage(messages.aemetWeatherForecastBlock),
    block: 'aemetWeatherForecast',

    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.defaultFieldset),
        fields: ['province', 'location_id'],
      },
    ],

    properties: {
      province: {
        title: intl.formatMessage(messages.province),
        description: intl.formatMessage(messages.provinceHelp),
        widget: 'text',
      },
      location_id: {
        title: intl.formatMessage(messages.locationID),
        description: intl.formatMessage(messages.locationIDHelp),
        widget: 'text',
      },
    },

    required: ['province', 'location_id'],
  };

  return schema;
}
