export type EventCategory =
  | "Hackathon"
  | "Sports"
  | "Fresher's Party"
  | "Tech Conference"
  | "Robotics & AI Expo"
  | "Cultural Fest"
  | "Gaming & E-Sports"
  | "Workshops & Seminars"
  | "Paper Presentation"
  | "Entrepreneurship & E-Cell"
  | "Art & Photography"
  | "Literary & Debating";

export type EventOption = {
  id: string;
  name: string;
  category: EventCategory;
  date: string; // YYYY-MM-DD format
  displayDate?: string;
  time: string;
  venue: string;
  description: string;
  featured?: boolean;
  trending?: boolean;
  tags?: string[];
  image?: string;
  dayOffset?: number;
};

export type TeamMember = {
  name: string;
  email: string;
  role: string;
  initials: string;
  avatarBg: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "GNANESHWAR",
    email: "kesgirgnaneshwar025@gmail.com",
    role: "Project Lead & Full Stack Architect",
    initials: "GN",
    avatarBg: "bg-blue-600",
  },
  {
    name: "RAM SHARMA",
    email: "ramsharma21144@gmail.com",
    role: "UI/UX Specialist & Frontend Dev",
    initials: "RS",
    avatarBg: "bg-indigo-600",
  },
  {
    name: "GANESH",
    email: "ganeshd.koyalkar34@gmail.com",
    role: "Backend Logic & Event Integration",
    initials: "GA",
    avatarBg: "bg-purple-600",
  },
];

export const ADMIN_CREDENTIALS = [
  { email: "kesgirgnaneshwar025@gmail.com", password: "ADMIN141", name: "GNANESHWAR" },
  { email: "ramsharma21144@gmail.com", password: "ADMIN144", name: "RAM SHARMA" },
  { email: "ganeshd.koyalkar34@gmail.com", password: "ADMIN134", name: "GANESH" },
];

// 12 Event Categories for Admins & Users
export const eventCategories: EventCategory[] = [
  "Hackathon",
  "Sports",
  "Fresher's Party",
  "Tech Conference",
  "Robotics & AI Expo",
  "Cultural Fest",
  "Gaming & E-Sports",
  "Workshops & Seminars",
  "Paper Presentation",
  "Entrepreneurship & E-Cell",
  "Art & Photography",
  "Literary & Debating",
];

// Helper to compute dynamic date relative to current date (Today)
export function getRelativeDateInfo(offsetDays: number): { date: string; displayDate: string } {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const iso = `${year}-${month}-${day}`;

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const displayDate = d.toLocaleDateString("en-US", options);
  return { date: iso, displayDate };
}

