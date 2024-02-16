import "./Panel.css"

const Panel = ({ handleUndoRedo, handleJustify }) => {
    return (
        <div className="panel">
            <div className="undo_container">
                <div className="undo-icon" onClick={() => handleUndoRedo(true)}></div>
                <div className="redo-icon" onClick={() => handleUndoRedo(false)}></div>
            </div>
            <div className="justify_container">
                <div className="justify-left-icon" onClick={() => handleJustify(false)}></div>
                <div className="justify-center-icon" onClick={() => handleJustify(true)}></div>
            </div>
        </div>
    )
}

export default Panel