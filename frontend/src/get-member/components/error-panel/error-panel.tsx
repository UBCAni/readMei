import {ReactElement} from "react";

interface ErrorPanelProps {
    status: number,
    message: string,
    membership_num: string
}


const ErrorPanel = (props : ErrorPanelProps) : ReactElement => {
    const errorMessage = () => {
        if (props.status == 404) {
            return `Member with ID ${props.membership_num} not found`;
        } else {
            return `An error occurred while fetching the member with ID ${props.membership_num}`;
        }
    }
    return (
        <div className="background-blue rounded-5 text-charcoal-gray bold centre-container" style={{height: "200px"}}>

            <h2 className="bold">{errorMessage()}</h2>
        </div>
    )
}

export default ErrorPanel;