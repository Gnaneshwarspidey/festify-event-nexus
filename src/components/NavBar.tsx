import { useState, useEffect } from "react";
import { Calendar, ShieldCheck, LogOut, Sparkles, UserCheck, Plus, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ADMIN_CREDENTIALS, checkIsAdmin } from "@/utils/eventsData";

interface UserState {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface NavBarProps {
  activeTab: "discover" | "add" | "team";
  setActiveTab: (tab: "discover" | "add" | "team") => void;
  welcomeMode?: boolean;
  setWelcomeMode?: (val: boolean) => void;
  currentUser: UserState | null;
  setCurrentUser: (user: UserState | null) => void;
  onOpenAuth: (mode: "login" | "signup") => void;
}

export default function NavBar({
  activeTab,
  setActiveTab,
  welcomeMode = false,
  setWelcomeMode,
  currentUser,
  setCurrentUser,
  onOpenAuth,
}: NavBarProps) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleInlineLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      onOpenAuth("login");
      return;
    }

    const cleanEmail = emailInput.trim().toLowerCase();
    const adminMatch = ADMIN_CREDENTIALS.find((a) => a.email.toLowerCase() === cleanEmail);

    if (adminMatch) {
      if (adminMatch.password === passwordInput) {
        const userObj = { name: adminMatch.name, email: adminMatch.email, isAdmin: true };
        localStorage.setItem("eventhub_current_user", JSON.stringify(userObj));
        setCurrentUser(userObj);
        toast({
          title: "⚡ Admin Access Granted",
          description: `Welcome Team Creator ${adminMatch.name}! You can now Add, Edit & Delete events.`,
        });
        setEmailInput("");
        setPasswordInput("");
        return;
      } else {
        toast({
          title: "Incorrect Admin Password",
          description: "Incorrect password for Team Nexus Admin account.",
          variant: "destructive",
        });
        return;
      }
    }

    // Regular User login
    const defaultName = cleanEmail.split("@")[0];
    const userObj = { name: defaultName, email: cleanEmail, isAdmin: false };
    localStorage.setItem("eventhub_current_user", JSON.stringify(userObj));
    setCurrentUser(userObj);
    toast({
      title: "Welcome to EventHub",
      description: `Logged in as ${defaultName}`,
    });
    setEmailInput("");
    setPasswordInput("");
  };

  const handleLogout = () => {
    localStorage.removeItem("eventhub_current_user");
    setCurrentUser(null);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const handleAddTabClick = () => {
    if (!currentUser?.isAdmin) {
      toast({
        title: "🔒 Admin Privileges Required",
        description: "Only Team Nexus creators (Gnaneshwar, Ram Sharma, Ganesh) can add, alter, or delete events.",
        variant: "destructive",
      });
      onOpenAuth("login");
      return;
    }
    if (setWelcomeMode) setWelcomeMode(false);
    setActiveTab("add");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-xs sticky top-0 z-40">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => {
            if (setWelcomeMode) setWelcomeMode(false);
            setActiveTab("discover");
          }}
          className="flex items-center gap-2 text-2xl font-black text-blue-600 cursor-pointer tracking-tight group"
        >
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
            <Calendar className="h-6 w-6" />
          </div>
          <span>EventHub</span>
        </div>

        {/* Header Right: User Account Status */}
        <div>
          {currentUser ? (
            <div className="flex items-center gap-3 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-200">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase ${
                  currentUser.isAdmin ? "bg-amber-600" : "bg-blue-600"
                }`}
              >
                {currentUser.name.slice(0, 2)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  {currentUser.name}
                </span>
                {currentUser.isAdmin ? (
                  <span className="text-[10px] font-extrabold text-amber-700 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-600" />
                    Team Creator Admin
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-500 font-medium">Student / Guest</span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors ml-1 rounded-full hover:bg-gray-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleInlineLogin} className="flex flex-wrap items-center gap-2 text-xs">
              <Input
                type="email"
                placeholder="Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="h-8 w-32 md:w-40 text-xs bg-gray-50 border-gray-200 rounded-md focus:bg-white"
              />
              <Input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="h-8 w-32 md:w-40 text-xs bg-gray-50 border-gray-200 rounded-md focus:bg-white"
              />
              <Button
                type="submit"
                size="sm"
                className="h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                <LogIn className="w-3.5 h-3.5 mr-1" />
                Login
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenAuth("signup")}
                className="h-8 px-3 text-xs border-gray-300 font-medium rounded-md"
              >
                <UserPlus className="w-3.5 h-3.5 mr-1 text-blue-600" />
                Sign Up
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Sub-header Navigation Tabs */}
      <div className="bg-gray-100/80 border-t border-gray-200/60 px-4 md:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (setWelcomeMode) setWelcomeMode(false);
                setActiveTab("discover");
              }}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "discover" && !welcomeMode
                  ? "bg-white text-gray-900 shadow-xs border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              Discover Events (10+)
            </button>
            <button
              onClick={handleAddTabClick}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "add" && !welcomeMode
                  ? "bg-white text-gray-900 shadow-xs border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <Plus className="w-4 h-4 text-blue-600" />
              Add Event
              {!currentUser?.isAdmin && <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">Admin</span>}
            </button>
            <button
              onClick={() => {
                if (setWelcomeMode) setWelcomeMode(false);
                setActiveTab("team");
              }}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "team" && !welcomeMode
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs"
                  : "text-blue-700 bg-blue-50/80 hover:bg-blue-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Team Nexus
            </button>
          </div>

          <div className="text-xs text-gray-500 font-medium hidden md:block">
            {currentUser?.isAdmin ? (
              <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Team Admin Mode Active
              </span>
            ) : (
              <span>Only Team Nexus Creators can add / edit / delete events</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
