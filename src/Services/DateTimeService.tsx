import * as moment from 'moment'
import { TCompanies } from '../types';

export class DateTimeService{
    static groupedTimeSlotsByDate = (companies:TCompanies) => {
        console.log(companies, "companiescompanies")

        const groupedByDayArray = companies.map((company) => {
            const GroupedByDayObj = {};

            company.time_slots.forEach(element => {
                let dayKey = element.day;
                if (!GroupedByDayObj[dayKey]) {
                    GroupedByDayObj[dayKey] = [];
                }
                GroupedByDayObj[dayKey].push({
                    ...element
                });
            });
            const sortedByDate = Object.entries(GroupedByDayObj).sort((a:Object,b:Object) => {
                return a[0] - b[0]
            });

            const joinedSortedArray = sortedByDate.map((el) => {
                return {
                    day: moment(el[0]).format('dddd'),
                    date: moment(el[0]).format('L'),
                    slots: el[1]
                }
            })

            return {
                ...company,
                days: joinedSortedArray,
            }
        })
        return groupedByDayArray
    }
}