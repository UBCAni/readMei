export interface GetMemberRequest {
    member_id: string
}

export interface GetMemberResponse {
    member_id: string
    name: string
    email: string
    student_number: string
    join_year: string
}

export interface GetMemberError {
    status: number
    message: string
    member_id: string
}