import React, { Component } from 'react'
import './App.css';
import Grid from './components/Grid';
import Panel from './components/Panel/Panel';

class App extends Component {


  constructor(props) {
    super(props)
    let phases = []
    this.states = []   // historical values for undo & redo
    for (let i = 1; i <= 12; i++) {
      let cells = []
      for (let j = 1; j <= 12; j++) {
        cells.push({ X: i, Y: j })
      }
      const phase = {
        phase: i,
        id: i,
        name: 'phase ' + i,
        columns: [{
          column: i,
          firstColumn: true,
          cells: cells
        }]
      }
      phases.push(phase)
    }

    phases[0].name = 'Procurement'
    phases[1].name = 'Execution'
    phases[2].name = 'Finishing'

    this.state = {
      scopes: [
        { id: 1, name: 'Excavation' },
        { id: 2, name: '' },
        { id: 3, name: 'Foundation' },
        { id: 4, name: '' },
        { id: 5, name: 'Superstructure' },
        { id: 6, name: 'Finishing' },
        { id: 7, name: 'Scope 5' },
        { id: 8, name: '' },
        { id: 9, name: 'Scope 6' },
        { id: 10, name: '' },
        { id: 11, name: '' },
        { id: 12, name: '' }
      ],
      phases: phases,
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          duration: '12d4h',
          X: 1,
          Y: 1,
          phase: 1,
          successors: [],
          predecessors: []
        },
        {
          id: 2,
          name: 'Task 2',
          duration: '120h',
          X: 2,
          Y: 2,
          phase: 2,
          successors: [],
          predecessors: []
        },
        {
          id: 3,
          name: 'Task 3',
          duration: '6d12h',
          X: 3,
          Y: 3,
          phase: 3,
          successors: [],
          predecessors: []
        }
      ],
      draggableElementId: null,
      connectingElementId: null,
      isPointerDown: false,
      paths: [],
      undoIndex: 0,
    }
  }

  componentDidMount() {
    const tasksHistory = []
    localStorage.setItem('tasksHistory', JSON.stringify(tasksHistory))
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDragStart = (e, id) => {
    this.setState({
      draggableElementId: id
    })
  }

  SaveStateHistory = () => {
    let tasksHistory = JSON.parse(localStorage.getItem('tasksHistory'))
    tasksHistory.push(this.state.tasks)
    localStorage.setItem('tasksHistory', JSON.stringify(tasksHistory))
  }

  onDrop = (e, x, y, phaseNumber) => {
    this.SaveStateHistory()

    let { tasks, phases, draggableElementId } = this.state
    let task = tasks.find(task => { return task.id === draggableElementId })

    // If element is dropped in same cell, do nothing
    if (task.X === x && task.Y === y) {
      return
    }

    // Logic: successor task cannot be placed before predecessor in same phase and vice versa
    // let phasePredecessors = []
    // let phaseSuccessors = []

    // task.predecessors.forEach(id => {
    //   const task = tasks.find(task => { return task.id === id })
    //   if (task.phase === phaseNumber) {
    //     phasePredecessors.push(task)
    //   }
    // })

    // task.successors.forEach(id => {
    //   const task = tasks.find(task => { return task.id === id })
    //   if (task.phase === phaseNumber) {
    //     phaseSuccessors.push(task)
    //   }
    // })

    // let min_x = 1
    // let max_x = 99999

    // phasePredecessors.forEach(task => {
    //   if (task.X > min_x) {
    //     min_x = task.X
    //   }
    // })

    // phaseSuccessors.forEach(task => {
    //   if (task.X < max_x) {
    //     max_x = task.X
    //   }
    // })

    // if (x <= min_x || x >= max_x) {
    //   if (task.phase === phaseNumber) {
    //     return
    //   } else {
    //     console.log('here')
    //   }
    // }
    // Logic Ends

    // check if cell is empty
    let isCellEmpty = true
    tasks.forEach(task => {
      if (task.X === x && task.Y === y) {
        isCellEmpty = false
      }
    })

    if (isCellEmpty) {
      task.X = x
      task.Y = y
      task.phase = phaseNumber
    } else {
      // add new column
      let newCells = []
      for (let i = 1; i <= 12; i++) {
        newCells.push({ X: x + 1, Y: i })
      }
      let newColumn = {
        column: x + 1,
        firstColumn: false,
        cells: newCells,
      }
      const phase = phases.find(phase => phase.phase === phaseNumber)
      const column = phase.columns.find(column => column.column === x)
      const columnIndex = phase.columns.indexOf(column)
      phase.columns.splice(columnIndex + 1, 0, newColumn)
      task.X = x + 1
      task.Y = y
      task.phase = phaseNumber

      // update elements postision according to new column addition
      tasks.forEach(item => {
        if (item !== task && item.X > x) {
          item.X++
        }
      })

    }
    this.updateColumnNumbers()
  }

  onDragEnd = (e) => {
    this.setState({
      draggableElementId: null
    })
  }

  updateColumnNumbers = () => {
    let columnIndex = 1
    let { phases, tasks } = this.state
    let deletedColumn
    let nonEmptyColumns = []

    tasks.forEach(task => {
      if (nonEmptyColumns.indexOf(task.X) === -1) {
        nonEmptyColumns.push(task.X)
      }
    })

    phases.forEach(phase => {
      phase.columns.forEach((column, index) => {
        if (!nonEmptyColumns.includes(column.column) && column.firstColumn === false) {
          phase.columns.splice(index, 1)
          deletedColumn = column.column
        }
      })
    })

    phases.forEach(phase => {
      phase.columns.forEach(column => {
        column.column = columnIndex
        column.cells.forEach(cell => {
          cell.X = columnIndex
        })
        columnIndex++
      })
    })

    // update elements postision according to new column deletion
    tasks.forEach(task => {
      if (task.X > deletedColumn) {
        task.X--
      }
    })

  }

  addElement = (isLeft, x, y, phaseNumber) => {
    let { tasks, phases } = this.state

    if (isLeft) {
      // check if cell is empty
      let isCellEmpty = true
      tasks.forEach(task => {
        if (task.X === x && task.Y === y) {
          isCellEmpty = false
        }
      })

      if (isCellEmpty) {
        const task = {
          // id: tasks.length + 1,
          id: Math.floor(1000 + Math.random() * 9000),
          name: 'Task ' + (tasks.length + 1),
          duration: 12,
          X: x,
          Y: y,
          phase: phaseNumber,
          successors: [],
          predecessors: []
        }
        tasks.push(task)
      } else {
        const task = {
          // id: tasks.length + 1,
          id: Math.floor(1000 + Math.random() * 9000),
          name: 'Task ' + (tasks.length + 1),
          duration: 12,
          X: x,
          Y: y,
          phase: phaseNumber,
          successors: [],
          predecessors: []
        }
        tasks.push(task)

        // add new column
        let newCells = []
        for (let i = 1; i <= 12; i++) {
          newCells.push({ X: x + 1, Y: i })
        }
        let newColumn = {
          column: x + 1,
          firstColumn: false,
          cells: newCells,
        }
        const phase = phases.find(phase => phase.phase === phaseNumber)
        const column = phase.columns.find(column => column.column === x)
        const columnIndex = phase.columns.indexOf(column)
        phase.columns.splice(columnIndex + 1, 0, newColumn)


        // update elements postision according to new column addition
        tasks.forEach(item => {
          if (item !== task && item.X >= x) {
            item.X++
          }
        })
        this.updateColumnNumbers()

      }
    } else { // add element on right 
      // add new column
      let newCells = []
      for (let i = 1; i <= 12; i++) {
        newCells.push({ X: x + 1, Y: i })
      }
      let newColumn = {
        column: x + 1,
        firstColumn: false,
        cells: newCells,
      }
      const phase = phases.find(phase => phase.phase === phaseNumber)
      const column = phase.columns.find(column => column.column === x)
      const columnIndex = phase.columns.indexOf(column)
      phase.columns.splice(columnIndex + 1, 0, newColumn)

      const task = {
        id: Math.floor(1000 + Math.random() * 9000),
        name: 'Task ' + (tasks.length + 1),
        duration: 12,
        X: x + 1,
        Y: y,
        phase: phaseNumber,
        successors: [],
        predecessors: []
      }
      tasks.push(task)

      // update elements postision according to new column addition
      tasks.forEach(item => {
        if (item !== task && item.X > x) {
          item.X++
        }
      })
      this.updateColumnNumbers()

    }
    this.setState({ tasks: tasks })
  }

  handlePointerDown = (e, id) => {
    this.setState({ connectingElementId: id, isPointerDown: true })
  }

  handlePointerUp = () => {
    const { paths } = this.state
    paths[0] = null
    this.setState({ isPointerDown: false, connectingElementId: null, paths: paths })
  }

  handlePointerMove = (e) => {
    const { connectingElementId, isPointerDown, paths } = this.state
    if (connectingElementId && isPointerDown) {
      const target = {
        id: -1,
        X: e.pageX,
        Y: e.pageY
      }
      paths[0] = {
        connectorId: connectingElementId,
        targetId: target.id,
        target: target
      }
      this.setState({ paths: paths })
    }
  }

  handlePointerUpCapture = (e, id) => {
    let { connectingElementId, tasks, paths, phases } = this.state
    const connectingTask = tasks.find(task => { return task.id === connectingElementId })
    const targetTask = tasks.find(task => { return task.id === id })

    // Logic: Cyclic Check
    const isCreatingCycle = connectingTask.predecessors.indexOf(id)
    if (isCreatingCycle !== -1) {
      alert('Makes a Cycle')
      return
    }
    // Logic ENDS

    // Logic: check if connected tasks are in same column
    if (connectingTask.X === targetTask.X) {
      let phase = phases.find(phase => { return phase.phase === connectingTask.phase })
      let nextColumn = phase.columns.find(column => { return column.column === (connectingTask.X + 1) })
      if (nextColumn) {
        // check if cell is empty
        let isCellEmpty = true
        tasks.forEach(task => {
          if (task.X === (targetTask.X + 1) && task.Y === targetTask.Y) {
            isCellEmpty = false
          }
        })

        if (isCellEmpty) {
          targetTask.X = connectingTask.X + 1
        }
      } else {
        // add new column
        let newCells = []
        for (let i = 1; i <= 12; i++) {
          newCells.push({ X: connectingTask.X + 1, Y: i })
        }
        let newColumn = {
          column: connectingTask.X + 1,
          firstColumn: false,
          cells: newCells,
        }
        const column = phase.columns.find(column => { return column.column === connectingTask.X })
        const columnIndex = phase.columns.indexOf(column)
        phase.columns.splice(columnIndex + 1, 0, newColumn)

        // update the task position
        targetTask.X = connectingTask.X + 1

        // update elements postision according to new column addition
        tasks.forEach(item => {
          if (item !== targetTask && item.X > connectingTask.X) {
            item.X++
          }
        })
        this.updateColumnNumbers()

      }
    }
    // Logic ENDS


    // Update Successors and Predecessors accoridng to new link
    connectingTask.successors.push(id)
    targetTask.predecessors.push(connectingElementId)

    connectingTask.successors = [...connectingTask.successors, ...targetTask.successors]
    targetTask.predecessors = [...targetTask.predecessors, ...connectingTask.predecessors]

    connectingTask.predecessors.forEach(id => {
      let predecessorTask = tasks.find(task => { return task.id === id })
      predecessorTask.successors = [...predecessorTask.successors, ...connectingTask.successors]
      predecessorTask.successors = predecessorTask.successors.filter((id, index) => {
        return predecessorTask.successors.indexOf(id) === index
      })
    })

    targetTask.successors.forEach(id => {
      let successorTask = tasks.find(task => { return task.id === id })
      successorTask.predecessors = [...successorTask.predecessors, ...targetTask.predecessors]
      successorTask.predecessors = successorTask.predecessors.filter((id, index) => {
        return successorTask.predecessors.indexOf(id) === index
      })
    })
    // Update Successors and Predecessors ENDS

    let path = {
      connectorId: connectingElementId,
      targetId: id,
    }

    paths.push(path)
    this.setState({ paths: paths, connectingElementId: null })
  }

  handlePhaseAddition = (addPhaseBefore, id) => {
    let { phases, tasks, paths } = this.state
    let index = phases.findIndex(phase => { return phase.id === id })

    const columns = phases[index].columns
    const lastColumnofPhase = columns[columns.length - 1].column
    const firstColumnofPhase = columns[0].column

    if (!addPhaseBefore) {
      index++
    }

    // add new phase
    let cells = []
    for (let j = 1; j <= 12; j++) {
      cells.push({ X: lastColumnofPhase + 1, Y: j })
    }
    const phase = {
      phase: phases.length + 1,
      id: phases.length + 1,
      name: 'phase ' + (phases.length + 1),
      columns: [{
        column: lastColumnofPhase + 1,
        firstColumn: true,
        cells: cells
      }]
    }
    phases.splice(index, 0, phase)

    // update elements postision according to new column addition
    if (addPhaseBefore) {
      tasks.forEach(item => {
        if (item.X >= firstColumnofPhase) {
          item.X++
        }
      })
    } else {
      tasks.forEach(item => {
        if (item.X > lastColumnofPhase) {
          item.X++
        }
      })
    }

    this.updateColumnNumbers()
    this.setState({ phases: phases, tasks: tasks, paths: paths })
  }

  handlePhaseRemoval = (id) => {
    let { phases, tasks, paths } = this.state
    const index = phases.findIndex(phase => { return phase.id === id })
    let deletedTasks = []

    // Remove tasks placed in phase
    tasks.forEach(task => {
      if (task.phase === id) {  // TO-DO update id in phases 
        tasks.splice(tasks.indexOf(task), 1)
        deletedTasks.push(task.id)
      }
    })

    // Remove connections on deleted tasks
    tasks.forEach(task => {
      task.successors = this.removeItems(task.successors, deletedTasks)
      task.predecessors = this.removeItems(task.predecessors, deletedTasks)
    })
    paths = paths.filter(path => path === null ||
      !(deletedTasks.includes(path.connectorId) || deletedTasks.includes(path.targetId))
    )

    const columns = phases[index].columns
    const lastColumnofPhase = columns[columns.length - 1].column

    // update elements postision according to new column addition
    tasks.forEach(item => {
      if (item.X > lastColumnofPhase) {
        item.X--
      }
    })

    // Removing phase
    phases.splice(index, 1)

    this.updateColumnNumbers()
    this.setState({ phases: phases, tasks: tasks, paths: paths })
  }

  handleScopeAddition = (addScopeAbove, id) => {
    let { scopes, phases, tasks, paths } = this.state
    let index = scopes.findIndex(phase => { return phase.id === id })

    if (!addScopeAbove) {
      index++
    }

    const newScope = { id: scopes.length + 1, name: '' }
    scopes.splice(index, 0, newScope)

    phases.forEach(phase => {
      phase.columns.forEach(column => {
        const newCell = { X: column.column, Y: column.cells.length + 1 }
        column.cells.push(newCell)
      })
    })

    // update elements postision according to new column addition
    tasks.forEach(item => {
      if (item.Y > index) {
        item.Y++
      }
    })

    this.setState({ scopes: scopes, phases: phases, tasks: tasks, paths: paths })
  }

  handleScopeRemoval = (id) => {
    let { tasks, phases, paths, scopes } = this.state
    let deletedTasks = []

    const scopeIndex = scopes.findIndex(scope => { return scope.id === id })
    scopes.splice(scopeIndex, 1)

    phases.forEach(phase => {
      phase.columns.forEach(column => {
        column.cells.splice(column.cells.length - 1, 1)
      })
    })

    // remove tasks places in scope
    tasks = tasks.filter(task => {
      if (task.Y === (scopeIndex + 1)) {
        deletedTasks.push(task.id)
      }
      return task.Y !== (scopeIndex + 1)
    })

    // update elements postision according to new column addition
    tasks.forEach(item => {
      if (item.Y > (scopeIndex + 1)) {
        item.Y--
      }
    })

    // Remove connections on deleted tasks
    tasks.forEach(task => {
      task.successors = this.removeItems(task.successors, deletedTasks)
      task.predecessors = this.removeItems(task.predecessors, deletedTasks)
    })
    paths = paths.filter(path => path === null ||
      !(deletedTasks.includes(path.connectorId) || deletedTasks.includes(path.targetId))
    )

    this.setState({ phases: phases, tasks: tasks, paths: paths, scopes: scopes })
    console.log(id, tasks, phases, paths, scopes, deletedTasks)
  }

  removeItems = (array, itemsToRemove) => {
    return array.filter(v => {
      return !itemsToRemove.includes(v);
    });
  }

  renameScope = (id, name) => {
    let { scopes } = this.state
    const scopeIndex = scopes.findIndex(scope => { return scope.id === id })
    scopes[scopeIndex].name = name
    this.setState(scopes)
  }

  renamePhase = (id, name) => {
    let { phases } = this.state
    const phaseIndex = phases.findIndex(phase => { return phase.id === id })
    phases[phaseIndex].name = name
    this.setState(phases)
  }

  renameTask = (id, name) => {
    let { tasks } = this.state
    const index = tasks.findIndex(task => { return task.id === id })
    tasks[index].name = name
    this.setState({ tasks })
  }

  updateDuration = (id, duration) => {
    let { tasks } = this.state
    const index = tasks.findIndex(task => { return task.id === id })
    tasks[index].duration = duration
    this.setState({ tasks })
  }

  handleUndoRedo = (isUndo) => {
    let { undoIndex } = this.state
    console.log(undoIndex)

    if (undoIndex >= 0) {
      const tasksHistory = JSON.parse(localStorage.getItem('tasksHistory'))
      let prevTask

      if (undoIndex === 0) {
        prevTask = tasksHistory[tasksHistory.length - 1]
        undoIndex = tasksHistory.length - 1
      } else {
        prevTask = tasksHistory[undoIndex - 1]
        undoIndex--
      }

      this.setState({ tasks: prevTask, undoIndex: undoIndex })
    }

  }

  handleJustify = (isCenter) => {
    console.log(isCenter)
  }

  render() {
    const { scopes, phases, tasks, paths } = this.state

    return (
      <div className="plan">
        <Panel
          handleUndoRedo={this.handleUndoRedo}
          handleJustify={this.handleJustify} />
        <Grid
          scopes={scopes}
          phases={phases}
          tasks={tasks}
          paths={paths}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          addElement={this.addElement}
          handlePointerDown={this.handlePointerDown}
          handlePointerUpCapture={this.handlePointerUpCapture}
          handlePointerMove={this.handlePointerMove}
          handlePointerUp={this.handlePointerUp}
          handlePhaseAddition={this.handlePhaseAddition}
          handlePhaseRemoval={this.handlePhaseRemoval}
          handleScopeAddition={this.handleScopeAddition}
          handleScopeRemoval={this.handleScopeRemoval}
          renameScope={this.renameScope}
          renamePhase={this.renamePhase}
          renameTask={this.renameTask}
          updateDuration={this.updateDuration}
        />
      </div>
    )
  }
}

export default App;
