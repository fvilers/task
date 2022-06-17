import { constants } from "node:fs";
import fs from "node:fs/promises";
import Task from "./task";

export async function readTasks(filename: string): Promise<Task[]> {
  const fileExists = await exists(filename);

  if (!fileExists) {
    const tasks: Task[] = [];
    await saveTasks(filename, tasks);
    return tasks;
  }

  const buffer = await fs.readFile(filename);
  const json = buffer.toString();

  // TODO: verify that JSON is an array of tasks

  return JSON.parse(json);
}

export function saveTasks(filename: string, tasks: Task[]): Promise<void> {
  return fs.writeFile(filename, JSON.stringify(tasks));
}

async function exists(filename: string): Promise<boolean> {
  try {
    await fs.access(filename, constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}
