import {FormEventHandler, ReactElement} from "react";
import Input from "../../../common/components/input";
import Display from "../display/display.tsx";
import {GetMemberResponse, GetMemberError} from "./interfaces.ts";
import {InputEvent} from "../../../common/interfaces.ts";
interface GetMemberProps {
    inputText: string
    onChange: (event: InputEvent<string>) => void
    onSubmit: FormEventHandler<HTMLFormElement>
    response: GetMemberResponse | null
    error: GetMemberError | null
    memberId?: string
}

const GetMember = (props: GetMemberProps): ReactElement => {

    return (
        <div>
            <div className="row g-3">
                <div className="col-sm"></div>
                <div className="col-sm">
                    <Input onSubmit={props.onSubmit}
                           onChange={props.onChange}
                           inputText={props.inputText}
                           placeholder="Membership Number"
                           className="form-control hidden-text"
                           label="Membership Number"
                    />
                </div>
                <div className="col-sm"></div>
            </div>
            <br/>
            <br/>
            <Display membership_num={props.memberId}
                     response={props.response}
                     error={props.error}/>
        </div>
    )
}

export default GetMember;