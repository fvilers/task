#! /usr/bin/env node

import sortArray from "@fvilers/sort-array";
import chalk from "chalk";
import { Command, InvalidArgumentError } from "commander";
import { getBorderCharacters, table } from "table";
import { description, name, version } from "../package.json";
import {
  createTask,
  DEFAULT_FILENAME,
  deleteTask,
  listTasks,
  markTask,
  resetTasks,
  swapTasks,
  updateTask,
} from "./commands";
import pluralize from "./plural";
import question from "./question";

const UNEXPECTED_ERROR = "An unexpected error has occurred";

const program = new Command();
program
  .name(name.replace("@fvilers/", ""))
  .version(version)
  .description(description);

program
  .command("add")
  .description("add a task")
  .argument("<task>", "The task", ensureTaskNotEmpty)
  .action(async (task) => {
    try {
      await createTask(task);
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program
  .command("list")
  .description("list tasks")
  .option("-a, --all", "Include done tasks")
  .action(async (options) => {
    try {
      const tasks = await listTasks(options.all);

      if (tasks.length === 0) {
        return;
      }

      const color = (done: boolean) => (done ? chalk.dim : chalk.reset);
      const data = sortArray(tasks, "id").map(({ id, task, done }) => [
        color(done)(id),
        done ? "☑️" : "🔲",
        color(done)(task),
      ]);

      console.log(
        table(data, { border: getBorderCharacters("void"), singleLine: true })
      );
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program
  .command("update")
  .description("update a task")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .argument("<task>", "The updated task", ensureTaskNotEmpty)
  .action(async (id, task) => {
    try {
      const updatedTask = await updateTask(id, task);

      if (updatedTask === undefined) {
        program.error("This task ID doesn't exists");
      }
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program
  .command("done")
  .description("mark a task as done")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action(async (id) => {
    try {
      const task = await markTask(id, true);

      if (task === undefined) {
        program.error("This task ID doesn't exists");
      }
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program
  .command("undone")
  .description("mark a task as undone")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action(async (id) => {
    try {
      const task = await markTask(id, false);

      if (task === undefined) {
        program.error("This task ID doesn't exists");
      }
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program
  .command("delete")
  .description("delete a task")
  .argument("<id>", "The task ID", ensureTaskIdAsInteger)
  .action(async (id) => {
    try {
      const deleted = await deleteTask(id);

      if (!deleted) {
        program.error("This task ID doesn't exists");
      }
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program
  .command("swap")
  .description("swap tasks")
  .argument("<id1>", "The first task ID to swap", ensureTaskIdAsInteger)
  .argument("<id2>", "The second task ID to swap", ensureTaskIdAsInteger)
  .action(async (id1, id2) => {
    if (id1 === id2) {
      return;
    }

    try {
      const swapped = await swapTasks(id1, id2);

      if (!swapped) {
        program.error("One of these tasks ID don't exists");
      }
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program
  .command("reset")
  .description("empty the task list")
  .action(async () => {
    try {
      const tasks = await listTasks();
      const count = tasks.length;

      if (count === 0) {
        return;
      }

      const pluralized = pluralize(count, `${count} task`);
      const answer = await question(
        `Are your sure you want to permanently delete ${pluralized} (y/n)?`
      );

      if (["y", "yes"].includes(answer.toLowerCase())) {
        await resetTasks();
      }
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program
  .command("infos")
  .description("get information about your tasks")
  .action(async () => {
    try {
      const tasks = await listTasks(true);
      const done = tasks.filter((task) => task.done);

      console.log("File location:   ", DEFAULT_FILENAME);
      console.log("Done tasks:      ", done.length);
      console.log("Remaining tasks: ", tasks.length - done.length);
      console.log("Total tasks:     ", tasks.length);
    } catch (e) {
      program.error(e instanceof Error ? e.message : UNEXPECTED_ERROR);
    }
  });

program.showHelpAfterError();
program.addHelpText(
  "after",
  `
Examples:
  $ task add "Make the dishes"  # create a task
  $ task list                   # list active tasks
  $ task done 42                # mark task 42 as done`
);
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
