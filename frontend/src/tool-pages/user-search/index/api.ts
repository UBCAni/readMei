import { GetMemberResponse} from "./interfaces.ts";
import axios from "axios";

const GENERIC_ERROR_ID = "error"

const MOCK_MEMBER_1: GetMemberResponse = {
    membership_num: "2023-2024 001",
    name: "member",
    email: "member@ubcani.com",
    student_number: "123456789",
    member_id: 20232024001,
    halloween: [
        "Jose Navarro",
        "My name"
    ]
}

const MOCK_MEMBER_2: GetMemberResponse = {
    membership_num: "2023-2024 002",
    name: "member2",
    email: "member2@ubcani.com",
    student_number: "987654321",
    member_id: 20232024002,
    halloween: [
        "blahblah",
        "My name2"
    ]
}

const MOCK_MAP: ReadonlyMap<string, GetMemberResponse> = new Map([
    [MOCK_MEMBER_1.membership_num, MOCK_MEMBER_1],
    [MOCK_MEMBER_2.membership_num, MOCK_MEMBER_2]
]);


export const getMemberApiCall = async (membership_num: string): Promise<GetMemberResponse> => {
    try {
        const response2 = await axios.get(`http://localhost:5000/halloween?MEMBERSHIP_NUMBER=${membership_num}`)
        //console.log(response2)
        const response = await axios.get(`http://localhost:5000/members?MEMBERSHIP_NUMBER=${membership_num}`)
        const { _id, DATE, MEMBERSHIP_NUMBER, NAME, EMAIL, STUDENT_NUMBER, MEMBER_ID } = response.data[0]
        const PAYMENT_MATCHES = response2.data
        const result: GetMemberResponse = {
            membership_num: MEMBERSHIP_NUMBER,
            name: NAME,
            email: EMAIL,
            student_number: STUDENT_NUMBER,
            member_id: MEMBER_ID,
            halloween: PAYMENT_MATCHES
        }
        return result
    } catch(error) {
        throw {status: 404, message: `Member ${membership_num} not found`, membership_num: membership_num}
    }
}

export const mockGetMemberApiCall = (membership_num: string): Promise<GetMemberResponse> => {
    return new Promise<GetMemberResponse>((resolve, reject) => {
        if (MOCK_MAP.has(membership_num)) {
            resolve(MOCK_MAP.get(membership_num)!)
        } else if (membership_num === GENERIC_ERROR_ID) {
            reject({status: 403, message: "Access Denied", membership_num: membership_num})
        } else {
            reject({status: 404, message: `Member ${membership_num} not found`, membership_num: membership_num})
        }
    })
}

