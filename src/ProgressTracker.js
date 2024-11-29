import React from "react";

const ProgressTracker = ({tasks}) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const incompleteTasks = totalTasks - completedTasks;
    const percentage = totalTasks > 0 ? (completedTasks/ totalTasks) * 100 : 0;

    
    return (
        <div className="progress-tracker my-4">
        <h3>Progress Tracker</h3>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed Tasks: {completedTasks}</p>
        <p>Incomplete Tasks: {incompleteTasks}</p>
        <div className="progress">
        <div 
          className="progress-bar bg-success"
          role="progressbar"
          style={{width : ` ${percentage}%`}}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {Math.round(percentage)}%
        </div>
        </div>
      </div>
    );

};

export default ProgressTracker;