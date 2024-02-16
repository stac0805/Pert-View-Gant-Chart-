import { useState } from "react"
import TaskDetailsModal from "../modals/TaskDetailsModal"
import "./Task.css"

const Task = ({ task, onDragStart, onDragEnd, handlePointerDown, handlePointerUpCapture,
    renameTask, updateDuration }) => {

    let [openTaskDetails, setOpenTaskDetails] = useState(false)

    return (
        <>
            <div className="predecessorConnector"
                onPointerUpCapture={(e) => handlePointerUpCapture(e, task.id)}></div>
            <div className="task"
                id={task.id}
                draggable
                onDragStart={(e) => onDragStart(e, task.id)}
                onDragEnd={(e) => onDragEnd(e)}>
                <input autoFocus className="task_input" type="text" value={task.name} onChange={(e) => renameTask(task.id, e.target.value)}></input>
                <div className="duration_container">
                    <input className="duration_input" value={task.duration} onChange={(e) => updateDuration(task.id, e.target.value)}></input>
                </div>
                <button className="openTaskDetails_button" onClick={() => { setOpenTaskDetails(true) }}>+</button>
            </div>
            <div className="successorConnector"
                onPointerDown={(e) => handlePointerDown(e, task.id)}></div>
            {openTaskDetails && <TaskDetailsModal
                setOpenTaskDetails={setOpenTaskDetails}
                task={task}
                renameTask={renameTask}
                updateDuration={updateDuration} />}
        </>

    )
}

export default Task