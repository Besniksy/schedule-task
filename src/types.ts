export type TReservation = {
    start_time: string,
    end_time: string,
    selectedDay: string,
    companyId: number,
    slotId: string
}

export type TReservations = Array<TReservation>
export type TSlot = {
    start_time: string,
    end_time: string,
    day: string,
    companyId: number,
    state: string,
    slotId: string
}

export type TSlots = Array<TSlot>

export type TCompany = {
    id: number,
    name: string,
    type: string,
    time_slots: TSlots
}

export type TCompanies = Array<TCompany>