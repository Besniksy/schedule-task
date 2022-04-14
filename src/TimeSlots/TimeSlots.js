import React from 'react';
import './TimeSlots.css'
import TimeSlot from '../TimeSlot/TimeSlot';

const TimeSlots = ({data, handleClick}) => {
    return (
        <div className='timeSlots'>
            {data.days.map((el) => <TimeSlot data={el} key={el.day} handleClick={handleClick}/>)}
        </div>
    );
};

export default TimeSlots;