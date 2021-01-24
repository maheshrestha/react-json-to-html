// @flow

export default async function(): Promise<*> {
  const el = document.querySelector('[data-aaa]');

  if (!el) {
    return;
  }

  const module = await import(
    './index' /* webpackChunkName: "aaa" */
  );
  module.default(el);
}
