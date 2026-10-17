import { z } from "zod";

// Input schemas
export const todoSchema = z.object({
    id: z.string().describe("The unique identifier of the todo"),
    title: z.string().describe("The title of the todo"),
    description: z.string().optional().nullable().describe("The description of the todo"),
    completed: z.boolean().optional().default(false).describe("Whether the todo is completed"),
});

export type Todo = z.infer<typeof todoSchema>;

// Output schemas
export const getAllTodosOutputSchema = z.object({
    todos: z.array(todoSchema).describe("The list of todos"),
});

export type GetAllTodosOutput = z.infer<typeof getAllTodosOutputSchema>;