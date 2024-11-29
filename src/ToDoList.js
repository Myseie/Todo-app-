import React from "react";
import ToDoItem from "./ToDoItem";


const ToDoList = ({ tasks, onToggleComplete, onDeleteTask, onEditTask }) => {
    return (
        <div className="task-list">
            {tasks.length === 0 ? (
                <p>No tasks yet. Add a task above!</p>
            ) : (
                tasks.map((task) => (
                    <div className="card mb-3" key={task.id}>
                        <div className="card-body">
                            <h2 className="card-title">{task.title}</h2>
                            <p className="card-text">
                                <strong>Category:</strong> {task.category} <br />
                                <strong>Deadline</strong> {task.deadline || "No Deadline"}
                            </p>
                            <div className="button-group">
                                <button
                                    onClick={() => onToggleComplete(task.id)}
                                    className={`btn ${task.completed ? "btn-secondary" : "btn-success"} me-2`}
                                >
                                    {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                                </button>
                                <button
                                    onClick={() => onEditTask(task)}
                                    className="btn btn-primary me-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDeleteTask(task.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ToDoList;