import Sidebar from "./Sidebar"
import Tracks from "./Tracks"
import SVGViewport from "./SVGViewport"

const Grid = ({ scopes, phases, tasks, paths, onDragOver, onDrop, onDragStart, onDragEnd, addElement,
    handlePointerDown, handlePointerUpCapture, handlePointerMove, handlePointerUp,
    handlePhaseAddition, handlePhaseRemoval, handleScopeAddition, handleScopeRemoval,
    renameScope, renamePhase, renameTask, updateDuration }) => {

    return (
        <div className="grid">
            <Sidebar
                scopes={scopes}
                handleScopeAddition={handleScopeAddition}
                handleScopeRemoval={handleScopeRemoval}
                renameScope={renameScope} />
            <Tracks
                phases={phases}
                tasks={tasks}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                addElement={addElement}
                handlePointerDown={handlePointerDown}
                handlePointerUpCapture={handlePointerUpCapture}
                handlePointerMove={handlePointerMove}
                handlePointerUp={handlePointerUp}
                handlePhaseAddition={handlePhaseAddition}
                handlePhaseRemoval={handlePhaseRemoval}
                renamePhase={renamePhase}
                renameTask={renameTask}
                updateDuration={updateDuration}
            />
            <SVGViewport paths={paths} tasks={tasks} />
        </div>
    )
}

export default Grid
