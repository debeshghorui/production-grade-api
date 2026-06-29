import { z } from "zod"

import { getAllTodosOutputModel } from "./model.js";
import { router, publicProcedure } from '../../trpc/init.js';

export const todoRouter = router({
    getAllTodos: publicProcedure
    .input(z.undefined())
    .output(getAllTodosOutputModel)
    .meta({
        openapi: {
            method: "GET",
            path: "/todos",
            tags: ["todos"],
            description: "Get all todos",
        },
    })
    .query(async () => {
        return {
            todos: [],
        };
    }),
});