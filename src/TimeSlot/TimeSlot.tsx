import React from 'react';
import './TimeSlot.css'

const TimeSlot = ({ data, handleClick }) => {
    return (
        <div className='timeSlotContainer'>
            <h5>
                {`${data.day}`}
            </h5>
            <div>
                {data.slots.map((slot) => (
                    <div 
                    className={slot.state === 'disabled' ? 'disabled' : 'timeSlot' && slot.state === 'reserved' ? 'reserved' : 'timeSlot'} 
                     key={slot.start_time} 
                     onClick={slot.state !== "disabled" ? () => handleClick(slot.start_time, slot.end_time, slot.day, slot.companyId, slot.slotId) : () => null}>
                        {`${slot.start_time} - ${slot.end_time}`}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeSlot;