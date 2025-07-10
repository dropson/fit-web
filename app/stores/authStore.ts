
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '~/lib/axios';

export type Role = 'admin' | 'moderator' | 'coach' | 'client';

interface User {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
    role: Role[];
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: () => boolean;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setLoading: (value: boolean) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}
export const useAuthState = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            loading: false,
            isAuthenticated: () => !!get().user && !!get().token,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            setLoading: (loading) => set({ loading }),
            logout: () => {
                set({ user: null, token: null});
                localStorage.removeItem('auth-storage');
            },
            checkAuth: async () => {
                set({ loading: true});
                try {
                    const res = await axiosInstance.get('v1/user');
                    set({ user: res.data.data });

                } catch (error: any) {
                    set({ user: null, token: null });
                } finally {
                    set({ loading: false });
                }
            }
        }),
        {
            name: 'auth-storage',
        }
    )
)
