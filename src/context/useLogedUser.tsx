import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserLoged = {
    id: number | undefined
    name: string | undefined,
    email: string | undefined,
    isLoged: boolean
}

interface UserLogedState {
    userLoged: UserLoged
    addUserLoged: (i: UserLoged) => void
    removeUserLoged: () => void
}

export const userLoged = create<UserLogedState>()(
    persist(
        (set) => ({
            userLoged: {id: undefined, name: undefined, email: undefined, isLoged: false},
            addUserLoged: (user) => set(() => ({
                userLoged: user
            })),
            removeUserLoged: () => set(() => ({
                userLoged: { id: undefined, name: undefined, email: undefined, isLoged: false }
            })),
        }),
        { name: 'user-loged' }
    ),
)