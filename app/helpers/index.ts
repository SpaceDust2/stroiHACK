import { Task } from "react-gantt-chart";

export const initTasks = (): Task[] => {
  const tasks: Task[] = [
    // Пример задач по умолчанию
    {
      line: 0,
      type: "project",
      id: "ProjectSample",
      name: "1.Project",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 9, 30),
      progress: 25,
      hideChildren: false,
    },
    {
      line: 1,
      type: "task",
      id: "Task 0",
      name: "1.1 Task",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 6, 30),
      progress: 45,
      project: "ProjectSample",
    },
    {
      line: 2,
      type: "task",
      id: "Task 1",
      name: "1.2 Task",
      start: new Date(2021, 7, 1),
      end: new Date(2021, 7, 30),
      progress: 25,
      dependencies: ["Task 0"],
      project: "ProjectSample",
    },
    // Добавьте другие задачи по мере необходимости
  ];
  return tasks;
};

export const getStartEndDateForProject = (
  tasks: Task[],
  projectId: string
): [Date, Date] => {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
};
