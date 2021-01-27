// @flow

export default async function(): Promise<*> {
  const el = document.querySelector('[data-aa]');

  if (!el) {
    return;
  }

  const module = await import(
    './index' /* webpackChunkName: "aa" */
  );
  module.default(el);
}
