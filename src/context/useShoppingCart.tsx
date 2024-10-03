import { create } from 'zustand';

type Item = {
    id: string,
    img: string,
    title: string,
    price: string
}

interface CartItemState {
    items: Item[],
    addItem: (i: Item) => void,
    removeItem: (i: string) => void,
}

export const useCart = create<CartItemState>((set) => ({
    items: [],  
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
}))