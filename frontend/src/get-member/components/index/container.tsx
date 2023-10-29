import React, { ReactElement, useState } from "react";
import { InputEvent } from "../../../common/interfaces.ts";
import GetMember from "./get-member.tsx";
import { GetMemberResponse, GetMemberError } from "./interfaces.ts";
import { convertInput } from "../../../common/utils/convertInput.ts";

interface GetMemberContainerProps {
    getMember: (membershipNum: string) => Promise<GetMemberResponse>
}
const GetMemberContainer = (props:GetMemberContainerProps): ReactElement => {
    const [membershipNum, setMembershipNum] = useState<string>("")
    const [response, setResponse] = useState<GetMemberResponse | null>(null)
    const [error, setError] = useState<GetMemberError | null>(null)

    const handleMembershipNum = (membershipNum: string) => {
        setMembershipNum(membershipNum)
    }
    const handleResponse = (response: GetMemberResponse) => {
        setResponse(response)
        setError(null)
    }
    const handleError = (error: GetMemberError) => {
        setError(error)
        setResponse(null)
    }
    const handleChange = (event: InputEvent<string>) => {
        setMembershipNum(event.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const strippedNum = convertInput(membershipNum)
        props.getMember(strippedNum).then((myresponse: GetMemberResponse) => {
                handleResponse(myresponse)
            }
        ).catch((myerror: GetMemberError) => {
            console.log(myerror)
            handleError(myerror)
        })
    }
    return (
        <GetMember onSubmit={handleSubmit}
                    inputText={membershipNum}
                    onChange={handleChange}
                    response={response}
                    error={error}
                    membershipNum={error?.membership_num}
        />
    )
}

export default GetMemberContainer;