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
    slug: 'ai-agents-vs-automation',
    title: 'AI Agents vs. Automation: Which One Does Your Business Actually Need?',
    excerpt:
      'The terms get used like synonyms, but agents and automation solve different problems. Here’s the practical way to tell which one fits the job in front of you.',
    date: 'May 30, 2026',
    readTime: '6 min read',
    tag: 'AI Agents',
    content: [
      {
        type: 'p',
        text: 'Walk into any conversation about AI right now and you’ll hear “agent” and “automation” used like they mean the same thing. They don’t. They solve different problems, cost different amounts to build, and break in different ways. Knowing the difference is the fastest way to spend your budget on the right thing — so here’s the practical version.',
      },
      { type: 'h2', text: 'The short version' },
      {
        type: 'p',
        text: 'Automation follows fixed rules you define up front: when X happens, do Y. It’s fast, cheap, and rock-solid — as long as the steps never change. An AI agent reasons. You give it a goal and the tools to reach it, and it decides what to do, handles messy input, and adapts when things don’t go to plan. Automation executes a recipe; an agent works toward an outcome.',
      },
      { type: 'h2', text: 'What automation is great at' },
      {
        type: 'p',
        text: 'If a process is repetitive and predictable, automation is almost always the right tool. It’s cheaper to build, easier to trust, and runs forever without surprises.',
      },
      {
        type: 'ul',
        items: [
          'Moving data between tools — CRM, spreadsheets, invoicing, email.',
          'Triggered sequences: a form is submitted, so a record is created and a welcome email goes out.',
          'Scheduled jobs: nightly reports, reminders, backups, and syncs.',
          'Rule-based routing: send this ticket to that team based on simple conditions.',
        ],
      },
      { type: 'h2', text: 'What an AI agent adds' },
      {
        type: 'p',
        text: 'Agents earn their keep the moment a task involves language, judgment, or variation you can’t fully script in advance.',
      },
      {
        type: 'ul',
        items: [
          'Reading and understanding free text — emails, support tickets, documents, contracts.',
          'Making a call when there’s no clean rule: is this lead worth a sales follow-up?',
          'Holding a real conversation with a customer and taking action mid-chat.',
          'Pulling from several sources, weighing them, and producing an answer or a draft.',
        ],
      },
      { type: 'h2', text: 'A simple way to choose' },
      {
        type: 'p',
        text: 'Ask one question about the task: does it ever require judgment? If the steps are identical every single time, automate it — don’t pay for intelligence you don’t need. If the task changes based on context, wording, or a decision a person would normally make, that’s agent territory.',
      },
      { type: 'h2', text: 'The best systems use both' },
      {
        type: 'p',
        text: 'In practice, the strongest setups combine the two. An agent handles the thinking — reading an inbound email, understanding what the customer wants, deciding the next step — then hands off to plain automation for the reliable mechanical work: update the CRM, book the slot, send the confirmation. You get the flexibility of AI where you need it and the dependability of automation everywhere else.',
      },
      { type: 'h2', text: 'How to get started' },
      {
        type: 'p',
        text: 'You don’t choose between agents and automation in the abstract — you choose per task. Start by mapping one real workflow and marking each step:',
      },
      {
        type: 'ul',
        items: [
          'Same every time → automate it.',
          'Needs reading, judgment, or a decision → that step is for an agent.',
          'Then connect them so work flows end to end without a person babysitting it.',
        ],
      },
      { type: 'h2', text: 'Bottom line' },
      {
        type: 'p',
        text: 'Automation makes predictable work disappear. AI agents handle the messy, judgment-heavy work that used to need a human. Most businesses need both — applied to the right steps. That’s what we do at NEXUS: we map your process, automate what’s repetitive, deploy agents where judgment is required, and wire it together so it runs like a teammate who never logs off.',
      },
    ],
  },
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
