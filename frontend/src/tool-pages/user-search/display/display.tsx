import {ReactElement} from "react";
import {GetMemberResponse, GetMemberError} from "../index/interfaces.ts";
import ResultPanel from "../result-panel/result-panel.tsx";
import ErrorPanel from "../error-panel/error-panel.tsx";

enum DisplayState {
    NOTHING,
    ERROR,
    RESPONSE
}
interface DisplayProps {
    membershipNum?: string
    response: GetMemberResponse | null
    error: GetMemberError | null
}

const Display = (props: DisplayProps): ReactElement => {

    let state = DisplayState.NOTHING
    if (props.response) {
        state = DisplayState.RESPONSE
    } else if (props.error) {
        state = DisplayState.ERROR
    }
    

    switch (state) {
        case DisplayState.ERROR:
            return (<ErrorPanel status={props.error!.status}
                                message={props.error!.message}
                                membershipNum={props.error!.membership_num}   />);
        case DisplayState.NOTHING:
            return (<></>)
        case DisplayState.RESPONSE:            
            return (
                <div className="row g-3">
                    <div className="col-2"/> {/* Left Padding */}
                    <ResultPanel name={props.response!.name}
                                 email={props.response!.email}
                                 student_number={props.response!.student_number}
                                 halloween={props.response!.halloween}/>
                                 {/* join_year={props.response!.join_year} 
                                 weeklies_attended={props.response!.weeklies_attended}
                                 times_volunteered={props.response!.times_volunteered} */}
                    <div className="col-2"/> {/* Right Padding */}
            </div>)
    }
}

export default Display;