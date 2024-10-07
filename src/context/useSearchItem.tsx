import { create } from 'zustand'

export type Item = {
    id: number,
    title: string,
}

interface SearchState {
    searchTerm: string,
    setSearchTerm: (term: string) => void,
}

export const useSearchItem = create<SearchState>((set) => ({
    searchTerm: '',
    setSearchTerm: (term) => set({searchTerm: term})
}))