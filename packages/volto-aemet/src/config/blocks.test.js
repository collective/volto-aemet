/**
 * Blocks configuration tests.
 * @module blocks.test
 */

// Mock components BEFORE imports - this is critical for TypeScript resolution
import install from './blocks';
import '@plone/registry';

jest.mock('volto-aemet/components/Blocks/AemetWeatherCurrent/View', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('volto-aemet/components/Blocks/AemetWeatherForecast/Edit', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('volto-aemet/components/Blocks/AemetWeatherForecast/View', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('volto-aemet/components/Blocks/AemetWeatherForecast/schema', () => ({
  AemetWeatherForecastSchema: {
    title: 'AEMET Weather Forecast',
    fieldsets: [{ id: 'default', title: 'Default', fields: [] }],
    properties: {},
  },
}));

jest.mock('volto-aemet/icons/aemet-logo.svg', () => 'aemet-logo.svg');

describe('Blocks configuration', () => {
  let testConfig;

  beforeEach(() => {
    // Create a fresh config object for each test
    testConfig = {
      blocks: {
        groupBlocksOrder: [
          { id: 'text', title: 'Text' },
          { id: 'media', title: 'Media' },
        ],
        blocksConfig: {
          title: {
            id: 'title',
            title: 'Title',
          },
          text: {
            id: 'text',
            title: 'Text',
          },
        },
      },
    };
  });

  describe('install function', () => {
    it('should return config object', () => {
      const result = install(testConfig);
      expect(result).toBeDefined();
      expect(result).toBe(testConfig);
    });

    it('should add AEMET blocks to groupBlocksOrder', () => {
      const result = install(testConfig);

      expect(result.blocks.groupBlocksOrder).toContainEqual({
        id: 'aemetWeatherForecast',
        title: 'AEMET Weather Forecast',
      });

      expect(result.blocks.groupBlocksOrder).toContainEqual({
        id: 'aemetWeatherCurrent',
        title: 'AEMET Weather Current',
      });
    });

    it('should preserve existing groupBlocksOrder items', () => {
      const result = install(testConfig);

      expect(result.blocks.groupBlocksOrder).toContainEqual({
        id: 'text',
        title: 'Text',
      });

      expect(result.blocks.groupBlocksOrder).toContainEqual({
        id: 'media',
        title: 'Media',
      });
    });
  });

  describe('aemetWeatherCurrent block configuration', () => {
    it('should register aemetWeatherCurrent block', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent).toBeDefined();
    });

    it('should have correct id', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.id).toBe(
        'aemetWeatherCurrent',
      );
    });

    it('should have correct title', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.title).toBe(
        'AEMET Weather Current',
      );
    });

    it('should belong to media group', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.group).toBe(
        'media',
      );
    });

    it('should have aemet icon', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.icon).toBe(
        'aemet-logo.svg',
      );
    });

    it('should have view component', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.view).toBeDefined();
    });

    it('should not be restricted', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.restricted).toBe(
        false,
      );
    });

    it('should not be in mostUsed', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.mostUsed).toBe(
        false,
      );
    });

    it('should have sidebarTab set to 1', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.sidebarTab).toBe(1);
    });

    it('should have security configuration', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherCurrent.security).toEqual({
        addPermission: [],
        view: [],
      });
    });
  });

  describe('aemetWeatherForecast block configuration', () => {
    it('should register aemetWeatherForecast block', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast).toBeDefined();
    });

    it('should have correct id', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast.id).toBe(
        'aemetWeatherForecast',
      );
    });

    it('should have correct title', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast.title).toBe(
        'AEMET Weather Forecast',
      );
    });

    it('should belong to media group', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast.group).toBe(
        'media',
      );
    });

    it('should have aemet icon', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast.icon).toBe(
        'aemet-logo.svg',
      );
    });

    it('should have view component', () => {
      const result = install(testConfig);
      expect(
        result.blocks.blocksConfig.aemetWeatherForecast.view,
      ).toBeDefined();
    });

    it('should have edit component', () => {
      const result = install(testConfig);
      expect(
        result.blocks.blocksConfig.aemetWeatherForecast.edit,
      ).toBeDefined();
    });

    it('should have blockSchema', () => {
      const result = install(testConfig);
      expect(
        result.blocks.blocksConfig.aemetWeatherForecast.blockSchema,
      ).toBeDefined();
      expect(
        result.blocks.blocksConfig.aemetWeatherForecast.blockSchema.title,
      ).toBe('AEMET Weather Forecast');
    });

    it('should not be restricted', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast.restricted).toBe(
        false,
      );
    });

    it('should not be in mostUsed', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast.mostUsed).toBe(
        false,
      );
    });

    it('should have sidebarTab set to 1', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast.sidebarTab).toBe(
        1,
      );
    });

    it('should have security configuration', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.aemetWeatherForecast.security).toEqual({
        addPermission: [],
        view: [],
      });
    });
  });

  describe('Block order in groupBlocksOrder', () => {
    it('should add forecast block before current block', () => {
      const result = install(testConfig);
      const groupOrder = result.blocks.groupBlocksOrder;

      const forecastIndex = groupOrder.findIndex(
        (item) => item.id === 'aemetWeatherForecast',
      );
      const currentIndex = groupOrder.findIndex(
        (item) => item.id === 'aemetWeatherCurrent',
      );

      expect(forecastIndex).toBeLessThan(currentIndex);
    });

    it('should have correct total number of blocks in groupBlocksOrder', () => {
      const result = install(testConfig);
      // Original 2 blocks + 2 AEMET blocks = 4
      expect(result.blocks.groupBlocksOrder).toHaveLength(4);
    });
  });

  describe('Integration with existing config', () => {
    it('should not remove existing blocks config', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.title).toBeDefined();
      expect(result.blocks.blocksConfig.text).toBeDefined();
    });

    it('should maintain existing block properties', () => {
      const result = install(testConfig);
      expect(result.blocks.blocksConfig.title.id).toBe('title');
      expect(result.blocks.blocksConfig.text.id).toBe('text');
    });
  });
});
