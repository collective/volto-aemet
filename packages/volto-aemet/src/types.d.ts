/**
 * Type declarations for JavaScript modules
 */

declare module 'volto-aemet/components/Blocks/AemetWeatherCurrent/View' {
  import { ComponentType } from 'react';
  const View: ComponentType<any>;
  export default View;
}

declare module 'volto-aemet/components/Blocks/AemetWeatherForecast/Edit' {
  import { ComponentType } from 'react';
  const Edit: ComponentType<any>;
  export default Edit;
}

declare module 'volto-aemet/components/Blocks/AemetWeatherForecast/View' {
  import { ComponentType } from 'react';
  const View: ComponentType<any>;
  export default View;
}

declare module 'volto-aemet/components/Blocks/AemetWeatherForecast/schema' {
  export const AemetWeatherForecastSchema: any;
}

declare module 'volto-aemet/icons/aemet-logo.svg' {
  const content: string;
  export default content;
}
