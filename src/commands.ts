import os from "os";
import path from "path";
import { readTasks, saveTasks } from "./io";
import Task from "./task";

const DEFAULT_FILENAME = path.join(os.homedir(), "tasks.json");

export async function createTask(task: string): Promise<number> {
  const tasks = await readTasks(DEFAULT_FILENAME);
  const id = Math.max(...tasks.map(({ id }) => id)) + 1;

  tasks.push({ id, task, done: false });

  await saveTasks(DEFAULT_FILENAME, tasks);

  return id;
}

export async function listTasks(includeDone: boolean = false): Promise<Task[]> {
  const tasks = await readTasks(DEFAULT_FILENAME);

  return tasks.filter((task) => includeDone || !task.done);
}
