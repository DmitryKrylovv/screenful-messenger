export interface Contact {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export type MessageType = "text" | "voice" | "image" | "file" | "link" | "location";

export interface Message {
  id: string;
  text: string;
  time: string;
  incoming: boolean;
  sender?: string;
  type?: MessageType;
  voiceDuration?: number;
  voiceTranscript?: string;
  imageUrl?: string;
  imageUrls?: string[];
  fileName?: string;
  fileSize?: string;
  fileExt?: string;
  linkUrl?: string;
  linkTitle?: string;
  linkDescription?: string;
  linkDomain?: string;
  locationName?: string;
  locationAddress?: string;
  locationLat?: number;
  locationLng?: number;
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
  {
    id: "3",
    text: "",
    time: "13:45",
    incoming: true,
    sender: "DS",
    type: "image",
    imageUrls: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop",
    ],
  },
  {
    id: "4",
    text: "",
    time: "13:46",
    incoming: true,
    sender: "DS",
    type: "file",
    fileName: "token-mapping.json",
    fileSize: "24 KB",
    fileExt: "json",
  },
  { id: "5", text: "Yes — surface-low, surface-mid, and the border-fine opacity token. All mapped to HSL.", time: "13:47", incoming: true, sender: "DS" },
  { id: "6", text: "The grid system is ready for review. 4-column layout with fixed widths on nav and context panels.", time: "13:48", incoming: true, sender: "DS" },
  { id: "7", text: "Perfect. I'll review the spacing scale next. Are we using 4px base?", time: "13:50", incoming: false },
  {
    id: "8",
    text: "",
    time: "13:51",
    incoming: false,
    type: "link",
    linkUrl: "https://figma.com/design-system",
    linkTitle: "Design System — Figma",
    linkDescription: "Complete monochrome design system with tokens, components, and layout grid.",
    linkDomain: "figma.com",
  },
  { id: "9", text: "Yes, strict 4px grid. Body text is 13px/1.5 with -0.01em tracking.", time: "13:52", incoming: true, sender: "DS" },
  {
    id: "10",
    text: "",
    time: "13:53",
    incoming: true,
    sender: "DS",
    type: "voice",
    voiceDuration: 12,
    voiceTranscript: "I've also updated the contrast ratios. Everything passes AA now, and the inverted active state hits 21:1.",
  },
  { id: "11", text: "Clean. Let me check the contrast ratios on the muted foreground.", time: "13:55", incoming: false },
  {
    id: "12",
    text: "",
    time: "13:56",
    incoming: true,
    sender: "DS",
    type: "file",
    fileName: "contrast-audit.pdf",
    fileSize: "1.2 MB",
    fileExt: "pdf",
  },
  {
    id: "13",
    text: "",
    time: "13:58",
    incoming: false,
    type: "location",
    locationName: "Studio 4B",
    locationAddress: "Kungsholmen 12, Stockholm",
    locationLat: 59.3293,
    locationLng: 18.0686,
  },
  { id: "14", text: "Let's meet here to review the final tokens.", time: "13:59", incoming: false },
  { id: "15", text: "Ship it.", time: "14:02", incoming: false },
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
