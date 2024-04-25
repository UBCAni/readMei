import { useState, ReactElement } from "react";
import ReadMeiNavBar from "../tool-page-components/NavBar";
import ToolViewContainer from "../tool-page-components/ToolViewContainer";
import EventSelecter from "../tool-page-components/select-event/SelectEvent";
import { EventData, GetEventListResponse } from "../../api-calls/events/interfaces";
import { getEventDetailsMockCall, getEventListMockCall } from "../../api-calls/events/routes";



function EventManageMentView(): ReactElement {
    const [currentDataSet, setDataSet] = useState<undefined | EventData>(undefined);
    const evtList: string[] = [];
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

    return (
        <>
            <ReadMeiNavBar></ReadMeiNavBar>
            {/* no loaded dataset view*/}
            {currentDataSet == null && <div>
                    <ToolViewContainer>
                        <div className="d-flex flex-column" style={{ width: '40%' }}>
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
                    <div className="bg-light d-flex border">
                        <button className="btn btn-primary m-1"
                        onClick={onDataDeselect}>Back</button>
                        <div className="container d-flex align-items-center">
                        <h3 className="text-center m-0">{currentDataSet.eventName}</h3>
                        </div>
                    </div>
                    <div className="bg-light border p-3">
                        <h5>Information</h5>
                        <h6>Event Date: {currentDataSet.date.toLocaleDateString()}, {currentDataSet.date.toTimeString()}</h6>
                        <h6>Registered Attendees: {currentDataSet.attendeeList.length}</h6>
                        <h6>Current Attendance: {currentDataSet.attendeeList.filter(attendee => attendee.checkedIn).length} / {currentDataSet.attendeeList.length}</h6>
                    </div>
                    {/* {currentDataSet.eventName}, <br></br>
                    {currentDataSet.date.toString()} <br></br> <br></br>
                    Attendance List: <br></br>
                        {currentDataSet.attendeeList.map((entry, index) => (
                            <div key={index}>
                            {entry.name}
                            </div>
                        ))} */}



                </ToolViewContainer>
                
                
                </div>}

        </>
    );

} 
export default EventManageMentView;