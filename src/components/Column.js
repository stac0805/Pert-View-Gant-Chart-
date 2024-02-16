import Cell from "./Cell"

const Column = ({ phaseNumber, column, firstColumn, cells, tasks, onDragOver, onDrop, onDragStart,
    onDragEnd, addElement, handlePointerDown, handlePointerUpCapture, renameTask, updateDuration }) => {
    let cellTask = null
    return (
        <div className="column" column={column}>
            {cells.map((cell, index) => {
                cellTask = null
                tasks.forEach(task => {
                    if (task.X === column && task.Y === cell.Y) {
                        cellTask = task
                    }
                });
                return <Cell
                    key={index}
                    X={column}
                    Y={cell.Y}
                    firstColumn={firstColumn}
                    phaseNumber={phaseNumber}
                    task={cellTask}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    addElement={addElement}
                    handlePointerDown={handlePointerDown}
                    handlePointerUpCapture={handlePointerUpCapture}
                    renameTask={renameTask}
                    updateDuration={updateDuration}
                />
            })}
        </div>
    )
}

export default Column