import { useCallback, useState } from "react";

const useModal = (isOpen?: boolean) => {
    const [open, setOpen] = useState(isOpen || false);

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    const onOpen = useCallback(() => {
        setOpen(true);
    }, []);

    return {
        onOpen,
        onClose,
        visible: open
    };
};

export default useModal;
