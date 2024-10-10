import React, { useState } from "react";
import Container from "./components/Container";
import TaskItem from "./components/TaskItem";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTask] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // New state for editing

  const handleComplete = (id) => {
    setTask(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)) // Toggle done status
    );
  };

  const handleRemove = (id) => {
    setTask(tasks.filter((task) => task.id !== id));
  };

  const handleAdd = (task) => {
    task.id = new Date().getTime();
    setTask([...tasks, task]);
  };

  const handleEdit = (id, newTaskText) => {
    setTask(
      tasks.map((task) =>
        task.id === id
          ? { ...task, task: newTaskText } // Preserve 'done' and 'id' when updating text
          : task
      )
    );
    setEditingTaskId(null); // Reset editing state after saving
  };

  return (
    <div className="App flex bg-gradient-to-r from-blue-500 to-teal-200 justify-center items-center h-screen w-screen">
      <Container>
        <div className="flex flex-col flex-1 p-5 items-top gap-5">
          {/* add task */}
          <AddTask onAdd={handleAdd} />

          {/* tasks items */}
          {tasks
            .filter((task) => !task.done)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                done={task.done}
                onComplete={handleComplete}
                onRemove={handleRemove}
                onEdit={handleEdit}
                editing={editingTaskId === task.id} // Check if task is in editing state
                setEditingTaskId={setEditingTaskId} // Pass setter function
              />
            ))}

          {/* separator */}
          <div className="w-full border border-blue-300"></div>

          {/* done tasks */}
          {tasks
            .filter((task) => task.done)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                done={task.done}
                onComplete={handleComplete}
                onRemove={handleRemove}
                onEdit={handleEdit}
                editing={editingTaskId === task.id} // Check if task is in editing state
                setEditingTaskId={setEditingTaskId} // Pass setter function
              />
            ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
