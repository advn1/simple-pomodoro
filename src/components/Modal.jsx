import React, { useContext, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { AllContext } from '../context/All';

const Modal = ({ setModal }) => {
    const { setStudyTime, setRelaxTime, studyTime, relaxTime, setMaxStudyTime, setMaxBreakTime, maxSession, setMaxSession} = useContext(AllContext);
    const [localStudy, setLocalStudy] = useState(Math.round(studyTime /60));
    const [localBreak, setLocalBreak] = useState(Math.round(relaxTime / 60));
    const [localSessions, setLocalSessions] = useState(maxSession)

    function handleUpdateSettings(t, e) {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
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
                setLocalSessions(value);
            }
        }
    }

    return (
        <div className='modal' >
            <div className='study-dur'>
                <div className='dur-close'>
                    <p>Study Duration</p>
                    <IoIosCloseCircle className='close' cursor={'pointer'} onClick={() => setModal(false)} size={'1.5rem'} />
                </div>
                <div>
                    <input
                        value={localStudy}
                        onChange={(e) => handleUpdateSettings('s', e)}
                        type='number'
                        min={1}
                        max={1111111111111}
                        placeholder='45 min...'
                    />
                    <label>minutes</label>
                </div>
            </div>
            <div className='break-dur'>
                <p>Break Duration</p>
                <input
                    value={localBreak}
                    onChange={(e) => handleUpdateSettings('b', e)}
                    min={1}
                    max={1111111111111}
                    type='number'
                    placeholder='5 min..'
                />
                <label>minutes</label>
            </div>
            <div className='break-dur'>
                <p>Sessions</p>
                <input
                    value={localSessions}
                    onChange={(e) => handleUpdateSettings('n', e)}
                    min={1}
                    max={1111111111111}
                    type='number'
                    placeholder='4...'
                />
                <label>amount</label>
            </div>
        </div>
    );
};

export default Modal;
