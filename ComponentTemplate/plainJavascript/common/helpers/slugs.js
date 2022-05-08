export const getSlugsFromUrl = (urlRegExps, url = window.location.pathname) => {
  return Object.keys(urlRegExps).reduce((pU, cU) => {
    let newURL = url;

    if (pU) {
      newURL = Object.values(pU).reduce((p, c) => {
        return p.replace(c, "");
      }, url);
    }

    const match = newURL.match(urlRegExps[cU]);
    return {
      ...pU,
      [cU]: match ? match[0] : "",
    };
  }, null);
};
