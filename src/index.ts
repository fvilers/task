#! /usr/bin/env node

import { Command } from "commander";

const program = new Command();
program.name("task").description("A simple command line to-do manager");

program
  .command("add")
  .description("add a task")
  .argument("<task>", "The task")
  .action((task) => {
    // TODO: create the task
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
  .argument("<id>", "The task ID")
  .action((id) => {
    // TODO: mark task as done
  });

program
  .command("undone")
  .description("mark a task as undone")
  .argument("<id>", "The task ID")
  .action((id) => {
    // TODO: reset task to undone
  });

program
  .command("delete")
  .description("delete a task")
  .argument("<id>", "The task ID")
  .action((id) => {
    // TODO: delete task
  });

program.parse();
