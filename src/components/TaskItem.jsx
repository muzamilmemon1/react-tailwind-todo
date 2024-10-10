import TaskButton from "./TaskButton";
import { useState } from "react";

export default function ({ task, done, onComplete, onRemove, onEdit, editing, setEditingTaskId }) {
  const [editText, setEditText] = useState(task.task); // Store the task text when editing

  // Define the CSS classes here
  const defaultClasses =
    "bg-sky-100 rounded flex justify-between items-center gap-2 p-3 group hover:cursor-pointer hover:bg-slate-100 transition text-blue-500";
  const doneClasses =
    "flex justify-between items-center p-3 gap-2 rounded bg-blue-500 text-white";

  const completeTask = () => {
    onComplete(task.id); // Ensure this still uses task.id
  };

  const removeTask = () => {
    onRemove(task.id); // Ensure this still uses task.id
  };

  const startEditing = () => {
    setEditingTaskId(task.id); // Begin editing
  };

  const handleEdit = () => {
    onEdit(task.id, editText); // Save edited text
  };

  return (
    <div className={!done ? defaultClasses : doneClasses}>
      {editing ? (
        <input
          type="text"
          className="flex-1 p-2 border border-blue-300 rounded"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
        />
      ) : (
        <span className="flex-1">{task.task}</span>
      )}

      <div className="flex gap-2">
        {!editing ? (
          <>
            <TaskButton type="edit" onClick={startEditing} />
            <TaskButton type="done" onClick={completeTask} />
            <TaskButton type="remove" onClick={removeTask} />
          </>
        ) : (
          <TaskButton type="save" onClick={handleEdit} />
        )}
      </div>
    </div>
  );
}
