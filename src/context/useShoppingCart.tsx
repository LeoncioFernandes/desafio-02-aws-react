import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Item = {
    id: number,
    img: string,
    title: string,
    price: number,
    counter?: number,
    totalItemPrice?: number
}

interface CartItemState {
    items: Item[],
    addItem: (i: Item) => void,
    buyItemNow: (i: Item) => void,
    incrementItem: (i: number) => void,
    decrementItem: (i: number) => void,
    removeItem: (i: number) => void,
    getTotalCartPrice: () => number,
    clearCart: () => void 
}

export const useCart = create<CartItemState>()(
    persist(
        (set, get) => ({
        items: [],  
        addItem: (item) => set((state) => {
            const itm = state.items.find(it => it.id === item.id);
            if(itm){
                itm.counter! += 1;
                itm.totalItemPrice = TotalPriceItem(itm.price, itm.counter!);
                return ({items: state.items})
            }else{
                item.counter = 1
                item.totalItemPrice = item.price;
                return({ items: [...state.items, item] })
            } 
        }),
        buyItemNow: (item) => set((state) => {
            const itm = state.items.find(it => it.id === item.id);
            if(!itm){
                item.counter = 1
                item.totalItemPrice = item.price;
                return({ items: [...state.items, item] })
            }
            return({items: state.items})
        }),
        incrementItem: (id) => set((state) => {
            const itm = state.items.find(it => it.id === id);
            if(itm){
                itm.counter! += 1;
                itm.totalItemPrice = TotalPriceItem(itm.price, itm.counter!);
                return ({items: state.items})
            }
            return({items: state.items})
        }),
        decrementItem: (id) => set((state) => {
            const itm = state.items.find(it => it.id === id);
            if(itm){
                if(itm.counter! > 1){
                    itm.counter! -= 1
                    itm.totalItemPrice = TotalPriceItem(itm.price, itm.counter!);
                    return ({items: state.items})
                }  
            }
            return({items: state.items})
        }),
        removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
        getTotalCartPrice: () => {
            const state = get();
            const totCartPrice = state.items.reduce((acc, item) => {
                return acc + (item.totalItemPrice || 0);
            }, 0);
            return totCartPrice;
        },
        clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
)

function TotalPriceItem(price: number, counter: number){
    return price * counter
}