import { GetMemberResponse} from "./interfaces.ts";

const GENERIC_ERROR_ID = "error"

const MOCK_MEMBER_1: GetMemberResponse = {
    member_id: "2023-2024 001",
    name: "member",
    email: "member@ubcani.com",
    student_number: "123456789",
    join_year: "2021-2022",
    weeklies_attended: 1,
    times_volunteered: 3
}

const MOCK_MEMBER_2: GetMemberResponse = {
    member_id: "2023-2024 002",
    name: "member2",
    email: "member2@ubcani.com",
    student_number: "987654321",
    join_year: "2022-2023",
    weeklies_attended: 5,
    times_volunteered: 0
}

const MOCK_MAP: ReadonlyMap<string, GetMemberResponse> = new Map([
    [MOCK_MEMBER_1.member_id, MOCK_MEMBER_1],
    [MOCK_MEMBER_2.member_id, MOCK_MEMBER_2]
]);

export const getMemberApiCall = (memberId: string): Promise<GetMemberResponse> => {
    return new Promise<GetMemberResponse>((resolve, reject) => {
        if (MOCK_MAP.has(memberId)) {
            resolve(MOCK_MAP.get(memberId)!)
        } else if (memberId === GENERIC_ERROR_ID) {
            reject({status: 403, message: "Access Denied", member_id: memberId})
        } else {
            reject({status: 404, message: `Member ${memberId} not found`, member_id: memberId})
        }
    })
}

