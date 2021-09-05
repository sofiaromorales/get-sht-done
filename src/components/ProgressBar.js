import React from 'react'

const ProgressBar = ({
    pendingPercentage,
    successPercentage,
    holdPercentage
}) => {

    const successBar = {
        transition: 'width 1s ease-in-out',
        width: `${successPercentage}%`
    }

    const holdBar = {
        transition: 'width 1s ease-in-out',
        width: `${holdPercentage}%`
    }

    const pendingBar = {
        transition: 'width 1s ease-in-out',
        width: `${pendingPercentage}%`
    }

    return (
        <div className='ProgressBar'>
            <div className='pending-bar' style={pendingBar}/>
            <div className='success-bar' style={successBar}/>
            <div className='hold-bar' style={holdBar}/>
        </div>
    )
}

export default ProgressBar
