import React, { useState, useEffect } from 'react'
import 'fs'

import './App.css'

import TasksList from './components/TasksList'
import InputBar from './components/InputBar'
import ProgressBar from './components/ProgressBar'

const { ipcRenderer } = window.require('electron')

function App() {

    const [pendingTasks, setPendingTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [onHoldTasks, setOnHoldTasks] = useState([])
    const [successPercentage, setSuccessPercentage] = useState(0)
    const [holdPercentage, setHoldPercentage] = useState(0)
    const [pendingPercentage, setPendingPercentage] = useState(0)

    const clear = ({listType}) => {
        if (listType == 'pending-tasks') {
            setPendingTasks([])
        }
        else if (listType == 'complete-tasks') {
            setCompletedTasks([])
        }
        else if (listType == 'on-hold-tasks') {
            setOnHoldTasks([])
        }
        ipcRenderer.send('delete_tasks', {
            storeName: listType,
            value: []
        })
    }

    const addPendingTask = (task) => {
        const tasks = pendingTasks
        tasks.push({title: task, type: 'pending'})
        setPendingTasks([...tasks])
    }

    const resetTasks = () => {
        setPendingTasks([])
        setCompletedTasks([])
        setOnHoldTasks([])
        setSuccessPercentage(0)
        ipcRenderer.send('delete_tasks', {
            storeName:'pending-tasks',
            value: []
        })
        ipcRenderer.send('delete_tasks', {
            storeName:'complete-tasks',
            value: []
        })
        ipcRenderer.send('delete_tasks', {
            storeName:'on-hold-tasks',
            value: []
        })
    }

    const setAsCompleted = (task) => {
        const completedTaskIndex = pendingTasks.findIndex(t => t === task)
        const pendingTasksCopy = pendingTasks
        pendingTasksCopy.splice(completedTaskIndex, 1)
        setPendingTasks([...pendingTasksCopy])
        task.type = 'completed'
        setCompletedTasks([...completedTasks, task])
    }
    
    const setAsPending = (task) => {
        const onPendingTaskIndex = pendingTasks.findIndex(t => t === task)
        const onHoldTasksCopy = onHoldTasks
        onHoldTasksCopy.splice(onPendingTaskIndex, 1)
        setOnHoldTasks([...onHoldTasksCopy])
        task.type = 'pending'
        setPendingTasks([...pendingTasks, task])
    }

    const setOnHold = (task) => {
        const onHoldTaskIndex = pendingTasks.findIndex(t => t === task)
        const pendingTasksCopy = pendingTasks
        pendingTasksCopy.splice(onHoldTaskIndex, 1)
        setPendingTasks([...pendingTasksCopy])
        task.type = 'on_hold'
        setOnHoldTasks([...onHoldTasks, task])
    }

    useEffect(() => {
        ipcRenderer.on('pending-tasks', (event, arg) => {
            setPendingTasks([...arg.filter(pt => pt != null)])
        })
        ipcRenderer.on('complete-tasks', (event, arg) => {
            if (arg) {
                setCompletedTasks([...arg.filter(ct => ct != null)])
            }
        })
        ipcRenderer.on('on-hold-tasks', (event, arg) => {
            if (arg) {
                setOnHoldTasks([...arg.filter(ct => ct != null)])
            }
        })
    }, [])

    useEffect(() => {
        const tasks = [...pendingTasks, ...completedTasks, ...onHoldTasks]
        setSuccessPercentage(tasks.length ? (completedTasks.length * 100) / tasks.length : 0)
        setHoldPercentage(tasks.length ? (onHoldTasks.length * 100) / tasks.length : 0)
        setPendingPercentage(pendingTasks.length ? (pendingTasks.length * 100) / tasks.length : 0)
    },[completedTasks, pendingTasks, onHoldTasks])

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
    }, [completedTasks])

    useEffect(() => {
        ipcRenderer.send('add_task', {
            storeName:'on-hold-tasks',
            value: [...onHoldTasks]
        })
    }, [onHoldTasks])

    return (
        <div className='App'>
            <div className='control-bar'>
                <InputBar onAdd={(task) => addPendingTask(task)}/>
                <ProgressBar
                    successPercentage={successPercentage}
                    holdPercentage={holdPercentage}
                    pendingPercentage={pendingPercentage}
                />
            </div>
            <TasksList
                clear={(listType) => clear(listType)}
                tasks={pendingTasks}
                title='Pending'
                type='pending'
                setAsCompleted={(task) => setAsCompleted(task)}
                setOnHold={(task) => setOnHold(task)}
            />
            <TasksList
                clear={(listType) => clear(listType)}
                tasks={completedTasks}
                title='Completed'
                type='completed'
                setAsCompleted={(task) => setAsCompleted(task)}
                setOnHold={(task) => setOnHold(task)}
            />
            <TasksList
                clear={(listType) => clear(listType)}
                tasks={onHoldTasks}
                title='On Hold'
                type='on_hold'
                setAsCompleted={(task) => setAsCompleted(task)}
                setOnHold={(task) => setOnHold(task)}
                setAsPending={(task) => setAsPending(task)}
            />
            <div className='reset-button' onClick={() => resetTasks()}>
                Reset
            </div>
        </div>
    );
}

export default App;
