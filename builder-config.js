import esbuild from "esbuild";
import chokidar from "chokidar";
import uws from "uWebSockets.js";
import p from "phin";
import esbuildSocketPlugin from "./lib/esbuildSocketPlugin.js";

esbuild
  .serve(
    {
      servedir: "./",
    },
    {
      entryPoints: ["src/index.tsx"],
      bundle: true,
      outfile: "build/js/main.js",
      plugins: [esbuildSocketPlugin],
      sourcemap: true,
    }
  )
  .then((result) => {
    const { host, port } = result;

    uws
      .App({})
      .ws("/ws", {
        /* There are many common helper features */
        // idleTimeout: 30,
        // maxBackpressure: 1024,
        // maxPayloadLength: 512,
        // compression: DEDICATED_COMPRESSOR_3KB,

        /* For brevity we skip the other events (upgrade, open, ping, pong, close) */
        message: (ws, message, isBinary) => {
          chokidar
            .watch("src", {
              ignoreInitial: true,
              ignored: /build|node_modules|.git/,
            })
            .on("all", (event, path) => {
              ws.cork(() => {
                ws.send(message, isBinary, true);
              });
            })
            .on("ready", () => {
              console.log(
                "Chokidar : Initial scan complete. Ready for changes"
              );
            });
        },
      })
      .any("/build/*", async (res, req) => {
        /* Inspired by : https://github.com/Prozi/uwebsockets.js/blob/master/examples/AsyncFunction.js */
        res.onAborted(() => {
          res.aborted = true;
        });
        const headers = {};
        req.forEach((headerKey, headerValue) => {
          headers[headerKey] = headerValue;
        });
        const path = req.getUrl();
        const method = req.getMethod();
        const url = `http://${host}:${port}${path}`;

        const esBuildResp = await p({
          method: method,
          url,
          headers,
        });

        if (esBuildResp.statusCode === 404) {
          if (!res.aborted) {
            res
              .writeStatus("404")
              .writeHeader("Content-Type", "text/html")
              .end("<h1>404 not found</h1>");
          }
        } else {
          if (!res.aborted) {
            res.writeStatus(esBuildResp.statusCode.toString());
            Object.keys(esBuildResp.headers).forEach((headerKey) => {
              res.writeHeader(
                headerKey,
                esBuildResp.headers[headerKey].toString()
              );
            });
            res.end(esBuildResp.body);
          }
        }
      })
      .any("/*", async (res, req) => {
        res.onAborted(() => {
          res.aborted = true;
        });
        const headers = {};
        req.forEach((headerKey, headerValue) => {
          headers[headerKey] = headerValue;
        });
        const path = "/"; // redirect every req to root "/"
        const method = req.getMethod();
        const url = `http://${host}:${port}${path}`;

        const esBuildResp = await p({
          method: method,
          url,
          headers,
        });

        if (!res.aborted) {
          res.writeStatus(esBuildResp.statusCode.toString());
          Object.keys(esBuildResp.headers).forEach((headerKey) => {
            res.writeHeader(
              headerKey,
              esBuildResp.headers[headerKey].toString()
            );
          });

          // Maybe you should add the ws code here rather than in an esbuild plugin. I don't know
          res.end(esBuildResp.body.toString());
        }
      })
      .listen(4000, (listenSocket) => {
        if (listenSocket) {
          console.log(`http://localhost:4000`);
        }
      });
  });
