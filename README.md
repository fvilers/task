# task

A simple command line to-do manager

## Install

```
npm install -g @fvilers/task
```

## Usage

### Create a task

```
task add "Make the dishes"
```

### List tasks

#### Remaining tasks

```
task list
```

```
 1  🔲  Task out the trash
 2  🔲  Do the dishes
```

#### All tasks

```
task list --all
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
task delete 1
```

### Swap tasks

```
task swap 1 2
```

### Empty the task list

Warning, this is irreversible

```
task reset
```

### Get informations about your task list

```
task infos
```

```
 1  🔲  Ask the kids to do the dishes
 2  🔲  Take out the trash
```
