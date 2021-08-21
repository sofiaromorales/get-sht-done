import React from 'react'

const ProgressBar = ({
    successPercentage
}) => {

    const successBar = {
        transition: 'width 1s ease-in-out',
        width: `${successPercentage}%`
    }

    return (
        <div className='ProgressBar'>
            <div className='success-bar' style={successBar}/>
        </div>
    )
}

export default ProgressBar
