// data structures
export interface EventData {
    eventName: string,
    date: Date
    attendeeList: EventAttendee[],
    tiers: EventTier[]

}

export interface EventAttendee {
    name: string,
    email: string, 
    ticketType: string,
    boughtTip: boolean,
    checkedIn: boolean,
    overrideAlert?: boolean;
}

export interface EventTier {
    tierName: string;
    price: number;
    membershipReq: boolean;
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