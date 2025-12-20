import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'student' | 'teacher';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: UserRole;
}

export interface Notification {
    id: string;
    message: string;
    date: string;
    read: boolean;
    type: 'info' | 'success' | 'warning';
}

export interface StudentRecord {
    id: string;
    quizTitle: string;
    score: number;
    maxScore: number;
    date: string;
}

interface AppState {
    count: number;
    user: User | null;
    isAuthenticated: boolean;
    theme: 'light' | 'dark';
    notifications: Notification[];
    studentRecords: StudentRecord[];
    completedMaterials: string[];

    increase: () => void;
    reset: () => void;
    login: (user: User) => void;
    logout: () => void;
    toggleTheme: () => void;
    updateProfile: (name: string, avatar?: string) => void;
    addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
    markNotificationRead: (id: string) => void;
    saveQuizResult: (record: Omit<StudentRecord, 'id' | 'date'>) => void;
    markMaterialComplete: (id: string) => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => {
            // Check local storage or preference for initial theme logic if needed,
            // but persist middleware handles hydration automatically now.
            // We can still keep the side effect for applying the theme class.

            return {
                count: 0,
                user: null,
                isAuthenticated: false,
                theme: 'light', // Default, will be overwritten by persisted value
                notifications: [
                    { id: '1', message: 'Selamat datang di EduConnect!', date: new Date().toISOString(), read: false, type: 'info' }
                ],
                studentRecords: [],
                completedMaterials: [],

                increase: () => set((state) => ({ count: state.count + 1 })),
                reset: () => set({ count: 0 }),
                login: (user) => set({ user, isAuthenticated: true }),
                logout: () => set({
                    user: null,
                    isAuthenticated: false,
                    studentRecords: [],
                    completedMaterials: [],
                    notifications: [
                        { id: '1', message: 'Selamat datang di EduConnect!', date: new Date().toISOString(), read: false, type: 'info' }
                    ]
                }),
                toggleTheme: () => set((state) => {
                    const newTheme = state.theme === 'light' ? 'dark' : 'light';
                    if (newTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                    return { theme: newTheme };
                }),
                updateProfile: (name, avatar) => set((state) => ({
                    user: state.user ? { ...state.user, name, ...(avatar ? { avatar } : {}) } : null
                })),
                addNotification: (notif) => set((state) => ({
                    notifications: [
                        { ...notif, id: Math.random().toString(36).substr(2, 9), read: false, date: new Date().toISOString() },
                        ...state.notifications
                    ]
                })),
                markNotificationRead: (id) => set((state) => ({
                    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
                })),
                saveQuizResult: (record) => set((state) => ({
                    studentRecords: [
                        { ...record, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() },
                        ...state.studentRecords
                    ]
                })),
                markMaterialComplete: (id) => set((state) => {
                    if (state.completedMaterials.includes(id)) return {};
                    return { completedMaterials: [...state.completedMaterials, id] };
                })
            }
        },
        {
            name: 'app-storage', // unique name
            onRehydrateStorage: () => (state) => {
                // Optional: hydration finish callback
                if (state && state.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        }
    )
)
