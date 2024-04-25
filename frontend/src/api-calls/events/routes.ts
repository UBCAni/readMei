import { getEventDetailMap, getEventResp1, getMemberListResp1 } from "./examples";
import { GetEventDetailsResponse, GetEventListResponse } from "./interfaces";


// get event list
export const getEventListCall = async (): Promise<GetEventListResponse> => {
    return new Promise<GetEventListResponse>(() => {

    });
}

export const getEventListMockCall = async (): Promise<GetEventListResponse> => {
    return new Promise<GetEventListResponse>((resolve) => {
        resolve(getMemberListResp1);
    });

}

// get event details
export const getEventDetailsCall = async (): Promise<GetEventDetailsResponse> => {
    return new Promise<GetEventDetailsResponse>(() => {

    });
}

export const getEventDetailsMockCall = async (dataSetName: string): Promise<GetEventDetailsResponse> => {
    return new Promise<GetEventDetailsResponse>((resolve) => {
        resolve(getEventDetailMap[dataSetName]);
    });

}