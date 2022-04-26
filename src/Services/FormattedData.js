import * as moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

export class FormattedData{
    static collectAllTimeSlots = (data) => {
        const allSlots = data.map((comp) => {
            const slots = comp.time_slots.map((slot) => {
                return {
                    ...slot,
                    start_time: moment(slot.start_time).format('HH:mm'),
                    end_time: moment(slot.end_time).format('HH:mm'),
                    day: moment(slot.start_time).format('l'),
                    companyId: comp.id,
                    state: "enabled",
                    slotId: uuidv4()
                }
            })
            return slots
        })
        const mergedSlots = allSlots.flatMap(x => x)

        return mergedSlots
    }

    static formatCompaniesWithUpdatedTimeSlots = (companies, timeSlots) => {
        const companiesFormatted = companies.map((company) => {
            const filteredSlotsByCompany = timeSlots.filter((slot) => slot.companyId === company.id)
            return {
                ...company,
                time_slots: filteredSlotsByCompany
            }
        })
        return companiesFormatted
    }
    static updateTimeSlotsStatus = (slots, ids, reservations) => {
        const touchedSlots = slots.map((element) => {
            const condition = reservations.some(reserve => (element.start_time.toString() >= reserve.start_time.toString()
                && element.start_time.toString() < reserve.end_time.toString()
                || (element.end_time.toString() <= reserve.end_time.toString() && element.end_time.toString() > reserve.start_time.toString()))
                && reserve.selectedDay == element.day
                && reserve.companyId !== element.companyId
            )
            if (condition && !ids.includes(element.slotId)) {
                return {
                    ...element,
                    state: "disabled",
                }
            } else if (ids.includes(element.slotId)) {
                return {
                    ...element,
                    state: "reserved",
                }
            }
            else {
                return {
                    ...element,
                    state: "enabled"
                }
            }

        })
        return touchedSlots
    }
}