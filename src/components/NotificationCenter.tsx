
import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { eventOptions } from "@/utils/eventsData";

type Notification = {
  id: string;
  message: string;
  read: boolean;
};

const mockInitial: Notification[] = [
  {
    id: "1",
    message: "Event Reminder: AI Innovators Hackathon in 2 days.",
    read: false,
  },
  {
    id: "2",
    message: "Campus Football Cup venue changed to Sports Ground.",
    read: false,
  },
  {
    id: "3",
    message: "React Summit 2025: Registration closes soon!",
    read: true,
  },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate fetch, or restore from localStorage
    const saved = localStorage.getItem("notifications");
    setNotifications(saved ? JSON.parse(saved) : mockInitial);
  }, []);

  function handleMarkAsRead(id: string) {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
    toast({
      title: "Notification marked as read",
    });
  }

  function handleMarkAllRead() {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
    toast({
      title: "All notifications marked as read",
    });
  }

  return (
    <section className="max-w-2xl mx-auto py-14">
      <h2 className="text-3xl font-bold flex gap-2 items-center mb-6">
        <Bell className="h-7 w-7 text-primary" />
        User Notifications
        <button
          onClick={handleMarkAllRead}
          className="ml-4 px-3 py-1 bg-primary text-white rounded-full hover:bg-primary/80 shadow transition"
        >
          Mark all as read
        </button>
      </h2>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <div
              key={note.id}
              className={`flex items-center gap-4 border p-4 rounded-lg bg-white shadow-sm ${
                note.read ? "opacity-60" : "bg-yellow-50"
              }`}
            >
              {note.read ? (
                <BellOff className="text-gray-400" />
              ) : (
                <Bell className="text-yellow-400 animate-pulse" />
              )}
              <div className="flex-1 font-medium">{note.message}</div>
              {!note.read && (
                <button
                  onClick={() => handleMarkAsRead(note.id)}
                  className="px-2 py-1 bg-secondary rounded hover:bg-secondary/80"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No notifications.</div>
        )}
      </div>
    </section>
  );
}
