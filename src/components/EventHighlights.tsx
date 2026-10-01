import { useState, useEffect } from "react";
import {
  getStoredEvents,
  EventOption,
  eventCategories,
  EventCategory,
  deleteStoredEvent,
} from "@/utils/eventsData";
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Sparkles,
  Edit2,
  Trash2,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface EventHighlightsProps {
  onRegisterClick: (event: EventOption) => void;
  isAdmin: boolean;
  onEditClick: (event: EventOption) => void;
}

export default function EventHighlights({
  onRegisterClick,
  isAdmin,
  onEditClick,
}: EventHighlightsProps) {
  const [events, setEvents] = useState<EventOption[]>(getStoredEvents());
  const [activeCategory, setActiveCategory] = useState<EventCategory | "All">("All");

  useEffect(() => {
    const reloadEvents = () => {
      setEvents(getStoredEvents());
    };
    window.addEventListener("eventhub_events_updated", reloadEvents);
    return () => {
      window.removeEventListener("eventhub_events_updated", reloadEvents);
    };
  }, []);

  const handleDelete = (evt: EventOption) => {
    if (!isAdmin) {
      toast({
        title: "🔒 Permission Denied",
        description: "Only Team Nexus creators (Gnaneshwar, Ram Sharma, Ganesh) can delete events.",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${evt.name}"?`)) {
      deleteStoredEvent(evt.id);
      toast({
        title: "Event Deleted 🗑️",
        description: `"${evt.name}" has been removed.`,
      });
    }
  };

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  const featuredEvents = events.filter((e) => e.featured).slice(0, 4);

  // Category banner background styling for 12 categories
  const categoryBanners: Record<EventCategory, { bg: string; subtitle: string }> = {
    Hackathon: {
      bg: "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white",
      subtitle: "24-48 Hour Coding Challenges & AI Innovation Marathons",
    },
    Sports: {
      bg: "bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white",
      subtitle: "Inter-College Athletic Championships & Night Leagues",
    },
    "Fresher's Party": {
      bg: "bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-900 text-white",
      subtitle: "Welcome Celebrations, Live DJ Night & Campus Beats",
    },
    "Tech Conference": {
      bg: "bg-gradient-to-r from-blue-900 via-cyan-950 to-slate-900 text-white",
      subtitle: "Keynotes, Developer Workshops & Industry Networking",
    },
    "Robotics & AI Expo": {
      bg: "bg-gradient-to-r from-red-950 via-slate-900 to-zinc-950 text-white",
      subtitle: "Autonomous Bot Battles, FPV Drone Sprint & AI Hardware",
    },
    "Cultural Fest": {
      bg: "bg-gradient-to-r from-rose-900 via-purple-900 to-indigo-950 text-white",
      subtitle: "Music Bands, Group Dance, Fashion Runway & Solo Vocals",
    },
    "Gaming & E-Sports": {
      bg: "bg-gradient-to-r from-violet-950 via-purple-900 to-slate-950 text-white",
      subtitle: "Valorant, BGMI & LAN PC Gaming Championship",
    },
    "Workshops & Seminars": {
      bg: "bg-gradient-to-r from-amber-950 via-slate-900 to-stone-900 text-white",
      subtitle: "Hands-on Tech Masterclasses, Cloud & Web Architectures",
    },
    "Paper Presentation": {
      bg: "bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 text-white",
      subtitle: "IEEE & International Journal Technical Research Papers",
    },
    "Entrepreneurship & E-Cell": {
      bg: "bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white",
      subtitle: "Campus Shark Tank, Startup Pitches & Angel Funding",
    },
    "Art & Photography": {
      bg: "bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white",
      subtitle: "Fine Arts, Live Canvas Painting & 3-Hour Campus Photo Hunt",
    },
    "Literary & Debating": {
      bg: "bg-gradient-to-r from-stone-900 via-neutral-900 to-slate-950 text-white",
      subtitle: "National Model UN, Parliamentary Debates & Slam Poetry",
    },
  };

  return (
    <div className="space-y-12 my-6">
      {/* 1. Top Featured Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Top Featured Events
          </h3>
          <span className="text-xs text-gray-500 font-medium">Sorted chronologically</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group relative"
            >
              {/* Card Image Header */}
              <div className="h-36 w-full relative overflow-hidden bg-slate-100">
                <img
                  src={evt.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600"}
                  alt={evt.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full shadow-xs">
                    {evt.category}
                  </span>
                </div>

                {/* Admin Actions Overlay if Admin */}
                {isAdmin && (
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg">
                    <button
                      onClick={() => onEditClick(evt)}
                      className="p-1 hover:bg-blue-600 text-white rounded transition-colors"
                      title="Edit Event"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(evt)}
                      className="p-1 hover:bg-red-600 text-white rounded transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-bold text-gray-900 text-base mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {evt.name}
                </h4>

                <div className="space-y-1 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="font-medium text-gray-800">{evt.displayDate || evt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 mb-4 mt-auto">
                  {evt.description}
                </p>

                <Button
                  onClick={() => onRegisterClick(evt)}
                  className="w-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold py-2 rounded-xl border border-blue-200 hover:border-transparent transition-all"
                >
                  Register Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. All 12 Categories List */}
      <div className="pt-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <ArrowUpDown className="w-6 h-6 text-blue-600" />
              All Scheduled Events ({events.length}+ Total)
            </h3>
            <p className="text-xs text-gray-500">Filter by 12 event categories or view all chronologically</p>
          </div>
        </div>

        {/* Category Pills Carousel / Wrap */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs mb-6">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-2 px-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            12 Event Categories:
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeCategory === "All"
                  ? "bg-blue-600 text-white shadow-xs scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Events ({events.length})
            </button>
            {eventCategories.map((cat) => {
              const count = events.filter((e) => e.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-xs scale-105"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Theme Banner if specific category selected */}
        {activeCategory !== "All" && categoryBanners[activeCategory] && (
          <div className={`p-6 md:p-8 rounded-2xl shadow-lg mb-8 relative overflow-hidden ${categoryBanners[activeCategory].bg}`}>
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                Category Spotlight
              </span>
              <h4 className="text-2xl md:text-3xl font-black mt-2 mb-1 tracking-tight">{activeCategory}</h4>
              <p className="text-xs md:text-sm text-gray-200">{categoryBanners[activeCategory].subtitle}</p>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 text-white hidden md:block">
              <Sparkles className="w-36 h-36" />
            </div>
          </div>
        )}

        {/* 10+ Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm hover:shadow-lg transition-all flex flex-col relative group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {evt.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-blue-600" />
                      {evt.date}
                    </span>

                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onEditClick(evt)}
                          className="p-1 hover:bg-blue-100 text-blue-600 rounded transition-colors"
                          title="Edit Event"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(evt)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h5 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {evt.name}
                </h5>

                <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                  <p className="flex items-center gap-1.5 font-medium text-gray-800">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{evt.displayDate || evt.date}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{evt.time}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span className="truncate">{evt.venue}</span>
                  </p>
                </div>

                <p className="text-xs text-gray-600 mb-4 line-clamp-2">{evt.description}</p>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-500">
                    ID: #{evt.id}
                  </span>
                  <Button
                    onClick={() => onRegisterClick(evt)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg px-4"
                  >
                    Register
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-sm text-gray-500">No events currently listed under {activeCategory}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
