import { AsyncLocalStorage } from "async_hooks";
import { type ILogLayer } from "loglayer";

export const asyncLocalStorage = new AsyncLocalStorage<{ logger: ILogLayer }>();
