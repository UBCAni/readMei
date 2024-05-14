// data structures
export interface Member {
    memberName: string,
    memberId: string,
    memberNum: number,
    email: string

}

// responses
export interface GetMemberByEmailResponse {
    status: number,
    errMsg?: string,
    res?:Member
}