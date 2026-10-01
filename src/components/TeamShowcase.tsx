import { TEAM_MEMBERS } from "@/utils/eventsData";
import { Mail, Users, Award, ShieldCheck, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function TeamShowcase() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast({
      title: "Email Copied!",
      description: `Copied ${email} to clipboard.`,
    });
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <section className="w-full max-w-5xl mx-auto py-8 px-4">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 -mr-10 -mt-10">
          <Users className="w-64 h-64" />
        </div>
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4 text-yellow-300" />
          Project Creators & Team
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
          Meet Team Nexus
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base">
          Engineered with passion by a dedicated group of 3 developers for EventHub — bringing seamless event discovery, interactive registration, and real-time management to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg mb-4 group-hover:scale-105 transition-transform">
              {member.initials}
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Team Member #{index + 1}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-xs text-gray-500 font-medium mb-4">{member.role}</p>

            <div className="w-full mt-auto pt-4 border-t border-gray-100 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded-lg w-full justify-between border border-gray-200">
                <span className="truncate flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  {member.email}
                </span>
                <button
                  onClick={() => handleCopy(member.email)}
                  className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-blue-600 transition-colors shrink-0"
                  title="Copy email"
                >
                  {copiedEmail === member.email ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
