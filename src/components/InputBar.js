import React, { useState } from 'react'

const InputBar = ({
    onAdd
}) => {

    const [newTask, setNewTask] = useState(null)

    const addTask = (task) => {
        if (task && task !== undefined) {
            onAdd(task)
        }
        setNewTask(null)
        document.getElementById('taskInput').value = ''
    }

    return(
        <div className='InputBar'>
            <div className='input-container'>
                <div className='input-wrapper'>
                    <input
                        type='text'
                        name='todo'
                        id='taskInput'
                        placeholder='Enter todo'
                        onChange={(input) => setNewTask(input.target.value)}
                    />
                </div>
                <div className='add-button-container' onClick={() => addTask(newTask)}>
                    <div className='button-text'>
                        Add
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputBar
