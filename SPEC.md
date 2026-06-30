# irlmeet — Feature Depth Specification

> Version 2.0 | Goal: Not parity — **one-up** Meetup/Luma for the dating-meets-events experience

---

## 1. Thesis: Why Someone Chooses irlmeet Over Alternatives

**Meetup** = interest groups, not dating. Feels like a professional network.
**Luma** = beautiful events, but impersonal. No connection layer.
**Bumble/Hinge** = dating, but stuck behind screens. No real-world momentum.

**irlmeet's one-up**: The *thrill of the ask* + *safety of the group* + *certainty of the plan*.

We don't just list dates. We make asking someone out **feel safe, exciting, and inevitable**.

---

## 2. The Depth Dimensions

What makes a platform feel "deep" vs "shallow":

| Dimension | Shallow (MVP) | Deep (One-Up) |
|-----------|---------------|---------------|
| **Discovery** | List of cards | Curated feed, "happening now", personalized |
| **Decision** | Title + time | Rich preview, social proof, host trust |
| **Commitment** | Button click | RSVP flow, confirmation, calendar, reminder |
| **Post-event** | Nothing | Reviews, photos, "again?" prompt |
| **Safety** | Checkbox | Verified IDs, chaperone, emergency, community trust |
| **Social** | Solo experience | "Friends going", group chat, shared experience |
| **Emotion** | Transactional | Anticipation, belonging, FOMO, delight |

---

## 3. Feature Specifications (One-Up Depth)

### 3.1 Discovery: "I Want to Go Out Tonight"

**Current**: Static list of cards with city/activity filters.

**One-up experience:**

