import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  }); // We need to get the CMS client using the paylaod client and this is similar to our database

  app.use((req, res) => {
    nextHandler(req, res);
  });

  nextApp.prepare().then(() => {
    payload.logger.info("NextJS Started!");

    app.listen(PORT, async () => {
      payload.logger.info(
        `NextJS App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
