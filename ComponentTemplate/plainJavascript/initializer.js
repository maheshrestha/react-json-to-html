export default async function () {
  const el = document.querySelector("[data-{{ componentName }}]");

  if (!el) {
    return;
  }

  const module = await import(
    "./index" /* webpackChunkName: "{{ componentName }}" */
  );
  module.default(el);
}
