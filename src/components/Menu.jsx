import React, { useContext, useState } from 'react'
import { AllContext } from '../context/All'
import { FaCircleArrowLeft } from "react-icons/fa6"
import { FaArrowCircleRight } from "react-icons/fa";
import { FaCircleStop } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

import sound from "../notification.wav"

const Menu = ({theme, setTheme, setModal}) => {
    const { session, setSession, maxSession, setStopTimer, stopTimer, mode, setMode, setStudyTime, maxStudyTime, setRelaxTime, maxBreakTime} = useContext(AllContext)
    
    function handleTimerUpdateBack() {
        const audio = new Audio(sound)
        if (session - 1 <= 0) {
            return;
        }

        if (mode === "FOCUS") {
            setStudyTime(maxStudyTime)
            setRelaxTime(maxBreakTime)

        } else if (mode === "BREAK") {
            setRelaxTime(maxBreakTime)
            setStudyTime(maxStudyTime)
        }
        setSession(prev => prev - 1)
        setMode(prev => prev === "FOCUS" ? "BREAK" : "FOCUS")
        audio.play()

    }

    function handleTimerUpdateForth() {
        const audio = new Audio(sound)
        if (session + 1 > maxSession) {
            return;
        }
        if (mode === "FOCUS") {
            setStudyTime(maxStudyTime)
            setRelaxTime(maxBreakTime)

        } else if (mode === "BREAK") {
            setRelaxTime(maxBreakTime)
            setStudyTime(maxStudyTime)
        }
        setSession(prev => prev + 1)
        setMode(prev => prev === "FOCUS" ? "BREAK" : "FOCUS")
        audio.play()

    }

    function handleResetSession() {
        setSession(1)
        setMode("FOCUS")
        setStudyTime(maxStudyTime)
    }

    
    
      const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
      }

      function handleStopBtnClick() {
        setStopTimer(!stopTimer)
        setBtnStopClick(!btnStopClick)
      }

    const [btnStopClick, setBtnStopClick] = useState(false)
    const btnSize = "10vmin"

    const btn = "cursor-pointer max-w-16 dark:text-white"

  return (
    <div className='container flex w-full flex-col mt-4 gap-6 justify-center items-center'>
        <div className='flex gap-3 small:gap-10 justify-between items-center'>
            <FaCircleArrowLeft className={btn} size={btnSize} onClick={handleTimerUpdateBack}/>
            {stopTimer ? <FaPlay className={btn + " ml-2"} size={btnSize} onClick={handleStopBtnClick}/>
                            : <FaCircleStop className={btn} size={btnSize} onClick={handleStopBtnClick}/>
            }
            <FaArrowCircleRight className={btn} size={btnSize} onClick={handleTimerUpdateForth}/>
        </div>
        <div>
            <p className='dark:text-white text-[20px] small:text-2xl'>{session} of {maxSession} Sessions</p>
        </div>
        <div className='flex gap-3 small:gap-10 justify-between items-center'>
            <VscDebugRestart className={btn} onClick={handleResetSession} cursor={"pointer"} size={btnSize}/>
            {theme === "dark" ? <MdDarkMode className={btn} onClick={toggleTheme} cursor={"pointer"} size={btnSize} /> : <MdLightMode className={btn} onClick={toggleTheme} cursor={"pointer"} size={btnSize} />}
            <IoIosSettings className={btn} cursor={"pointer"} onClick={() => setModal(true)} size={btnSize}/>
            </div>
    </div>
  )
}

export default Menu
