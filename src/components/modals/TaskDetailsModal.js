import "./TaskDetailsModal.css"

const TaskDetailsModal = ({ task, setOpenTaskDetails, renameTask, updateDuration }) => {
    return (
        <div className="taskDetails">
            <div className="task_container">
                <input className="task_name" type="text" value={task.name} onChange={(e) => renameTask(task.id, e.target.value)} />
                <button className="closeBtn" onClick={() => setOpenTaskDetails(false)}>X</button>
            </div>
            <div className="task_container">
                <select className="manager_dropdown" name="manager">
                    <option value="Amit">Amit</option>
                    <option value="Aadil">Aadil</option>
                    <option value="Surajit">Surajit</option>
                </select>
                <div className="duration_container">
                    <input className="duration_input" value={task.duration} onChange={(e) => updateDuration(task.id, e.target.value)} />
                </div>
                <div className="status_conatiner">
                </div>
                <div className="duration_container">
                    <label className="duration_label">RollUp: <span>30d4h</span></label>
                </div>
                <div className="duration_container">
                    <label className="duration_label">Calendar: <span>30d4h</span></label>
                </div>
            </div>
            <div className="task_container">
                <select className="manager_dropdown" name="manager">
                    <option value="Surajit">Surajit</option>
                    <option value="Amit">Amit</option>
                    <option value="Aadil">Aadil</option>
                </select>
                <div className="duration_container">
                    <label className="duration_label">Resourse: <span>Popup</span></label>
                </div>
                <div className="duration_container">
                    <label className="duration_label">Label: <span>task</span></label>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailsModal