import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Notification {
  id: string;
  userId: string;
  type: "interest" | "confirmed" | "reminder" | "new_date" | "milestone" | "welcome";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

interface NotificationsState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (userId: string) => void;
  getUnreadCount: (userId: string) => number;
  getUserNotifications: (userId: string) => Notification[];
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (notification) => {
        const newNotif: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ notifications: [newNotif, ...state.notifications] }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },
      markAllAsRead: (userId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.userId === userId ? { ...n, read: true } : n
          ),
        }));
      },
      getUnreadCount: (userId) => {
        return get().notifications.filter((n) => n.userId === userId && !n.read).length;
      },
      getUserNotifications: (userId) => {
        return get().notifications.filter((n) => n.userId === userId);
      },
    }),
    { name: "irlmeet-notifications" }
  )
);
