"use client";
import React, { useState } from "react";
import { GanttOriginal, Task, ViewMode } from "react-gantt-chart";
import ViewSwitcher from "../components/ViewSwitcher";
import Modal from "react-modal"; // Подключение модального окна

// Импорт вспомогательных функций
import { initTasks, getStartEndDateForProject } from "../helpers";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(initTasks());
  const [projects, setProjects] = useState<string[]>(["ProjectSample"]); // Список проектов
  const [view, setView] = useState<ViewMode>(ViewMode.Month);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState<Task | null>(null);
  const [isChecked, setIsChecked] = useState(true);

  const handleViewModeChange = (viewMode: ViewMode) => {
    setView(viewMode);
  };

  const handleViewListChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  const columnWidth =
    view === ViewMode.Month ? 300 : view === ViewMode.Week ? 250 : 60;

  const handleTaskChange = (editedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
    setIsEditing(false);
  };

  const handleTaskDelete = (task: Task) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.name}"?`
    );
    if (confirmed) {
      const updatedTasks = tasks.filter((t) => t.id !== task.id);
      setTasks(updatedTasks);
      setSelectedTask(null);
    }
  };

  const handleAddTask = () => {
    setNewTask({
      line: tasks.length,
      type: "task",
      id: `Task ${tasks.length}`,
      name: `New Task ${tasks.length + 1}`,
      start: selectedTask ? new Date(selectedTask.end.getTime()) : new Date(),
      end: selectedTask ? new Date(selectedTask.end.getTime()) : new Date(),
      progress: 0,
      dependencies: [],
      project: undefined,
    });
    setSelectedTask(null);
    setIsEditing(true);
  };

  const handleCreateProject = () => {
    const newProjectId = `Project ${projects.length}`;
    setProjects([...projects, newProjectId]);
    const newProjectTask: Task = {
      line: tasks.length,
      type: "project",
      id: newProjectId,
      name: `New Project ${projects.length + 1}`,
      start: new Date(),
      end: new Date(),
      progress: 0,
      hideChildren: false,
    };
    setTasks([...tasks, newProjectTask]);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsEditing(false);
    setNewTask(null);
  };

  const handleDoubleClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleGetProjectDates = (projectId: string) => {
    const [start, end] = getStartEndDateForProject(tasks, projectId);
    console.log(
      `Project ${projectId} dates: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
    );
  };

  return (
    <div>
      <h1>Gantt Chart</h1>
      <ViewSwitcher
        onViewModeChange={handleViewModeChange}
        onViewListChange={handleViewListChange}
        isChecked={isChecked}
      />

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        <GanttOriginal
          tasks={tasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onDoubleClick={handleDoubleClick}
          columnWidth={columnWidth}
        />
      </div>

      <button onClick={handleAddTask} style={{ marginTop: "10px" }}>
        Add Task
      </button>
      <button onClick={handleCreateProject} style={{ marginLeft: "10px", marginTop: "10px" }}>
        Create Project
      </button>

      {/* Модальное окно для редактирования или создания задачи */}
      {(isEditing || newTask) && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "600px",
              width: "100%",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "4px",
            }}
          >
            <h2>{newTask ? "New Task" : "Edit Task"}</h2>
            <label>Name:</label>
            <input
              type="text"
              value={(newTask || selectedTask)?.name || ""}
              onChange={(e) => {
                const updatedTask = { ...newTask, ...selectedTask };
                updatedTask.name = e.target.value;
                setNewTask(updatedTask);
              }}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <label>Description:</label>
            <textarea
              value={(newTask || selectedTask)?.description || ""}
              onChange={(e) => {
                const updatedTask = { ...newTask, ...selectedTask };
                updatedTask.description = e.target.value;
                setNewTask(updatedTask);
              }}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <label>Start Date:</label>
            <input
              type="date"
              value={
                ((newTask || selectedTask)?.start || new Date())
                  .toISOString()
                  .substr(0, 10)
              }
              onChange={(e) => {
                const updatedTask = { ...newTask, ...selectedTask };
                updatedTask.start = new Date(e.target.value);
                setNewTask(updatedTask);
              }}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <label>End Date:</label>
            <input
              type="date"
              value={
                ((newTask || selectedTask)?.end || new Date())
                  .toISOString()
                  .substr(0, 10)
              }
              onChange={(e) => {
                const updatedTask = { ...newTask, ...selectedTask };
                updatedTask.end = new Date(e.target.value);
                setNewTask(updatedTask);
              }}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            {newTask || selectedTask?.type === "task" ? (
              <div>
                <label>Project:</label>
                <select
                  value={(newTask || selectedTask)?.project || ""}
                  onChange={(e) => {
                    const updatedTask = { ...newTask, ...selectedTask };
                    updatedTask.project = e.target.value;
                    setNewTask(updatedTask);
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
                <label>Dependencies:</label>
                <select
                  multiple
                  value={(newTask || selectedTask)?.dependencies || []}
                  onChange={(e) => {
                    const updatedTask = { ...newTask, ...selectedTask };
                    const selectedOptions = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    updatedTask.dependencies = selectedOptions;
                    setNewTask(updatedTask);
                  }}
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => {
                  if (newTask) {
                    setTasks([...tasks, newTask]);
                  }
                  setIsEditing(false);
                  setNewTask(null);
                  setSelectedTask(null);
                }}
                style={{ marginRight: "10px" }}
              >
                Save
              </button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default App;
