import {ReactElement} from "react";

interface ErrorPanelProps {
    status: number,
    message: string,
    membershipNum: string
}


const ErrorPanel = (props : ErrorPanelProps) : ReactElement => {
    const errorMessage = () => {
        if (props.status == 404) {
            return `Member with ID ${props.membershipNum} not found`;
        } else {
            return `An error occurred while fetching the member with ID ${props.membershipNum}`;
        }
    }
    return (
        <div className="background-blue rounded-5 text-charcoal-gray bold centre-container" style={{height: "200px"}}>

            <h2 className="bold">{errorMessage()}</h2>
        </div>
    )
}

export default ErrorPanel;