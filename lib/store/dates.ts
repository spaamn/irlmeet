import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DatePost {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  creatorRating: number;
  creatorBadges?: string[];
  title: string;
  description: string;
  vibe?: string;
  activity: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  images?: string[];
  location: string;
  venueName?: string;
  city: string;
  lat?: number;
  lng?: number;
  date: string;
  time: string;
  duration?: number;
  maxPeople: number;
  currentPeople: number;
  isGroup: boolean;
  womenOnly: boolean;
  verifiedOnly: boolean;
  status: "open" | "confirmed" | "completed" | "cancelled";
  interested: InterestedUser[];
  confirmed: string[];
  reviews?: Review[];
  createdAt: string;
}

export interface Review {
  id: string;
  dateId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  text?: string;
  wouldGoAgain: boolean;
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
  withdrawInterest: (dateId: string, userId: string) => void;
  confirmUser: (dateId: string, userId: string) => void;
  cancelDate: (dateId: string) => void;
  completeDate: (dateId: string) => void;
  getDatesByCity: (city: string) => DatePost[];
  getDatesByCreator: (creatorId: string) => DatePost[];
  getUserInterests: (userId: string) => DatePost[];
}

const SAMPLE_DATES: DatePost[] = [
  {
    id: "sample-1",
    creatorId: "user-1",
    creatorName: "Ananya S.",
    creatorRating: 4.8,
    creatorBadges: ["Super Host", "Verified"],
    title: "Brunch at Bastian",
    description: "Sunday brunch done right. We'll grab a table by the window, order too much food, and actually talk — no phones, no small talk. I've been hosting these for 6 months and some of my best friends started here. Come hungry, leave happy.",
    vibe: "Casual & Social",
    activity: "Brunch",
    category: "Food & Drink",
    tags: ["beginner-friendly", "good-conversation"],
    coverImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=450&fit=crop",
    location: "Bastian, Bandra West, Mumbai",
    venueName: "Bastian",
    city: "Mumbai",
    lat: 19.0608,
    lng: 72.8307,
    date: "2026-07-05",
    time: "11:00",
    duration: 120,
    maxPeople: 4,
    currentPeople: 1,
    isGroup: true,
    womenOnly: false,
    verifiedOnly: true,
    status: "open",
    interested: [],
    confirmed: [],
    reviews: [],
    createdAt: "2026-06-28T10:00:00Z",
  },
  {
    id: "sample-2",
    creatorId: "user-2",
    creatorName: "Rohan K.",
    creatorRating: 4.6,
    creatorBadges: ["Verified"],
    title: "Trek to Sinhagad Fort",
    description: "Early morning trek up Sinhagad — about 2 hours up, 1.5 down. Moderate difficulty, great views at the top. We'll stop for chai at the base after. Bring water, wear good shoes, leave your stress behind.",
    vibe: "Adventure",
    activity: "Trek",
    category: "Outdoors",
    tags: ["morning", "nature", "fitness"],
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=450&fit=crop",
    location: "Sinhagad Fort, Pune",
    venueName: "Sinhagad Fort Base",
    city: "Pune",
    lat: 18.3667,
    lng: 73.7558,
    date: "2026-07-06",
    time: "06:30",
    duration: 240,
    maxPeople: 6,
    currentPeople: 2,
    isGroup: true,
    womenOnly: false,
    verifiedOnly: false,
    status: "open",
    interested: [],
    confirmed: [],
    reviews: [],
    createdAt: "2026-06-27T14:00:00Z",
  },
  {
    id: "sample-3",
    creatorId: "user-3",
    creatorName: "Meera P.",
    creatorRating: 4.9,
    creatorBadges: ["Super Host", "Verified", "Women Host"],
    title: "Pottery Workshop",
    description: "Beginner-friendly pottery session at a lovely studio in Hauz Khas. We'll learn the basics, make something with our hands, and laugh at how bad our first attempts are. All materials provided. Women only — I want everyone to feel comfortable getting their hands dirty without any awkwardness.",
    vibe: "Creative & Chill",
    activity: "Workshop",
    category: "Arts",
    tags: ["beginner-friendly", "women-only", "creative"],
    coverImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=450&fit=crop",
    location: "Hauz Khas Village, Delhi",
    venueName: "Mud Studio",
    city: "Delhi",
    lat: 28.5535,
    lng: 77.2070,
    date: "2026-07-04",
    time: "15:00",
    duration: 150,
    maxPeople: 3,
    currentPeople: 1,
    isGroup: true,
    womenOnly: true,
    verifiedOnly: true,
    status: "open",
    interested: [],
    confirmed: [],
    reviews: [],
    createdAt: "2026-06-29T09:00:00Z",
  },
  {
    id: "sample-4",
    creatorId: "user-4",
    creatorName: "Karan V.",
    creatorRating: 4.5,
    creatorBadges: ["Verified"],
    title: "Live Jazz at AntiSOCIAL",
    description: "Jazz night at AntiSOCIAL — great band, better cocktails. I go every few weeks and it's always a vibe. Looking for one person to join me. We'll grab a table near the stage, enjoy the music, and see where the night takes us.",
    vibe: "Romantic & Chill",
    activity: "Music",
    category: "Music",
    tags: ["nightlife", "music", "one-on-one"],
    coverImage: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=450&fit=crop",
    location: "AntiSOCIAL, Lower Parel, Mumbai",
    venueName: "AntiSOCIAL",
    city: "Mumbai",
    lat: 19.0096,
    lng: 72.8372,
    date: "2026-07-04",
    time: "20:00",
    duration: 180,
    maxPeople: 2,
    currentPeople: 0,
    isGroup: false,
    womenOnly: false,
    verifiedOnly: false,
    status: "open",
    interested: [],
    confirmed: [],
    reviews: [],
    createdAt: "2026-06-29T12:00:00Z",
  },
  {
    id: "sample-5",
    creatorId: "user-5",
    creatorName: "Diya S.",
    creatorRating: 4.7,
    creatorBadges: ["Verified"],
    title: "Chai at Blue Tokai",
    description: "Slow morning at my favourite coffee spot. We'll grab pour-overs, sit by the window, and just talk. No agenda, no pressure. I'm a reader and a terrible cook looking for good conversation. If you're into books, travel, or just want to start your Sunday right — come through.",
    vibe: "Casual & Intimate",
    activity: "Coffee",
    category: "Food & Drink",
    tags: ["morning", "conversation", "chill"],
    coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop",
    location: "Blue Tokai, Koramangala, Bangalore",
    venueName: "Blue Tokai Coffee",
    city: "Bangalore",
    lat: 12.9352,
    lng: 77.6245,
    date: "2026-07-05",
    time: "10:00",
    duration: 90,
    maxPeople: 3,
    currentPeople: 1,
    isGroup: true,
    womenOnly: false,
    verifiedOnly: true,
    status: "open",
    interested: [],
    confirmed: [],
    reviews: [],
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
      withdrawInterest: (dateId, userId) =>
        set((state) => ({
          dates: state.dates.map((d) =>
            d.id === dateId
              ? { ...d, interested: d.interested.filter((i) => i.userId !== userId) }
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
      getUserInterests: (userId) =>
        get().dates.filter((d) => d.interested.some((i) => i.userId === userId)),
    }),
    { name: "irlmeet-dates" }
  )
);
