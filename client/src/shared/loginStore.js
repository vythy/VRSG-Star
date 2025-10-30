import { create } from 'zustand'

const useLoginStore = create((set) => ({
    userId: undefined,
    setUserId: (id) => set({ userId: id })
}))

export default useLoginStore;