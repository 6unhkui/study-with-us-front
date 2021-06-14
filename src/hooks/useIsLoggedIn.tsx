import { useMeAsync } from "./useRedux";

const useIsLoggedIn = (): boolean => {
    const { data: me, loading } = useMeAsync();
    return !!me && !loading;
};

export default useIsLoggedIn;
