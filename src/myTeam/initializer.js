// @flow

export default async function() {
  const el = document.querySelector('[data-my-team]');

  if (!el) {
    return;
  }

  const module = await import(
    './index.jsx' /* webpackChunkName: "my-team" */
  );
  module.default(el);
}
