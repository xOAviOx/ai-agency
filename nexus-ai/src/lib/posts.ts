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
    slug: 'ai-automation-cost-and-roi',
    title: 'What Does AI Automation Actually Cost? A Plain-English Guide to ROI',
    excerpt:
      '“How much does it cost?” is the wrong first question. Here’s how to think about what AI automation is worth — and the simple math to prove it.',
    date: 'May 30, 2026',
    readTime: '6 min read',
    tag: 'ROI',
    content: [
      {
        type: 'p',
        text: 'The first question almost everyone asks is “how much does it cost?” It’s the wrong place to start. A £500 automation that saves nothing is expensive; a £15,000 build that saves two salaries a year is cheap. The number that matters isn’t the price tag — it’s the return. So let’s break down what actually drives the cost, and the simple math to work out what it’s worth to you.',
      },
      { type: 'h2', text: 'What drives the cost' },
      {
        type: 'p',
        text: 'No two automation projects are priced the same, but the cost almost always comes down to a handful of factors:',
      },
      {
        type: 'ul',
        items: [
          'Complexity — how many steps, decisions, and edge cases the workflow has.',
          'Integrations — how many tools it has to talk to (CRM, calendar, billing, custom systems).',
          'Custom AI vs. templated — a bespoke agent costs more than wiring up off-the-shelf blocks.',
          'Volume and scale — handling 100 events a day is different from 100,000.',
          'Ongoing support — monitoring, maintenance, and iteration after launch.',
        ],
      },
      { type: 'h2', text: 'The three ways automation pays you back' },
      {
        type: 'p',
        text: 'Return shows up in three distinct places. Add them up and you have your real ROI:',
      },
      {
        type: 'ul',
        items: [
          'Time saved — hours your team no longer spends on manual work, multiplied by what those hours cost you.',
          'Revenue captured — faster response times, fewer missed leads, and more deals that don’t slip through the cracks.',
          'Errors avoided — the cost of mistakes, rework, and missed follow-ups that simply stop happening.',
        ],
      },
      { type: 'h2', text: 'A simple ROI calculation you can run today' },
      {
        type: 'p',
        text: 'You don’t need a finance team for this. Take one process and estimate: hours it eats per week × your loaded hourly cost × 52. A task that burns 10 hours a week at £30/hour is costing you roughly £15,600 a year — every year. If automation removes most of that, the build pays for itself in months, then keeps paying. Do the same for revenue (what’s one recovered lead worth, times how many you miss?) and the case usually makes itself.',
      },
      { type: 'h2', text: 'Build vs. subscription vs. agency' },
      {
        type: 'p',
        text: 'There are three common ways to get there, with different cost shapes:',
      },
      {
        type: 'ul',
        items: [
          'DIY tools — cheapest in cash, most expensive in your time, and brittle when things change.',
          'Off-the-shelf subscriptions — quick to start, but generic, per-seat, and rarely fit your exact process.',
          'A custom agency build — higher upfront, but it fits your workflow exactly and becomes an asset you own.',
        ],
      },
      { type: 'h2', text: 'How to keep the cost down' },
      {
        type: 'p',
        text: 'The cheapest project is a focused one. To get strong ROI without overspending:',
      },
      {
        type: 'ul',
        items: [
          'Start with one high-leverage workflow, not ten at once.',
          'Automate the predictable 80% and leave the rare edge cases to a human.',
          'Measure the hours and revenue it returns in the first month.',
          'Reinvest those savings into the next automation, and compound from there.',
        ],
      },
      { type: 'h2', text: 'The bottom line' },
      {
        type: 'p',
        text: 'AI automation isn’t a cost to minimise — it’s an investment to size correctly. Anchor on the return, start with the workflow that’s bleeding the most time or money, and let the savings fund what comes next. At NEXUS we scope every project against real ROI before we build, so you know what it’s worth before you spend a thing — book a call and we’ll run the numbers with you.',
      },
    ],
  },
  {
    slug: 'ai-voice-agents-for-business',
    title: 'Never Miss Another Call: What an AI Voice Agent Does for Your Business',
    excerpt:
      'Every missed call is missed revenue. Here’s what an AI voice agent actually does — and why it’s the cheapest full-time hire you’ll ever make.',
    date: 'May 30, 2026',
    readTime: '5 min read',
    tag: 'Voice AI',
    content: [
      {
        type: 'p',
        text: 'Here’s an uncomfortable number: most small and mid-sized businesses miss between 25% and 50% of their inbound calls. After hours, during lunch, when the front desk is slammed — the phone rings out, the caller hangs up, and more often than not they call a competitor instead. Every one of those is revenue that quietly walked away. An AI voice agent is built to make sure that never happens again.',
      },
      { type: 'h2', text: 'What an AI voice agent actually is' },
      {
        type: 'p',
        text: 'Forget the clunky “press 1 for sales” phone trees you hate. A modern AI voice agent is a conversational system that answers the phone, talks in a natural human voice, understands what the caller wants, and actually does something about it — books the appointment, answers the question, takes the message, or hands off to a person. It holds a real back-and-forth conversation, handles interruptions, and works 24/7 without a lunch break or a bad day.',
      },
      { type: 'h2', text: 'What it can do for you' },
      {
        type: 'p',
        text: 'The point isn’t novelty — it’s the work it quietly takes off your team’s plate, every hour of every day:',
      },
      {
        type: 'ul',
        items: [
          'Answer every call instantly — no hold music, no voicemail, no missed leads.',
          'Book appointments straight into your calendar while the caller is still on the line.',
          'Qualify inbound leads and route the hot ones to a human immediately.',
          'Answer the same FAQs (hours, pricing, location) it gets asked fifty times a day.',
          'Take detailed messages and follow up on missed calls automatically.',
        ],
      },
      { type: 'h2', text: 'Where it pays off fastest' },
      {
        type: 'p',
        text: 'You don’t need to automate every call to win. The biggest, fastest returns almost always come from a few specific places:',
      },
      {
        type: 'ul',
        items: [
          'After-hours and weekend calls you currently miss entirely.',
          'Reception overload — when one person can’t answer three lines at once.',
          'Speed-to-lead: calling a new lead back in seconds instead of hours.',
          'High-volume, repetitive questions that eat your team’s focus.',
        ],
      },
      { type: 'h2', text: '“But won’t it sound like a robot?”' },
      {
        type: 'p',
        text: 'It’s the first thing everyone asks — and a fair one. The honest answer: a badly built one will, and a well-built one won’t. Today’s voice models respond in real time, sound genuinely human, and handle being interrupted mid-sentence. Just as important, you stay in control: you decide exactly what it can say, what it must never do, and the moment it should hand a call to a real person. Done right, most callers don’t realize they weren’t talking to a human.',
      },
      { type: 'h2', text: 'How to get started' },
      {
        type: 'p',
        text: 'Start narrow and prove it on one call type before expanding:',
      },
      {
        type: 'ul',
        items: [
          'Pick your highest-volume or most-missed call type (e.g. booking, or after-hours).',
          'Define what the agent should handle — and exactly when to escalate to a human.',
          'Connect it to your calendar and CRM so it can actually take action.',
          'Test it on real calls, then expand to more scenarios once it’s earning its keep.',
        ],
      },
      { type: 'h2', text: 'The bottom line' },
      {
        type: 'p',
        text: 'An AI voice agent is the closest thing to a tireless, always-available team member: it answers instantly, never forgets to follow up, and costs a fraction of a full-time hire. For most businesses, the question isn’t whether to use one — it’s which calls to put it on first. At NEXUS we design, build, and deploy these agents end to end — and you can talk to a live one right now on our portfolio page to hear exactly how it sounds.',
      },
    ],
  },
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
