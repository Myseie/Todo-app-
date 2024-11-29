import React, { useState } from "react";

const EditTaskModal = ({task, onSave, onClose }) => {
    const [title, setTitle] = useState(task.title);
    const [category, setCategory] = useState(task.category);
    const [deadline, setDeadline] = useState(task.deadline);


    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(task.id, {title, category, deadline });
        onClose();
    };


    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label">Task Title:</label>
                  <input
                    type="text"
                    id="editTitle"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editCategory" className="form-label">Category:</label>
                  <select
                    id="editCategory"
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
                  <label htmlFor="editDeadline" className="form-label">Deadline:</label>
                  <input
                    type="date"
                    id="editDeadline"
                    className="form-control"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
export default EditTaskModal;  