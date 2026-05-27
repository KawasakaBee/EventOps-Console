import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: './src/shared/tests/setup.units.ts',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: [
            'src/**/*.stories.{ts,tsx}',
            'src/**/*.integration.test.{ts,tsx}',
          ],
          clearMocks: true,
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          environment: 'jsdom',
          globals: true,
          setupFiles: './src/shared/tests/setup.integration.ts',
          include: ['src/**/*.integration.test.{ts,tsx}'],
          exclude: ['src/**/*.stories.{ts,tsx}'],
          clearMocks: true,
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
