/**
 * AEMET Settings.
 * @module settings
 */

import type { ConfigType } from '@plone/registry';
import aemetIconSVG from 'volto-aemet/icons/aemet-logo.svg';

export default function install(config: ConfigType) {
  // Add the icon for the AEMET settings control panel
  config.settings.controlPanelsIcons = {
    ...config.settings.controlPanelsIcons,
    'aemet-settings': aemetIconSVG,
  };
  return config;
}
