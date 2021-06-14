import { useEffect } from "react";
import { useLocation } from "react-router";

const useLocationChange = (action: (location: any) => void, dependencies?: Array<any>): void => {
    const location = useLocation();

    useEffect(() => {
        action(location);
    }, [location, action, dependencies]);
};

export default useLocationChange;
