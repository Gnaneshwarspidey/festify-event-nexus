import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_CREDENTIALS, checkIsAdmin } from "@/utils/eventsData";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck, User, Mail, Lock, Sparkles, UserPlus, LogIn } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
  onLoginSuccess: (user: { name: string; email: string; isAdmin: boolean }) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  onLoginSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please enter email and password.",
        variant: "destructive",
      });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if logging in as Team Admin
    const adminMatch = ADMIN_CREDENTIALS.find(
      (a) => a.email.toLowerCase() === cleanEmail
    );

    if (mode === "login") {
      if (adminMatch) {
        if (adminMatch.password === password) {
          const userObj = {
            name: adminMatch.name,
            email: adminMatch.email,
            isAdmin: true,
          };
          localStorage.setItem("eventhub_current_user", JSON.stringify(userObj));
          onLoginSuccess(userObj);
          toast({
            title: "⚡ Admin Access Granted",
            description: `Welcome back Team Creator ${adminMatch.name}! Full add/edit/delete privileges active.`,
          });
          onClose();
          return;
        } else {
          toast({
            title: "Invalid Admin Password",
            description: "Incorrect password for Team Nexus Admin account.",
            variant: "destructive",
          });
          return;
        }
      }

      // Check regular registered users from LocalStorage
      const usersList: Array<{ name: string; email: string; pass: string }> = JSON.parse(
        localStorage.getItem("eventhub_registered_users") || "[]"
      );
      const registeredUser = usersList.find(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      if (registeredUser) {
        if (registeredUser.pass === password) {
          const userObj = {
            name: registeredUser.name,
            email: registeredUser.email,
            isAdmin: false,
          };
          localStorage.setItem("eventhub_current_user", JSON.stringify(userObj));
          onLoginSuccess(userObj);
          toast({
            title: "Welcome Back!",
            description: `Logged in as ${registeredUser.name}`,
          });
          onClose();
          return;
        } else {
          toast({
            title: "Incorrect Password",
            description: "Please check your password and try again.",
            variant: "destructive",
          });
          return;
        }
      }

      // Fallback for general quick user login
      const defaultName = cleanEmail.split("@")[0];
      const userObj = {
        name: defaultName,
        email: cleanEmail,
        isAdmin: false,
      };
      localStorage.setItem("eventhub_current_user", JSON.stringify(userObj));
      onLoginSuccess(userObj);
      toast({
        title: "Signed In Successfully",
        description: `Welcome ${defaultName}`,
      });
      onClose();
    } else {
      // SIGN UP FLOW
      if (!name) {
        toast({
          title: "Name Required",
          description: "Please enter your full name for sign up.",
          variant: "destructive",
        });
        return;
      }

      const usersList: Array<{ name: string; email: string; pass: string }> = JSON.parse(
        localStorage.getItem("eventhub_registered_users") || "[]"
      );

      if (usersList.some((u) => u.email.toLowerCase() === cleanEmail)) {
        toast({
          title: "Account Exists",
          description: "This email is already registered. Please click Log In.",
          variant: "destructive",
        });
        setMode("login");
        return;
      }

      // Save new registered user
      const newUser = { name, email: cleanEmail, pass: password };
      localStorage.setItem("eventhub_registered_users", JSON.stringify([...usersList, newUser]));

      const userObj = {
        name,
        email: cleanEmail,
        isAdmin: checkIsAdmin(cleanEmail, password),
      };
      localStorage.setItem("eventhub_current_user", JSON.stringify(userObj));
      onLoginSuccess(userObj);

      toast({
        title: "Account Created! 🎉",
        description: `Welcome to EventHub, ${name}!`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
            {mode === "login" ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {mode === "login" ? "Login to EventHub" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            {mode === "login"
              ? "Enter your credentials to access your account or Team Admin controls."
              : "Sign up to explore, register, and track campus events."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {mode === "signup" && (
            <div>
              <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1 mb-1">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Full Name *
              </Label>
              <Input
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border-gray-200"
              />
            </div>
          )}

          <div>
            <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1 mb-1">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              Email Address *
            </Label>
            <Input
              required
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-gray-200"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1 mb-1">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              Password *
            </Label>
            <Input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-gray-200"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl">
            {mode === "login" ? "Log In" : "Sign Up"}
          </Button>

          <div className="pt-2 text-center text-xs text-gray-600 border-t border-gray-100 flex items-center justify-between">
            <span>{mode === "login" ? "New to EventHub?" : "Already have an account?"}</span>
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-blue-600 hover:underline font-bold"
            >
              {mode === "login" ? "Sign up here" : "Log in here"}
            </button>
          </div>

          <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-[11px] text-blue-900 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Team Admin Access (Gnaneshwar, Ram Sharma, Ganesh):
            </p>
            <p className="text-[10px] text-blue-700">
              Log in with team email & admin password to gain full add, edit, & delete control over events.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
