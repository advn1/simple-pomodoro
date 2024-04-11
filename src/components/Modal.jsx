import React, { useContext, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { AllContext } from '../context/All';
import 'rc-slider/assets/index.css';

const Modal = ({ setModal }) => {
    const { setStudyTime, setRelaxTime, studyTime, relaxTime, setMaxStudyTime, setMaxBreakTime, maxSession, setMaxSession, session, setSession, setMode, setStopTimer} = useContext(AllContext);
    const [localStudy, setLocalStudy] = useState(Math.round(studyTime /60));
    const [localBreak, setLocalBreak] = useState(Math.round(relaxTime / 60));
    const [localSessions, setLocalSessions] = useState(maxSession)

    const [error, setError] = useState([false,false,false])

    console.log(error[0])

    function handleUpdateSettings(t, e) {
        const keyPair = new Map([['s',0],['b',1],['n',2]])
        const value = Number(e.target.value);
        if (value === 0) {
            setStopTimer(true)
        }
        console.log(value)
        if (!isNaN(value) || value) {
            if (t === 's') {
                setStudyTime(value * 60);
                setMaxStudyTime(value * 60)
                setLocalStudy(value);
            } else if (t === 'b') {
                setRelaxTime(value * 60);
                setMaxBreakTime(value * 60)
                setLocalBreak(value);
            } else if (t === 'n') {
                setMaxSession(value);
                if (session + 1 > maxSession) {
                    setSession(1);
                    setMode("FOCUS")
                }
                setLocalSessions(value);
            }
        } else {
            setError(prev => {
                let clone = prev
                clone[keyPair.get(t)] = true
                console.log(clone)
                return clone
            })
        }
    }

  return (
    <div className='w-[260px] h-auto absolute z-10 bg-white p-4 pb-6 flex flex-col items-start justify-start rounded-xl shadow-xl'>
      <div className='flex flex-col'>
        <div className='flex justify-between items-baseline'>
            <p className='mb-[8px] font-bold'>Study Duration</p>
            <IoIosCloseCircle cursor={'pointer'} onClick={() => setModal(false)} size={'1.5rem'} />
        </div>
        <div className='mb-[10px]'>
            <input
            value={localStudy}
            className='font-semibold px-2 w-[160px] self-auto p-[2px] mr-[6px] border border-solid border-gray-400 rounded-lg'
            onChange={(e) => handleUpdateSettings('s', e)}
            type='text'
            placeholder='45 min...'
            />
            <label>minutes</label>
            <br />
            <label hidden={!error[0]}>Enter number!</label>
        </div>
      </div>
      <div className='mb-[10px]'>
        <p className='mb-[8px] font-bold'>Break Duration</p>
        <input
        className='font-semibold px-2 w-[160px] p-[2px] mr-[6px] border border-solid border-gray-400 rounded-lg'
        value={localBreak}
        onChange={(e) => handleUpdateSettings('b', e)}
        type='text'
        placeholder='5 min..'
        />
        <label>minutes</label>
        <br />
        <label hidden={!error[1]}>Enter number!</label>
        </div>
        <div className=''>
                <p className='mb-[8px] font-bold text-red'>Sessions</p>
                <input
                    className='font-semibold px-2 w-[160px] p-[2px] mr-[6px] border border-solid border-gray-400 rounded-lg'
                    value={localSessions}
                    onChange={(e) => handleUpdateSettings('n', e)}
                    type='text'
                    placeholder='4...'
                />
                <label>amount</label>
                <br />
                <label hidden={!error[2]}>Enter number!</label>
            </div>
    </div>
  )
}

export default Modal
