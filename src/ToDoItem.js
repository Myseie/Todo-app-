import React from "react";


const ToDoItem = ({ task, onToggleComplete, onDeleteTask, onEdit }) => {

    const today = new Date();
    const deadlineDate = task.deadline ? new Date(task.deadline) : null;

    const isNearDeadline = deadlineDate && (deadlineDate - today) / (1000 * 60 * 60 * 24) <= 2;

    const isOverDue = deadlineDate && deadlineDate < today;


    return ( 
        <div className={`card mb-2 ${task.completed ? "bg-success text-white" : ""}`}>
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h3 className="card-title">{task.title}</h3>
                    <p className="card-text">
                        <strong>Category:</strong>{task.category} <br />
                        <strong>Deadline:</strong>{task.deadline || "No Deadline"}{" "}
                        {isOverDue && <span className="text-danger">(Overdue!)</span>}
                        {isNearDeadline && !isOverDue && <span className="text-warning">(Near Deadline)</span>}
                    </p>
                </div>
                <button 
                    className={`btn ${task.completed ? "btn-secondary" : "btn-success"}`}
                    onClick={() => onToggleComplete(task.id)}
                >
                    {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
                </button>
                <button 
                    className="btn btn-danger"
                    onClick={() => onDeleteTask(task.id)}
                >
                    Delete
                </button>
                <button 
                    className="btn btn-warning"
                    onClick={() => onEdit(task)}
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default ToDoItem;