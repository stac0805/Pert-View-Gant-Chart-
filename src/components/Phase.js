import Column from "./Column"
import useComponentVisible from "../common"

const Phase = ({ index, name, phaseNumber, id, columns, tasks, onDragOver, onDrop, onDragStart, onDragEnd, addElement,
    handlePointerDown, handlePointerUpCapture, handlePhaseAddition, handlePhaseRemoval, renamePhase,
    renameTask, updateDuration }) => {

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    
    return (
        <>
            <div className="phase" phase={phaseNumber}>
                <div className="phase_heading" style={(index % 2) !== 0 ? { backgroundColor: '#f2f2f2' } : {}}>
                    <input className="phase_name" value={name} onChange={(e) => renamePhase(id, e.target.value)} />
                    <div className="phase_options_icon" onClick={() => { setIsComponentVisible(true) }}>
                    </div>
                    {isComponentVisible && <div ref={ref} className="phase_options">
                        <div className="phase_option" onClick={() => {
                            setIsComponentVisible(false)
                            handlePhaseAddition(true, id)
                        }}>Insert Phase Before</div>
                        <div className="phase_option" onClick={() => {
                            setIsComponentVisible(false)
                            handlePhaseAddition(false, id)
                        }}>Insert Phase After</div>
                        <div className="phase_option" onClick={() => {
                            setIsComponentVisible(false)
                            handlePhaseRemoval(id)
                        }}>Remove Phase</div>
                    </div>}
                </div>
                <div className="column_container">
                    {columns.map((column, index) => {
                        return (
                            <Column
                                key={index}
                                phaseNumber={phaseNumber}
                                column={column.column}
                                firstColumn={column.firstColumn}
                                cells={column.cells}
                                tasks={tasks}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                addElement={addElement}
                                handlePointerDown={handlePointerDown}
                                handlePointerUpCapture={handlePointerUpCapture}
                                renameTask={renameTask}
                                updateDuration={updateDuration}
                            />)
                    })}
                </div>
            </div>
        </>

    )
}

export default Phase