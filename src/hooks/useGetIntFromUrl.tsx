import { useParams } from "react-router";

export const useGetIntIdFromUrl = (): number => {
    const { id } = useParams<{ id?: string }>();
    return typeof id === "string" ? +id : -1;
};
