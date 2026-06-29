import { z } from 'zod';

export const todoModel = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    isCompleted: z.boolean(),
});

export const getAllTodosOutputModel = z.object({
    todos: z.array(todoModel),
});

export type Todo = z.infer<typeof todoModel>;