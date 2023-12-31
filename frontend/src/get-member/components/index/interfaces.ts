export interface GetMemberRequest {
    membership_num: string
}

export interface GetMemberResponse {
    membership_num: string
    name: string
    email: string
    student_number: string
    member_id: number
    halloween: Array<string>
    // TODO: add these fields when backend can provide
    // join_year: string
    // weeklies_attended: number
    // times_volunteered: number
}

export interface GetMemberError {
    status: number
    message: string
    membership_num: string
}