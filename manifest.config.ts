import { defineManifest } from '@crxjs/vite-plugin';
import { name, version, author } from './package.json';

const EXTENSION_NAMES = {
  build: name,
  serve: `[DEV] ${name}`,
} as const;

const createIconFileSuffix = (command: 'build' | 'serve') =>
  command === 'serve' ? '-dev' : '';

// import to `vite.config.ts`
export default defineManifest(({ command, mode, ...manifest }) => ({
  ...manifest,
  version,
  manifest_version: 3,
  name: EXTENSION_NAMES[command],
  description: '',
  icons: {
    '16': `public/logo/icon16${createIconFileSuffix(command)}.png`,
    '48': `public/logo/icon48${createIconFileSuffix(command)}.png`,
    '128': `public/logo/icon128${createIconFileSuffix(command)}.png`,
  },
  action: {
    default_popup: 'popup.html',
  },
  options_ui: {
    page: 'options.html',
  },
  author,
  permissions: ['background', 'tabs', 'scripting', 'storage'],
  host_permissions: [
    '*://*/*protect.draft/view/*', //下書き記事
  ],
  content_scripts: [
    {
      matches: ['*://*/*'],
      include_globs: [
        '*/open.knowledge/view/*', // 公開記事
      ],
      js: ['src/content_scripts/counter.tsx'],
    },
  ],
  background: {
    service_worker: 'src/background.ts',
  },
}));
