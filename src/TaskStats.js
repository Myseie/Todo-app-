import React from "react";

const TaskStats = ({tasks}) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((tasks) => tasks.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const overdueTasks = tasks.filter(
        (task) => task.deadline && new Date(task.deadline) < new Date() && !task.completed

    ).length;

    const categoryCounts = tasks.reduce((counts, task) => {
        counts[task.category] = (counts[task.category] || 0) + 1;
        return counts;
    }, []);

    return (
        <div className="task-stats mb-4">
            <h4>
  <i className="bi bi-check-circle-fill text-success"></i> Completed: {completedTasks}
</h4>
<h4>
  <i className="bi bi-exclamation-circle-fill text-warning"></i> Overdue: {overdueTasks}
</h4>
            <h3>Task Statistics</h3>
            <p><strong>Total Tasks:</strong> {totalTasks}</p>
            <p><strong>Completed:</strong>{completedTasks}</p>
            <p><strong>Pending:</strong>{pendingTasks}</p>

            <h4> By Category:</h4>
            <ul>
                {Object.entries(categoryCounts).map(([category, count]) => (
                    <li key={category}>
                        {category}: {count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskStats;