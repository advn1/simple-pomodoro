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


const Menu = ({setModal}) => {
    const { session, setSession, maxSession, setStopTimer, stopTimer, mode, setMode, setStudyTime, maxStudyTime, setRelaxTime, maxBreakTime} = useContext(AllContext)
    const [btnStopClick, setBtnStopClick] = useState(false)
    const btnSize = "10vmin"
    
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

    const [whatMode, setWhatMode] = useState("dark")

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
        setWhatMode("dark")

      }
    
      const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme','light')
        setWhatMode("light")
      }
    
    
      if (document.querySelector('body').getAttribute('data-theme') === null) {
        setLightMode()
        setWhatMode("light")
      }
    
    
      const toggleTheme = () => {
        if (document.querySelector('body').getAttribute('data-theme') === 'light') {setDarkMode()}
        else {setLightMode()}
      }

      function handleStopBtnClick() {
        setStopTimer(!stopTimer)
        setBtnStopClick(!btnStopClick)
      }


    return (
        <>
            <div className='menu'>
                <div className='upper-part'>
                    <FaCircleArrowLeft className='btn' size={btnSize} onClick={handleTimerUpdateBack}/>
                    {
                        !btnStopClick 
                        ? <FaPlay style={{marginLeft:"5px"}} className='btn' size={btnSize} onClick={handleStopBtnClick}/>
                        : <FaCircleStop className='btn' size={btnSize} onClick={handleStopBtnClick}/>
                    }
                    <FaArrowCircleRight className='btn' size={btnSize} onClick={handleTimerUpdateForth}/>
                </div>
                <div>
                <p className='sessions-amount'>{session} of {maxSession} Sessions</p>
            </div>
            <div className='config-part'>
                <VscDebugRestart className='btn' onClick={handleResetSession} cursor={"pointer"} size={btnSize}/>
                {whatMode === "dark" ? <MdDarkMode onClick={toggleTheme} cursor={"pointer"} size={btnSize} /> : <MdLightMode onClick={toggleTheme} cursor={"pointer"} size={btnSize} />}
                <IoIosSettings className='btn' cursor={"pointer"} onClick={() => setModal(true)} size={btnSize}/>
            </div>
            </div>
        </>
    );
    
    
}

export default Menu
