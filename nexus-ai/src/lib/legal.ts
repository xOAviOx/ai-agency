/* Legal page content. These are professional, sensible-default templates with a
   UK / GDPR lean (the site uses £ and a +44 number). They are NOT legal advice —
   have them reviewed and confirm company name, contact, and governing law before
   relying on them. Edit text here; the /privacy, /ai-policy and /terms pages
   render from this single source. */

export type LegalBlock = { type: 'p'; text: string } | { type: 'ul'; items: string[] };
export type LegalSection = { heading: string; blocks: LegalBlock[] };
export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const UPDATED = 'May 30, 2026';
const CONTACT_EMAIL = 'hello@nexus.ai';

export const PRIVACY: LegalDoc = {
  title: 'Privacy Policy',
  updated: UPDATED,
  intro:
    'This Privacy Policy explains how NEXUS (“we”, “us”, “our”) collects, uses, and protects your information when you visit our website or work with us. We keep data collection to what we genuinely need.',
  sections: [
    {
      heading: 'Information we collect',
      blocks: [
        { type: 'p', text: 'We collect information you give us directly, and information collected automatically when you use our site.' },
        {
          type: 'ul',
          items: [
            'Contact details you submit — name, email, company, and message — via our forms or when booking a call.',
            'Project information you share with us during an engagement.',
            'Technical data collected automatically, such as IP address, browser type, pages visited, and referring URLs.',
            'Cookie and analytics data (see Cookies & analytics below).',
          ],
        },
      ],
    },
    {
      heading: 'How we use your information',
      blocks: [
        {
          type: 'ul',
          items: [
            'To respond to enquiries and provide our services.',
            'To operate, maintain, and improve our website.',
            'To send relevant updates you have asked for (you can opt out at any time).',
            'To meet our legal, tax, and accounting obligations.',
          ],
        },
      ],
    },
    {
      heading: 'Cookies & analytics',
      blocks: [
        { type: 'p', text: 'We use essential cookies to run the site and may use privacy-respecting analytics to understand how it is used. You can control or block cookies through your browser settings.' },
      ],
    },
    {
      heading: 'How we share information',
      blocks: [
        { type: 'p', text: 'We do not sell your personal data. We share it only with trusted service providers who help us operate — such as hosting, scheduling, and email tools — and only as far as needed to deliver our services or comply with the law.' },
      ],
    },
    {
      heading: 'Third-party services',
      blocks: [
        { type: 'p', text: 'Our site links to and integrates third-party tools (such as scheduling and form services). Their use of your data is governed by their own privacy policies, which we encourage you to review.' },
      ],
    },
    {
      heading: 'Data retention',
      blocks: [
        { type: 'p', text: 'We keep personal data only as long as necessary for the purposes described above, or as required by law, after which we delete or anonymise it.' },
      ],
    },
    {
      heading: 'Your rights',
      blocks: [
        { type: 'p', text: 'Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal data, to object to processing, or to request a copy in a portable format.' },
        { type: 'p', text: `To exercise any of these rights, email us at ${CONTACT_EMAIL}.` },
      ],
    },
    {
      heading: 'Data security',
      blocks: [
        { type: 'p', text: 'We use appropriate technical and organisational measures to protect your data. No method of transmission or storage is completely secure, but we work hard to safeguard your information.' },
      ],
    },
    {
      heading: 'International transfers',
      blocks: [
        { type: 'p', text: 'Where your data is processed outside your country, we take steps to ensure it continues to be protected to a comparable standard.' },
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        { type: 'p', text: 'We may update this policy from time to time. The “last updated” date above always reflects the current version.' },
      ],
    },
    {
      heading: 'Contact us',
      blocks: [
        { type: 'p', text: `Questions about this policy or your data? Email us at ${CONTACT_EMAIL}.` },
      ],
    },
  ],
};

