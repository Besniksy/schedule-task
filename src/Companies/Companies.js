import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Company from '../Company/Company';
import './Companies.css'
import { FormattedData } from '../Services/FormattedData';
import { DateTimeService } from '../Services/DateTimeService';


const Companies = () => {
    const [companies, setCompanies] = useState([])
    const [companiesFormatted, setCompaniesFormatted] = useState([])
    const [reservations, setReservations] = useState([])
    const [slotsState, setSlotsState] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/companies').then((res) => {
            if (res.data) {
                setCompanies(res.data)
            }
        })
    }, [])

    useEffect(() => {
        const timeSlots = FormattedData.collectAllTimeSlots(companies)
        setSlotsState(timeSlots)
    }, [companies])



    useEffect(() => {
        const companiesFormatted = FormattedData.formatCompaniesWithUpdatedTimeSlots(companies, slotsState)
        const groupedByDayArray = DateTimeService.groupedTimeSlotsByDate(companiesFormatted)
        setCompaniesFormatted(groupedByDayArray)

    }, [slotsState])

    useEffect(() => {
        const slotIds = reservations.map((el) => el.slotId)
        const touchedSlots = FormattedData.updateTimeSlotsStatus(slotsState, slotIds, reservations)
        setSlotsState(touchedSlots)
    }, [reservations])

    const handleClick = (start_time, end_time, selectedDay, companyId, slotId) => {
        if (reservations.length === 0 || !reservations.some(el => el.companyId === companyId)) {
            setReservations([...reservations, {
                start_time,
                end_time,
                selectedDay,
                companyId,
                slotId
            }])
        } else if (reservations.some(el => el.slotId === slotId)) {
            const filteredSlots = reservations.filter((el) => el.slotId !== slotId)
            setReservations(filteredSlots)
        }else if (reservations.some(el => el.companyId === companyId)) {
            const filteredSlots = reservations.filter((el) => el.companyId !== companyId)
            setReservations([...filteredSlots, {
                start_time,
                end_time,
                selectedDay,
                companyId,
                slotId
            }])
        }
    }
    return (
        <div className='companiesContainer'>
            {
                companiesFormatted.map((company) =>
                    <Company
                        reservations={reservations}
                        data={company}
                        handleClick={handleClick}
                        key={company.id}
                    />)
            }
        </div>
    );
};

export default Companies;