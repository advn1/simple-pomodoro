import { useEffect } from 'react';
import sound from "../notification.wav"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useTimerUpdate = (stopTimer, session, setSession, maxSession, studyTime, relaxTime, mode, setMode, setStudyTime, setRelaxTime, maxStudyTime, maxBreakTime) => {
    useEffect(() => {
        console.log(session)
        if (stopTimer) {
            return;
        }

        if (session > maxSession) {
            setSession(1);
            setMode("FOCUS")
        }

        if ((studyTime <= 0 && mode === "FOCUS") || (relaxTime <= 0 && mode === "BREAK")) {
            if (session === maxSession) {
                const audio = new Audio(sound)
                const notify = () => toast.success('🎉 Congratulations! All sessions completed!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "light",
                    });;
                notify()
                setStudyTime(maxStudyTime)
                audio.play()
                return;
            }
            const audio = new Audio(sound)
            if (studyTime === 0) {
                setStudyTime(maxStudyTime)
                setRelaxTime(maxBreakTime)
            } else if (relaxTime === 0) {
                setRelaxTime(maxBreakTime)
                setStudyTime(maxStudyTime)
            }
            setSession(prevSession => {
                const nextSession = prevSession + 1;
                setMode(prev => prev === "FOCUS" ? "BREAK" : "FOCUS")
                return nextSession;
            });
            audio.play()
            
        }

        let intervalId;

        if (mode === "FOCUS") {
            intervalId = setInterval(() => {
                setStudyTime(prev => Math.max(prev - 1, 0));
            }, 1000);
        } else if (mode === "BREAK") {
            intervalId = setInterval(() => {
                setRelaxTime(prev => Math.max(prev - 1, 0));
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [stopTimer, session, studyTime, relaxTime, mode, setSession, maxSession, setStudyTime, setRelaxTime]);

    return null;
};

export default useTimerUpdate;
