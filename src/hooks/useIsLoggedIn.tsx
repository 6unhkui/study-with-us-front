import { useMeFetch } from "./useRedux";

const useIsLoggedIn = (): boolean => {
    const { data: me, loading } = useMeFetch();
    return !!me && !loading;
};

export default useIsLoggedIn;
