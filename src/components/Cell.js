import Task from "./Task/Task"

const Cell = ({ X, Y, task, onDragOver, onDrop, onDragStart, onDragEnd, phaseNumber,
    addElement, firstColumn, handlePointerDown, handlePointerUpCapture, renameTask, updateDuration }) => {
    return (
        <div className="cell"
            x={X}
            y={Y}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, X, Y, phaseNumber)}>
            <span className={`add-icon-left ${!firstColumn ? 'hide' : ''}`} onClick={() => addElement(true, X, Y, phaseNumber)}></span>
            {task && <Task
                task={task}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                handlePointerDown={handlePointerDown}
                handlePointerUpCapture={handlePointerUpCapture}
                renameTask={renameTask}
                updateDuration={updateDuration} />}
            {task && <span className="add-icon-right" onClick={() => addElement(false, X, Y, phaseNumber)}></span>}
        </div>
    )
}

export default Cell