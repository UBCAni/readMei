import {ReactElement} from "react";
import {GetMemberResponse, GetMemberError} from "../index/interfaces.ts";
import ResultPanel from "../result-panel/result-panel.tsx";

enum DisplayState {
    NOTHING,
    ERROR,
    RESPONSE
}
interface DisplayProps {
    member_id?: string
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
            if (props.error?.status == 404) {
                return (<h2>{`Member with ID ${props.member_id} not found`}</h2>)
            } else {
                return (<h2>{`An error occurred while fetching the member with ID ${props.member_id}`}</h2>)
            }
        case DisplayState.NOTHING:
            return (<></>)
        case DisplayState.RESPONSE:
            const response: GetMemberResponse = props.response!
            return (
                <div className="row g-3">
                    <div className="col-2"/> {/* Left Padding */}
                    <ResultPanel name={response.name}
                                 email={response.email}
                                 student_number={response.student_number}
                                 join_year={response.join_year} />
                    <div className="col-2"/> {/* Right Padding */}
            </div>)
    }
}

export default Display;