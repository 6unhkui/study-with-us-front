export type SortOrder = "ASC" | "DESC";

export interface ResponseDTO<T = null> {
    data: T;
    status: number | null;
    success: boolean;
    message?: string;
}

export interface PageRequestDTO {
    page: number;
    size: number;
    direction: SortOrder;
}

export interface PageResponseDTO<T> {
    content: T;
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    empty: boolean;
}

interface Pageable {
    sort: Sort;
    pageSize: number;
    offset: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
}
