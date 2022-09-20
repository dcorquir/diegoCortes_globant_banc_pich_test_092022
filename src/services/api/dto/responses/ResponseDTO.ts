import { Code } from './../../../../utils/messages/Codes';

export interface IResponseDTO {
	responseCode: Code,
    total_records?: number,
	data?: any
}

export interface IBasicListResponseDTO {
    data: any[],
    total_records: number
}