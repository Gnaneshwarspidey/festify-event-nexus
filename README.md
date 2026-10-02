##  Live Demo

🔗 **Live URL**: https://festify-event-nexus.vercel.app/

# EventHub — Festify EventNexus

<div align="center">


**Discover, Register & Never Miss an Event!**  
*A modern, interactive campus event discovery, scheduling, and registration platform built with React, TypeScript, Vite, and Tailwind CSS.*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-0070F3?style=for-the-badge&logo=vercel&logoColor=white)](https://festify-event-nexus.vercel.app/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>



## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [12 Event Categories](#-12-event-categories)
- [Team Nexus Creators](#-team-nexus-creators)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Role-Based Access Control (RBAC)](#-role-based-access-control-rbac)
- [Email Notification System](#-email-notification-system)
- [Project Structure](#-project-structure)
- [License](#-license)



##  Overview

**EventHub** is an all-in-one web portal engineered for colleges, universities, and student communities to discover, register for, and manage campus events seamlessly. 

The platform features:
- **Dynamic Real-Time Scheduling**: All upcoming events dynamically anchor to the current date, guaranteeing that whenever anyone opens the application, active and upcoming events are always presented chronologically.
- **Instant Registration & Invoice Delivery**: Attendees receive an immediate confirmation with an event pass ID (`EVH-XXXXXX`), while registration details are automatically dispatched to the creators.
- **Creator-Exclusive Control**: Role-based access ensures only authorized team administrators can create, edit, or delete events.



##  Key Features

 **Dynamic Date Engine**: Automatically calculates and displays upcoming dates starting from the current day onwards (`Today + 1 day`, `Today + 3 days`, etc.).
 **Interactive Campus Calendar**: Dynamic monthly view with color-coded dot legends representing each category, supporting forward and backward month navigation.
 **12 Broad Event Categories**: Comprehensive filtering for technical, cultural, gaming, athletic, and entrepreneurship fests.
 **Modal-Based Quick Registration**: Clean, responsive registration dialog with live category and event selection.
 **Automated Team Email Invoices**: Real-time email dispatch to all 3 team members on every participant submission via EmailJS.
 **Role-Based Admin Access (RBAC)**: Secure admin mode restricted exclusively to the 3 Team Nexus creators.
 **Participant Authentication**: Built-in Sign Up and Login flow for attendees with local persistence.
 **Responsive UI/UX**: Built with shadcn/ui primitives, Tailwind CSS styling, animated transitions, and toast alerts.



##  12 Event Categories

| # | Category | Focus Area |
|:---|:---|:---|
| 1 | 💻 **Hackathon** | 24–48 Hour Coding Sprints, AI Innovations & Buildathons |
| 2 | ⚽ **Sports** | Inter-College Athletic Tournaments & Night Leagues |
| 3 | 🥳 **Fresher's Party** | Welcome Galas, Live DJ Nights & Musical Celebrations |
| 4 | 🎤 **Tech Conference** | Industry Keynotes, Developer Summits & Tech Talks |
| 5 | 🤖 **Robotics & AI Expo** | Combat Bot Wars, Autonomous Drone Sprints & Hardware Demos |
| 6 | 💃 **Cultural Fest** | Battle of the Bands, Group Dance, Drama & Fashion Runways |
| 7 | 🎮 **Gaming & E-Sports** | Valorant, BGMI, FIFA & LAN Gaming Tournaments |
| 8 | 🛠️ **Workshops & Seminars** | Hands-on Masterclasses, Cloud & Web3 Architectures |
| 9 | 📄 **Paper Presentation** | IEEE & International Journal Technical Research Papers |
| 10 | 🚀 **Entrepreneurship & E-Cell** | Startup Pitching, Shark Tank Competitions & Angel Funding |
| 11 | 🎨 **Art & Photography** | Live Canvas Painting, Digital Art & 3-Hour Photo Hunts |
| 12 | 🗣️ **Literary & Debating** | Model UN, Parliamentary Debates & Slam Poetry Contests |



## 👥 Team Nexus Creators

This project was ideated, designed, and developed by a dedicated team of 3 developers:

| Creator | Role | Contact Email |
| :--- | :--- | :--- |
|  **GNANESHWAR** | Project Lead & Full Stack Architect | `kesgirgnaneshwar025@gmail.com` |
|  **RAM SHARMA** | UI/UX Specialist & Frontend Developer | `ramsharma21144@gmail.com` |
|  **GANESH** | Backend Logic & Event Integration | `ganeshd.koyalkar34@gmail.com` |



## 🛠️ Tech Stack

- **Frontend Core**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build System**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
- **Component UI**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Date Management**: [date-fns](https://date-fns.org/)
- **Notifications & Delivery**: [@emailjs/browser](https://www.emailjs.com/) + Sonner / Radix Toaster


##  Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn** / **pnpm** / **bun**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gnaneshwarspidey/festify-event-nexus.git
   cd festify-event-nexus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```


## 🔐 Role-Based Access Control (RBAC)

Administrative controls are secured and reserved exclusively for Team Nexus:

- **Team Admin Privileges**:
  - Add new events with custom date, time, venue, description, and category.
  - Edit and modify existing event information in real-time.
  - Delete events with confirmation prompts.
  - Active admin indicator badge in the navigation bar.
- **Attendee / Participant Privileges**:
  - Explore all 12 categories and view 10+ chronologically sorted events.
  - Search and filter by category or date.
  - Register for any event and receive an instant registration invoice.


##  Email Notification System

Every participant registration triggers an automated notification to all 3 creators via EmailJS:

```text
Participant registers on EventHub
              ↓
  Registration saved to LocalStorage
              ↓
  Unique Registration ID (EVH-XXXXXX) generated
              ↓
  EmailJS dispatches invoice to:
    • kesgirgnaneshwar025@gmail.com
    • ramsharma21144@gmail.com
    • ganeshd.koyalkar34@gmail.com
```


## 📁 Project Structure

```text
festify-event-nexus/
├── public/                      # Static assets & icons
├── src/
│   ├── components/              # Reusable React UI components
│   │   ├── ui/                  # shadcn/ui components (Dialog, Button, Input, etc.)
│   │   ├── AuthModal.tsx        # Sign Up & Login dialog
│   │   ├── CalendarView.tsx     # Interactive calendar & quick register card
│   │   ├── EditEventModal.tsx   # Admin event editing modal
│   │   ├── EventForm.tsx        # Create event form (Admin only)
│   │   ├── EventHighlights.tsx  # Featured cards & 12 category spotlights
│   │   ├── NavBar.tsx           # Navigation bar with inline auth & RBAC
│   │   ├── RegisterModal.tsx    # Participant registration & invoice generator
│   │   └── TeamShowcase.tsx     # Team Nexus credits component
│   ├── hooks/                   # Custom React hooks (toast, mobile detection)
│   ├── pages/                   # Application pages (Index, RegisterEvent, NotFound)
│   ├── utils/
│   │   ├── eventsData.ts        # 12 categories, dynamic dates & event data store
│   │   └── emailService.ts      # EmailJS team notification integration
│   ├── App.tsx                  # Main router setup
│   ├── index.css                # Tailwind design system tokens
│   └── main.tsx                 # React application entrypoint
├── index.html                   # HTML entrypoint
├── package.json                 # Project dependencies and npm scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite build configuration
```


## 📄 License

Developed by **Team Nexus** (Gnaneshwar, Ram Sharma, Ganesh).  
© 2025–2026 EventHub. Connect · Network · Create Memories.
