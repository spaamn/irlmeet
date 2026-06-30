"use client";

import { useAuthStore } from "@/lib/store/auth";
import { useNotificationsStore } from "@/lib/store/notifications";
import { Bell, Check, Heart, Calendar, Sparkles, PartyPopper } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ICONS: Record<string, React.ElementType> = {
  interest: Heart,
  confirmed: Check,
  reminder: Calendar,
  new_date: Sparkles,
  milestone: PartyPopper,
  welcome: PartyPopper,
};

export default function NotificationBell() {
  const { user, isAuthenticated } = useAuthStore();
  const { getUnreadCount, getUserNotifications, markAsRead, markAllAsRead } = useNotificationsStore();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated || !user) return null;

  const unreadCount = getUnreadCount(user.id);
  const notifications = getUserNotifications(user.id).slice(0, 10);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full glass-btn flex items-center justify-center relative"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 text-[var(--text-2)]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 glass-card p-2 z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--glass-border)] mb-2">
            <span className="text-sm font-semibold text-[var(--text-1)]">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead(user.id)}
                className="text-xs text-[var(--accent)] hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="p-4 text-center">
              <Bell className="w-8 h-8 text-[var(--text-3)] mx-auto mb-2" />
              <p className="text-sm text-[var(--text-3)]">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((n) => {
                const Icon = ICONS[n.type] || Bell;
                return (
                  <Link
                    key={n.id}
                    href={n.link || "#"}
                    onClick={() => markAsRead(n.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                      n.read ? "opacity-60" : "bg-[var(--accent)]/5"
                    } hover:bg-[var(--glass-bg)]`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-1)] truncate">{n.title}</p>
                      <p className="text-xs text-[var(--text-3)] line-clamp-2">{n.message}</p>
                    </div>
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0 mt-1.5" />
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
