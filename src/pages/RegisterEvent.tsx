import { useState } from "react";
import NavBar from "@/components/NavBar";
import EventForm from "@/components/EventForm";
import { useNavigate } from "react-router-dom";

export default function RegisterEvent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/60 via-indigo-50/70 to-purple-100/80 flex flex-col">
      <NavBar
        activeTab="add"
        setActiveTab={() => navigate("/")}
      />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <EventForm onSuccess={() => navigate("/")} />
      </div>
    </div>
  );
}
