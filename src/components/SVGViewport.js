const cellWidth = 280
const cellHeight = 60
const successorPoint = 240
const predessorPoint = 40
const verticalPoint = 30
const topPanelHeight = 86

const SVGViewport = ({ paths, tasks }) => {
    return (
        <div>
            {paths.map((path, index) => {
                if (path) {
                    const connectingElement = tasks.find(task => { return task.id === path.connectorId })
                    let targetElement
                    let pathString
                    if (path.targetId !== -1) {
                        targetElement = tasks.find(task => { return task.id === path.targetId })
                        if (connectingElement.X - targetElement.X === -1) {
                            pathString = `M${cellWidth * (connectingElement.X - 1) + successorPoint},${cellHeight * (connectingElement.Y - 1) + verticalPoint} 
                                L${cellWidth * (connectingElement.X - 1) + successorPoint + predessorPoint},${cellHeight * (connectingElement.Y - 1) + verticalPoint}
                                L${cellWidth * (connectingElement.X - 1) + successorPoint + predessorPoint},${cellHeight * (targetElement.Y - 1) + verticalPoint} 
                                L${cellWidth * (targetElement.X - 1) + predessorPoint - 8}, ${cellHeight * (targetElement.Y - 1) + verticalPoint}`
                        }
                        else {
                            pathString = `M${cellWidth * (connectingElement.X - 1) + successorPoint},${cellHeight * (connectingElement.Y - 1) + verticalPoint} 
                                L${cellWidth * (connectingElement.X - 1) + successorPoint + predessorPoint},${cellHeight * (connectingElement.Y - 1) + verticalPoint}
                                L${cellWidth * (connectingElement.X - 1) + successorPoint + predessorPoint},${cellHeight * (targetElement.Y - 1)}
                                L${cellWidth * (targetElement.X - 1)},${cellHeight * (targetElement.Y - 1)} 
                                L${cellWidth * (targetElement.X - 1)},${cellHeight * (targetElement.Y - 1) + verticalPoint}
                                L${cellWidth * (targetElement.X - 1) + predessorPoint - 8}, ${cellHeight * (targetElement.Y - 1) + verticalPoint}`
                        }
                    } else {
                        targetElement = path.target
                        pathString = `M${cellWidth * (connectingElement.X - 1) + successorPoint},${cellHeight * (connectingElement.Y - 1) + verticalPoint} 
                        L${cellWidth * (connectingElement.X - 1) + successorPoint + predessorPoint},${cellHeight * (connectingElement.Y - 1) + verticalPoint}
                        L${cellWidth * (connectingElement.X - 1) + successorPoint + predessorPoint},${targetElement.Y - topPanelHeight} 
                        L${targetElement.X - cellWidth + 40}, ${targetElement.Y - topPanelHeight}`
                    }

                    let x = document.querySelector('.tracks')

                    return (
                        <svg className="viewport" key={index} style={{ width: x.offsetWidth, height: x.offsetHeight }}>
                            <marker id="arrow" viewBox="0 0 10 10"
                                refX="1" refY="5"
                                markerUnits="strokeWidth"
                                markerWidth="6" markerHeight="6"
                                orient="auto">
                                <path d="M 0 0 L 5 5 L 0 10 z" fill="black" />
                            </marker>
                            <path className="path" d={pathString} markerEnd="url(#arrow)" stroke='gray' fill='none' />
                        </svg>
                    )
                }
            })
            }
        </div>
    )
}

export default SVGViewport