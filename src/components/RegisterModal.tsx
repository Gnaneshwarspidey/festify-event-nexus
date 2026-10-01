import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EventOption, eventCategories, getEventsByCategory } from "@/utils/eventsData";
import { toast } from "@/hooks/use-toast";
import { Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent?: EventOption | null;
  defaultCategory?: string;
}

export default function RegisterModal({
  isOpen,
  onClose,
  selectedEvent: initialEvent,
  defaultCategory,
}: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [category, setCategory] = useState(defaultCategory || initialEvent?.category || "Hackathon");
  const [selectedEventId, setSelectedEventId] = useState<string>(initialEvent?.id || "");
  const [availableEvents, setAvailableEvents] = useState<EventOption[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialEvent) {
      setCategory(initialEvent.category);
      setSelectedEventId(initialEvent.id);
    } else if (defaultCategory) {
      setCategory(defaultCategory as any);
    }
  }, [initialEvent, defaultCategory, isOpen]);

  useEffect(() => {
    if (category) {
      const events = getEventsByCategory(category as any);
      setAvailableEvents(events);
      if (!initialEvent && events.length > 0 && !events.some((e) => e.id === selectedEventId)) {
        setSelectedEventId(events[0].id);
      }
    }
  }, [category, initialEvent, selectedEventId]);

  const activeEvent = initialEvent || availableEvents.find((e) => e.id === selectedEventId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const regData = {
      name,
      email,
      mobile,
      event: activeEvent?.name || "Event",
      eventId: activeEvent?.id,
      category,
      date: new Date().toISOString(),
    };

    // Save registration to LocalStorage
    const existing = JSON.parse(localStorage.getItem("eventhub_registrations") || "[]");
    localStorage.setItem("eventhub_registrations", JSON.stringify([regData, ...existing]));

    setIsSubmitted(true);
    toast({
      title: "Registration Successful! 🎉",
      description: `Registered for ${activeEvent?.name || "Event"}`,
    });
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setMobile("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl">
        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">Registration Confirmed!</DialogTitle>
            <DialogDescription className="text-sm text-gray-600 max-w-xs">
              Thank you <span className="font-semibold text-gray-900">{name}</span>! Your spot for{" "}
              <span className="font-semibold text-blue-600">{activeEvent?.name}</span> has been successfully reserved.
            </DialogDescription>
            <div className="bg-blue-50 p-4 rounded-xl text-left text-xs text-blue-900 space-y-1 w-full border border-blue-100 mt-2">
              <p><strong>Venue:</strong> {activeEvent?.venue}</p>
              <p><strong>Time:</strong> {activeEvent?.displayDate || activeEvent?.date} at {activeEvent?.time}</p>
              <p><strong>Confirmation Email:</strong> Sent to {email}</p>
            </div>
            <Button onClick={handleResetAndClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-4">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">Register for Event</DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Complete the details below to secure your entry pass.
              </DialogDescription>
            </DialogHeader>

            {activeEvent && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  {activeEvent.category}
                </span>
                <h4 className="text-base font-bold text-gray-900 mt-1">{activeEvent.name}</h4>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {activeEvent.displayDate || activeEvent.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {activeEvent.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    {activeEvent.venue}
                  </span>
                </div>
              </div>
            )}

            {!initialEvent && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold text-gray-700">Select Event Category</Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {eventCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700">Select Event</Label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full mt-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {availableEvents.map((evt) => (
                      <option key={evt.id} value={evt.id}>
                        {evt.name} ({evt.date})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <div>
                <Label className="text-xs font-semibold text-gray-700">Full Name *</Label>
                <Input
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700">Email Address *</Label>
                <Input
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700">Mobile Number *</Label>
                <Input
                  required
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                  className="mt-1"
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleResetAndClose} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6">
                Confirm Registration
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
