import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="border border-gray-200 rounded p-4">
      <h2 className="text-lg font-semibold mb-2">Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Start Date: {task.startDate.toDateString()}</p>
              <p>End Date: {task.endDate.toDateString()}</p>
            </div>
            {/* Добавьте кнопки для редактирования и удаления задач */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
