# VANI: Your Voice Defender

hello hello hellooo bhaii I need your help, please build this project Lovable Prompt — Project VANI: Full Site (Project + POC combined)

Copy everything below the line into Lovable as your starting prompt. This builds ONE combined website: a colourful, story-driven project site AND the working interactive simulator, all reachable from one homepage.

Build a multi-page website called Project VANI (VaaniFeed) for a UNESCO Youth Hackathon submission on Media and Information Literacy (MIL). The site should feel like a warm, playful, professionally-designed digital report — NOT like a plain pitch deck and NOT like a cold tech product page.

1. Overall Visual Theme (very important — follow closely)

Reference style: match this exact Canva theme — a warm cream background, a bold golden-yellow header banner, a bright orange accent bar for section headings, a purple-bordered highlight card for featured content, and small decorative organic/floral shapes (teal circles, dark green clover/flower shapes, orange semi-circles and sunburst) tucked into corners. Headlines use a bold, chunky black serif/slab font (like a confident "annual report" display font). This should feel warm, playful, and professionally designed — NOT like a plain pitch deck and NOT like a cold tech product page.

Background: warm cream / off-white (#FDF6E3 or similar) as the dominant base across all pages

Primary banner colour: golden yellow (#F6D758 / #F4CE4E) — used for page-header bands and hero backgrounds

Accent colour palette:

Bright orange (#F2994A) — for section-heading bars and secondary CTAs

Deep teal (#1C7C6B) — for icon-card fills and decorative shapes

Dark forest green (#1B5E4F / #16463B) — for icon-card fills and clover/flower decorative shapes

Purple (#6B3FA0 / #7B4FB0) — used sparingly as a bold card border/outline for the single most important highlight on a page (e.g. a featured card or key stat), not as a fill colour

Headings: bold, chunky, black, slab-serif or rounded-serif display font, always high-contrast against its background band

Body text: clean dark grey/black sans-serif, generous line height, easy to read against the cream background

Shapes: soft rounded corners (12–20px) on every card, button, and image container. Scatter small decorative organic shapes — teal circles/half-circles, dark green clover/flower clusters, orange semi-circles and a small sunburst — in section corners and margins, purely decorative, never overlapping text

Section headers: styled as a solid-colour rounded rectangle "bar" (orange or yellow) with bold black text sitting directly on it — used consistently at the top of every major section on every page (e.g. "Team Members", "The Problem", "What We're Delivering")

Highlight cards: the single most important card on a page (e.g. the Team Lead's card, or the featured "Try the Simulator" card on the homepage) gets a distinct bold purple border (3–4px, rounded corners) to visually separate it as the featured item — don't overuse this, one per page maximum

Photo placeholders: for team member cards, use a simple rounded-square image placeholder (soft yellow/teal fill with a person silhouette icon) sized and positioned the way a real profile photo would sit — the team will replace these with their own real photos after export, so just leave a clean, correctly-proportioned placeholder

Motion: the site should feel alive — use plenty of tasteful micro-animations: cards lift slightly and gain a shadow on hover, section banners fade/slide in on scroll, decorative shapes have a gentle float/bob animation, icons wiggle softly on hover, page transitions are smooth fades, horizontal carousels animate smoothly on drag/click-arrow. Keep animations snappy (200–400ms), never sluggish or distracting.

Overall feeling: light, bright, optimistic, colourful, human — like flipping through a beautifully designed youth-led annual report, not a corporate SaaS landing page.

2. Site Structure (all pages reachable from the Home page)

Build these as separate routes/pages, all linked from colourful navigation cards on the Home page:

/ — Home

/who-we-are — Who We Are (team + origin story)

/the-problem — The Problem (why MIL is broken today, with stats)

/meet-vani — Meet VANI (the solution, features, "villain gallery")

/simulator — Try the Simulator (the actual interactive POC — see Section 4 below)

/our-vision — Our Vision (languages, sustainability, scale)

/faq — You Might Be Wondering (FAQ)

Every page should share a consistent top navigation bar (logo/wordmark "VANI" on the left, page links on the right, all in the same rounded-pill button style) and a simple footer.

3. Page-by-Page Content

/ Home

Full-width hero section: big bold headline "Project VANI", subheading "Verification & Algorithmic Literacy Network Initiative", and italic tagline: "'Vani' means voice. This project exists so no young person's voice — in any language — is left undefended against a lie that was never even human to begin with."

A quick hook line as a highlighted text block: "The last time something online made you pause — how did you actually decide whether to trust it?"

A row of 6 large, colourful, rounded icon-cards (each a different accent colour), one per page in the site — "Who We Are", "The Problem", "Meet VANI", "Try the Simulator" (make this one visually stand out, e.g. with a "Play" icon and a subtle pulsing glow, since it's the interactive centrepiece), "Our Vision", "FAQ". Each card has a simple icon, the page title, and a one-line description. Clicking a card navigates to that page.

A horizontal scrollable carousel below the cards showing 4–5 quick stat highlights in small flat-colour cards (style modelled on UNESCO's own "Facts and Figures" cards): e.g. "88% recognise MIL in policy, only 17% have a dedicated policy", "62% of creators don't fact-check", "121 languages spoken in India alone", "45–50% drop in deepfake-detection accuracy in the real world"

A section with an orange bar heading "What Are We Delivering?" listing, as a clean bulleted or icon-tile list: Pitch Video, MVP POC (GitHub Code Repo), Deployed URL, and Additional Deliverables (Technical Implementation Document, Research Paper, MVP POC Video)

Decorative organic shapes scattered around the hero in the accent colours

/who-we-are Who We Are

Colour-block banner: "Who We Are"

Team cards for Manasvi Gangrade — Team Lead (Research, strategy, and overall project direction) and Suhani Sharma — Co-Lead (Concept development, content design, and presentation) — simple rounded avatar placeholders, name, role, one-line description

A stylised "chat bubble" style component titled "Where this idea actually came from" recreating this short exchange as alternating left/right chat bubbles (like a messaging app):

Suhani: "Okay wait, be honest — when's the last time you actually double-checked something before forwarding it to the family group?"

Manasvi: "...never, if I'm being fully honest. If it looks urgent enough, I just send it."

Suhani: "Exactly. And we're the ones who are supposed to know better."

Manasvi: "So the problem isn't that people don't know what misinformation is. It's that nobody's ever tested us in the moment it actually matters."

Suhani: "That's it. That's the whole project right there."

Closing line: "VANI didn't start as a hackathon idea. It started as two friends admitting, out loud, that they'd fallen for the exact thing they were supposed to be immune to — and deciding that if it could happen to them, it was happening to everyone."

/the-problem The Problem

Colour-block banner: "So, why isn't MIL working the way it should?"

Narrative sections (each a heading + short paragraph, alternating background tint), covering:

The policy-to-practice gap: 88% of 194 UNESCO Member States recognise MIL in policy, only 17% have a stand-alone policy; most classrooms still test rote definitions instead of real behaviour

The AI/deepfake shift: generative AI market projected to grow 560% (2025–2031); deepfake-detection tools lose 45–50% accuracy outside lab conditions

The creator gap: UNESCO's Behind the Screens study — 62% of digital content creators don't fact-check, 42% judge trust by likes/shares alone

The language gap: UNESCO's Global Roadmap on Multilingualism — moderation systems are skewed toward high-resource languages; reference the real 2022 Kenya example where Facebook approved ethnic-violence ads in Swahili

Use bold pull-quote style call-out boxes (flat accent-colour background, larger italic text) for the most striking stats

Close with: "Youth in regional-language digital spaces are being tested on definitions from a textbook, while the real danger they face is audio-visual, AI-generated, and often in a language no safety system is watching closely enough."

/meet-vani Meet VANI

Colour-block banner: "Meet VANI"

Intro: "Picture the app you already use every day — that fast, familiar, thumb-scrolling feed. Now imagine that feed is quietly designed to make you sharper every time you touch it. That's VANI."

Note: "In UNESCO's own format terms, VANI is an Application/Website at its core, a Game in how it's experienced, and an Educational Toolkit in what it leaves behind."

A "Day in the life" narrative block styled like a phone/chat interface showing timestamped moments (7:42 PM, 7:44 PM, 7:45 PM, 7:52 PM) following a fictional user "Riya, 19, Indore" scrolling, nearly falling for a fake video, and catching it

Five feature cards in a row (rounded icon-cards, one accent colour each): VaaniFeed (the entry point), The Freeze (the trap), The Reveal (the lesson), Resilience Score (the motivation), VaaniKit (the ripple effect) — each with a 1–2 line description

A "Meet the Line-Up" section: three character cards styled like a villain gallery / trading cards — The Familiar Voice (cloned voice note), The Breaking Newsreader (fake news clip), The Kind Official (fake government scheme) — each with a short, punchy description and a simple flat-illustration icon

A prominent, large call-to-action button: "Try the Simulator Yourself →" linking to /simulator

/simulator Try the Simulator

This is the actual interactive POC. See Section 4 below for full detail — embed it as this page's content, keeping the site's nav/footer around it.

/our-vision Our Vision

Colour-block banner: "Built once. Meant for everyone."

Stat callout: "India alone is home to 121 languages spoken by 10,000+ people, and over 19,500 recorded mother tongues (Census of India)."

Explain the modular content-library architecture: pilot launches in Hindi, Marathi, and Tamil; new languages can be added by updating a single content library, not rebuilding the app

A short "Sustainability" block: free-tier hosting, single open-source codebase, low maintenance cost

A small section titled "Where the 'fake' content actually comes from" explaining that all synthetic posts are team-created and reviewed, modelled on real documented manipulation patterns, never real people or real events without consent

/faq You Might Be Wondering

Colour-block banner: "You Might Be Wondering..."

Expandable accordion-style FAQ cards (click to expand/collapse) with these three questions:

"Isn't this just another anti-misinformation app?" → "Fair question. Most tools tell you what's fake after you've already seen it. VANI catches you in the moment you're about to act on it — that's a completely different, and much harder, problem to solve."

"Can two people really build this in time?" → "Not the whole vision — not yet. But the core loop (feed, freeze, reveal, score) is a small, well-scoped build we can prototype quickly, and we're treating it as version one of something meant to grow."

"Why should this work when awareness campaigns haven't?" → "Because it doesn't ask anyone to sit through a lecture. It meets people inside the exact habit — scrolling — that got them into trouble in the first place."

4. The Simulator (/simulator page — the interactive POC)

Build this as a working interactive simulation, styled to match the rest of the site's bright/rounded/warm visual language (not a jarring dark "app mockup" — keep it light and on-theme, framed inside a rounded phone-shaped or card-shaped container so it's clear it's a simulation).

Flow:

Intro screen: "VaaniFeed" title, tagline "Scroll smart. Spot the fake before you share it.", a language selector (Hindi / Marathi / Tamil / English — content only needs to exist in Hindi + English for this POC, other options can just be present as stubs), and a "Start Simulation" button

Feed screen: a vertical scrolling card feed (one post per view, swipe/scroll for next), each card showing a placeholder media area, a caption (Hindi + English), an author handle, and Like / Share / Comment icons. Seed at least 8–10 posts, roughly half real and half synthetic, based on the three "Line-Up" archetypes (cloned voice note, fake news clip, fake government scheme)

Freeze/Reveal moment: if the user taps Like or Share on a synthetic post, the screen gently freezes (soft blur/dim, no harsh red X or buzzer), shows "Wait — look again. Notice anything?", then after a short pause reveals the specific tell (e.g. "The lip movement doesn't match the audio", "This voice was cloned — notice the flat tone at the end")

Resilience Score screen: after ~10 posts, show a score out of 10 based on catches vs misses, a warm contextual message, a "Share your score" button (clipboard copy is fine), a "Download the Toolkit" button (can show a friendly "Coming soon" toast), and a "Try Again" button

Data: use a simple local JSON/array of post objects (id, author, captionHindi, captionEnglish, isSynthetic, revealTextHindi, revealTextEnglish, mediaType) — no backend needed, all client-side state.

What NOT to include: no login/signup, no real data collection, no real people/events/news referenced in the synthetic sample content — keep every synthetic example clearly fictional and generic.

5. Technical Notes

Build as a single React app with client-side routing between the pages listed above

Fully responsive, but prioritise looking great on both mobile portrait (for demo purposes) and desktop (for judges reviewing on a laptop)

No backend/auth required — everything can run client-side with local state

Reuse a shared set of components across pages: ColourBlockBanner, IconCard, StatCallout, ChatBubble/ConversationBox, Carousel, Accordion — so the whole site feels visually consistent

Keep performance snappy — animations should enhance, not slow down, navigation, kuch aisi si images and visuals use karna bhai pure project meee like take reference from them and addd lotsss of visuals animations and stuffff, i trust you onto this bhaiiii

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d7f4ab31-4f31-4045-81b0-dce0cb20b986).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
