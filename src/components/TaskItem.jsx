import { useState } from "react";
import TaskButton from "./TaskButton";

export default function ({ task, done, onComplete, onRemove, onEdit, editing, setEditingTaskId }) {
  const [editText, setEditText] = useState(task.task); // Store the task text when editing

  const defaultClasses =
    "bg-sky-100 rounded flex justify-between items-center gap-2 p-3 group hover:cursor-pointer hover:bg-slate-100 transition text-blue-500";
  const doneClasses =
    "flex justify-between items-center p-3 gap-2 rounded bg-blue-500 text-white";

  const completeTask = () => {
    onComplete(task.id);
  };

  const removeTask = () => {
    onRemove(task.id);
  };

  const startEditing = () => {
    setEditingTaskId(task.id);
  };

  const handleEdit = () => {
    onEdit(task.id, editText); // Save the edited text
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEdit(); // Save when Enter is pressed
    }
  };

  return (
    <div className={!done ? defaultClasses : doneClasses}>
      {editing ? (
        // Edit mode: Input field for editing
        <input
          type="text"
          className="flex-1 p-2 border border-blue-300 rounded"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      ) : (
        // Display the task text when not editing
        <span className="flex-1">{task.task}</span>
      )}

      <div className="flex gap-2">
        {!editing ? (
          <>
            <TaskButton type="edit" onClick={startEditing} />
            {!done && <TaskButton type="done" onClick={completeTask} />}
            {!done && <TaskButton onClick={removeTask} />}
          </>
        ) : (
          // Show Save button when editing
          <TaskButton type="save" onClick={handleEdit} />
        )}
      </div>
    </div>
  );
}
