import type { ConfigType } from '@plone/registry';
import installSettings from 'volto-aemet/config/settings';
import blocksSettings from 'volto-aemet/config/blocks';
import 'volto-aemet/theme/main.scss';

// Re-export public utilities and components so consumers can import them
// from 'volto-aemet' without knowing the internal folder structure.
export {
  default as WeatherCurrent,
  getWeatherIcon,
  useWeatherData,
  weatherMessages,
} from 'volto-aemet/components/Aemet';

const applyConfig = (config: ConfigType) => {
  // Add your custom configurations here
  installSettings(config);
  // Get the new blocks configuration
  blocksSettings(config);

  return config;
};

export default applyConfig;
