#! /usr/bin/env node

import { Command, InvalidArgumentError } from "commander";
import { createTask, deleteTask, listTasks, markTask } from "./commands";

const program = new Command();
program.name("task").description("A simple command line to-do manager");

program
  .command("add")
  .description("add a task")
  .argument("<task>", "The task", ensureTaskNotEmpty)
  .action(async (task) => {
    const id = await createTask(task);
  });

program
  .command("list")
  .description("list tasks")
  .option("-a, --all", "Include done tasks")
  .action(async (options) => {
    const tasks = await listTasks(options.all);

    for (const { id, task, done } of tasks) {
      console.log(`${id}\t${task}\t${done ? "✔️" : ""}`);
    }
  });

program
  .command("done")
  .description("mark a task as done")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action(async (id) => {
    const task = await markTask(id, true);

    if (task === undefined) {
      program.error("This task ID doesn't exists");
    }
  });

program
  .command("undone")
  .description("mark a task as undone")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action(async (id) => {
    const task = await markTask(id, false);

    if (task === undefined) {
      program.error("This task ID doesn't exists");
    }
  });

program
  .command("delete")
  .description("delete a task")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action(async (id) => {
    const deleted = await deleteTask(id);

    if (!deleted) {
      program.error("This task ID doesn't exists");
    }
  });

program.parse();

function ensureTaskNotEmpty(task: string): string {
  if (task === "") {
    throw new InvalidArgumentError("Task must not be empty.");
  }

  return task;
}

function ensureTaskIdAsInteger(value: string): number {
  const id = parseInt(value, 10);

  if (isNaN(id)) {
    throw new InvalidArgumentError("Task ID must not be an integer.");
  }

  return id;
}