// Generate default 12+ events covering 12 categories dynamically anchored to current real time
export function generateDynamicDefaultEvents(): EventOption[] {
  const rawTemplates: Array<Omit<EventOption, "date" | "displayDate"> & { dayOffset: number }> = [
    {
      id: "1",
      dayOffset: 1,
      name: "AI Hackathon 2026",
      category: "Hackathon",
      time: "02:30 PM",
      venue: "Room 101, Main Building",
      description: "24-hour AI coding marathon. Build neural nets and AI agents for prizes.",
      featured: true,
      trending: true,
      tags: ["Hackathon"],
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      dayOffset: 3,
      name: "Orientation Cultural Extravaganza",
      category: "Fresher's Party",
      time: "05:00 PM",
      venue: "Main Campus Amphitheater",
      description: "Cultural performances, talent show, and introduction to campus clubs.",
      featured: true,
      tags: ["Fresher's Party"],
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      dayOffset: 5,
      name: "Freshers Gala Night 2026",
      category: "Fresher's Party",
      time: "07:30 PM",
      venue: "Grand Campus Auditorium",
      description: "Grand welcome party for new students. Live music, DJ, food stalls & fun.",
      featured: true,
      tags: ["Fresher's Party"],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "4",
      dayOffset: 7,
      name: "Inter-College Basketball Championship",
      category: "Sports",
      time: "04:30 PM",
      venue: "Sports Complex Court A",
      description: "Regional basketball championship with top college teams competing.",
      featured: true,
      tags: ["Sports"],
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "5",
      dayOffset: 9,
      name: "Autonomous Bot Wars & Drone Sprint",
      category: "Robotics & AI Expo",
      time: "10:00 AM",
      venue: "Robotics Arena, Mech Block",
      description: "Custom combat robots duel in arena and autonomous FPV drone racing.",
      featured: true,
      tags: ["Robotics"],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "6",
      dayOffset: 12,
      name: "Inter-College Music & Dance Fiesta",
      category: "Cultural Fest",
      time: "06:00 PM",
      venue: "Open Air Theatre",
      description: "Bands, solo vocals, western group dance, and fashion runway competition.",
      featured: true,
      tags: ["Cultural"],
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "7",
      dayOffset: 15,
      name: "Valorant & BGMI National E-Sports Cup",
      category: "Gaming & E-Sports",
      time: "01:00 PM",
      venue: "E-Sports Arena, Hall 3",
      description: "PC & Mobile e-sports championship with live cast and prizes.",
      featured: true,
      tags: ["Gaming"],
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "8",
      dayOffset: 18,
      name: "Web3 & Cloud Architecture Workshop",
      category: "Workshops & Seminars",
      time: "09:30 AM",
      venue: "Seminar Hall 1",
      description: "Hands-on masterclass on Docker, Kubernetes, AWS, and smart contracts.",
      featured: false,
      tags: ["Workshops"],
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "9",
      dayOffset: 22,
      name: "IEEE International Paper Presentation",
      category: "Paper Presentation",
      time: "10:30 AM",
      venue: "Research Block Auditorium",
      description: "Presentation of research papers on AI, VLSI, Green Energy, and IoT.",
      featured: false,
      tags: ["Paper"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "10",
      dayOffset: 26,
      name: "Campus Shark Tank & Startup Pitching",
      category: "Entrepreneurship & E-Cell",
      time: "11:00 AM",
      venue: "Incubation Center",
      description: "Student founders pitch innovations to VCs and angel investors for seed funding.",
      featured: true,
      tags: ["E-Cell"],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "11",
      dayOffset: 30,
      name: "Lens & Canvas Fine Art & Photo Hunt",
      category: "Art & Photography",
      time: "09:00 AM",
      venue: "Art Gallery & Quadrangle",
      description: "Live canvas painting, digital art contest, and 3-hour campus photo hunt.",
      featured: false,
      tags: ["Art"],
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "12",
      dayOffset: 35,
      name: "National Model UN & Parliamentary Debate",
      category: "Literary & Debating",
      time: "10:00 AM",
      venue: "Conference Room 202",
      description: "Debate global policies, geopolitics, and compete in parliamentary format.",
      featured: false,
      tags: ["Literary"],
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "13",
      dayOffset: 40,
      name: "Global Tech & AI Trends Summit",
      category: "Tech Conference",
      time: "09:30 AM",
      venue: "Convention Center",
      description: "Keynotes from industry leaders on AI, Quantum Computing, and Cloud.",
      featured: true,
      tags: ["TechConf"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return rawTemplates.map((item) => {
    const { date, displayDate } = getRelativeDateInfo(item.dayOffset);
    return {
      ...item,
      date,
      displayDate,
    };
  });
}

// Sort events chronologically by date
export function sortEventsByDate(eventsList: EventOption[]): EventOption[] {
  return [...eventsList].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getStoredEvents(): EventOption[] {
  const defaults = generateDynamicDefaultEvents();
  try {
    const saved = localStorage.getItem("eventhub_events");
    if (saved) {
      const parsed: EventOption[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Update any default items with fresh dynamic dates matching today's current date
        const updatedEvents = parsed.map((evt) => {
          const matchingDefault = defaults.find((d) => d.id === evt.id);
          if (matchingDefault) {
            return {
              ...evt,
              date: matchingDefault.date,
              displayDate: matchingDefault.displayDate,
            };
          }
          return evt;
        });
        return sortEventsByDate(updatedEvents);
      }
    }
  } catch (e) {
    console.error("Error reading events from storage", e);
  }

  // Fallback to fresh dynamic default events
  const sorted = sortEventsByDate(defaults);
  localStorage.setItem("eventhub_events", JSON.stringify(sorted));
  return sorted;
}

export function saveNewEvent(newEvent: Omit<EventOption, "id">): EventOption {
  const currentEvents = getStoredEvents();
  const created: EventOption = {
    ...newEvent,
    id: Date.now().toString(),
    displayDate: newEvent.displayDate || newEvent.date,
    featured: true,
  };
  const updated = sortEventsByDate([created, ...currentEvents]);
  localStorage.setItem("eventhub_events", JSON.stringify(updated));
  window.dispatchEvent(new Event("eventhub_events_updated"));
  return created;
}

export function updateExistingEvent(updatedEvent: EventOption): EventOption {
  const currentEvents = getStoredEvents();
  const updated = sortEventsByDate(
    currentEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
  );
  localStorage.setItem("eventhub_events", JSON.stringify(updated));
  window.dispatchEvent(new Event("eventhub_events_updated"));
  return updatedEvent;
}

export function deleteStoredEvent(eventId: string): void {
  const currentEvents = getStoredEvents();
  const updated = currentEvents.filter((e) => e.id !== eventId);
  localStorage.setItem("eventhub_events", JSON.stringify(updated));
  window.dispatchEvent(new Event("eventhub_events_updated"));
}

export function checkIsAdmin(email: string, password?: string): boolean {
  if (!email) return false;
  const admin = ADMIN_CREDENTIALS.find(
    (a) => a.email.toLowerCase() === email.toLowerCase()
  );
  if (!admin) return false;
  if (password !== undefined) {
    return admin.password === password;
  }
  return true;
}

export function getEventsByCategory(category: EventCategory): EventOption[] {
  return getStoredEvents().filter((e) => e.category === category);
}

export function getEventsByDate(date: string): EventOption[] {
  return getStoredEvents().filter((e) => e.date === date);
}

export function getFeaturedEvents(): EventOption[] {
  return getStoredEvents().filter((e) => e.featured);
}
