// data structures
export interface EventData {
    eventName: string,
    date: Date
    attendeeList: EventAttendee[]
}

export interface EventAttendee {
    name: string,
    email: string, 
    ticketType: string,
    boughtTip: boolean,
    checkedIn: boolean,
    overrideAlert?: boolean;
}

// responses
export interface GetEventListResponse {
    status: number,
    errMsg?: string,
    res?: string[],
}

export interface GetEventDetailsResponse {
    status: number,
    errMsg?: string,
    res?: EventData,
}