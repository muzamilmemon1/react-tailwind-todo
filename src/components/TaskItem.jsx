import TaskButton from "./TaskButton";

export default function ({ task, done, onComplete, onRemove }) {
  const defaultClasses =
    "bg-sky-100 rounded flex justify-between items-center gap-2 p-3 group hover:cursor-pointer hover:bg-slate-100 transition text-blue-500";
  const doneClasses =
    "flex justify-between items-center p-3 gap-2 rounded bg-blue-500 text-white";

  const completeTask = () => {
    onComplete(task.id); // Toggle between complete/incomplete
  };

  const removeTask = () => {
    onRemove(task.id);
  };

  return (
    <div className={!done ? defaultClasses : doneClasses}>
      <span className="flex-1">{task.task}</span>
      <div className="flex gap-2">
        <TaskButton type={done ? "incomplete" : "done"} onClick={completeTask} />
        {!done && <TaskButton onClick={removeTask} />}
      </div>
    </div>
  );
}
