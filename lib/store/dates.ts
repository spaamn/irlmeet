import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DatePost {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  creatorRating: number;
  title: string;
  description: string;
  activity: string;
  location: string;
  city: string;
  date: string;
  time: string;
  maxPeople: number;
  currentPeople: number;
  isGroup: boolean;
  womenOnly: boolean;
  verifiedOnly: boolean;
  status: "open" | "confirmed" | "completed" | "cancelled";
  interested: InterestedUser[];
  confirmed: string[];
  createdAt: string;
}

export interface InterestedUser {
  userId: string;
  name: string;
  avatar?: string;
  rating: number;
  verified: boolean;
  message?: string;
  timestamp: string;
}

interface DatesState {
  dates: DatePost[];
  addDate: (date: Omit<DatePost, "id" | "interested" | "confirmed" | "currentPeople" | "status" | "createdAt">) => string;
  expressInterest: (dateId: string, user: InterestedUser) => void;
  confirmUser: (dateId: string, userId: string) => void;
  cancelDate: (dateId: string) => void;
  completeDate: (dateId: string) => void;
  getDatesByCity: (city: string) => DatePost[];
  getDatesByCreator: (creatorId: string) => DatePost[];
}

const SAMPLE_DATES: DatePost[] = [
  {
    id: "sample-1",
    creatorId: "user-1",
    creatorName: "Ananya S.",
    creatorRating: 4.8,
    title: "Brunch at Bastian",
    description: "Sunday brunch, good conversation, great food.",
    activity: "Brunch",
    location: "Bastian, Mumbai",
    city: "Mumbai",
    date: "2026-07-05",
    time: "11:00",
    maxPeople: 4,
    currentPeople: 1,
    isGroup: true,
    womenOnly: false,
    verifiedOnly: true,
    status: "open",
    interested: [],
    confirmed: [],
    createdAt: "2026-06-28T10:00:00Z",
  },
  {
    id: "sample-2",
    creatorId: "user-2",
    creatorName: "Rohan K.",
    creatorRating: 4.6,
    title: "Trek to Sinhagad Fort",
    description: "Early morning trek. Moderate difficulty. Bring water.",
    activity: "Trek",
    location: "Sinhagad Fort, Pune",
    city: "Pune",
    date: "2026-07-06",
    time: "06:30",
    maxPeople: 6,
    currentPeople: 2,
    isGroup: true,
    womenOnly: false,
    verifiedOnly: false,
    status: "open",
    interested: [],
    confirmed: [],
    createdAt: "2026-06-27T14:00:00Z",
  },
  {
    id: "sample-3",
    creatorId: "user-3",
    creatorName: "Meera P.",
    creatorRating: 4.9,
    title: "Pottery Workshop",
    description: "Beginner-friendly pottery session at Hauz Khas.",
    activity: "Workshop",
    location: "Hauz Khas Village, Delhi",
    city: "Delhi",
    date: "2026-07-04",
    time: "15:00",
    maxPeople: 3,
    currentPeople: 1,
    isGroup: true,
    womenOnly: true,
    verifiedOnly: true,
    status: "open",
    interested: [],
    confirmed: [],
    createdAt: "2026-06-29T09:00:00Z",
  },
  {
    id: "sample-4",
    creatorId: "user-4",
    creatorName: "Karan V.",
    creatorRating: 4.5,
    title: "Live Jazz at AntiSOCIAL",
    description: "Jazz night this Friday. Great vibe, better company.",
    activity: "Music",
    location: "AntiSOCIAL, Mumbai",
    city: "Mumbai",
    date: "2026-07-04",
    time: "20:00",
    maxPeople: 2,
    currentPeople: 0,
    isGroup: false,
    womenOnly: false,
    verifiedOnly: false,
    status: "open",
    interested: [],
    confirmed: [],
    createdAt: "2026-06-29T12:00:00Z",
  },
  {
    id: "sample-5",
    creatorId: "user-5",
    creatorName: "Diya S.",
    creatorRating: 4.7,
    title: "Chai at Blue Tokai",
    description: "Slow morning, good chai, real conversation.",
    activity: "Coffee",
    location: "Blue Tokai, Koramangala",
    city: "Bangalore",
    date: "2026-07-05",
    time: "10:00",
    maxPeople: 3,
    currentPeople: 1,
    isGroup: true,
    womenOnly: false,
    verifiedOnly: true,
    status: "open",
    interested: [],
    confirmed: [],
    createdAt: "2026-06-28T16:00:00Z",
  },
];

export const useDatesStore = create<DatesState>()(
  persist(
    (set, get) => ({
      dates: SAMPLE_DATES,
      addDate: (dateData) => {
        const id = crypto.randomUUID();
        const newDate: DatePost = {
          ...dateData,
          id,
          interested: [],
          confirmed: [],
          currentPeople: 0,
          status: "open",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ dates: [newDate, ...state.dates] }));
        return id;
      },
      expressInterest: (dateId, user) =>
        set((state) => ({
          dates: state.dates.map((d) =>
            d.id === dateId && !d.interested.find((i) => i.userId === user.userId)
              ? { ...d, interested: [...d.interested, user] }
              : d
          ),
        })),
      confirmUser: (dateId, userId) =>
        set((state) => ({
          dates: state.dates.map((d) =>
            d.id === dateId && d.confirmed.length < d.maxPeople
              ? {
                  ...d,
                  confirmed: [...d.confirmed, userId],
                  currentPeople: d.currentPeople + 1,
                  status: d.confirmed.length + 1 >= d.maxPeople ? "confirmed" : d.status,
                }
              : d
          ),
        })),
      cancelDate: (dateId) =>
        set((state) => ({
          dates: state.dates.map((d) =>
            d.id === dateId ? { ...d, status: "cancelled" as const } : d
          ),
        })),
      completeDate: (dateId) =>
        set((state) => ({
          dates: state.dates.map((d) =>
            d.id === dateId ? { ...d, status: "completed" as const } : d
          ),
        })),
      getDatesByCity: (city) =>
        get().dates.filter((d) => d.city === city && d.status === "open"),
      getDatesByCreator: (creatorId) =>
        get().dates.filter((d) => d.creatorId === creatorId),
    }),
    { name: "irlmeet-dates" }
  )
);
