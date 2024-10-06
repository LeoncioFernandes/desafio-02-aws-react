import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
    id?: number
    name?: string,
    email: string,
    password: string,
}

interface UserState {
    users: User[],
    addUser: (i: User) => boolean,
    findUser: (email: string, password: string) => User | undefined
}

export const useCreateLoginUser = create<UserState>()(
    persist(
        (set, get) => ({
            users: [],
            addUser: (user) => {
                const usr = get().users.find((us) => us.email === user.email);
                if (!usr) {
                    const lastUser = get().users.at(-1);
                    user.id = lastUser && lastUser.id ? lastUser.id + 1 : 1;
                    set((state) => ({
                        users: [...state.users, user],
                    }));
                    return true;
                }
                return false;
            },
            findUser: (email, password) => {
                const state = get();
                const findUser = state.users.find(us => {
                    return us.email === email && us.password === password 
                })
                if(findUser){
                    return findUser
                }
                return undefined
            }
        }),
        { name: 'created-users' }
    ),
)