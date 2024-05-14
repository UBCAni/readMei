import { EventAttendee, EventData, EventTier, GetEventDetailsResponse, GetEventListResponse } from "./interfaces";

// data type examples
// attendee
const attendee1: EventAttendee = {
    name: "Norman Vo",
    email: "nvo@gmail.com",
    ticketType: "standard",
    boughtTip: true,
    checkedIn: false,
}

const attendee2: EventAttendee = {
    name: "Keltie Parkhurst",
    email: "KPH@hotmail.com",
    ticketType: "VIP",
    boughtTip: false,
    checkedIn: false,
}

const attendee3: EventAttendee = {
    name: "Philip Paik",
    email: "PHOSE@hotmail.com",
    ticketType: "standard",
    boughtTip: false,
    checkedIn: true,

}

// event tiers 
const Tier1: EventTier = {
    tierName: "Tier 1",
    price: 8
}

const Tier2: EventTier = {
    tierName: "Tier 2",
    price: 10
}

const Tier3: EventTier = {
    tierName: "Simp",
    price: 0
}

// events
const event1: EventData = {
    eventName: "Hanami-2023",
    date: new Date("2023-03-28"),
    attendeeList: [attendee1, attendee2],
    tiers: [Tier1]
}

const event2: EventData = {
    eventName: "Halloween",
    date: new Date("2023-10-28"),
    attendeeList: [attendee1, attendee3],
    tiers: [Tier1, Tier2, Tier3]
}

const event3: EventData = {
    eventName: "Empty",
    date: new Date("2023-03-28"),
    attendeeList: [],
    tiers: []
}


// get event list
export const getMemberListResp1: GetEventListResponse = {
    status: 200,
    res: ['Hanami-2023', 'Halloween', 'Empty']
}

export const getMemberListRespFail: GetEventListResponse = {
    status: 400,
    errMsg: "Can't retrieve list of events."
}

// get event details
export const getEventResp1: GetEventDetailsResponse = {
    status: 200,
    res: event1
}

export const getEventResp2: GetEventDetailsResponse = {
    status: 200,
    res: event2
}

export const getEventResp3: GetEventDetailsResponse = {
    status: 400,
    errMsg: "Failed to load event details."
}

export const getEventResp4: GetEventDetailsResponse = {
    status: 400,
    res: event3
}

export const getEventDetailMap: {[key: string]: GetEventDetailsResponse} = {
    "Hanami-2023": getEventResp1, 
    "Halloween": getEventResp2,
    "Empty": getEventResp4
}