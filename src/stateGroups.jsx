import React, { useState } from 'react'


const stateGroups = () => {

  const [stopTimer, setStopTimer] = useState(false);
  const [session, setSession] = useState(1);
  const [maxSession, setMaxSession] = useState(4)
  const [studyTime, setStudyTime] = useState(900);
  const [relaxTime, setRelaxTime] = useState(300);
  const [modal, setModal] = useState(false)

  const [maxStudyTime, setMaxStudyTime] = useState(900)
  const [maxBreakTime, setMaxBreakTime] = useState(300)

  const [mode, setMode] = useState(session % 2 === 0 ? "BREAK" : "FOCUS")

  const sessionGroup = {
    session, 
    setSession, 
  }

  const stopTimerGroup = {
    stopTimer, 
    setStopTimer, 
  }

  const timerGroups = {
    relaxTime, 
    studyTime, 
    setStudyTime, 
    setRelaxTime, 
  }

  const mxSession = {
    maxSession, 
    setMaxSession,
  }

  const maxTimeGroup = {
    maxBreakTime, 
    maxStudyTime,
    setMaxBreakTime, 
    setMaxStudyTime, 
  }

  const data = {stopTimer, setStopTimer, session, setSession, maxSession, setMaxSession, studyTime, setStudyTime,
    relaxTime, setRelaxTime, modal, setModal, maxStudyTime, setMaxStudyTime, maxBreakTime, setMaxBreakTime,
    mode, setMode,
    sessionGroup, stopTimerGroup, timerGroups, mxSession, maxTimeGroup}

  return (data)
}

export default stateGroups