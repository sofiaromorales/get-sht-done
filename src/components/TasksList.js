import React from 'react'

const TasksList = ({
    tasks,
    type,
    setAsCompleted
}) => {

    const renderTasks = ({tasks}) => {
        return tasks.map(t => {
            if (t.type == type) {
                return (
                    <div>
                        {`${t.title}`}
                        {type ==='pending' &&
                            <button onClick={() => setAsCompleted(t)}>
                                {'Completed'}
                            </button>
                        }
                    </div>
                )
            }
        })
    }

    return (
        <div className='TasksList'>
            {renderTasks({tasks})}
        </div>
    )
}

export default TasksList