- **"Happening Now" / "Tonight" / "This Weekend"** — time-based discovery is the primary filter, not an afterthought
- **Personalized feed** — "Based on you like coffee and treks in Bangalore"
- **"Filling Fast" urgency** — spots remaining countdown, "12 people viewed this"
- **Map view** — see dates on a map (Meetup's killer feature for local discovery)
- **"Surprise Me"** — one tap, we pick a date for you based on your vibe
- **Social proof on cards** — "3 friends going", "Priya from your building expressed interest"

**Why it's one-up**: Meetup makes you search. irlmeet makes you *feel like the date found you*.

---

### 3.2 Event Detail: "I'm Going to This"

**Current**: No detail page. Card is the only view.

**One-up experience:**

- **Hero image + vibe photos** — not just a card, a *feeling*
- **"The Plan" section** — not just "chai at Blue Tokai" but "We'll meet at the counter, grab a pour-over, and walk through the art district after. I know the owner — they'll give us the good seats."
- **Host story** — not just name + rating. "I host brunch dates twice a month. I'm a designer who believes the best conversations happen over good food."
- **Who's going** — avatars, count, "2 people from your building"
- **Safety confidence** — "This is a verified host • Public place • 4.8 rating from 23 dates"
- **"Add to Calendar"** — one tap, Google Calendar/iCal
- **Share** — "Bring a friend" (WhatsApp, Instagram, copy link)
- **Related dates** — "If you like this, try..."

**Why it's one-up**: Meetup tells you *what*. irlmeet makes you *feel it*.

---

### 3.3 RSVP Flow: "I'm In"

**Current**: Button changes to "Interested". Nothing else happens.

**One-up experience:**

1. **Express Interest** → "Got it! The host will review."
2. **Host confirms** → "You're in! Here's the plan:"
3. **Pre-date checklist**:
   - Add to calendar
   - Get directions
   - Message the host (optional)
   - "What to bring" / "What to expect"
4. **Day-of reminder** — "Your date is in 3 hours!"
5. **Post-date** — "How was it?" → rating + optional review + "Go again?"

**Why it's one-up**: Meetup is RSVP → done. irlmeet is a *journey* that builds anticipation.

---

### 3.4 Host Experience: "I'm the Curator"

**Current**: Basic form. No host identity.

**One-up experience:**

- **Host profile** — bio, photo, hosting style ("I keep groups small and conversations big")
- **Host dashboard** — see who's interested, confirm/reject, message attendees
- **"Host again?"** — one-tap to recreate a past date
- **Host reputation** — badges ("Super Host", "50+ dates", "4.9 rating")
- **Host tips** — "Great hosts add photos and write a personal note"

**Why it's one-up**: Meetup treats hosts as organizers. irlmeet treats them as *curators of experience*.

---

### 3.5 Safety: "I Feel Safe Going"

**Current**: Checkboxes on create form.

**One-up experience:**

- **Verification tiers**:
  - Phone verified (basic)
  - ID verified (Aadhaar/PAN — gold badge)
  - Photo verified (selfie match)
- **Women-first features**:
  - Women-only dates
  - Women can require verified-only attendees
  - "Bring a friend" — platform covers friend's cost
- **Emergency button** — one tap, location shared with trusted contacts
- **Public place requirement** — no home addresses, only venues
- **Community trust** — ratings visible, bad actors removed
- **Safety center** — tips, guidelines, 24/7 support link

**Why it's one-up**: Meetup has reporting. irlmeet has *prevention + confidence*.

---

### 3.6 Social Layer: "We're in This Together"

**Current**: Solo experience. No social features.

**One-up experience:**

- **"Friends going"** — see if connections are attending
- **Group dates** — default to group, reduce pressure
- **"Bring a friend"** — invite someone who isn't on the platform yet
- **Post-date photos** — shared album (with consent)
- **"Again?"** — after a date, prompt to go again with same person/group

**Why it's one-up**: Dating apps are 1:1 and high-pressure. irlmeet is *social and low-pressure*.

---

### 3.7 Delight: "This App Gets Me"

**Current**: Functional but no delight.

**One-up experience:**

- **Micro-interactions** — confetti on RSVP, smooth transitions
- **Empty states with personality** — "No dates? Be the hero. Plan one."
- **Celebrations** — "Your first date! 🎉", "5 dates milestone!"
- **Personalized copy** — not "No results" but "Nothing in Mumbai this weekend? Try Delhi or plan your own."
- **Dark mode** — already have, but make it *gorgorgeous*

**Why it's one-up**: Meetup feels like a utility. irlmeet feels like a *product you love*.

---

## 4. Data Model (Updated)

```typescript
interface DatePost {
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
  category: string;
  tags: string[];
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
  reviews: Review[];
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  city: string;
  age: number;
  gender?: string;
  verified: boolean;
  verificationTier: "phone" | "id" | "photo" | "none";
  aadhaarVerified?: boolean;
  rating: number;
  datesCompleted: number;
  datesHosted: number;
  responseRate?: number;
  badges: string[];
  reviews: Review[];
  following?: string[];
  emergencyContacts?: EmergencyContact[];
  createdAt: string;
}

interface Review {
  id: string;
  dateId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  text?: string;
  wouldGoAgain: boolean;
  createdAt: string;
}

interface Notification {
  id: string;
  userId: string;
  type: "interest" | "confirmed" | "reminder" | "new_date" | "milestone";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}
```

---

## 5. Page Inventory

| Route | Page | Purpose | Status |
|-------|------|---------|--------|
| `/` | Landing | Convert visitors → signups | ✅ Live |
| `/signup` | Onboarding | 2-step signup | ✅ Live |
| `/login` | Auth | Login | ✅ Live |
| `/dashboard` | Home | Personalized feed | ✅ Live |
| `/dates` | Browse | Discovery with filters | ✅ Live |
| `/dates/new` | Create | Plan a date | ✅ Live |
| `/dates/[id]` | Detail | Full event experience | ❌ Needed |
| `/profile` | My Profile | Settings + my dates | ✅ Live |
| `/profile/[id]` | Public Profile | Host trust page | ❌ Needed |
| `/notifications` | Activity | Alerts + updates | ❌ Needed |
| `/safety` | Safety Center | Guidelines + emergency | ❌ Needed |
| `/about` | About | Mission + team | ❌ Needed |

---

## 6. Implementation Phases

### Phase 1: "I Want to Go" (Week 1-2)
- [ ] Event detail page with rich content
- [ ] Time-based discovery ("Tonight", "This weekend")
- [ ] Cover images on cards
- [ ] Urgency badges ("Filling fast", "X spots left")
- [ ] "Add to Calendar" on detail page

### Phase 2: "I'm Going" (Week 2-3)
- [ ] RSVP confirmation flow
- [ ] Host dashboard (see interest, confirm attendees)
- [ ] Post-date review prompt
- [ ] Social proof ("X people interested", "Friends going")

### Phase 3: "I Feel Safe" (Week 3-4)
- [ ] Verification tiers (phone → ID → photo)
- [ ] Emergency button + contacts
- [ ] Women-first enforcement
- [ ] Safety center page

### Phase 4: "I Love This" (Week 4-5)
- [ ] Notifications system
- [ ] Delightful empty states + micro-interactions
- [ ] Personalized copy
- [ ] "Surprise Me" discovery

### Phase 5: "We're in This" (Future)
- [ ] Groups/communities
- [ ] "Bring a friend" invites
- [ ] Post-date photo sharing
- [ ] Host reputation system

---

## 7. Success Metrics

| Metric | Target |
|--------|--------|
| Event detail views | > 60% of sessions |
| Express interest rate | > 15% of detail views |
| RSVP confirmation | > 70% of interests |
| Profile completion | > 80% |
| Review submission | > 30% of completed dates |
| Return rate (7-day) | > 40% |
| Safety confidence | > 90% feel "very safe" |

---

## 8. The "One-Up" Test

Before shipping any feature, ask:

1. **Does this make someone feel something?** (Not just function — emotion)
2. **Would someone screenshot this and send it to a friend?**
3. **Does this make Meetup/Luma feel outdated for dating?**
4. **Would a woman in Mumbai feel safe doing this?**
5. **Does this create anticipation, not just utility?**

If the answer is no to any of these, the feature isn't deep enough.

---

*Document owner: irlmeet team*
*Last updated: 2026-06-30*
