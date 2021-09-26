import React, { useState } from 'react'
import CheckmarkImage from '../assets/checkmark.png'
import ResumeImage from '../assets/resume.png'
import PauseImage from '../assets/pause.png'

const TasksList = ({
    clear,
    tasks,
    title,
    type,
    setAsCompleted,
    setOnHold,
    setAsPending
}) => {

    const [collapsed, setCollpased] = useState(false)

    const clearTask = () => {
        if (tasks.length) {
            const listType = tasks[0].type == 'pending'
            ? 'pending-tasks'
            :  tasks[0].type == 'completed'
                ? 'complete-tasks'
                : 'on-hold-tasks'
            clear({listType: listType})
        }
    }

    const renderTasks = ({tasks}) => {
        return tasks.map(t => {
            if (t && t.type === type) {
                return (
                    <div className='task-container'>
                        {`${t.title}`}
                        {type ==='pending' &&
                            <>
                                <div className='icon on-pause'>
                                    <img src={CheckmarkImage} alt='completed' onClick={() => setAsCompleted(t)}/>
                                    <img src={PauseImage} alt='hold' onClick={() => setOnHold(t)}/>
                                </div>
                            </>
                        }
                        {type ==='on_hold' &&
                            <div className='icon resume'>
                                <img src={ResumeImage} alt='resume' onClick={() => setAsPending(t)}/>
                            </div>
                        }
                    </div>
                )
            }
            return null
        })
    }

    return (
        <div className='TasksList'>
            <div className='title-container'>
                <button onClick={() => setCollpased(!collapsed)}>
                    {`${collapsed ? '+' : '-'}`}
                </button>
                <div className='list-title'>
                    {title}
                </div>
                <div className='clear-button' onClick={() => clearTask()}>
                    Clear
                </div>
            </div>
            <div className={`tasks-list-content ${collapsed ? 'collapsed' : ''}`}>
                {renderTasks({tasks})}
            </div>
        </div>
    )
}

export default TasksList
