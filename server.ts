import express, { type Request, type Response } from "express";
import next from "next";
import path from "path";
import { parse } from "url";
import * as url from "url";

import { startAdmin } from "@/admin";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const server = express();

const handler = async (req: Request, res: Response) => {
  try {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  } catch (error) {
    console.error(error);
  }
};

startAdmin(server);

server.get("*", handler);
server.post("*", handler);

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

server.use(express.static(path.join(__dirname, "./public")));

server.listen(port, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
