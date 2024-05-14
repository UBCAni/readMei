import { useState, ReactElement } from "react";
import ReadMeiNavBar from "../tool-page-components/NavBar";
import ToolViewContainer from "../tool-page-components/ToolViewContainer";
import EventSelecter from "../tool-page-components/select-event/SelectEvent";
import { EventData, GetEventListResponse, EventAttendee} from "../../api-calls/events/interfaces";
import { getEventDetailsMockCall, getEventListMockCall } from "../../api-calls/events/routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Alert } from "react-bootstrap";



function EventManageMentView(): ReactElement {
    const [currentDataSet, setDataSet] = useState<undefined | EventData>(undefined);
    const evtList: string[] = [];
    const [currentAttendeeQuery, setAttdendeeQuery] = useState('');
    const [currentSelectedAttendee, setViewAttendee] = useState<undefined | EventAttendee>(undefined);
    // todo: change this later to real call
    getEventListMockCall().then((resp: GetEventListResponse) => {
        const toAdd = resp.res != undefined ? resp.res : [""];
        evtList.push(...toAdd);
    }
    ).catch((err: GetEventListResponse) => {
        // handle error
    }
        
    );

    const onSelectDataset = (selectDataset: string) => {
        // load selected dataset
        // todo: change this later to real call
        getEventDetailsMockCall(selectDataset).then((response) => {
            setDataSet(response.res);
        }).catch((err: GetEventListResponse) => {
            // handle error
        });
    }

    const onDataDeselect = () => {
        setDataSet(undefined);
    }

    const onAttendeeQueryChange = (evt: any) => {
        setAttdendeeQuery(evt.target.value);
    }

    const onSelectAttendee = (attendee: EventAttendee) => {
        setViewAttendee(attendee);
    }

    const applyQueryAttendeeFilters = (unfiltered: EventAttendee[]): EventAttendee[] => {
        // get name matches
        const nameMatches = unfiltered.filter(attendee => attendee.name.includes(currentAttendeeQuery));
        // get email matches
        const emailMatches = unfiltered.filter(attendee => attendee.email.includes(currentAttendeeQuery));
        // get card # matches
        // todo
        return [...new Set([...nameMatches, ...emailMatches])];
    }

    return (
        <>
            <ReadMeiNavBar></ReadMeiNavBar>
            {/* no loaded dataset view*/}
            {currentDataSet == null && <div>
                    <ToolViewContainer>
                        <div className="d-flex flex-column" style={{ minWidth: '375px', maxWidth: '35%' }}>
                            <h3 className="text-center">Select an event dataset to manage</h3>
                            <EventSelecter
                                options = {evtList}
                                onValidSelect={onSelectDataset}
                                ></EventSelecter>
                        </div>
                    </ToolViewContainer>
                </div>}

            {/* loaded dataset view */}
            {currentDataSet != undefined && <div>
                <ToolViewContainer>
                    <div style={{ minWidth: '375px', maxWidth: '85%' }}>
                    <div className="bg-light d-flex border">
                        <button className="btn btn-primary m-1"
                        onClick={onDataDeselect}>Back</button>
                        <div className="d-flex justify-content-start align-items-center">
                            <h3 className="text-center m-0 ">{currentDataSet.eventName}</h3>
                        </div>
                    </div>
                    <div className="bg-light border p-3">
                        {/* info panel */}
                        <h5>Information</h5>
                        <h6>Event Date: {currentDataSet.date.toLocaleDateString()}, {currentDataSet.date.toTimeString()}</h6>
                        <h6>Registered Attendees: {currentDataSet.attendeeList.length}</h6>
                        <h6>Current Attendance: {currentDataSet.attendeeList.filter(attendee => attendee.checkedIn).length} / {currentDataSet.attendeeList.length}</h6>
                        <div className="bg-light d-flex">
                            <div className="border p-3" style={{minWidth: '33%',minHeight: '500px'}}>
                                <h6 className="me-5">Enter Name, email or scan card: </h6>
                                      <input
                                        className="w-100"
                                        placeholder="Enter Query..."
                                        type="text"
                                        value={currentAttendeeQuery}
                                        onChange={onAttendeeQueryChange}/>
                                {/* display attendee entry field */}
                                <div className="background-light-grey mt-3" style={{minWidth: '50%', minHeight: '75%'}}>
                                        <div className="row">
                                            <div className="col">
                                                <div className="scrollable" style={{maxHeight: '100%', maxWidth: '100%'}}>
                                                    {applyQueryAttendeeFilters(currentDataSet.attendeeList).map((option, index) => (
                                                        <div key={index} className="background-offwhite border p-1 overflow-ellipsis" onClick={() => onSelectAttendee(option)}>
                                                            <div className="text-truncate">
                                                                {option.name}<br></br>
                                                                &lt;{option.email}&gt;
                                                            </div>
                                                            <div className="d-flex"> 
                                                                {/* ticket: {option.ticketType} */}
                                                                {/* <div className="warning-icon col">
                                                                    <FontAwesomeIcon icon={faExclamationTriangle} className=""/>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>  
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div style={{minWidth: '33%', minHeight: '500px'}}>
                                {/* Selected Attendee View */}
                                <div className="border p-3 ms-3" style={{minHeight: '70%'}}>
                                    <h5 className="">Selected Attendee</h5>
                                    {currentSelectedAttendee == undefined && 
                                        <div>
                                            Select an Attendee
                                        </div>
                                    }
                                    {currentSelectedAttendee != undefined && 
                                        <div className="scrollable">
                                            Name: {currentSelectedAttendee.name}<br></br>
                                            Email: {currentSelectedAttendee.email} <br></br>
                                            Ticket Type: {currentSelectedAttendee.ticketType} <br></br>
                                            Paid: todo; get <br></br>
                                            Bought Tip: {
                                                String(currentSelectedAttendee.boughtTip === true ? "Yes": "No")
                                                } <br></br>
                                            Membership Number: todo; get<br></br>
                                            Checked In: {
                                                String(currentSelectedAttendee.checkedIn === true ? "Yes": "No")
                                                }
                                            {/* Alerts */}
                                            <div className="">
                                                <Alert variant="warning" className="p-0 m-0">
                                                    <p style={{ overflowWrap:'break-word' }}>
                                                        Placeholder: Example Alert
                                                    </p>
                                                </Alert>
                                            </div>
                                        </div>

                                    }

                                </div>
                                {/* action menu*/}
                                <div className="border p-2 ms-3 mt-2" style={{minHeight: '27.5%'}}>
                                    <h6 className="">Action Menu</h6>
                                </div>
                            </div>
                            <div style={{minWidth: '33%', minHeight: '500px'}}>
                                <div className="border p-3 ms-3" style={{height: '100%'}}>
                                    <h5 className="">Event Details</h5>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* {currentDataSet.eventName}, <br></br>
                    {currentDataSet.date.toString()} <br></br> <br></br>
                    Attendance List: <br></br>
                        {currentDataSet.attendeeList.map((entry, index) => (
                            <div key={index}>
                            {entry.name}
                            </div>
                        ))} */}











                    </div>



                </ToolViewContainer>
                
                
                </div>}

        </>
    );

} 
export default EventManageMentView;