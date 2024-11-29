import React, { useState } from "react";

const ToDoForm = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Work");
    const [deadline, setDeadline] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title) return;
  
      const newTask = {
        id: Date.now(),
        title,
        category,
        deadline,
        completed: false,
      };
  
      onAddTask(newTask);
      setTitle(""); 
      setCategory("Work");
      setDeadline("");
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">Task Title:</label>
          <input
            type="text"
            id="taskTitle"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskCategory" className="form-label">Category:</label>
          <select
            id="taskCategory"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Home">Home</option>
            <option value="School">School</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="taskDeadline" className="form-label">Deadline:</label>
          <input
            type="date"
            id="taskDeadline"
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    );
  };
  
  export default ToDoForm;