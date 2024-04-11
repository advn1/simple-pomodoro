import { useEffect, useState } from "react"
import Counter from "./components/Counter"
import useTimerUpdate from "./hooks/useTimerUpdate"
import Menu from "./components/Menu"
import { AllContext } from "./context/All"

import Modal from "./components/Modal"

import { ToastContainer } from 'react-toastify';

import StateGroups from "./stateGroups.jsx"
function App() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  },[theme])

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
    setTheme("dark")
  }

  const setLightMode = () => {
    setTheme("light")
  }

  return (
    <div className={`${theme === "dark" ? "bg-slate-950" : "white"} w-screen h-screen flex items-center justify-center`}>
        <AllContext.Provider value={
      {...sessionGroup,
      ...stopTimerGroup,
      ...timerGroups,
      ...mxSession,
      mode,
      setMode, 
      ...maxTimeGroup
      }}>
      <div className={`container max-w-80 flex justify-center items-center flex-col`}>
        {modal && <Modal setModal={setModal} mode={mode} setMode={setMode}/>}
        <Counter relaxTime={relaxTime} studyTime={studyTime} mode={mode} />
        <Menu theme={theme} setTheme={setTheme} setModal={setModal}/>
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
            />
          <div className="absolute bottom-0">
            <p className="dark:text-white mt-[20px]">Made with love by advn</p>
          </div>
        </div>
    </AllContext.Provider>
    </div>
  )
}

export default App
