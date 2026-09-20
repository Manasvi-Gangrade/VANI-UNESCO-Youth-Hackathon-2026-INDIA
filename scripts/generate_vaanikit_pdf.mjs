// @ts-nocheck
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateVaaniKit() {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Palette definition
  const ink = rgb(0.12, 0.12, 0.14);
  const sunny = rgb(0.96, 0.77, 0.19);
  const sunnyLight = rgb(0.99, 0.96, 0.88);
  const tangerine = rgb(0.92, 0.45, 0.22);
  const teal = rgb(0.12, 0.53, 0.53);
  const tealLight = rgb(0.91, 0.97, 0.97);
  const grape = rgb(0.48, 0.25, 0.58);
  const forest = rgb(0.15, 0.45, 0.32);
  const white = rgb(1, 1, 1);
  const cardBorder = rgb(0.2, 0.2, 0.2);

  // ==========================================
  // PAGE 1: COVER & EXECUTIVE SUMMARY
  // ==========================================
  const page1 = doc.addPage([595.28, 841.89]); // A4 portrait
  const { width, height } = page1.getSize();

  // Top Banner
  page1.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: sunny,
  });

  // Neo-brutalist border line below banner
  page1.drawLine({
    start: { x: 0, y: height - 120 },
    end: { x: width, y: height - 120 },
    thickness: 4,
    color: ink,
  });

  // UNESCO Sub-badge
  page1.drawRectangle({
    x: 36,
    y: height - 42,
    width: 260,
    height: 22,
    color: ink,
  });
  page1.drawText("UNESCO YOUTH HACKATHON 2026 INDIA", {
    x: 44,
    y: height - 36,
    size: 9,
    font: fontBold,
    color: sunny,
  });

  // Main Header
  page1.drawText("VAANIKIT: EDUCATOR PLAYBOOK", {
    x: 36,
    y: height - 76,
    size: 24,
    font: fontBold,
    color: ink,
  });

  page1.drawText("Verification & Algorithmic Literacy Network Initiative — Offline Toolkit", {
    x: 36,
    y: height - 98,
    size: 11,
    font: fontBold,
    color: rgb(0.25, 0.25, 0.25),
  });

  // Lead attribution
  page1.drawText("Team Lead: Manasvi Gangrade  |  Co-Lead: Suhani Sharma", {
    x: 36,
    y: height - 114,
    size: 9.5,
    font: fontBold,
    color: rgb(0.3, 0.2, 0.05),
  });

  // Overview Box (Neo-brutalist style)
  let y = height - 145;
  page1.drawRectangle({
    x: 36,
    y: y - 80,
    width: width - 72,
    height: 80,
    color: sunnyLight,
    borderColor: ink,
    borderWidth: 2.5,
  });
  page1.drawText("WHAT IS VAANIKIT?", {
    x: 50,
    y: y - 22,
    size: 13,
    font: fontBold,
    color: ink,
  });
  page1.drawText(
    "VaaniKit is an offline-friendly pedagogical field manual designed to bring the behavioral\nlearning loop of Project VANI into classrooms, rural community halls, and youth clubs without\nrequiring active internet connectivity. It equips facilitators to turn passive audiences into active,\ncritical verifiers through structured roleplays, flashcards, and forensic observation.",
    {
      x: 50,
      y: y - 38,
      size: 9.5,
      font: fontRegular,
      color: ink,
      lineHeight: 13.5,
    }
  );

  // SECTION 1: THE 5-STEP VANI BEHAVIORAL LOOP
  y = y - 115;
  page1.drawText("1. THE 5-STAGE BEHAVIORAL VANI LOOP", {
    x: 36,
    y: y,
    size: 14,
    font: fontBold,
    color: ink,
  });

  const stages = [
    { num: "01", title: "THE FEED", desc: "Simulate authentic, high-speed information exposure mimicking WhatsApp, Instagram, or YouTube.", color: sunny },
    { num: "02", title: "THE FREEZE", desc: "Introduce the mandatory 10-second impulse delay before sharing or reacting. Break the emotional surge.", color: tangerine },
    { num: "03", title: "THE REVEAL", desc: "Expose forensic tells: synthetic cadences, fake seals, uncanny lip-syncs, and hidden emotional bait.", color: grape },
    { num: "04", title: "RESILIENCE SCORE", desc: "A gamified metric (0-10) measuring caution and verification instincts across repetitive runs.", color: teal },
    { num: "05", title: "THE MULTIPLIER", desc: "Equip the learner with reproducible 'tells' so one informed youth insulates their entire family group.", color: forest },
  ];

  let cardY = y - 20;
  for (const st of stages) {
    page1.drawRectangle({
      x: 36,
      y: cardY - 40,
      width: width - 72,
      height: 40,
      color: white,
      borderColor: ink,
      borderWidth: 2,
    });
    // Left color bar
    page1.drawRectangle({
      x: 36,
      y: cardY - 40,
      width: 44,
      height: 40,
      color: st.color,
    });
    page1.drawText(st.num, {
      x: 48,
      y: cardY - 26,
      size: 14,
      font: fontBold,
      color: ink,
    });
    page1.drawText(st.title, {
      x: 92,
      y: cardY - 18,
      size: 10.5,
      font: fontBold,
      color: ink,
    });
    page1.drawText(st.desc, {
      x: 92,
      y: cardY - 32,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2),
    });
    cardY -= 48;
  }

  // SECTION 2: THE 3 CORE MISINFORMATION ARCHETYPES
  y = cardY - 15;
  page1.drawText("2. THE THREE ARCHETYPES DISSECTED", {
    x: 36,
    y: y,
    size: 14,
    font: fontBold,
    color: ink,
  });

  const villains = [
    {
      title: "THE FAMILIAR VOICE (Voice Clone)",
      badge: "AUDIO DEEPFAKE",
      cue: "Cloned audio note posing as family/friend demanding urgent money or links.",
      tell: "Listen for robotic breathlessness and perfectly flat sentence-end cadences.",
      bg: tealLight,
      color: teal,
    },
    {
      title: "THE BREAKING NEWSREADER (Synthetic Anchor)",
      badge: "AVATAR MISINFORMATION",
      cue: "Polished studio desk and ticker broadcasting fabricated civil or economic crises.",
      tell: "Watch mouth borders against teeth, unnatural blinking rates, and nameless news tags.",
      bg: sunnyLight,
      color: tangerine,
    },
    {
      title: "THE KIND OFFICIAL (Fabricated Scheme)",
      badge: "PHISHING & EXPLOITATION",
      cue: "Free laptops, scholarships, or immediate payouts exploiting aspirations.",
      tell: "Official logos paired with suspicious shortened URLs; requests for OTP or upfront fees.",
      bg: rgb(0.96, 0.92, 0.98),
      color: grape,
    },
  ];

  let vilY = y - 20;
  for (const v of villains) {
    page1.drawRectangle({
      x: 36,
      y: vilY - 55,
      width: width - 72,
      height: 55,
      color: v.bg,
      borderColor: ink,
      borderWidth: 2,
    });
    // Header
    page1.drawText(v.title, {
      x: 48,
      y: vilY - 18,
      size: 10.5,
      font: fontBold,
      color: ink,
    });
    page1.drawText(v.badge, {
      x: width - 180,
      y: vilY - 18,
      size: 8.5,
      font: fontBold,
      color: v.color,
    });
    page1.drawText(`Scenario: ${v.cue}`, {
      x: 48,
      y: vilY - 32,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2),
    });
    page1.drawText(`The Tell: ${v.tell}`, {
      x: 48,
      y: vilY - 46,
      size: 8.5,
      font: fontBold,
      color: ink,
    });
    vilY -= 63;
  }

  // Footer
  page1.drawText("Project VANI — UNESCO Youth Hackathon 2026 India  |  Page 1 of 2  |  Official Deliverable", {
    x: 36,
    y: 20,
    size: 8,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });

  // ==========================================
  // PAGE 2: FACILITATOR CARDS & WORKSHOP RUNNER
  // ==========================================
  const page2 = doc.addPage([595.28, 841.89]);

  // Page 2 Header
  page2.drawRectangle({
    x: 0,
    y: height - 60,
    width: width,
    height: 60,
    color: ink,
  });
  page2.drawText("VAANIKIT: FIELD GUIDE & WORKSHOP SCRIPT", {
    x: 36,
    y: height - 38,
    size: 16,
    font: fontBold,
    color: sunny,
  });
  page2.drawText("HANDS-ON OFFLINE VERIFICATION WORKSHOP FOR EDUCATORS & YOUTH MENTORS", {
    x: 36,
    y: height - 52,
    size: 8.5,
    font: fontBold,
    color: white,
  });

  // SECTION 3: THE 6 GOLDEN FACILITATOR RULES (POCKET CARDS)
  let p2Y = height - 90;
  page2.drawText("3. THE SIX GOLDEN VERIFICATION CARDS (FOR CLASSROOM DISPLAY)", {
    x: 36,
    y: p2Y,
    size: 12.5,
    font: fontBold,
    color: ink,
  });

  const cards = [
    { title: "RULE 1: PAUSE ON THE SPIKE", text: "If an item triggers rage, intense panic, or instant validation, halt. Emotional surges are designed payloads." },
    { title: "RULE 2: NAME THE SOURCE OUT LOUD", text: "Ask aloud: 'Who created this, and how would they know?' If you cannot name both, it's hearsay with graphics." },
    { title: "RULE 3: LISTEN TO THE TAIL", text: "Voice clones betray themselves in the last second of sentences: monotone pitch drop, zero breath, no ambient room decay." },
    { title: "RULE 4: REVERSE-SEARCH THE VISUAL", text: "Screenshots and breaking photos are frequently recycled from crises 5+ years prior in unrelated locations." },
    { title: "RULE 5: FORWARD THE TELL, NOT THE CLIP", text: "Never forward false media to 'warn' others. Instead, screenshot and explain specifically why it is fabricated." },
    { title: "RULE 6: MONEY NEVER REQUIRES A PIN", text: "Entering a UPI PIN or banking credential ONLY transfers money out. No government grant or prize asks for your PIN." },
  ];

  const colWidth = (width - 72 - 14) / 2;
  let cardIndex = 0;
  let cardTop = p2Y - 18;

  for (const c of cards) {
    const col = cardIndex % 2;
    const row = Math.floor(cardIndex / 2);
    const cx = 36 + col * (colWidth + 14);
    const cy = cardTop - row * 72;

    page2.drawRectangle({
      x: cx,
      y: cy - 64,
      width: colWidth,
      height: 64,
      color: white,
      borderColor: ink,
      borderWidth: 2,
    });
    // Top banner for card
    page2.drawRectangle({
      x: cx,
      y: cy - 20,
      width: colWidth,
      height: 20,
      color: col === 0 ? sunnyLight : tealLight,
    });
    page2.drawText(c.title, {
      x: cx + 8,
      y: cy - 14,
      size: 8.5,
      font: fontBold,
      color: ink,
    });
    page2.drawText(c.text, {
      x: cx + 8,
      y: cy - 32,
      size: 7.5,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2),
      maxWidth: colWidth - 16,
      lineHeight: 10.5,
    });

    cardIndex++;
  }

  // SECTION 4: 45-MINUTE OFFLINE WORKSHOP FORMAT
  let wsY = cardTop - 3 * 72 - 25;
  page2.drawText("4. 45-MINUTE OFFLINE WORKSHOP BLUEPRINT", {
    x: 36,
    y: wsY,
    size: 12.5,
    font: fontBold,
    color: ink,
  });

  const agenda = [
    { time: "00 — 10 MIN", title: "THE 'URGENT MESSAGE' ICEBREAKER", detail: "Read aloud a hyper-urgent fake WhatsApp audio scenario. Ask the room who would forward immediately. Point out the visceral panic reflex before anyone questioned the source." },
    { time: "10 — 25 MIN", title: "ANATOMY OF A DEEPFAKE ROLEPLAY", detail: "Divide youth into pairs: one is the 'Scammer' crafting an emotional hook (welfare, panic), the other is the 'Auditor' spotting the 3 tells (tail cadence, URL anatomy, missing authority)." },
    { time: "25 — 35 MIN", title: "THE RESILIENCE SCORE BENCHMARK", detail: "Conduct a 5-question oral simulation quiz. Score students on: Did they verify source? Did they halt the forward? Did they spot the payload? Target: 8/10 baseline." },
    { time: "35 — 45 MIN", title: "COMMUNITY ADVOCATE PLEDGE", detail: "Each participant commits to becoming the 'family verifier' on WhatsApp groups. Distribute printed VaaniCards for home noticeboards and refrigerator placement." },
  ];

  let agY = wsY - 18;
  for (const ag of agenda) {
    page2.drawRectangle({
      x: 36,
      y: agY - 42,
      width: width - 72,
      height: 42,
      color: white,
      borderColor: ink,
      borderWidth: 1.5,
    });
    page2.drawRectangle({
      x: 36,
      y: agY - 42,
      width: 90,
      height: 42,
      color: sunny,
    });
    page2.drawText(ag.time, {
      x: 42,
      y: agY - 26,
      size: 8.5,
      font: fontBold,
      color: ink,
    });
    page2.drawText(ag.title, {
      x: 135,
      y: agY - 18,
      size: 9.5,
      font: fontBold,
      color: ink,
    });
    page2.drawText(ag.detail, {
      x: 135,
      y: agY - 32,
      size: 7.5,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2),
      maxWidth: width - 72 - 110,
      lineHeight: 10,
    });
    agY -= 48;
  }

  // SECTION 5: UNESCO HACKATHON COMMITMENT & QR / LINKS
  let cY = agY - 15;
  page2.drawRectangle({
    x: 36,
    y: cY - 55,
    width: width - 72,
    height: 55,
    color: sunnyLight,
    borderColor: ink,
    borderWidth: 2,
  });

  page2.drawText("PROJECT VANI VERIFICATION & CODE REPOSITORY", {
    x: 48,
    y: cY - 18,
    size: 10,
    font: fontBold,
    color: ink,
  });
  page2.drawText(
    "GitHub Repository: https://github.com/Manasvi-Gangrade/VANI-UNESCO-Youth-Hackathon-2026-INDIA\nLive Simulation Platform: https://vani-verification-algorithmic-liter.vercel.app\nUNESCO Youth Hackathon 2026 Theme: 'Play Your Part: Youth Designing the Future of MIL'",
    {
      x: 48,
      y: cY - 33,
      size: 8,
      font: fontRegular,
      color: ink,
      lineHeight: 12,
    }
  );

  // Footer
  page2.drawText("Project VANI — UNESCO Youth Hackathon 2026 India  |  Page 2 of 2  |  Licensed under Creative Commons BY-SA 4.0", {
    x: 36,
    y: 20,
    size: 8,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });

  const pdfBytes = await doc.save();
  const outputPath = path.resolve("public/VaaniKit.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`VaaniKit PDF successfully generated at: ${outputPath} (${pdfBytes.length} bytes)`);
}

generateVaaniKit().catch((err) => {
  console.error("Failed to generate VaaniKit PDF:", err);
  process.exit(1);
});
