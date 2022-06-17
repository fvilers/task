#! /usr/bin/env node

import { Command, InvalidArgumentError } from "commander";

const program = new Command();
program.name("task").description("A simple command line to-do manager");

program
  .command("add")
  .description("add a task")
  .argument("<task>", "The task", ensureTaskNotEmpty)
  .action((task) => {
    // TODO: create the task
    console.log("Creating task '", task, "'");
  });

program
  .command("list")
  .description("list tasks")
  .option("-a, --all", "Include done tasks")
  .action((options) => {
    // TODO: get tasks and list them
  });

program
  .command("done")
  .description("mark a task as done")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action((id) => {
    // TODO: mark task as done
  });

program
  .command("undone")
  .description("mark a task as undone")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action((id) => {
    // TODO: reset task to undone
  });

program
  .command("delete")
  .description("delete a task")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action((id) => {
    // TODO: delete task
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
