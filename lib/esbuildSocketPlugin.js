import fs from "fs";
import path from "path";

export default {
  name: "setSocket",
  setup(build) {
    build.onLoad({ filter: /src\/index.tsx$/ }, async (args) => {
      const dirname = process.cwd();

      // Load the file from the file system
      let source = await fs.promises.readFile(args.path, "utf8");
      // let filename = path.relative(dirname, args.path);

      let socket = await fs.promises.readFile(dirname + "/lib/ws.js", "utf8");

      const contents = [source, socket].join("\n"); // "\" = line break

      try {
        return { contents, loader: "jsx" };
      } catch (e) {
        return { errors: e };
      }
    });
  },
};
