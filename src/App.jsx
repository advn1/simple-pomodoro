import { useEffect, useState } from "react"
import Counter from "./components/Counter"
import useTimerUpdate from "./hooks/useTimerUpdate"
import Menu from "./components/Menu"
import { AllContext } from "./context/All"

import Modal from "./components/Modal"

import { ToastContainer } from 'react-toastify';

import StateGroups from "./stateGroups.jsx"

function App() {
  const 
  {
    stopTimer,
    
    session, setSession, maxSession, 
    
    studyTime, setStudyTime, relaxTime, setRelaxTime, 

    modal, setModal, 

    maxStudyTime, maxBreakTime,

    mode, setMode,

    sessionGroup, stopTimerGroup, timerGroups, mxSession, maxTimeGroup
  } = StateGroups()

  
  console.log({studyTime, relaxTime, maxStudyTime, maxBreakTime, mode, session})
  useTimerUpdate(
    stopTimer, session, setSession, maxSession, studyTime, relaxTime, mode, setMode, setStudyTime, setRelaxTime, maxStudyTime, maxBreakTime
  );

  const setDarkMode = () => {
    document.querySelector("body").setAttribute('data-theme', 'dark')
  }

  const setLightMode = () => {
    document.querySelector("body").setAttribute('data-theme','light')
  }


  if (document.querySelector('body').getAttribute('data-theme') === null) {
    setLightMode()
  }


  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode()
    else setLightMode()
  }
  

  return (
    <>
    <AllContext.Provider value={
      {...sessionGroup,
      ...stopTimerGroup,
      ...timerGroups,
      ...mxSession,
      mode,
      setMode, 
      ...maxTimeGroup
      }}>
      <div className="app">
        {/* <button onClick={() => setStudyTime(3)}>study</button>
        <button onClick={() => setRelaxTime(3)}>relax</button> */}
        {modal && <Modal setModal={setModal} mode={mode} setMode={setMode}/>}
        <Counter relaxTime={relaxTime} studyTime={studyTime} mode={mode}/>
        <Menu setModal={setModal}/>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
            transition: Bounce
            />
          <div className="footer">
            <p className="sessions-amount" style={{marginTop: "20px"}}>Made with love by advn</p>
          </div>
        </div>
    </AllContext.Provider>
    </>
  )
}

export default App
