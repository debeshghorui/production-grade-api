import * as trpcExpress from "@trpc/server/adapters/express";

// Create context for the server
export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({})

export type Context = Awaited<ReturnType<typeof createContext>>;