enum Status {
    ToDo = "To Do",
    InProgress = "In progress",
    Done = "Done",
}

type Task = {
    title: string,
    description: string,
    status: Status,
    creationData: Date,
}

type TaskList = {
    taskList: Task[],
    addTask(task: Task): Task[],
    deleteTask(task: Task): Task[],
    updateTask(task: Task): Task[],
}

