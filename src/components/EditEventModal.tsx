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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EventOption, eventCategories, EventCategory, updateExistingEvent } from "@/utils/eventsData";
import { toast } from "@/hooks/use-toast";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit: EventOption | null;
}

export default function EditEventModal({
  isOpen,
  onClose,
  eventToEdit,
}: EditEventModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<EventCategory>("Hackathon");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setName(eventToEdit.name);
      setCategory(eventToEdit.category);
      setDescription(eventToEdit.description);
      setDate(eventToEdit.date);
      setTime(eventToEdit.time);
      setVenue(eventToEdit.venue);
    }
  }, [eventToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventToEdit) return;

    const updated: EventOption = {
      ...eventToEdit,
      name,
      category,
      description,
      date,
      displayDate: date,
      time,
      venue,
    };

    updateExistingEvent(updated);

    toast({
      title: "Event Updated ✏️",
      description: `Successfully updated "${name}".`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Edit Event Details</DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Admin privileges active. Modify fields below to update this event.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-xs font-semibold text-gray-700">Event Name</Label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-gray-700">Event Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
              className="w-full mt-1 border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {eventCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-xs font-semibold text-gray-700">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold text-gray-700">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-700">Time</Label>
              <Input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold text-gray-700">Location / Venue</Label>
            <Input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="mt-1"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
