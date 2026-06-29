import { router } from './init.js';
import { todoRouter } from '../modules/todo/routes.js';

export const appRouter = router({
    todo: todoRouter,
});

export type AppRouter = typeof appRouter;