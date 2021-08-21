import React, { useState, useEffect } from 'react'

import './App.css'

import TasksList from './components/TasksList'

import InputBar from './components/InputBar'
import ProgressBar from './components/ProgressBar'

function App() {

    const [pendingTasks, setPendingTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [successPercentage, setSuccessPercentage] = useState(0)



    useEffect(() => {
        const tasks = [...pendingTasks, ...completedTasks]
        setSuccessPercentage(tasks.length ? (completedTasks.length * 100) / tasks.length : 0)
    },[completedTasks, pendingTasks])


    const addPendingTask = (task) => {
        const tasks = pendingTasks
        tasks.push({title: task, type: 'pending'})
        setPendingTasks([...tasks])
    }

    const setAsCompleted = (task) => {
        task.type = 'completed'
        const completedTaskIndex = pendingTasks.findIndex(t => t.type === 'completed')
        setCompletedTasks([...completedTasks, pendingTasks[completedTaskIndex]])
        pendingTasks.splice(completedTaskIndex, 1)
        setPendingTasks([...pendingTasks])
    }

    return (
        <div className='App'>
            <InputBar onAdd={(task) => addPendingTask(task)}/>
            <ProgressBar
                successPercentage={successPercentage}
            />
            <hr/>
            <TasksList
                tasks={pendingTasks}
                title='Pending Tasks'
                type='pending'
                setAsCompleted={(task) => setAsCompleted(task)}
            />
            <TasksList
                tasks={completedTasks}
                title='Completed Tasks'
                type='completed'
            />
        </div>
    );
}

export default App;
