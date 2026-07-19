/**
 * Blocks configuration.
 * @module blocks
 */

import type { ConfigType } from '@plone/registry';

// AEMET Weather Current Block
import AemetWeatherCurrentView from 'volto-aemet/components/Blocks/AemetWeatherCurrent/View';

// AEMET Weather Forecast Block
import AemetWeatherForecastEdit from 'volto-aemet/components/Blocks/AemetWeatherForecast/Edit';
import AemetWeatherForecastView from 'volto-aemet/components/Blocks/AemetWeatherForecast/View';
import { AemetWeatherForecastSchema } from 'volto-aemet/components/Blocks/AemetWeatherForecast/schema';

// Icons
import aemetSVG from 'volto-aemet/icons/aemet-logo.svg';

export default function install(config: ConfigType) {
  // Add the new block to the group block order
  config.blocks.groupBlocksOrder = [
    ...config.blocks.groupBlocksOrder,
    {
      id: 'aemetWeatherForecast',
      title: 'AEMET Weather Forecast',
    },
    {
      id: 'aemetWeatherCurrent',
      title: 'AEMET Weather Current',
    },
  ];

  // AEMET Weather Current Block Config
  (config.blocks.blocksConfig as any).aemetWeatherCurrent = {
    id: 'aemetWeatherCurrent',
    title: 'AEMET Weather Current',
    group: 'media',
    icon: aemetSVG,
    view: AemetWeatherCurrentView,
    // edit: undefined,
    // blockSchema: undefined,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  // AEMET Weather Forecast Block Config
  (config.blocks.blocksConfig as any).aemetWeatherForecast = {
    id: 'aemetWeatherForecast',
    title: 'AEMET Weather Forecast',
    group: 'media',
    icon: aemetSVG,
    view: AemetWeatherForecastView,
    edit: AemetWeatherForecastEdit,
    blockSchema: AemetWeatherForecastSchema,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
}
