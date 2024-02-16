const Element = ({ element, onDragStart, onDragEnd, handlePointerDown, handlePointerUpCapture }) => {
    return (
        <div className="element">
            <div className="pre" onPointerUpCapture={(e) => handlePointerUpCapture(e)} />
            <div className="body" draggable
                onDragStart={(e) => onDragStart(e, element.id)}
                onDragEnd={(e) => onDragEnd(e)}>
                {element.name}
            </div>
            <div className="post" onPointerDown={(e) => handlePointerDown(e)} />
        </div>
    )
}

export default Element