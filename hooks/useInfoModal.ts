import { create } from 'zustand'

export interface ModalStoreInterFace {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterFace>((set) => ({
    movieId : undefined,
    isOpen: false,
    openModal: (movieId) => set({ movieId, isOpen: true }),
    closeModal: () => set({ movieId: undefined, isOpen: false }),
}));

export default useInfoModal;