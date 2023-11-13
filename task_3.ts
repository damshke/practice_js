enum Status {
    TODO = "To Do",
    INPROGRESS = "In progress",
    DONE = "Done",
}

type Task = {
    title: string,
    description: string,
    status: Status,
    creationData: Date,
}

type TaskList = {
    taskList: Task[],
    addTask: (task: Task) => Task[],
    deleteTask(task: Task): Task[],
    updateTask(task: Task): Task[],
}

