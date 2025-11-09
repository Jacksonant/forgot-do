import { useState } from "react";
import searchIcon from "../../assets/search-solid.svg";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { Button } from "../atomic/Button";
import { Input } from "../atomic/Input";
import { TaskRow } from "./TaskRow";
import "./TaskTable.css";

interface Task {
  id: number;
  name: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

interface TaskTableProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
}

export const TaskTable = ({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onAddNew,
}: TaskTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  const handleMouseEnter = (taskId: number, event: React.MouseEvent) => {
    const checkboxElement = (event.currentTarget as HTMLElement).querySelector(
      ".task-checkbox"
    );
    if (checkboxElement) {
      const rect = checkboxElement.getBoundingClientRect();
      setTooltipPosition({ x: rect.left - 16, y: rect.top });
    }
    setHoveredTask(taskId);
  };

  const filteredTasks = tasks
    .filter((task) => task.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.createdAt - a.createdAt);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <>
      <div className="task-table-header">
        <h2 className="task-table-title">Tasks</h2>
        <div className="task-table-actions">
          <div className="task-search">
            <Input
              placeholder="Search by task name"
              value={searchQuery}
              onChange={setSearchQuery}
              leftIcon={<img src={searchIcon} alt="" className="icon" />}
              rightIcon={
                searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{ fontSize: "18px", fontWeight: "bold", background: "none", border: "none", cursor: "pointer" }}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                ) : null
              }
              className="task-search-input"
              ariaLabel="Search tasks by name"
            />
          </div>
          <Button onClick={onAddNew} fullWidth ariaLabel="Create new task">+ New Task</Button>
        </div>
      </div>
      <div className="task-table-container">
        <div className="task-table-list" role="list" aria-label="Task list">
          {filteredTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={setDeleteTaskId}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setHoveredTask(null)}
            />
          ))}
        </div>
      </div>
      {hoveredTask !== null && (
        <div
          className="task-tooltip"
          style={{
            right: `calc(100vw - ${tooltipPosition.x}px)`,
            top: `${tooltipPosition.y}px`,
          }}
          role="tooltip"
        >
          {(() => {
            const task = filteredTasks.find((t) => t.id === hoveredTask);
            if (!task) return null;
            return (
              <>
                <div>
                  <strong>Name:</strong> {task.name}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  {task.completed ? "Completed" : "Incomplete"}
                </div>
                <div>
                  <strong>Created:</strong> {formatDate(task.createdAt)}
                </div>
                <div>
                  <strong>Updated:</strong> {formatDate(task.updatedAt)}
                </div>
              </>
            );
          })()}
        </div>
      )}
      {deleteTaskId !== null && (
        <DeleteTaskModal
          taskName={
            filteredTasks.find((t) => t.id === deleteTaskId)?.name || ""
          }
          onClose={() => setDeleteTaskId(null)}
          onConfirm={() => {
            onDelete(deleteTaskId);
            setDeleteTaskId(null);
          }}
        />
      )}
    </>
  );
};
