import { z } from "zod";

import { router, publicProcedure } from "../../trpc.js";
import { getAllTodosOutputSchema, type Todo } from "./models.js";

// Mock data
const TODOS: Todo[] = [
    { id: "1", title: "Buy groceries", completed: false },
    { id: "2", title: "Finish project", completed: true },
    { id: "3", title: "Call mom", completed: false },
];

export const todoRouter = router({
    getAllTodos: publicProcedure
        .input(z.undefined())
        .output(getAllTodosOutputSchema)
        .query(() => {
            return { todos: TODOS };
        })
});
