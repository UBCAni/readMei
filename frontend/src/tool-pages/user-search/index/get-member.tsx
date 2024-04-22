import {FormEventHandler, ReactElement} from "react";
import Input from "../../../common/components/input/index.ts";
import Display from "../display/display.tsx";
import {GetMemberResponse, GetMemberError} from "./interfaces.ts";
import {InputEvent} from "../../../common/interfaces.ts";
interface GetMemberProps {
    inputText: string
    onChange: (event: InputEvent<string>) => void
    onSubmit: FormEventHandler<HTMLFormElement>
    response: GetMemberResponse | null
    error: GetMemberError | null
    membershipNum?: string
}

const GetMember = (props: GetMemberProps): ReactElement => {

    return (
        <div className="Input text-center">
        <h1 className="display-1">
          read<span className="text-blue">メイ</span>
        </h1>
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
            <Display membershipNum={props.membershipNum}
                     response={props.response}
                     error={props.error}/>
        </div>
      </div>
    )
}

export default GetMember;