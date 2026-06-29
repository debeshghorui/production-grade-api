import express from "express";
import type { Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from 'trpc-to-openapi';

import { appRouter } from "./trpc/routes.js";
import { createContext } from "./trpc/context.js";

export function createApplication(): Express {
    const app = express();

    app.use(express.json());

    const openApiDocument = generateOpenApiDocument(appRouter, {
        title: "OIDC Server",
        description: "OIDC Server built with Express, TypeScript, drizzle-orm, and PostgreSQL",
        version: "1.0.0",
        baseUrl: "http://localhost:8080/api",
        tags: ["todos"],
    });

    app.use("/v1/openapi.json", (req, res) => {
        res.json(openApiDocument);
    });

    app.use("/v1/openapi", createOpenApiExpressMiddleware({ 
        router: appRouter,
        createContext
    }));

    // Routers
    app.use(
        "/v1/trpc", 
        trpcExpress.createExpressMiddleware({ 
            router: appRouter,
            createContext
        }));

    return app;
}
