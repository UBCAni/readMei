import React, { ReactElement, useState } from "react";
import { InputEvent } from "../../../common/interfaces.ts";
import GetMember from "./get-member.tsx";
import {GetMemberResponse, GetMemberError} from "./interfaces.ts";

interface GetMemberContainerProps {
    getMember: (memberId: string) => Promise<GetMemberResponse>
}
const GetMemberContainer = (props:GetMemberContainerProps): ReactElement => {
    const [memberId, setMemberId] = useState<string>("")
    const [response, setResponse] = useState<GetMemberResponse | null>(null)
    const [error, setError] = useState<GetMemberError | null>(null)

    const handleMemberId = (membershipId: string) => {
        setMemberId(membershipId)
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
        setMemberId(event.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.getMember(memberId).then((myresponse: GetMemberResponse) => {
                handleResponse(myresponse)
            }
        ).catch((myerror: GetMemberError) => {
            console.log(myerror)
            handleError(myerror)
        })
    }
    return (
        <GetMember onSubmit={handleSubmit}
                    inputText={memberId}
                    onChange={handleChange}
                    response={response}
                    error={error}
                    memberId={error?.membership_num}
        />
    )
}

export default GetMemberContainer;