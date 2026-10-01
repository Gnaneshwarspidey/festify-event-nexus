import { useState } from "react";
import { eventCategories, EventCategory, saveNewEvent } from "@/utils/eventsData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Calendar, Tag, FileText, Clock, MapPin, Sparkles } from "lucide-react";

interface EventFormProps {
  onSuccess?: () => void;
}

export default function EventForm({ onSuccess }: EventFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<EventCategory | "">("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !date || !time || !venue) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields marked with *.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Save event locally
    const created = saveNewEvent({
      name,
      category: category as EventCategory,
      description,
      date,
      time,
      venue,
      tags: [category],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    });

    toast({
      title: "Event Created Successfully! 🚀",
      description: `"${created.name}" has been added to EventHub.`,
    });

    setIsSubmitting(false);

    // Clear form
    setName("");
    setCategory("");
    setDescription("");
    setDate("");
    setTime("");
    setVenue("");

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-purple-100">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
            <p className="text-xs text-gray-500">Publish your event to the EventHub community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Name */}
          <div>
            <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1 mb-1.5">
              Event Name <span className="text-red-500">*</span>
            </Label>
            <Input
              required
              placeholder="Enter event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Event Category */}
          <div>
            <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              Event Category <span className="text-red-500">*</span>
            </Label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
              className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              {eventCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Event Description */}
          <div>
            <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Event Description
            </Label>
            <Textarea
              placeholder="Describe the event and its purpose..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Event Date <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Event Time <span className="text-red-500">*</span>
              </Label>
              <Input
                required
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Event Location <span className="text-red-500">*</span>
            </Label>
            <Input
              required
              placeholder="Enter venue/location"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all mt-4"
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </Button>
        </form>
      </div>
    </div>
  );
}
