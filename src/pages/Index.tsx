import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import EventHighlights from "@/components/EventHighlights";
import CalendarView from "@/components/CalendarView";
import EventForm from "@/components/EventForm";
import TeamShowcase from "@/components/TeamShowcase";
import RegisterModal from "@/components/RegisterModal";
import AuthModal from "@/components/AuthModal";
import EditEventModal from "@/components/EditEventModal";
import { EventOption, TEAM_MEMBERS } from "@/utils/eventsData";
import { Button } from "@/components/ui/button";
import { Calendar, ShieldCheck, ArrowRight, Lock } from "lucide-react";

interface UserState {
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<"discover" | "add" | "team">("discover");
  const [welcomeMode, setWelcomeMode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserState | null>(() => {
    try {
      const saved = localStorage.getItem("eventhub_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventOption | null>(null);
  const [defaultCategoryForModal, setDefaultCategoryForModal] = useState<string | undefined>(undefined);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<EventOption | null>(null);

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleOpenRegisterModal = (event?: EventOption | null, category?: string) => {
    setSelectedEventForModal(event || null);
    setDefaultCategoryForModal(category);
    setIsRegisterOpen(true);
  };

  const handleOpenEditModal = (event: EventOption) => {
    setEventToEdit(event);
    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/60 via-indigo-50/70 to-purple-100/80 text-gray-900 flex flex-col font-sans">
      {/* Header Navigation */}
      <NavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        welcomeMode={welcomeMode}
        setWelcomeMode={setWelcomeMode}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content */}
      {welcomeMode ? (
        <section className="flex-1 flex flex-col items-center justify-center text-center p-6 my-12 relative">
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full text-blue-600 font-bold text-sm shadow-sm border border-blue-100">
              <Calendar className="w-5 h-5 text-blue-600" />
              EventHub
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 drop-shadow-xs">
              Welcome to EventHub
            </h1>

            <p className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto">
              Discover 10+ scheduled campus events, register instantly, and manage dates with team creator security.
            </p>

            <div className="pt-4">
              <Button
                size="lg"
                onClick={() => setWelcomeMode(false)}
                className="px-8 py-6 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Go to EventHub Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
          {activeTab === "discover" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Top Announcement Banner */}
              <div className="py-6 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                    Discover, Register & Never Miss an Event!
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 max-w-3xl leading-relaxed">
                    Seamless event experience: Explore 10+ events scheduled across Hackathons, Sports, Tech Conferences and Fresher's Parties.
                  </p>
                </div>

                {!currentUser?.isAdmin && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-center gap-2.5 shrink-0 max-w-xs">
                    <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-bold block">Team Creator Protected</span>
                      <span>Only Gnaneshwar, Ram Sharma & Ganesh can Add/Edit/Delete events.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Highlights & 10+ Events List */}
              <EventHighlights
                onRegisterClick={handleOpenRegisterModal}
                isAdmin={!!currentUser?.isAdmin}
                onEditClick={handleOpenEditModal}
              />

              {/* Side-by-side: Event Calendar & Quick Registration Widget */}
              <CalendarView onRegisterClick={handleOpenRegisterModal} />

              {/* Team Showcase */}
              <div className="mt-12">
                <TeamShowcase />
              </div>
            </div>
          )}

          {activeTab === "add" && (
            <div className="py-6 animate-in fade-in duration-300">
              {currentUser?.isAdmin ? (
                <EventForm onSuccess={() => setActiveTab("discover")} />
              ) : (
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-amber-200 shadow-xl text-center space-y-4">
                  <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Admin Privileges Required</h3>
                  <p className="text-sm text-gray-600">
                    Only Team Nexus creators (<strong>GNANESHWAR</strong>, <strong>RAM SHARMA</strong>, <strong>GANESH</strong>) can add or modify events.
                  </p>
                  <Button
                    onClick={() => handleOpenAuth("login")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold py-3"
                  >
                    Log In with Team Admin Credentials
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "team" && (
            <div className="py-6 animate-in fade-in duration-300">
              <TeamShowcase />
            </div>
          )}
        </main>
      )}

      {/* Auth Modal for Sign Up & Login */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Global Interactive Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        selectedEvent={selectedEventForModal}
        defaultCategory={defaultCategoryForModal}
      />

      {/* Edit Event Modal for Team Admins */}
      <EditEventModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        eventToEdit={eventToEdit}
      />

      {/* Footer */}
      <footer className="w-full bg-white/80 backdrop-blur-md border-t border-gray-200/80 py-6 px-4 text-center mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p className="font-medium">
            © 2025 EventHub. Connect · Network · Create Memories.
          </p>

          <div className="flex items-center gap-1.5 font-medium text-gray-700">
            <span>Team Creators:</span>
            <span className="font-bold text-blue-600">GNANESHWAR</span> ·
            <span className="font-bold text-indigo-600">RAM SHARMA</span> ·
            <span className="font-bold text-purple-600">GANESH</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
