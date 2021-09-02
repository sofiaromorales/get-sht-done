import React, { useState, useEffect } from 'react'

import './App.css'

import TasksList from './components/TasksList'
import InputBar from './components/InputBar'
import ProgressBar from './components/ProgressBar'
import 'fs';
const { ipcRenderer } = window.require('electron');
//const electron = require('electron');
//const ipcRenderer  = electron.ipcRenderer;

function App() {

    const [pendingTasks, setPendingTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [successPercentage, setSuccessPercentage] = useState(0)

    useEffect(() => {
        ipcRenderer.on('pending-tasks', (event, arg) => {
            setPendingTasks([...arg.filter(pt => pt != null)])
        })
        ipcRenderer.on('complete-tasks', (event, arg) => {
            if (arg) {
                setCompletedTasks([...arg.filter(ct => ct != null)])
            }
        })
    }, [])

    useEffect(() => {
        const tasks = [...pendingTasks, ...completedTasks]
        setSuccessPercentage(tasks.length ? (completedTasks.length * 100) / tasks.length : 0)
    },[completedTasks, pendingTasks])


    const addPendingTask = (task) => {
        const tasks = pendingTasks
        tasks.push({title: task, type: 'pending'})
        setPendingTasks([...tasks])
        // ipcRenderer.send('add_task', {
        //     storeName:'pending-tasks',
        //     value: [...tasks]
        // })
    }

    const resetTasks = () => {
        setPendingTasks([])
        setCompletedTasks([])
        setSuccessPercentage(0)
        ipcRenderer.send('delete_tasks', {
            storeName:'pending-tasks',
            value: []
        })
        ipcRenderer.send('delete_tasks', {
            storeName:'complete-tasks',
            value: []
        })
    }

    const setAsCompleted = (task) => {
        //task.type = 'completed'
        const completedTaskIndex = pendingTasks.findIndex(t => t === task)
        const pendingTasksCopy = pendingTasks
        setPendingTasks([...pendingTasksCopy.splice(completedTaskIndex, 1)])
        task.type = 'completed'
        setCompletedTasks([...completedTasks, task])
        //[completedTaskIndex].type='completed'
        // ipcRenderer.send('add_task', {
        //     storeName:'complete-tasks',
        //     value: [...completedTasks, task]
        // })

    }

    useEffect(() => {
        ipcRenderer.send('add_task', {
            storeName:'pending-tasks',
            value: [...pendingTasks]
        })
    }, [pendingTasks])

    useEffect(() => {
        ipcRenderer.send('add_task', {
            storeName:'complete-tasks',
            value: [...completedTasks]
        })
    })

    return (
        <div className='App'>
            <InputBar onAdd={(task) => addPendingTask(task)}/>
            <ProgressBar
                successPercentage={successPercentage}
            />
            <hr/>
            <TasksList
                tasks={pendingTasks}
                title='Pending'
                type='pending'
                setAsCompleted={(task) => setAsCompleted(task)}
            />
            <TasksList
                tasks={completedTasks}
                title='Completed'
                type='completed'
            />
            <div className='reset-button' onClick={() => resetTasks()}>
                Reset
            </div>
        </div>
    );
}

export default App;
