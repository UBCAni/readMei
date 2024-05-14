import { getMemberByEmailResp2, memberEmailMap } from "./examples";
import { GetMemberByEmailResponse } from "./interfaces";

// get member by email
export const getMemberByEmailCall = async (): Promise<GetMemberByEmailResponse> => {
    return new Promise<GetMemberByEmailResponse>(() => {

    });
}

export const getMemberByEmailMockCall = async (memberEmail: string): Promise<GetMemberByEmailResponse> => {
    return new Promise<GetMemberByEmailResponse>((resolve) => {
        const getMember = memberEmailMap[memberEmail];
        if (getMember === undefined) {
            resolve(getMemberByEmailResp2);
        } 
        else {
            resolve(getMember);
        }
    });

}