import type { EmailState } from "@/lib/types/email";

export function createDefaultEmailState(): EmailState {
  return {
    from: { name: "Jane Doe", email: "jane@example.com" },
    to: ["you@example.com"],
    subject: "Project Update - Q1 Review",
    body: "Hi,\n\nI wanted to share the latest updates on our project. We've made significant progress this quarter and I'd love to schedule a call to discuss next steps.\n\nBest regards,\nJane",
    timestamp: "Mar 15, 2026, 9:30 AM",
    read: false,
    starred: false,
    folder: "inbox",
    darkMode: false,
    deviceFrame: "iphone",
    view3d: false,
  };
}
