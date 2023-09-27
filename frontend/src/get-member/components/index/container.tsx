import React from "react";
import { InputEvent } from "../../../common/interfaces.ts";
import GetMember from "./get-member.tsx";
import {GetMemberResponse, GetMemberError} from "./interfaces.ts";

interface GetMemberContainerProps {
    getMember: (memberId: string) => Promise<GetMemberResponse>
}

interface GetMemberContainerState {
    member_id: string
    response: GetMemberResponse | null
    error: GetMemberError | null
}

export class GetMemberContainer
    extends React.Component<GetMemberContainerProps, GetMemberContainerState> {

    constructor(props: GetMemberContainerProps) {
        super(props);

        this.state = {
            member_id: "",
            response: null,
            error: null
        }
    }

    setMemberId = (membershipId: string) => {
        this.setState( { member_id: membershipId } )
    }

    setResponse = (response: GetMemberResponse) => {
        this.setState( { response, error: null } )
    }

    setError = (error: GetMemberError) => {
        this.setState( { response: null, error } )
    }

    handleChange = (event: InputEvent<string>) => {
        this.setMemberId(event.target.value)
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.getMember(this.state.member_id).then((response: GetMemberResponse) => {
                this.setResponse(response)
            }
        ).catch((error: GetMemberError) => {
            this.setError(error)
        })
    }

    override render() {
        return (
            <GetMember onSubmit={this.handleSubmit}
                       inputText={this.state.member_id}
                       onChange={this.handleChange}
                       response={this.state.response}
                       error={this.state.error}
                       memberId={this.state.error?.member_id}
            />
        )
    }

}

export default GetMemberContainer;