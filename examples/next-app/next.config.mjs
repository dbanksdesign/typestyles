import { withTypestyles } from '@typestyles/next/build';

/**
 * In production, disables client `<style>` injection when a convention entry exists (same paths as
 * `@typestyles/vite`). Development keeps runtime injection for fast refresh without re-running the
 * extraction script on every change — pair `pnpm dev` with `pnpm typestyles:build` once (or rely on
 * prebuilt CSS from a prior build).
 */
export default withTypestyles({
  transpilePackages: ['typestyles', '@typestyles/next'],
});
