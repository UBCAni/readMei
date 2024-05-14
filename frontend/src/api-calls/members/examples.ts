// members

import { GetMemberByEmailResponse, Member } from "./interfaces";

const member1: Member = {
    memberName: "Norman Vo",
    memberId: "E781AC45",
    memberNum: 69,
    email: "nvo@gmail.com"
}

// get member by email
export const getMemberByEmailResp1: GetMemberByEmailResponse =  {
    status: 200,
    res: member1
}

export const getMemberByEmailResp2: GetMemberByEmailResponse =  {
    status: 400,
    errMsg: "No member match"
}

export const memberEmailMap: {[key: string]: GetMemberByEmailResponse} = {
    "nvo@gmail.com": getMemberByEmailResp1
}