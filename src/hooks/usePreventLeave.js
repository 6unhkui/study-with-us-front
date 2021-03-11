export const usePreventLeave = () => {
    const listener = event => {
        event.preventDefault();
        event.returnValue = ""; // 반드시 넣어줘야 한다.
    };

    const enablePrevent = () => window.addEventListener("beforeunload", listener);
    const disablePrevent = () => window.removeEventListener("beforeunload", listener);

    return { enablePrevent, disablePrevent };
};
