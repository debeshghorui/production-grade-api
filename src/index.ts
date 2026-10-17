import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";

import { appRouter } from "./server/index.js";
import { createContext } from "./server/context.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Server is up and running" });
});

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
);

app.listen(8000, () => {
    console.log("Server is running on port http://localhost:8000");
});
