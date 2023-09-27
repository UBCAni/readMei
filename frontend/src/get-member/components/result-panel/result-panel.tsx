import {ReactElement} from "react";

interface ResultPanelProps {
    name: string,
    email: string,
    student_number: string,
    join_year: string
}

const ResultPanel = (props: ResultPanelProps): ReactElement => {

        return (
            <div className="background-blue rounded-top-5 text-charcoal-gray bold">
                <br/>
                <div className="row g-2"> {/* Top half: Split Panel */}
                    <div className="col-sm left-justify">
                        <div className="left-pad-50"> {/* Spacer for left padding */}
                            <h4 className="bold">Name: {props.name}</h4>
                            <h4 className="bold">Email: {props.email}</h4>
                            <h4 className="bold">Student #: {props.student_number}</h4>
                        </div>
                    </div>
                    <div className="col-sm centre-container">
                        <h4 className="bold align-content-center">Member Since {props.join_year}</h4>
                    </div>
                </div>
                <hr className="border-5"/>
                <br/>
                <div className="align-content-center"> {/* Bottom Half: Placeholder for now*/}
                    <h4 className="bold">Placeholder Text</h4>
                    <br/> <br/> <br/> <br/>
                </div>
            </div>)
}

export default ResultPanel;