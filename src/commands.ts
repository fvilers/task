import os from "os";
import path from "path";
import { readTasks, saveTasks } from "./io";
import Task from "./task";

const DEFAULT_FILENAME = path.join(os.homedir(), "tasks.json");

export async function createTask(task: string): Promise<number> {
  const tasks = await readTasks(DEFAULT_FILENAME);
  const id = Math.max(0, ...tasks.map(({ id }) => id)) + 1;

  tasks.push({ id, task, done: false });

  await saveTasks(DEFAULT_FILENAME, tasks);

  return id;
}

export async function listTasks(includeDone: boolean = false): Promise<Task[]> {
  const tasks = await readTasks(DEFAULT_FILENAME);

  return tasks.filter((task) => includeDone || !task.done);
}

export async function markTask(
  id: number,
  done: boolean
): Promise<Task | undefined> {
  const tasks = await readTasks(DEFAULT_FILENAME);
  const task = tasks.find((task) => task.id === id);

  if (task === undefined) {
    return task;
  }

  task.done = done;

  await saveTasks(DEFAULT_FILENAME, tasks);

  return task;
}

export async function deleteTask(id: number): Promise<boolean> {
  const tasks = await readTasks(DEFAULT_FILENAME);
  const newTasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === newTasks.length) {
    return false;
  }

  await saveTasks(DEFAULT_FILENAME, newTasks);

  return true;
}
