import { useState } from "react";
import { Calendar as CalendarIcon, ArrowDown, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import {
  eventCategories,
  getEventsByCategory,
  EventCategory,
  EventOption,
  getStoredEvents,
} from "@/utils/eventsData";
import { Button } from "@/components/ui/button";

interface CalendarViewProps {
  onRegisterClick: (event?: EventOption | null, category?: string) => void;
}

export default function CalendarView({ onRegisterClick }: CalendarViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "">("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  // Dynamic Month & Year state initialized to current real-time Date
  const [viewDate, setViewDate] = useState(() => new Date());

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth(); // 0-indexed

  const monthYearTitle = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const eventsList = selectedCategory ? getEventsByCategory(selectedCategory as EventCategory) : [];
  const selectedEventObj = eventsList.find((e) => e.id === selectedEventId);

  // Get all scheduled events
  const allEvents = getStoredEvents();

  // Generate calendar days for current view month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const calendarCells = [];
  // Empty leading padding cells
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Today's date check
  const today = new Date();
  const isCurrentMonthToday =
    today.getFullYear() === currentYear && today.getMonth() === currentMonth;
  const todayDateNum = today.getDate();

  // Helper to check if a day in current month has events
  const getEventForDay = (day: number) => {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateIso = `${currentYear}-${monthStr}-${dayStr}`;
    return allEvents.filter((e) => e.date === dateIso);
  };

  const getCategoryDotColor = (cat: EventCategory) => {
    switch (cat) {
      case "Hackathon":
        return "bg-blue-600";
      case "Sports":
        return "bg-amber-500";
      case "Fresher's Party":
        return "bg-emerald-500";
      case "Tech Conference":
        return "bg-purple-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
      {/* Left Column: Interactive Real-Time Event Calendar */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-purple-100 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-base">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span>Event Calendar</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
            <button
              onClick={handlePrevMonth}
              className="hover:text-blue-600 p-0.5 rounded transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="min-w-[100px] text-center font-bold text-gray-900">{monthYearTitle}</span>
            <button
              onClick={handleNextMonth}
              className="hover:text-blue-600 p-0.5 rounded transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
          <span>S</span>
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
          <span>S</span>
        </div>

        {/* Dynamic Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {calendarCells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-9 w-9 mx-auto"></div>;
            }

            const dayEvents = getEventForDay(day);
            const isToday = isCurrentMonthToday && day === todayDateNum;
            const hasEvents = dayEvents.length > 0;

            let bgStyle = "text-gray-700 hover:bg-gray-100";
            if (isToday) {
              bgStyle = "bg-blue-600 text-white font-black shadow-xs ring-2 ring-blue-300";
            } else if (hasEvents) {
              const primaryCat = dayEvents[0].category;
              bgStyle = `${getCategoryDotColor(primaryCat)} text-white font-bold shadow-xs`;
            }

            return (
              <div
                key={`day-${day}`}
                className={`h-9 w-9 mx-auto flex flex-col items-center justify-center rounded-full transition-all cursor-pointer relative ${bgStyle}`}
                title={
                  hasEvents
                    ? `${dayEvents.length} Event(s): ${dayEvents.map((e) => e.name).join(", ")}`
                    : isToday
                    ? "Today's Date"
                    : undefined
                }
              >
                <span>{day}</span>
              </div>
            );
          })}
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-medium text-gray-600 mt-6 pt-4 border-t border-gray-100 gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            Hackathon
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Sports
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Fresher
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            TechConf
          </span>
        </div>
      </div>

      {/* Right Column: Quick Register Widget */}
      <div className="lg:col-span-7 bg-gradient-to-br from-purple-50/60 to-indigo-50/40 p-6 md:p-8 rounded-2xl border border-purple-100 shadow-md flex flex-col justify-between h-full min-h-[320px]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-blue-600 text-white rounded-lg">
              <ArrowDown className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Register for an Event</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Event Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as EventCategory);
                  setSelectedEventId("");
                }}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm text-gray-800 shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Choose Category --</option>
                {eventCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Event</label>
              <select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                disabled={!selectedCategory}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm text-gray-800 shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:opacity-60"
              >
                <option value="">-- Select Event --</option>
                {eventsList.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.name} ({evt.displayDate || evt.date})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 mb-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {selectedEventObj
              ? `Ready to join ${selectedEventObj.name}?`
              : "Choose an event category and event to begin"}
          </p>

          <Button
            onClick={() => {
              if (selectedEventObj) {
                onRegisterClick(selectedEventObj);
              } else {
                onRegisterClick(null, selectedCategory || undefined);
              }
            }}
            className="w-full md:w-auto px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all hover:scale-102"
          >
            {selectedEventObj ? `Register for ${selectedEventObj.name}` : "Proceed to Register"}
          </Button>
        </div>
      </div>
    </div>
  );
}
