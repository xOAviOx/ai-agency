/* Blog content lives here. Add a new object to POSTS to publish a post — the
   /blog list and /blog/[slug] pages read from this single source. No CMS yet. */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // display string
  readTime: string;
  tag: string;
  content: PostBlock[];
};

export const POSTS: Post[] = [
  {
    slug: 'how-ai-automation-helps-businesses-grow',
    title: 'How AI Automation Helps Businesses Grow (Without Adding Headcount)',
    excerpt:
      "AI automation isn't about replacing people — it's about removing the manual work that quietly caps your growth. Here's how it actually moves the needle.",
    date: 'May 30, 2026',
    readTime: '5 min read',
    tag: 'Automation',
    content: [
      {
        type: 'p',
        text: "Most businesses don't stall because they're out of ideas. They stall because the people with the ideas are buried in manual work — copying data between tools, chasing approvals, answering the same questions, rebuilding the same report every week. AI automation attacks that bottleneck directly. Done well, it doesn't replace your team; it gives them their time back. Here's how that turns into real growth.",
      },
      { type: 'h2', text: '1. It gives your team their hours back' },
      {
        type: 'p',
        text: 'Every business runs on a layer of repetitive tasks: data entry, lead routing, invoice processing, scheduling, status updates. Individually they feel small. Added up across a team, they quietly consume days every week. AI automations handle this work in the background — pulling data, updating records, and triggering the next step — so your people spend their time on the work that actually needs human judgment.',
      },
      {
        type: 'p',
        text: "The math is simple. If automation saves each person five hours a week, a ten-person team just recovered a full employee's worth of capacity — without a single new hire.",
      },
      { type: 'h2', text: '2. Speed becomes a competitive advantage' },
      {
        type: 'p',
        text: 'In sales and support, speed compounds. The business that responds first usually wins, and customers judge you by how fast you move. Automation collapses your response times from hours to seconds:',
      },
      {
        type: 'ul',
        items: [
          'New leads get a reply in seconds — while they still remember why they reached out.',
          'Support tickets are triaged, answered, or escalated instantly, around the clock.',
          'Quotes, onboarding, and approvals move forward without waiting for someone to be at their desk.',
        ],
      },
      { type: 'h2', text: '3. You scale without scaling costs' },
      {
        type: 'p',
        text: "Traditional growth means more volume needs more people, and costs rise in lockstep with revenue. Automation breaks that link. A workflow that handles 100 orders handles 10,000 the same way — no overtime, no onboarding, no drop in quality. You grow the top line while your cost-to-serve stays flat.",
      },
      { type: 'h2', text: '4. Fewer expensive mistakes' },
      {
        type: 'p',
        text: "Humans are brilliant at judgment and terrible at doing the same repetitive task 400 times without slipping. A mistyped figure, a missed follow-up, a step skipped under pressure — small errors that cost real money and trust. Automated workflows run the same way every time, so the predictable work simply stops going wrong.",
      },
      { type: 'h2', text: '5. Your data finally works for you' },
      {
        type: 'p',
        text: 'Most companies are sitting on data they never use because pulling it together is too much manual effort. AI automation can consolidate it continuously — surfacing live dashboards, flagging anomalies, and answering plain-language questions about your business. Decisions stop waiting on someone to build a spreadsheet, and you start steering by what is actually happening.',
      },
      { type: 'h2', text: 'Where to start' },
      {
        type: 'p',
        text: "The biggest mistake is trying to automate everything at once. Growth comes from compounding small wins. Start narrow:",
      },
      {
        type: 'ul',
        items: [
          'Pick one painful, repetitive, high-volume process.',
          'Map exactly how it works today, step by step.',
          'Automate the predictable parts and keep a human in the loop for the judgment calls.',
          'Measure the hours and errors saved — then use that momentum to expand.',
        ],
      },
      { type: 'h2', text: 'The bottom line' },
      {
        type: 'p',
        text: "AI automation grows a business by removing the ceiling that manual work puts on it: more capacity from the same team, faster response times, flat costs as you scale, fewer errors, and sharper decisions. The companies pulling ahead aren't the ones with the most staff — they're the ones whose people are free to do work that matters. That's exactly what we build at NEXUS: custom AI agents and automations that plug into your team and run like they were always part of it.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
