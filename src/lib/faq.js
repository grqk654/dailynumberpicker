// Single source of truth for all FAQ content
// Used by: /faq index page, /faq/[slug] individual pages, homepage accordion

export const FAQ_ITEMS = [

  // ── Pick 3 Basics ──────────────────────────────────────────────────────────
  {
    slug: "what-is-ny-pick-3",
    question: "What is NY Pick 3?",
    category: "Pick 3 Basics",
    metaDescription: "NY Pick 3 — officially called Daily Numbers — is a three-digit lottery game drawing twice daily since 1980. Learn how it works and how to play.",
    answer: [
      "NY Pick 3 — officially called Daily Numbers — is a lottery game where you choose three digits, each from 0 to 9. The NY Lottery draws three digits twice per day, every day of the week. Match your chosen digits to the drawn digits based on your bet type and you win.",
      "The game has run continuously since 1980, making it one of the longest-running Pick 3 games in the United States. As of 2026 that's over 32,000 individual draws combined across midday and evening.",
      "Pick 3 tickets cost $0.50 or $1 per play. You can play straight, box, straight/box, or combo. Each bet type has different odds and different payouts.",
    ],
    related: ["pick-3-odds", "what-does-straight-mean", "pick-3-bet-types-payouts"],
  },
  {
    slug: "pick-3-odds",
    question: "What are the odds of winning Pick 3?",
    category: "Pick 3 Basics",
    metaDescription: "Pick 3 straight odds are 1 in 1,000. Box odds are 1 in 167 (6-way) or 1 in 333 (3-way). Full odds breakdown for every bet type.",
    answer: [
      "Your odds in Pick 3 depend on which bet type you choose.",
      "Straight: 1 in 1,000. You must match all three digits in exact order. 6-way box (all distinct digits): 1 in 167. Any of the 6 possible arrangements wins. 3-way box (two matching digits): 1 in 333. Only 3 arrangements exist — longer odds but higher payout.",
      "For context: Pick 3 offers far better odds than jackpot games. Powerball odds are 1 in 292 million. Pick 3 straight is 1 in 1,000 — a completely different kind of game.",
      "Wheeling systems don't change the odds on any individual ticket, but they increase your coverage — more combinations played means more chances to have the winning arrangement in your set.",
    ],
    related: ["what-is-ny-pick-3", "pick-3-bet-types-payouts", "what-does-straight-mean"],
  },
  {
    slug: "pick-3-bet-types-payouts",
    question: "How much do you win on Pick 3? Payouts for every bet type.",
    category: "Pick 3 Basics",
    metaDescription: "NY Pick 3 payout table. Straight: $500 on $1. 6-way box: $80. 3-way box: $160. Straight/Box, Combo payouts explained.",
    answer: [
      "NY Pick 3 payouts on a $1 play: Straight pays $500. 6-way box (all distinct digits) pays $80. 3-way box (one pair of matching digits) pays $160. Straight/Box pays $290 + $40 if exact match, or $40 if any order match.",
      "For $0.50 plays, all payouts are halved.",
      "Straight pays the most because it requires the hardest match — exact order. Box pays less but covers any arrangement of your three digits. If all three digits are distinct you have 6 possible arrangements. If two digits are the same you have 3 arrangements with a higher payout.",
      "Combo automatically plays all straight arrangements of your digits on one ticket. Three distinct digits = 6 straight plays = $6 cost, $500 payout if any arrangement hits.",
    ],
    related: ["pick-3-odds", "what-does-straight-mean", "what-does-box-mean"],
  },
  {
    slug: "what-does-straight-mean",
    question: "What does straight mean in Pick 3?",
    category: "Pick 3 Basics",
    metaDescription: "A straight bet in Pick 3 requires your three digits to match in exact order. Pays $500 on $1. Best used when you have strong positional analysis.",
    answer: [
      "A straight bet means your three digits must match the drawn numbers in the exact order you chose.",
      "If you play 4-7-2 straight, you win only if the draw is 4-7-2 in that exact sequence. A draw of 7-4-2 or any other arrangement does not win on a straight ticket. Payout: $500 on a $1 play. Odds: 1 in 1,000.",
      "Straight is the bet type that benefits most from positional analysis. If your analysis points to digit 5 in position 1, digit 2 in position 2, and digit 9 in position 3, a straight bet on 5-2-9 is the direct application of that analysis. The DailyNumberPicker.com scoring engine ranks digits per position specifically for this reason.",
    ],
    related: ["what-does-box-mean", "pick-3-bet-types-payouts", "pick-3-odds"],
  },
  {
    slug: "what-does-box-mean",
    question: "What does box mean in Pick 3?",
    category: "Pick 3 Basics",
    metaDescription: "A box bet in Pick 3 pays if your digits appear in any order. 6-way box pays $80 on $1. 3-way box pays $160. When box makes more sense than straight.",
    answer: [
      "A box bet pays if your three digits appear in any order, regardless of sequence.",
      "6-way box: all three digits are distinct (e.g., 4-7-2). There are 6 possible arrangements and any of them win. Pays $80 on a $1 play. Odds: 1 in 167.",
      "3-way box: two of your three digits are the same (e.g., 4-4-7). Only 3 unique arrangements exist. Pays $160 on a $1 play. Odds: 1 in 333.",
      "Box makes sense when you are confident in which three digits will appear but less certain about their order. The wheeling tool on DailyNumberPicker.com has a Box mode that collapses all straight arrangements into single box tickets — 36 straight plays become 6 box tickets.",
    ],
    related: ["what-does-straight-mean", "pick-3-bet-types-payouts", "what-does-straight-box-mean"],
  },
  {
    slug: "what-does-straight-box-mean",
    question: "What does straight/box mean in Pick 3?",
    category: "Pick 3 Basics",
    metaDescription: "Straight/Box is a combination bet. Win both straight and box prizes for exact match, or just the box prize for any-order match. Good insurance on a straight play.",
    answer: [
      "Straight/Box is a combination bet that plays both straight and box simultaneously on a single ticket. A $1 Straight/Box play is effectively a $0.50 straight plus a $0.50 box.",
      "If your digits match in exact order: you win the straight portion ($290) plus the box portion ($40) for a total of $330 on a $1 ticket. If your digits match in any other order: you win only the box portion ($40).",
      "Think of Straight/Box as insurance on a straight play. You give up some of the full straight payout ($500 vs. $290) in exchange for a fallback win if the order is wrong. Best used when you have moderate confidence in your digit selection and some confidence in position.",
    ],
    related: ["what-does-straight-mean", "what-does-box-mean", "pick-3-bet-types-payouts"],
  },
  {
    slug: "pick-3-draw-times",
    question: "What time does NY Pick 3 draw each day?",
    category: "Pick 3 Basics",
    metaDescription: "NY Pick 3 draws at approximately 2:30 PM (midday) and 10:30 PM (evening), seven days a week including holidays.",
    answer: [
      "NY Pick 3 draws twice every day, seven days a week including holidays.",
      "Midday draw: approximately 2:30 PM Eastern Time. Evening draw: approximately 10:30 PM Eastern Time.",
      "Both draws use the same game rules and bet types. You can play one draw, the other, or both on the same ticket. When you run analysis on DailyNumberPicker.com you can choose midday only, evening only, or both combined.",
    ],
    related: ["what-is-ny-pick-3", "pick-3-midday-vs-evening"],
  },

  // ── Win-4 Basics ────────────────────────────────────────────────────────────
  {
    slug: "how-does-ny-win-4-work",
    question: "How does NY Win 4 work?",
    category: "Win-4 Basics",
    metaDescription: "NY Win 4 is a four-digit daily lottery drawing twice per day. Straight odds are 1 in 10,000 with a $5,000 payout. Full rules, bet types, and how it differs from Pick 3.",
    answer: [
      "NY Win 4 is Pick 3's four-digit sibling. You choose four digits, each from 0 to 9, and try to match the four digits drawn by the NY Lottery. Draws happen twice daily — midday at approximately 2:30 PM and evening at approximately 10:30 PM, seven days a week.",
      "The key difference from Pick 3: Win 4 has 10,000 possible straight combinations compared to Pick 3's 1,000. Straight odds are 1 in 10,000, but the payout is also higher — $5,000 on a $1 straight play.",
      "Box types in Win 4 depend on how many digits repeat: all four distinct = 24-way box ($200), one pair = 12-way box ($400), two pairs = 6-way box ($800), one triple = 4-way box ($1,200).",
    ],
    related: ["win-4-payouts", "win-4-box-types", "win-4-odds"],
  },
  {
    slug: "win-4-payouts",
    question: "How much do you win on NY Win 4?",
    category: "Win-4 Basics",
    metaDescription: "NY Win 4 payouts: Straight $5,000 on $1. 24-way box $200. 12-way box $400. 6-way box $800. 4-way box $1,200. Complete payout table.",
    answer: [
      "NY Win 4 payouts on a $1 play: Straight pays $5,000. 24-way box (all distinct digits) pays $200. 12-way box (one repeated digit) pays $400. 6-way box (two pairs) pays $800. 4-way box (one triple) pays $1,200.",
      "For $0.50 plays, all payouts are halved.",
      "Why do box payouts vary? The more repeated digits in your combination, the fewer unique arrangements exist and the harder it is to hit — so the payout is higher to compensate. A 4-way box has only 4 winning arrangements vs. 24 for an all-distinct combination.",
    ],
    related: ["how-does-ny-win-4-work", "win-4-odds", "win-4-box-types"],
  },
  {
    slug: "win-4-odds",
    question: "What are the odds of winning Win 4?",
    category: "Win-4 Basics",
    metaDescription: "Win 4 straight odds are 1 in 10,000. Box odds range from 1 in 417 (24-way) to 1 in 2,500 (4-way). Full odds table.",
    answer: [
      "Win 4 odds by bet type: Straight = 1 in 10,000. 24-way box (all distinct) = 1 in 417. 12-way box (one pair) = 1 in 833. 6-way box (two pairs) = 1 in 1,667. 4-way box (one triple) = 1 in 2,500.",
      "Win 4 straight is 10 times harder than Pick 3 straight (1 in 10,000 vs. 1 in 1,000) but pays 10 times more ($5,000 vs. $500). The expected value is similar across both games.",
      "For wheeling players: a full C–H pool covers 15 secondary pairs for Win 4 — giving you 360 straight plays or 15 box tickets depending on your bet type selection.",
    ],
    related: ["how-does-ny-win-4-work", "win-4-payouts", "win-4-box-types"],
  },
  {
    slug: "win-4-box-types",
    question: "What is a 24-way, 12-way, 6-way, and 4-way box in Win 4?",
    category: "Win-4 Basics",
    metaDescription: "Win 4 box type depends on repeated digits. All distinct = 24-way. One pair = 12-way. Two pairs = 6-way. One triple = 4-way. Full explanation and payouts.",
    answer: [
      "In Win 4, the box type is determined by how many of your four digits repeat.",
      "24-way box: all four digits are distinct (e.g., 1-2-3-4). 24 unique arrangements. Pays $200 on $1. 12-way box: one pair of matching digits (e.g., 1-1-2-3). 12 unique arrangements. Pays $400. 6-way box: two pairs (e.g., 1-1-2-2). 6 arrangements. Pays $800. 4-way box: one triple (e.g., 1-1-1-2). Only 4 arrangements. Pays $1,200.",
      "The DailyNumberPicker.com wheeling tool detects repeats automatically and labels each combination with its correct box type — you never need to calculate it manually.",
    ],
    related: ["win-4-payouts", "win-4-odds", "how-does-ny-win-4-work"],
  },

  // ── Strategy ────────────────────────────────────────────────────────────────
  {
    slug: "what-pick-3-number-comes-in-most",
    question: "What Pick 3 number comes in the most?",
    category: "Strategy",
    metaDescription: "No single Pick 3 number permanently dominates. Frequency varies by position and time window. Here's how to find today's most frequent digits.",
    answer: [
      "There is no single Pick 3 number that permanently comes in the most — and most sites that claim to answer this question are showing you misleading data.",
      "The problem with all-time frequency lists is twofold. First, position matters: digit 7 appearing frequently overall tells you nothing useful. What matters is whether digit 7 appears frequently in position 1, position 2, or position 3 — those are completely different signals for a three-position game.",
      "Second, time window matters. A digit that dominated two years ago is irrelevant to tonight's draw. Recent windows of 7–30 draws reflect current behavior. The DailyNumberPicker.com engine tracks frequency per position within your chosen window and updates after every draw.",
    ],
    related: ["what-is-skip-tracking", "hot-vs-cold-digits", "can-ai-predict-pick-3"],
  },
  {
    slug: "what-is-skip-tracking",
    question: "What is skip tracking in Pick 3?",
    category: "Strategy",
    metaDescription: "Skip tracking measures draws since a digit last appeared per position. Late = skip over 1.5x expected. Very late = over 2x expected. How it works and when to use it.",
    answer: [
      "Skip tracking measures how many draws have passed since a digit last appeared in a specific position. It is always position-specific — the skip of digit 4 in position 1 is independent of digit 4's skip in position 3.",
      "The math: with 10 possible digits per position, each is expected to appear roughly once every 10 draws. Late threshold: skip exceeds 1.5 times the expected interval. In a 30-draw window, a skip of 5 or more qualifies as late. Very late: skip exceeds 2 times the expected interval, or 6 or more draws in a 30-draw window.",
      "Important: a very late digit is statistically overdue — not guaranteed to appear next. Lottery draws are independent and the machine has no memory. Skip tracking is one signal among nine in the DailyNumberPicker.com engine, weighted at 15% in the balanced preset.",
    ],
    related: ["hot-vs-cold-digits", "what-pick-3-number-comes-in-most", "what-is-the-scoring-engine"],
  },
  {
    slug: "hot-vs-cold-digits",
    question: "What are hot and cold digits in Pick 3?",
    category: "Strategy",
    metaDescription: "Hot digits appear more than expected per position in recent draws. Cold digits appear less. Both are position-specific signals in Pick 3 analysis.",
    answer: [
      "Hot and cold are relative terms — they compare a digit's actual frequency to its statistical expectation per position.",
      "Hot digit: appearing more frequently than expected in a specific position over the analysis window. In a 30-draw window where 3 appearances is expected, a digit appearing 5 or more times in position 1 is hot in that position.",
      "Cold digit: appearing less frequently than expected. Same window, appearing 0 or 1 times in position 1 is cold there.",
      "A digit can be hot in position 2 and cold in position 3 at the same time. Tracking overall frequency misses this. The DailyNumberPicker.com engine tracks hot and cold per position, giving you actionable position-specific signals rather than blended averages.",
    ],
    related: ["what-is-skip-tracking", "what-pick-3-number-comes-in-most", "what-is-the-scoring-engine"],
  },
  {
    slug: "can-ai-predict-pick-3",
    question: "Can AI predict Pick 3 lottery numbers?",
    category: "Strategy",
    metaDescription: "No AI can predict truly random lottery draws. What analysis tools can do is surface statistical patterns in draw history. Here's the honest answer.",
    answer: [
      "No. No system — AI or otherwise — can predict truly random lottery draws. Each Pick 3 draw is statistically independent. The machine that selects winning numbers has no memory of previous draws.",
      "What data analysis can do is surface statistical patterns in recent draw history: which digits are running hot or cold per position, which are overdue based on skip tracking, which digit combinations produce common sum ranges, and which digits tend to appear together.",
      "This is analysis, not prediction. A weather forecast uses atmospheric data to produce a probability — it does not control the weather. Lottery analysis works the same way: better-informed picks, not guaranteed picks. DailyNumberPicker.com is honest about this distinction.",
    ],
    related: ["what-is-the-scoring-engine", "hot-vs-cold-digits", "what-is-skip-tracking"],
  },
  {
    slug: "quick-pick-vs-own-numbers",
    question: "Do quick picks win more than self-picked numbers?",
    category: "Strategy",
    metaDescription: "Quick picks and self-picked numbers have identical odds in Pick 3. The difference is approach. Here's what the data shows.",
    answer: [
      "The odds are mathematically identical. A quick pick has exactly the same 1-in-1,000 straight odds as a carefully analyzed self-picked number.",
      "Quick picks appear in many lottery winner stories simply because the vast majority of tickets sold are quick picks. If 80% of tickets are quick picks, approximately 80% of winners will be quick pick holders — it's volume, not advantage.",
      "What self-picking with analysis gives you is a structured, intentional approach. Instead of a computer randomly assigning digits, you're selecting based on statistical signals. Whether that edge is meaningful over time is a question each player answers through their own tracking. The value is moving from pure randomness to informed selection.",
    ],
    related: ["can-ai-predict-pick-3", "what-is-the-scoring-engine", "what-pick-3-number-comes-in-most"],
  },
  {
    slug: "what-is-a-wheeling-system",
    question: "What is a wheeling system in Pick 3?",
    category: "Strategy",
    metaDescription: "A Pick 3 wheeling system generates every straight arrangement from master and secondary digits, guaranteeing a straight hit if your key digits appear.",
    answer: [
      "A wheeling system generates every possible straight arrangement from a set of digits you select — giving you systematic coverage instead of single-combination guesswork.",
      "The master digit wheel works like this: you designate two digits as masters — your highest-confidence picks. You then select up to six secondary digits. The system generates every straight arrangement of master A + master B + one secondary digit. For any three distinct digits there are 6 unique arrangements, so two masters plus six secondaries produces 36 straight plays.",
      "The guarantee: if the winning number contains both master digits plus any one of your six secondary digits, one of your 36 tickets is an exact straight match. In box mode the 36 plays collapse to 6 box tickets — one per secondary digit.",
    ],
    related: ["can-you-wheel-win4", "pick-3-bet-types-payouts", "what-does-straight-mean"],
  },
  {
    slug: "can-you-wheel-win4",
    question: "Can you wheel Win-4 numbers?",
    category: "Strategy",
    metaDescription: "Yes — Win-4 wheeling uses master digits plus pairs of secondaries. Pool sizes range from 24 to 360 straight plays. Full breakdown.",
    answer: [
      "Yes. Win-4 wheeling uses the same master digit concept as Pick 3 but requires pairs of secondary digits instead of singles — because each Win-4 combination needs four digits total.",
      "You select two master digits and up to six secondaries. The system generates every arrangement of master A + master B + one pair of secondaries. Secondary pool sizes: C–D (2 secondaries) = 1 pair = 24 straight plays or 1 box ticket. C–F (4) = 6 pairs = 144 straight or 6 box. C–G (5) = 10 pairs = 240 straight or 10 box. C–H (6) = 15 pairs = 360 straight or 15 box.",
      "The Win-4 wheeling tool on DailyNumberPicker.com handles all combination types automatically, detects repeated digits, and adjusts box type labels accordingly.",
    ],
    related: ["what-is-a-wheeling-system", "win-4-box-types", "win-4-payouts"],
  },
  {
    slug: "what-is-the-scoring-engine",
    question: "How does the DailyNumberPicker.com scoring engine work?",
    category: "Strategy",
    metaDescription: "The scoring engine runs 9 independent analysis angles on NY draw history, normalizes each score 0–100, and blends them into a ranked digit list per position.",
    answer: [
      "The scoring engine runs 9 independent analysis angles on every digit in every position, then blends the results into a composite score that ranks digits 0–9 per position.",
      "The 9 angles are: skip tracking (draws since last seen), hot/cold frequency (vs. expected rate), odd/even balance (ratio rebalancing), sum analysis (underrepresented sum ranges), position bias (digit affinity for this position), repeat pattern (back-to-back appearances), pair affinity (digits that appear together), day-of-week pattern (today's historical hit rate), and digit delta (consecutive draw value trends).",
      "Each angle produces a raw score per digit per position, normalized to 0–100. Scores are blended using your strategy preset weights — Aggressive, Balanced, Conservative, or fully Custom with individual sliders. Click any digit in the scoring view to expand its full 9-angle breakdown.",
    ],
    related: ["can-ai-predict-pick-3", "hot-vs-cold-digits", "what-is-skip-tracking"],
  },
  {
    slug: "pick-3-midday-vs-evening",
    question: "Should I analyze Pick 3 midday and evening draws separately or combined?",
    category: "Strategy",
    metaDescription: "Both approaches work. Combined gives larger sample size. Separate analysis lets you spot draw-specific patterns. How to choose and how to toggle.",
    answer: [
      "Both approaches are valid. DailyNumberPicker.com supports all three options: midday only, evening only, or both combined.",
      "Combined analysis gives you the largest sample size for a given time window. 30 draws combined covers approximately two weeks of data — more statistically stable. Separate analysis lets you look for draw-specific patterns some players track over short windows.",
      "Start with Both combined using a 30-draw window. If the top-ranked digits look very different when you toggle to midday-only or evening-only, that divergence is worth noting. If they're consistent across both, that agreement is a stronger signal. Select your draw time in the controls panel before clicking Run analysis.",
    ],
    related: ["pick-3-draw-times", "what-is-the-scoring-engine", "what-pick-3-number-comes-in-most"],
  },

  // ── About ────────────────────────────────────────────────────────────────────
  {
    slug: "where-does-data-come-from",
    question: "Where does DailyNumberPicker.com get its data?",
    category: "About",
    metaDescription: "DailyNumberPicker.com uses the official NY Open Data API (data.ny.gov) — free government data with NY Pick 3 and Win-4 results since 1980.",
    answer: [
      "All draw history is pulled directly from the NY Open Data portal — data.ny.gov — a government-run public API maintained by New York State. The dataset is: Lottery Daily Numbers/Win-4 Winning Numbers: Beginning 1980.",
      "This dataset contains every NY Pick 3 and Win-4 draw result since 1980, including midday and evening results for both games. It is updated by the NY Lottery after each draw and is freely accessible to anyone via the Socrata SODA API.",
      "DailyNumberPicker.com makes a live call to this API when you click Run analysis — no scraping, no third-party data providers. If there is ever a question about a result, the source can be verified directly at data.ny.gov.",
    ],
    related: ["what-is-the-scoring-engine", "can-ai-predict-pick-3"],
  },
  {
    slug: "is-dailynumberpicker-free",
    question: "Is DailyNumberPicker.com free?",
    category: "About",
    metaDescription: "Yes — DailyNumberPicker.com is completely free. No signup, no subscription, no account. All tools are free including the scoring engine, wheeling system, and print module.",
    answer: [
      "Yes — completely free. No signup required. No account. No subscription. No credit card.",
      "All tools are free: Pick 3 scoring engine, Win-4 scoring engine, wheeling system (all bet types), print module (bet slips, play lists, summary cards), all strategy guides and FAQ pages.",
      "The site is supported by Amazon affiliate commissions on products in the shop — when you purchase something through one of our links, we earn a small commission at no additional cost to you. That's how we keep the analysis tools free.",
    ],
    related: ["where-does-data-come-from", "what-is-the-scoring-engine"],
  },
];

export const FAQ_CATEGORIES = ["Pick 3 Basics", "Win-4 Basics", "Strategy", "About"];

export function getFaqBySlug(slug) {
  return FAQ_ITEMS.find(f => f.slug === slug) || null;
}

export function getFaqsByCategory(cat) {
  return FAQ_ITEMS.filter(f => f.category === cat);
}
