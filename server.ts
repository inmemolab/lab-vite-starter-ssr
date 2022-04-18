// Ini Imports
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { createServer as _createServer, ViteDevServer } from "vite";
// Ini .env
dotenv.config();
const env = process.env;
// Ini server for ssr
async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === "production") {
  // Resolve dir files
  const resolve = (p: string) => path.resolve(__dirname, p);
  // Read manifest
  const manifest = isProd ? fs.readFileSync(resolve("dist/client/ssr-manifest.json")) : {};
  // Read index file
  const indexProd = isProd ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8") : "";
  // Ini express app
  const app = express();
  // Ini vite server
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite: ViteDevServer;
  // Select if server is in prod or dev
  if (!isProd) {
    vite = await _createServer({
      root,
      logLevel: "info",
      server: {
        middlewareMode: "ssr",
        watch: {
          usePolling: true,
          interval: 100
        }
      }
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(require("compression")());
    app.use(
      require("serve-static")(resolve("dist/client"), {
        index: false
      })
    );
  }

  // mock
  app.use("/api", async (req: Request, res: Response) => {
    const body = [
      {
        name: "wahaha",
        age: 16
      },
      {
        name: "wahaha",
        age: 16
      },
      {
        name: "wahaha",
        age: 16
      }
    ];
    const data = {
      data: body,
      code: 0,
      msg: ""
    };
    res.end(JSON.stringify(data));
  });

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
      } else {
        template = indexProd;
        render = require("./dist/server/entry-server.js").render;
      }
      const [appHtml, preloadLinks, store] = await render(url, manifest);

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace("/*sync-state*/", `window.__SSR_STATE__='${JSON.stringify(store.state.value)}'`);

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e: any) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
  return { app };
}

createServer().then(({ app }) =>
  app.listen(env.VITE_PORT, () => {
    console.log(`⚡️[server]: 🚀  Server listening on http://localhost:${env.VITE_PORT}`);
  })
);
