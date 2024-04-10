import React, { useContext, useEffect, useState } from 'react'
import { AllContext } from '../context/All'

const Counter = ({studyTime, relaxTime, mode}) => {
    const {session, maxStudyTime, maxBreakTime} = useContext(AllContext)
    const val = mode === "BREAK" ? relaxTime : studyTime
    const val2 = mode === "BREAK" ? maxBreakTime : maxStudyTime
    const timerCSS = {
        background:
        `linear-gradient(to right, var(--body_background), var(--body_background)) content-box no-repeat, 
         conic-gradient(var(--left_time) ${((val / val2) * 100)}%, white 0) border-box`,
    };

    console.log("MODEEEE", {mode})



    let minutes = Math.floor((studyTime % 3600) / 60);
    let remainingSeconds = studyTime % 60;
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0')

    if (mode === 'BREAK') {
        minutes = Math.floor((relaxTime % 3600) / 60);
        remainingSeconds = relaxTime % 60;
        formattedMinutes = String(minutes).padStart(2, '0');
        formattedSeconds = String(remainingSeconds).padStart(2, '0')    }

    
    return (
        <>
        <div style={timerCSS} className="circle-outer">
            <span className="text time">{formattedMinutes}:{formattedSeconds}</span>
            <span className="text focus">{mode}</span>
        </div>
        </>
    )
}

export default Counter
