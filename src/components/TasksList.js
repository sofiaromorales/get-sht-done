import React from 'react'

const TasksList = ({
    tasks,
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
                            <button onClick={() => setAsCompleted(t)}>
                                {'Completed'}
                            </button>
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
                {type}
            </div>
            {renderTasks({tasks})}
        </div>
    )
}

export default TasksList
