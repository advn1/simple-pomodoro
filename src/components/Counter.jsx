import React, { useEffect, useState, useContext } from 'react'
import { CircularProgressbarWithChildren, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AllContext } from '../context/All'



const Counter = ({studyTime, relaxTime, mode}) => {

  const timerCSS = {
    root: {
    },
    path: {
      strokeLinecap: 'butt',
      transition: 'stroke-dashoffset 0.5s ease 0s',

      transform: 'rotate(360deg) rotateY(180deg)',
      transformOrigin: 'center center',

      strokeDashoffset: -30,
      stroke: '#583cf4',
    },
    trail: {
      stroke: '#ffffff',
      strokeLinecap: 'butt',
      transform: 'rotate(0.25turn)',
      transformOrigin: 'center center',
    },
    text: {
      fill: 'black',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    background: {
      fill: '#3e98c7',
    },
  }

  const {session, maxStudyTime, maxBreakTime} = useContext(AllContext)
  const val = mode === "BREAK" ? relaxTime : studyTime
  const val2 = mode === "BREAK" ? maxBreakTime : maxStudyTime




  let minutes = Math.floor((studyTime % 3600) / 60);
  let remainingSeconds = studyTime % 60;
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(remainingSeconds).padStart(2, '0')

  if (mode === 'BREAK') {
      minutes = Math.floor((relaxTime % 3600) / 60);
      remainingSeconds = relaxTime % 60;
      formattedMinutes = String(minutes).padStart(2, '0');
      formattedSeconds = String(remainingSeconds).padStart(2, '0')    }

    console.log({studyTime, minutes, formattedMinutes})

  const timerValues = ((studyTime === 3600 && mode === 'FOCUS') || (relaxTime === 3600 && moded === 'BREAK')) ? '60:00' : `${formattedMinutes}:${formattedSeconds}`

  return (
    <div className='container mb-[20px] flex flex-col justify-end items-center w-50vmin h-50vmin max-w-80 max-h-96'>

    <CircularProgressbarWithChildren  
      value={val / val2 * 100 }
      
      styles={timerCSS}>
        <span className="font-bold text-black dark:text-white text-3xl small:text-5xl medium:text-6xl sm:text-7xl text- md:text-7xl lg:text-7xl xl:text-7xl">{timerValues}</span>
        <span className="font-bold text-black dark:text-white text-1xl small:text-3xl medium:text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl">{mode}</span>
      </CircularProgressbarWithChildren>
    </div>
  )
}

export default Counter
