import React from 'react';
import TimeSlots from '../TimeSlots/TimeSlots';
import './Company.css'

const Company = ({data, handleClick}) => {
    return (
        <div>
            <div className='companyName'>
                {data.companyName}
            </div>

            <div className='timeSlotsContainer'>
            <TimeSlots data={data} handleClick={handleClick}/>
            </div>

        </div>
    );
};

export default Company;