import React from 'react'
import CheckmarkImage from '../assets/checkmark.png'
import ResumeImage from '../assets/resume.png'
import PauseImage from '../assets/pause.png'

const TasksList = ({
    tasks,
    title,
    type,
    setAsCompleted,
    setOnHold,
    setAsPending
}) => {

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
            <div className='list-title'>
                {title}
            </div>
            {renderTasks({tasks})}
        </div>
    )
}

export default TasksList
