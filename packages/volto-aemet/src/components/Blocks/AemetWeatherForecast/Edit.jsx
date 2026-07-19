/**
 * Aemet Weather Forecast Edit mode.
 */
import React from 'react';
import cx from 'classnames';
import messages from './messages';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { useIntl } from 'react-intl';

const AemetWeatherForecastEdit = (props) => {
  const {
    block,
    data,
    style,
    className,
    blocksConfig,
    selected,
    onChangeBlock,
    navRoot,
    contentType,
    blocksErrors,
  } = props;
  const intl = useIntl();

  const schema = blocksConfig['aemetWeatherForecast'].blockSchema({
    props,
    intl,
  });

  return (
    <>
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
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
          blocksConfig={blocksConfig}
          navRoot={navRoot}
          contentType={contentType}
          errors={blocksErrors}
        />
      </SidebarPortal>
    </>
  );
};

export default AemetWeatherForecastEdit;
