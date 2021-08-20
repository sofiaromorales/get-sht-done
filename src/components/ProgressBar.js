import React from 'react'

const ProgressBar = ({
    successPercentage
}) => {

    return (
        <div className='ProgressBar'>
            <div className='success-bar' style={{width: `${successPercentage}%`}}/>
        </div>
    )
}

export default ProgressBar
