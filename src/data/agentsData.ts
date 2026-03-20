export interface Agent {
  id: string;
  name: string;
  initials: string;
  description: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  model: string;
}

export interface AgentMessage {
  id: string;
  text: string;
  time: string;
  incoming: boolean;
  sender?: string;
}

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Code Assistant",
    initials: "CA",
    description: "Helps with code reviews, debugging, and architecture decisions",
    lastMessage: "Here's the refactored version with better type safety",
    time: "14:12",
    unread: 2,
    online: true,
    model: "GPT-5",
  },
  {
    id: "a2",
    name: "Design Advisor",
    initials: "DA",
    description: "UI/UX feedback, design system guidance, accessibility checks",
    lastMessage: "The contrast ratio on that button needs adjustment",
    time: "13:50",
    unread: 0,
    online: true,
    model: "Gemini Pro",
  },
  {
    id: "a3",
    name: "Data Analyst",
    initials: "DT",
    description: "Queries, visualizations, and insights from your datasets",
    lastMessage: "The conversion rate increased 12% this week",
    time: "12:30",
    unread: 1,
    online: true,
    model: "GPT-5",
  },
  {
    id: "a4",
    name: "Content Writer",
    initials: "CW",
    description: "Blog posts, documentation, marketing copy, and translations",
    lastMessage: "Draft for the release notes is ready",
    time: "11:45",
    unread: 0,
    online: false,
    model: "Gemini Flash",
  },
  {
    id: "a5",
    name: "DevOps Bot",
    initials: "DO",
    description: "CI/CD pipelines, deployment status, infrastructure monitoring",
    lastMessage: "All services are healthy. Uptime: 99.97%",
    time: "10:20",
    unread: 0,
    online: true,
    model: "GPT-5 Mini",
  },
  {
    id: "a6",
    name: "Research Agent",
    initials: "RA",
    description: "Web research, paper summaries, competitive analysis",
    lastMessage: "Found 3 relevant papers on transformer architectures",
    time: "09:15",
    unread: 0,
    online: false,
    model: "Gemini Pro",
  },
];

export const agentMessages: Record<string, AgentMessage[]> = {
  a1: [
    { id: "m1", text: "Can you review this TypeScript utility function?", time: "14:01", incoming: false },
    { id: "m2", text: "Sure, I see a few issues. The generic constraint is too loose — you should use `extends Record<string, unknown>` instead of `any`. Also, the error handling could be more specific.", time: "14:02", incoming: true, sender: "CA" },
    { id: "m3", text: "Good catch. What about performance?", time: "14:05", incoming: false },
    { id: "m4", text: "The recursive call on line 24 could cause a stack overflow with deep objects. Consider using an iterative approach with a queue. I can refactor it for you.", time: "14:06", incoming: true, sender: "CA" },
    { id: "m5", text: "Yes please, go ahead.", time: "14:08", incoming: false },
    { id: "m6", text: "Here's the refactored version with better type safety, iterative traversal, and proper error boundaries. It also handles circular references now.", time: "14:12", incoming: true, sender: "CA" },
  ],
  a2: [
    { id: "m1", text: "What do you think about this card component design?", time: "13:30", incoming: false },
    { id: "m2", text: "The visual hierarchy is good, but I'd suggest increasing the padding from 12px to 16px for better breathing room. The font size contrast between the title and description could be stronger.", time: "13:32", incoming: true, sender: "DA" },
    { id: "m3", text: "Should I add a subtle shadow or keep it flat?", time: "13:40", incoming: false },
    { id: "m4", text: "A subtle shadow (0 2px 8px rgba(0,0,0,0.06)) would add depth without being heavy. Also, the contrast ratio on that button needs adjustment — it's currently 3.8:1 but should be at least 4.5:1 for AA compliance.", time: "13:50", incoming: true, sender: "DA" },
  ],
  a3: [
    { id: "m1", text: "Pull the weekly metrics for the dashboard.", time: "12:10", incoming: false },
    { id: "m2", text: "Here's the summary:\n• Active users: 2,847 (+8%)\n• Avg session: 4m 32s\n• Bounce rate: 23% (-2%)\n• The conversion rate increased 12% this week, primarily driven by the new onboarding flow.", time: "12:30", incoming: true, sender: "DT" },
  ],
  a4: [
    { id: "m1", text: "Write release notes for v2.4.0 with the new features.", time: "11:20", incoming: false },
    { id: "m2", text: "Draft for the release notes is ready. I've highlighted the 3 major features, included migration notes, and added a 'What's Next' section. Want me to adjust the tone?", time: "11:45", incoming: true, sender: "CW" },
  ],
  a5: [
    { id: "m1", text: "Status check on all services.", time: "10:15", incoming: false },
    { id: "m2", text: "All services are healthy. Uptime: 99.97%\n\n✓ API Gateway — 4ms avg\n✓ Database — 12ms avg\n✓ CDN — 99.99% hit rate\n✓ Workers — 0 failed jobs\n\nNext maintenance window: Sunday 03:00 UTC.", time: "10:20", incoming: true, sender: "DO" },
  ],
  a6: [
    { id: "m1", text: "Find recent papers on efficient attention mechanisms.", time: "09:00", incoming: false },
    { id: "m2", text: "Found 3 relevant papers on transformer architectures:\n\n1. 'Linear Attention Revisited' (2025) — proposes a hybrid approach\n2. 'Flash Attention 3' — 2x speedup on H200 GPUs\n3. 'Sparse Universal Transformers' — adaptive compute allocation\n\nWant detailed summaries of any of these?", time: "09:15", incoming: true, sender: "RA" },
  ],
};
