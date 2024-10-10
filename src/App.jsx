import React, { useState } from "react";
import Container from "./components/Container";
import TaskItem from "./components/TaskItem";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTask] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // Track editing task

  const handleComplete = (id) => {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
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
        task.id === id ? { ...task, task: newTaskText } : task
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
            .map((task, index) => (
              <TaskItem
                key={`task-${index}`}
                task={task}
                onComplete={handleComplete}
                onRemove={handleRemove}
                onEdit={handleEdit} // Pass the handleEdit function
                editing={editingTaskId === task.id} // Check if task is being edited
                setEditingTaskId={setEditingTaskId} // Function to set the editing task
              />
            ))}

          {/* separator */}
          <div className="w-full border border-blue-300"></div>

          {/* done tasks */}
          {tasks
            .filter((task) => task.done)
            .map((task, index) => (
              <TaskItem
                key={`task-${index}`}
                task={task}
                done
                onComplete={handleComplete}
                onRemove={handleRemove}
              />
            ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
