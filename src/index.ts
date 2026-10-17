import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from "trpc-to-openapi";

import { appRouter } from "./server/index.js";
import { createContext } from "./server/context.js";

const app = express();

app.use(express.json());

const openApiDocument = generateOpenApiDocument(appRouter, {
    title: "TRPC API",
    description: "TRPC API",
    version: "1.0.0",
    baseUrl: "http://localhost:8000/api",
});

app.get("/", (_req, res) => {
    res.json({ message: "Server is up and running" });
});

app.get("/openapi.json", (_req, res) => {
    res.json(openApiDocument);
});

app.use(
    "/api",
    createOpenApiExpressMiddleware({
        router: appRouter,
        createContext
    })
);

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
);

app.listen(8000, () => {
    console.log("Server is running on port http://localhost:8000");
    console.log("OpenAPI document is available at http://localhost:8000/openapi.json");
});
