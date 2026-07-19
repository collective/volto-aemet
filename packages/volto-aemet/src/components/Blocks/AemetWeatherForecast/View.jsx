/**
 * Aemet Weather Forecast View mode.
 */
import React from 'react';
import { useIntl } from 'react-intl';
import cx from 'classnames';
import messages from './messages';

const AemetWeatherForecastView = (props) => {
  const intl = useIntl();
  const { data, style, className } = props;
  return (
    <div style={style} className={cx('block handson', { className })}>
      <div className="block-inner-container">
        <iframe
          name="iframe_aemet_id33044"
          title={intl.formatMessage(messages.aemetWeatherForecastBlock)}
          width="100%"
          height="100%"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabindex="0"
          id="iframe_aemet_id33044"
          src={`https://www.aemet.es/es/eltiempo/prediccion/municipios/mostrarwidget/${data.province || 'sevilla'}-id${data.location_id || '41091'}?w=g4p011100001ohmffffffx4f86d9t95b6e9r1s8n2`}
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
};

export default AemetWeatherForecastView;
