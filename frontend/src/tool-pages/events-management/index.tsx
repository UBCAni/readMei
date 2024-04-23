import { useState, ReactElement } from "react";
import ReadMeiNavBar from "../tool-page-components/NavBar";
import ToolViewContainer from "../tool-page-components/ToolViewContainer";
import EventSelecter from "../tool-page-components/select-event/SelectEvent";



function EventManageMentView(): ReactElement {
    const [currentDataSet, setDataSet] = useState(null);
    return (
        <>
            {/* no loaded dataset view*/}
            {currentDataSet == null && <div>
                <ReadMeiNavBar></ReadMeiNavBar>
                    <ToolViewContainer>
                        <div className="d-flex flex-column" style={{ width: '40%' }}>
                            <h3 className="text-center">Select an event dataset to manage</h3>
                            <EventSelecter></EventSelecter>
                        </div>
                </ToolViewContainer>
                </div>}

            {/* loaded dataset view */}
            {currentDataSet != null && <div>
                
                
                
                </div>}

        </>
    );

} 
export default EventManageMentView;