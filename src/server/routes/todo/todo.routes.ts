import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

import { router, publicProcedure } from "../../trpc.js";
import { getAllTodosOutputSchema, getTodoByIdOutputSchema, todoSchema, type Todo } from "./models.js";

// Mock data
let TODOS: Todo[] = [
    { id: "1", title: "Buy groceries", completed: false },
    { id: "2", title: "Finish project", completed: true },
    { id: "3", title: "Call mom", completed: false },
];

export const todoRouter = router({
    getAllTodos: publicProcedure
        .meta({
            openapi: {
                method: "GET",
                path: "/todos",
                tags: ["todos"],
                description: "Returns all todos"
            },
        })
        .input(z.undefined())
        .output(getAllTodosOutputSchema)
        .query(() => {
            return { todos: TODOS };
        }),
    getTodoById: publicProcedure
        .meta({
            openapi: {
                method: "GET",
                path: "/todos/{id}",
                tags: ["todos"],
                description: "Returns a todo by id"
            },
        })
        .input(z.object({ id: z.string() }))
        .output(getTodoByIdOutputSchema)
        .query(({ input }) => {
            const todo = TODOS.find((todo) => todo.id === input.id);
            if (!todo) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });
            }
            return { todo };
        }),
    createTodo: publicProcedure
        .meta({
            openapi: {
                method: "POST",
                path: "/todos",
                tags: ["todos"],
                description: "Creates a todo"
            },
        })
        .input(todoSchema)
        .output(getTodoByIdOutputSchema)
        .mutation(({ input }) => {
            const todo = { 
                ...input,
                id: randomUUID().toString(),
            };
            TODOS.push(todo);
            return { todo };
        }),
    updateTodo: publicProcedure
        .meta({
            openapi: {
                method: "PUT",
                path: "/todos/{id}",
                tags: ["todos"],
                description: "Updates a todo"
            },
        })
        .input(z.object({ id: z.string(), todo: todoSchema }))
        .output(getTodoByIdOutputSchema)
        .mutation(({ input }) => {
            const todo = TODOS.find((todo) => todo.id === input.id);
            if (!todo) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });
            }
            return { todo: { ...todo, ...input.todo } };
        }),
    deleteTodo: publicProcedure
        .meta({
            openapi: {
                method: "DELETE",
                path: "/todos/{id}",
                tags: ["todos"],
                description: "Deletes a todo"
            },
        })
        .input(z.object({ id: z.string() }))
        .output(z.object({ success: z.boolean() }))
        .mutation(({ input }) => {
            const newTodos = TODOS.filter((todo) => todo.id !== input.id);
            TODOS = newTodos.map((todo) => ({ ...todo, id: todo.id }));
            return { success: true };
        }),
});
