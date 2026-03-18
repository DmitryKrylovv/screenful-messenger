export interface Contact {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface Message {
  id: string;
  text: string;
  time: string;
  incoming: boolean;
  sender?: string;
}

export const contacts: Contact[] = [
  { id: "1", name: "Design Sync", initials: "DS", lastMessage: "The grid system is ready for review", time: "14:02", unread: 3, online: true },
  { id: "2", name: "Alex Morozov", initials: "AM", lastMessage: "Sent you the updated specs", time: "13:41", unread: 1, online: true },
  { id: "3", name: "Infrastructure", initials: "IN", lastMessage: "Deploy completed successfully", time: "12:58", unread: 0, online: false },
  { id: "4", name: "Kira Tanaka", initials: "KT", lastMessage: "Can we sync on the API later?", time: "12:30", unread: 0, online: true },
  { id: "5", name: "Platform Team", initials: "PT", lastMessage: "New monitoring dashboard is live", time: "11:45", unread: 0, online: false },
  { id: "6", name: "Erik Lindström", initials: "EL", lastMessage: "Typography tokens look clean", time: "11:02", unread: 0, online: false },
  { id: "7", name: "Security Alerts", initials: "SA", lastMessage: "0 vulnerabilities detected", time: "10:30", unread: 0, online: false },
  { id: "8", name: "Mira Patel", initials: "MP", lastMessage: "Pushed the final commit", time: "09:15", unread: 0, online: true },
];

export const messages: Message[] = [
  { id: "1", text: "Hey, I've finished the monochrome token set for the design system.", time: "13:42", incoming: true, sender: "DS" },
  { id: "2", text: "Great. Did you include the surface hierarchy tokens?", time: "13:44", incoming: false },
  { id: "3", text: "Yes — surface-low, surface-mid, and the border-fine opacity token. All mapped to HSL.", time: "13:45", incoming: true, sender: "DS" },
  { id: "4", text: "The grid system is ready for review. 4-column layout with fixed widths on nav and context panels.", time: "13:48", incoming: true, sender: "DS" },
  { id: "5", text: "Perfect. I'll review the spacing scale next. Are we using 4px base?", time: "13:50", incoming: false },
  { id: "6", text: "Yes, strict 4px grid. Body text is 13px/1.5 with -0.01em tracking.", time: "13:52", incoming: true, sender: "DS" },
  { id: "7", text: "Clean. Let me check the contrast ratios on the muted foreground.", time: "13:55", incoming: false },
  { id: "8", text: "Already verified — 4.6:1 on white, passes AA. The inverted active state is 21:1.", time: "13:57", incoming: true, sender: "DS" },
  { id: "9", text: "Ship it.", time: "14:02", incoming: false },
];

export const sharedMedia = [
  { id: "1", label: "grid-system-v3.fig" },
  { id: "2", label: "token-mapping.json" },
  { id: "3", label: "contrast-audit.pdf" },
  { id: "4", label: "component-spec.md" },
];

export const contactDetails = {
  name: "Design Sync",
  initials: "DS",
  members: 4,
  messageCount: "1,248",
  sharedSize: "4.2 GB",
  status: "Encrypted",
};
