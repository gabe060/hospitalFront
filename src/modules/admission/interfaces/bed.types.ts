export interface AvailableBedDTO {
    hospitalId: number;
    hospitalName: string;
    specialty: string;
    bedId: number;
    bedCode: string;
    roomId: number;
    roomCode: string;
}

export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
    first: boolean;
    last: boolean;
    pageable?: any;
    sort?: any;
}