export const AI_POLICY: LegalDoc = {
  title: 'AI Policy',
  updated: UPDATED,
  intro:
    'This AI Policy explains how NEXUS builds, deploys, and operates AI systems — including how we handle the data those systems use and the safeguards we place around them.',
  sections: [
    {
      heading: 'Our approach to AI',
      blocks: [
        { type: 'p', text: 'We build AI to assist people, not to replace accountability. Every system we deploy is designed with human oversight, clear boundaries, and your business goals in mind.' },
      ],
    },
    {
      heading: 'How we use AI',
      blocks: [
        {
          type: 'ul',
          items: [
            'Building custom AI agents, automations, and voice agents for clients.',
            'Drafting, summarising, and processing content within clearly defined workflows.',
            'Improving the quality, speed, and reliability of the solutions we deliver.',
          ],
        },
      ],
    },
    {
      heading: 'Data used by AI systems',
      blocks: [
        { type: 'p', text: 'AI systems we build may process business data you provide so they can perform their tasks. We use the minimum data necessary, and only for the purpose agreed with you.' },
        {
          type: 'ul',
          items: [
            'We do not use your confidential data to train third-party public models.',
            'Client data is kept separated, and access is limited to those who need it.',
          ],
        },
      ],
    },
    {
      heading: 'Human oversight',
      blocks: [
        { type: 'p', text: 'A person remains responsible for the systems we deploy. We define when an AI agent may act autonomously and when it must escalate to a human.' },
      ],
    },
    {
      heading: 'Accuracy & limitations',
      blocks: [
        { type: 'p', text: 'AI can make mistakes. We build validation, guardrails, and fallbacks into our systems, but outputs should be reviewed wherever decisions carry material consequences.' },
      ],
    },
    {
      heading: 'Third-party AI providers',
      blocks: [
        { type: 'p', text: 'We may use reputable third-party model providers. Their handling of data is governed by their own terms; we choose providers with appropriate data-protection commitments and, where possible, no-training guarantees.' },
      ],
    },
    {
      heading: 'Security & confidentiality',
      blocks: [
        { type: 'p', text: 'AI-related data is protected with the same care as all other data we handle — encrypted in transit, access-controlled, and retained only as long as needed.' },
      ],
    },
    {
      heading: 'Your choices',
      blocks: [
        { type: 'p', text: 'Clients can define what their AI systems may and may not do, what data they can access, and may request changes to or deletion of that data at any time.' },
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        { type: 'p', text: 'We will update this policy as our practices and the underlying technology evolve.' },
      ],
    },
    {
      heading: 'Contact us',
      blocks: [
        { type: 'p', text: `Questions about how we use AI? Email us at ${CONTACT_EMAIL}.` },
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  title: 'Terms of Service',
  updated: UPDATED,
  intro:
    'These Terms of Service govern your use of the NEXUS website and the services we provide. By using our site or engaging us, you agree to these terms.',
  sections: [
    {
      heading: 'Use of our website',
      blocks: [
        { type: 'p', text: 'You may use our website for lawful purposes only. You agree not to misuse it, attempt to disrupt it, or access it in any unauthorised way.' },
      ],
    },
    {
      heading: 'Our services',
      blocks: [
        { type: 'p', text: 'NEXUS provides AI automation, AI agents, voice agents, and web development services. The specific scope, deliverables, timeline, and fees for any engagement are set out in a separate proposal or agreement.' },
      ],
    },
    {
      heading: 'Proposals, fees & payment',
      blocks: [
        {
          type: 'ul',
          items: [
            'Project scope and pricing are confirmed in writing before work begins.',
            'Invoices are payable within the terms stated on each invoice.',
            'Late or non-payment may result in paused or suspended work.',
          ],
        },
      ],
    },
    {
      heading: 'Client responsibilities',
      blocks: [
        { type: 'p', text: 'To deliver well, we rely on you to provide timely access, information, approvals, and any third-party accounts or credentials reasonably required.' },
      ],
    },
    {
      heading: 'Intellectual property',
      blocks: [
        { type: 'p', text: 'Unless agreed otherwise in writing, ownership of final, paid-for deliverables transfers to you upon full payment. We retain rights to our pre-existing tools, frameworks, and know-how, and may showcase non-confidential work in our portfolio.' },
      ],
    },
    {
      heading: 'Confidentiality',
      blocks: [
        { type: 'p', text: 'Each party agrees to protect the other’s confidential information and to use it only for the purpose of the engagement.' },
      ],
    },
    {
      heading: 'Third-party services',
      blocks: [
        { type: 'p', text: 'Our solutions may rely on third-party platforms and APIs. We are not responsible for outages, changes, or issues caused by those third parties.' },
      ],
    },
    {
      heading: 'Warranties & disclaimers',
      blocks: [
        { type: 'p', text: 'We provide our services with reasonable skill and care. Except as expressly stated, the website and services are provided “as is” without warranties of any kind.' },
      ],
    },
    {
      heading: 'Limitation of liability',
      blocks: [
        { type: 'p', text: 'To the maximum extent permitted by law, NEXUS is not liable for indirect, incidental, or consequential losses. Our total liability for any claim is limited to the fees paid for the relevant engagement.' },
      ],
    },
    {
      heading: 'Termination',
      blocks: [
        { type: 'p', text: 'Either party may end an engagement as set out in the applicable agreement. Fees for work completed up to termination remain payable.' },
      ],
    },
    {
      heading: 'Governing law',
      blocks: [
        { type: 'p', text: 'These terms are governed by the laws of England and Wales, and any disputes are subject to the exclusive jurisdiction of its courts. (Confirm the jurisdiction that applies to your business.)' },
      ],
    },
    {
      heading: 'Changes to these terms',
      blocks: [
        { type: 'p', text: 'We may update these terms from time to time. Continued use of our site or services means you accept the current version.' },
      ],
    },
    {
      heading: 'Contact us',
      blocks: [
        { type: 'p', text: `Questions about these terms? Email us at ${CONTACT_EMAIL}.` },
      ],
    },
  ],
};
