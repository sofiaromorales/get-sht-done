import React from 'react'
import CheckmarkImage from '../assets/checkmark.png'

const TasksList = ({
    tasks,
    title,
    type,
    setAsCompleted
}) => {

    const renderTasks = ({tasks}) => {
        return tasks.map(t => {
            if (t.type === type) {
                return (
                    <div className='task-container'>
                        {`${t.title}`}
                        {type ==='pending' &&
                            <div className='completed-icon' onClick={() => setAsCompleted(t)}>
                                <img src={CheckmarkImage} alt='checkmark'/>
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
