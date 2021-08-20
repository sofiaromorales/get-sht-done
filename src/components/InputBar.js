import React, { useState } from 'react'

const InputBar = ({
    onAdd
}) => {

    const [newTask, setNewTask] = useState(null)

    const addTask = (task) => {
        if (task && task != undefined) {
            onAdd(task)
        }
        document.getElementById('taskInput').value = ''
    }

    return(
        <div className='InputBar'>
            <div className='inputContainer'>
                <div className='inputWrapper'>
                    <input
                        type='text'
                        name='todo'
                        id='taskInput'
                        placeholder='Enter todo'
                        onChange={(input) => setNewTask(input.target.value)}
                    />
                </div>
                <button className='addButtonContainer' onClick={() => addTask(newTask)}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default InputBar
