import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";
export async function render(url: string, manifest: any) {
  const { app, router, store } = createApp();

  router.push(url);
  await router.isReady();

  const matchedComponents = router.currentRoute.value.matched;

  await Promise.all(
    matchedComponents.map((item) => {
      // @ts-ignore
      if (item.components.default.asyncData) {
        // @ts-ignore
        return item.components.default.asyncData({
          store,
          route: router.currentRoute.value
        });
      }
    })
  );

  const ctx = {} as any;

  const html = await renderToString(app, ctx);

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

  return [html, preloadLinks, store];
}

function renderPreloadLinks(modules: Set<string>, manifest: any) {
  let links = "";
  const seen = new Set();
  modules.forEach((id: string) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file: string) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    // TODO
    return "";
  }
}
