# task

A simple command line to-do manager

## Install

```
npm install -g @fvilers/task
```

## Usage

### Create a task

```
task add "Do the dishes"
```

### List tasks

#### Remaining tasks

```
task list
```

```
 1  🔲  Take out the trash
 2  🔲  Do the dishes
```

#### All tasks

```
task list --all
```

```
 1  🔲  Take out the trash
 2  🔲  Do the dishes
 3  ☑️  Have good time
```

### Update a task

```
task update 2 "Ask the kids to do the dishes"
```

### Mark a task as done

```
task done 1
```

### Mark a task as undone

```
task undone 1
```

### Delete a task

```
task delete 3
```

### Swap tasks

```
task swap 1 2
```

### Empty the task list

Warning, this action is irreversible but a confirmation prompt is displayed. The confirmation prompte can be bypassed with the `-f` o `--force` flag.

```
task reset
```

```
Are your sure you want to permanently delete 2 tasks (y/n)?
```

### Get informations about your task list

```
task infos
```

```
File location:    C:\Users\Fabian\tasks.json
Done tasks:       1
Remaining tasks:  2
Total tasks:      3
```
