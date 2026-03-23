import { createRequire } from 'node:module';
import { join } from 'node:path';
import {
  writeExtractedCss,
  extractCss,
  type WriteExtractedCssOptions,
  type TypestylesExtractManifestV1,
} from '@typestyles/build';
import type { NextConfig } from 'next';

export {
  writeExtractedCss,
  extractCss,
  type WriteExtractedCssOptions,
  type TypestylesExtractManifestV1,
};

export interface BuildTypestylesForNextOptions {
  root: string;
  modules: string[];
  cssOutFile: string;
  manifestOutFile?: string;
  manifestCssPath?: string;
}

/**
 * Extract TypeStyles CSS for a Next.js app (run from a script before `next build`, or in CI).
 */
export async function buildTypestylesForNext(options: BuildTypestylesForNextOptions): Promise<void> {
  await writeExtractedCss({
    root: options.root,
    modules: options.modules,
    outFile: options.cssOutFile,
    manifestOutFile: options.manifestOutFile,
    manifestCssPath: options.manifestCssPath,
  });
}

export interface WithTypestylesExtractOptions {
  /**
   * When true (default), client bundles skip DOM style injection (`__TYPESTYLES_RUNTIME_DISABLED__`).
   * Pair with a global stylesheet from {@link buildTypestylesForNext}.
   */
  disableClientRuntime?: boolean;
}

/**
 * Merge Next.js config so client bundles use pre-extracted CSS only (no runtime `<style>` injection).
 *
 * - **Webpack**: adds `DefinePlugin` for `__TYPESTYLES_RUNTIME_DISABLED__` on client bundles.
 * - **Turbopack** (`next dev --turbo` / Turbopack production): webpack hooks do not run; the same
 *   `next.config` `env` entry `NEXT_PUBLIC_TYPESTYLES_RUNTIME_DISABLED` is merged so the client
 *   bundle still disables runtime insertion (see `typestyles` `sheet` implementation).
 */
export function withTypestylesExtract(
  nextConfig: NextConfig = {},
  options: WithTypestylesExtractOptions = {},
): NextConfig {
  const disableClientRuntime = options.disableClientRuntime !== false;

  return {
    ...nextConfig,
    ...(disableClientRuntime
      ? {
          env: {
            ...(typeof nextConfig.env === 'object' &&
            nextConfig.env !== null &&
            !Array.isArray(nextConfig.env)
              ? (nextConfig.env as Record<string, string>)
              : {}),
            NEXT_PUBLIC_TYPESTYLES_RUNTIME_DISABLED: 'true',
          },
        }
      : {}),
    webpack(config, context) {
      const nextWebpack =
        typeof nextConfig.webpack === 'function' ? nextConfig.webpack(config, context) : config;

      if (disableClientRuntime && !context.isServer) {
        try {
          const require = createRequire(join(process.cwd(), 'package.json'));
          const webpackLib = require('webpack') as typeof import('webpack');
          nextWebpack.plugins.push(
            new webpackLib.DefinePlugin({
              __TYPESTYLES_RUNTIME_DISABLED__: JSON.stringify('true'),
            }),
          );
        } catch {
          console.warn(
            '[@typestyles/next/build] Could not load webpack; client bundles may still inject <style>.',
          );
        }
      }

      return nextWebpack;
    },
  };
}
