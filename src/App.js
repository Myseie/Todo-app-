
import React, { useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import EditTaskModal from "./EditTaskModal";
import ProgressTracker from "./ProgressTracker";
import TaskStats from "./TaskStats";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("deadline");
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  // Spara till localStorage
  const saveToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };



  // Lägg till en uppgift
  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    
    saveToLocalStorage(updatedTasks);
  };

  // Markera som klar
  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };



  

  // Ta bort en uppgift
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  // Öppna redigeringsmodal
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsEditing(true);
  };

  // Stäng redigeringsmodal
  const closeEditModal = () => {
    setTaskToEdit(null);
    setIsEditing(false);
  };

  // Redigera en uppgift
  const editTask = (taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
    closeEditModal();
  };



  const importTasks = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target.result);
        setTasks(importedTasks);
        alert("Tasks imported successfully!");
      } catch (error) {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  // Sortera uppgifter
 

  // Kombinera filtrering och sortering
  const getFilteredAndSortedTasks = () => {
  
    let filteredTasks = [...tasks];

    if (filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (filter === "incomplete") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    if (sortOption === "deadline") {
      filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortOption === "category") {
      filteredTasks.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortOption === "title") {
      filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
    }


    return filteredTasks;

  };

  const getOverdueTasks = () => {
    const today = new Date();
    return tasks.filter(
      (task) => 
        task.deadline &&
      !isNaN(new Date(task.deadline)) &&
      new Date(task.deadline) < today &&
      !task.completed
    );
  };

  const NotificationBanner = ({ overdueTasks }) => {
    if (overdueTasks.length === 0) return null;

    return (
      <div className="aler alert-danger text-danger">
        You have {overdueTasks.length} overdue task(s). Check them now!
      </div>
    );
  };

  // Ladda från localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    const overdueTasks = getOverdueTasks();
    if(overdueTasks.length > 0) {
      alert(`You have ${overdueTasks.length} overdue tasks!`);
    }
  }, []);



  return (
    <div className="container mt-5">
      <NotificationBanner overdueTasks={getOverdueTasks()} />
      <h1 className="mb-4 text-center">To-Do App</h1>
      <ToDoForm onAddTask={addTask} />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control mb-2"
        />

<div className="search-results">
    {searchQuery.trim() && (
      <>
        <h5>Search Results:</h5>
        {tasks.filter((task) => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 ? (
          <p>No tasks match your search.</p>
        ) : (
          tasks
            .filter((task) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task) => (
              <div key={task.id} className="card mb-2">
                <div className="card-body">
                  <h6 className="card-title">{task.title}</h6>
                  <p className="card-text">
                    <strong>Category:</strong> {task.category} <br />
                    <strong>Deadline:</strong>{" "}
                    {task.deadline || "No Deadline"}
                  </p>
                </div>
              </div>
            ))
        )}
      </>
    )}
  </div>
  
        <div className="d-flex justify-content-between">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select me-2"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-select me-2"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Home">Home</option>
            <option value="School">School</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="form-select"
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="category">Sort by Category</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
       
      </div>
      

      <div className="row mb-4">
        <div className="col-md-6">
          <TaskStats tasks={tasks} />
        </div>
        <div className="col-md-6">
          <ProgressTracker tasks={tasks} />
        </div>
      </div>

      <ToDoList
        tasks={getFilteredAndSortedTasks()}
        onToggleComplete={toggleComplete}
        onEditTask={openEditModal}
        onDeleteTask={deleteTask}
      />
      <div className="completed-tasks">
  <h3>Completed Tasks</h3>
  {tasks.filter((task) => task.completed).length === 0 ? (
    <p>No completed tasks.</p>
  ) : (
    tasks
      .filter((task) => task.completed)
      .map((task) => (
        <div key={task.id} className="completed-task-item">
          <h5>{task.title}</h5>
          <p>{task.category}</p>
        </div>
      ))
  )}
</div>

      {isEditing && (
        <EditTaskModal
          task={taskToEdit}
          onSave={editTask}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default App;