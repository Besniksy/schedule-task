import React from 'react';
import TimeSlots from '../TimeSlots/TimeSlots';
import './Company.css'
import '../TimeSlot/TimeSlot.css'

const Company = ({data, handleClick, reservations}) => {
    console.log(data, "dataaa")
    const reserved = reservations.map((el) => {
        if(el.companyId === data.id){
            return el.start_time + "-" + el.end_time
        }
    } )
    console.log(reserved, "reservedreserved")
    return (
        <div>
            <div className='companyName'>
                {data.name}
            </div>

            {reserved && <div className='timeSlotContainer'>
                <div className='timeSlot'>{reserved}</div>
            </div>}

            <div className='timeSlotsContainer'>
            <TimeSlots data={data} handleClick={handleClick}/>
            </div>

        </div>
    );
};

export default Company;