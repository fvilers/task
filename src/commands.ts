import os from "os";
import path from "path";
import { readTasks, saveTasks } from "./io";
import Task from "./task";

export const DEFAULT_FILENAME = path.join(os.homedir(), "tasks.json");

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

export async function updateTask(
  id: number,
  task: string
): Promise<Task | undefined> {
  const tasks = await readTasks(DEFAULT_FILENAME);
  const updatedTask = tasks.find((task) => task.id === id);

  if (updatedTask === undefined) {
    return updatedTask;
  }

  updatedTask.task = task;

  await saveTasks(DEFAULT_FILENAME, tasks);

  return updatedTask;
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

export async function swapTasks(id1: number, id2: number): Promise<boolean> {
  const tasks = await readTasks(DEFAULT_FILENAME);
  const task1 = tasks.find((task) => task.id === id1);

  if (task1 === undefined) {
    return false;
  }

  const task2 = tasks.find((task) => task.id === id2);

  if (task2 === undefined) {
    return false;
  }

  task1.id = id2;
  task2.id = id1;

  await saveTasks(DEFAULT_FILENAME, tasks);

  return true;
}

export async function resetTasks(): Promise<void> {
  const tasks: Task[] = [];

  await saveTasks(DEFAULT_FILENAME, tasks);
}
