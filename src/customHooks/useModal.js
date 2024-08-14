import { useState } from 'react';

const useModal = () => {
    const [open, setOpenModal] = useState(false);
    const [close, setCloseModal] = useState(false);

    const openModal = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setCloseModal(true);
        setOpenModal(false);
    };

    return { open, close, openModal, closeModal };
};

export default useModal;
