import Phase from "./Phase"

const Tracks = ({ phases, tasks, onDragOver, onDrop, onDragStart, onDragEnd, addElement,
    handlePointerDown, handlePointerUpCapture, handlePointerMove, handlePointerUp,
    handlePhaseAddition, handlePhaseRemoval, renamePhase, renameTask, updateDuration }) => {
    return (
        <div className="tracks"
            onMouseUp={handlePointerUp}
            onMouseMove={(e) => handlePointerMove(e)}>
            {phases.map((phase, index) => {
                return (
                    <Phase
                        key={index}
                        index={index}
                        phaseNumber={phase.phase}
                        name={phase.name}
                        id={phase.id}
                        columns={phase.columns}
                        tasks={tasks}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        addElement={addElement}
                        handlePointerDown={handlePointerDown}
                        handlePointerUpCapture={handlePointerUpCapture}
                        handlePhaseAddition={handlePhaseAddition}
                        handlePhaseRemoval={handlePhaseRemoval}
                        renamePhase={renamePhase}
                        renameTask={renameTask}
                        updateDuration={updateDuration}
                    />
                )
            })}
        </div>
    )
}
export default Tracks