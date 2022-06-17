import os from "os";
import path from "path";
import { readTasks } from "./io";
import Task from "./task";

const DEFAULT_FILENAME = path.join(os.homedir(), "tasks.json");

export async function listTasks(includeDone: boolean = false): Promise<Task[]> {
  const tasks = await readTasks(DEFAULT_FILENAME);

  return tasks.filter((task) => includeDone || !task.done);
}
