import { useRef } from "react";

type UserIntersectionObserver = (action: (entries: IntersectionObserverEntry[]) => void) => { domRef: (n: any) => void };

const useIntersectionObserver: UserIntersectionObserver = action => {
    const observer = useRef<IntersectionObserver | null>(null);

    const domRef = (node: any) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(action);
        if (node) observer.current.observe(node);
    };

    return {
        domRef
    };
};

export default useIntersectionObserver;
