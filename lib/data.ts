import type { Article, Topic, Comment } from './types'
import { fetchArticlesFromSanity } from './sanity'

// Articoli "seed" hardcoded (rimangono per ora, fallback se Sanity vuoto)
export const seedArticles: Article[] = [
  {
    id: '1',
    slug: 'eu-counter-tariffs-trade-war',
    title: 'EU Introduces Counter-Tariffs as Trade Tensions Escalate',
    summary: 'Brussels moves to protect key industries after the latest round of US trade measures, signaling a potential full-scale trade conflict.',
    content: `The European Union announced a sweeping package of counter-tariffs on Friday, targeting $28 billion worth of American goods in direct response to the latest escalation in transatlantic trade tensions. The measures, which cover steel, agricultural products, and consumer electronics, mark the most aggressive EU trade action in over two decades.

European Commission President Ursula von der Leyen framed the decision as a defensive necessity. "We do not seek confrontation, but we will not accept the systematic dismantling of the rules-based trading system," she said at a press conference in Brussels.

The announcement sent shockwaves through financial markets. The euro dropped 0.8% against the dollar, and European automotive stocks — already under pressure from existing tariffs — fell sharply. Ford and General Motors, which export significant volumes to Europe, also saw their shares decline in pre-market trading.

The counter-tariffs are set to take effect in thirty days, giving both sides a narrow window for negotiation. Trade analysts remain skeptical. "Both governments are now locked into domestic political logic that makes compromise politically costly," said Maria Strecker, a trade economist at the Bertelsmann Institute. "This isn't posturing. It's escalation."

Behind the numbers is a structural dispute: the EU's demand that digital services and data flows be governed by international frameworks rather than unilateral US regulation. That underlying tension has no easy resolution, and both sides know it.`,
    category: 'GEOPOLITICS',
    publishedAt: '2026-04-18',
    author: 'Editorial Team',
    tags: ['trade', 'europe', 'economy', 'tariffs'],
    featured: true,
    readTime: 4,
  },
  {
    id: '2',
    slug: 'ai-regulation-framework-collapse',
    title: 'The Global AI Governance Framework Is Cracking Under Pressure',
    summary: 'Competing national interests are fragmenting what was supposed to be a unified international approach to regulating artificial intelligence.',
    content: `Eighteen months after the landmark Seoul AI Safety Summit produced a broadly celebrated framework for global AI governance, the architecture is visibly fracturing. Three of its key signatories have introduced incompatible national legislation, and a fourth — India — announced last week it would develop its own regulatory path entirely.

The summit's central achievement was a non-binding agreement to share information about frontier AI model capabilities and to coordinate on safety evaluations. That agreement now exists largely on paper. The US AI Safety Institute, the UK equivalent, and the EU's newly formed AI Office are operating on divergent timelines, using different benchmarks, and — critically — sharing almost no information with one another.

The fracture lines are technical, political, and commercial all at once. The US is under intense industry pressure to avoid regulations that would slow domestic AI development while China closes the gap. The EU is committed to its AI Act, which imposes obligations that American and British regulators consider impractical. China, not a party to the Seoul framework, is advancing rapidly and setting its own de facto standards for the Global South.

"The window for genuine multilateral coordination may already have closed," said Dr. Priya Anand, a researcher at the Centre for the Governance of AI. "We may be entering a world of AI blocs rather than AI norms."

What makes this moment acute is timing: the most capable AI systems currently in development will reach deployment within the next 12 to 24 months. The governance vacuum exists at precisely the moment it is most dangerous.`,
    category: 'TECHNOLOGY',
    publishedAt: '2026-04-17',
    author: 'Editorial Team',
    tags: ['ai', 'regulation', 'geopolitics', 'governance'],
    featured: true,
    readTime: 5,
  },
  {
    id: '3',
    slug: 'climate-action-gap-2026',
    title: 'The 2026 Emissions Gap: What the Data Actually Shows',
    summary: 'New UNEP analysis confirms global emissions remain far above trajectory needed to limit warming to 1.5°C, with policy commitments lagging reality.',
    content: `The United Nations Environment Programme released its annual Emissions Gap Report on Thursday, and the picture it paints is unambiguous: the world is not on track. Global greenhouse gas emissions rose 1.3% in 2025, reaching a new record of 57.4 gigatons of CO₂ equivalent. To stay within the 1.5°C pathway, emissions need to fall by 42% by 2030.

The gap between pledged commitments and actual policy implementation — what researchers call the "implementation gap" — has widened for the third consecutive year. Forty-one of the G20 nations have made net-zero pledges. Fewer than a third have enacted domestic legislation sufficient to deliver on them.

There are genuine bright spots. Renewable energy capacity additions hit a record in 2025, with solar alone accounting for more than 600 gigawatts of new installations. Electric vehicle sales reached 22% of global new car sales. But the pace of fossil fuel phase-out has not matched the growth of clean alternatives.

The report identifies three structural bottlenecks: the continued financing of new fossil fuel infrastructure by major development banks, the failure of carbon pricing to cover more than 23% of global emissions, and the persistent lack of technology transfer to emerging economies, which account for a growing share of emissions but have contributed least to the historical stock.

"The challenge is no longer primarily technical or financial," UNEP Executive Director Inger Andersen said. "It is political. It is a question of whether governments will do what they have already said they will do."`,
    category: 'CLIMATE',
    publishedAt: '2026-04-16',
    author: 'Editorial Team',
    tags: ['climate', 'emissions', 'policy', 'energy'],
    featured: false,
    readTime: 5,
  },
  {
    id: '4',
    slug: 'digital-euro-launch-controversy',
    title: 'Digital Euro Launch Exposes Deep Divisions on Financial Privacy',
    summary: 'The ECB moves forward with its central bank digital currency pilot amid intense debate over surveillance, financial exclusion, and state power.',
    content: `The European Central Bank formally launched the pilot phase of the digital euro last Monday, issuing the first units of the CBDC to participating banks in Germany, France, and the Netherlands. The milestone marks the most significant transformation of European monetary infrastructure in a generation — and has ignited a fierce political battle over what money is and who controls it.

Proponents argue the digital euro will modernize payments, reduce dependence on US card networks, and provide a public option in an increasingly privatized financial system. The ECB has emphasized its commitment to privacy by design: offline functionality, transaction limits that prevent bulk surveillance, and no direct central bank access to individual spending data.

Critics remain unconvinced. The European Digital Rights initiative, a coalition of privacy advocacy groups, published a 60-page technical analysis arguing that the ECB's privacy guarantees are structurally incomplete. "The architecture permits reconstruction of transaction graphs by intermediaries," the report states. "That is incompatible with financial privacy."

From the political right, the concerns are different but the conclusion similar. A bloc of MEPs has introduced a resolution demanding that any digital euro legislation explicitly prohibit programmability features — the ability to restrict what the currency can be spent on. Their concern is not a hypothetical: several central banks in the pilot have already proposed tiered interest rates tied to spending categories.

The pilot will run for 24 months. Legislation formally establishing the digital euro is expected to be introduced to the European Parliament by the end of the year.`,
    category: 'FINANCE',
    publishedAt: '2026-04-15',
    author: 'Editorial Team',
    tags: ['digital euro', 'cbdc', 'privacy', 'finance'],
    featured: false,
    readTime: 4,
  },
  {
    id: '5',
    slug: 'democratic-backsliding-index-2026',
    title: 'Democracy Is Losing Ground. The Evidence Is Now Overwhelming.',
    summary: 'Three major indices released this month converge on the same finding: competitive authoritarianism is the fastest-growing political system on Earth.',
    content: `Three of the world's leading democracy-monitoring organizations — V-Dem, Freedom House, and the EIU Democracy Index — released their annual assessments within days of each other this month. Taken together, they constitute the most comprehensive empirical picture of global democratic health available, and the picture is consistently grim.

The share of the world's population living in democracies has fallen for the sixth consecutive year. More countries moved from "free" to "partly free" or "not free" in 2025 than at any point since 2006. The most common vector is not military coup but what scholars call "competitive authoritarianism" — governments that retain elections while systematically dismantling the conditions that make them meaningful.

The pattern is familiar: judiciary capture, media ownership concentration, electoral law manipulation, and the criminalization of opposition. What has changed is the speed and sophistication of the process, aided by surveillance technology and cross-border knowledge transfer between autocratic governments.

The data also challenges optimistic narratives about democratic resilience. Consolidated democracies — those with strong institutions and high social trust — have held. But the middle tier, countries that democratized since the 1990s, has proven brittle in ways that earlier forecasts did not anticipate.

Notably, the reports diverge on one point: whether the decline represents a systemic crisis or a cyclical trough. V-Dem and Freedom House lean toward the former. The EIU remains more cautious. The disagreement is not merely academic — it shapes how urgently the international community responds.`,
    category: 'POLITICS',
    publishedAt: '2026-04-14',
    author: 'Editorial Team',
    tags: ['democracy', 'authoritarianism', 'politics', 'governance'],
    featured: false,
    readTime: 5,
  },
  {
    id: '6',
    slug: 'global-inflation-return',
    title: 'Inflation Is Back — and Central Banks Are Divided on Why',
    summary: 'After two years of decline, consumer price inflation has re-accelerated in the US, UK, and eurozone, confounding policymakers and economists alike.',
    content: `Consumer price inflation in the United States rose to 4.1% year-on-year in March, the third consecutive monthly increase and the highest reading since mid-2023. The UK and eurozone posted similar surprises. Bond markets reacted sharply, pricing out expected rate cuts for the remainder of the year.

What makes this re-acceleration analytically difficult is that it does not fit neatly into existing frameworks. The disinflation of 2023-2024 was attributed to easing supply chains, falling energy prices, and the lagged effect of prior monetary tightening. Most forecasters expected that process to continue. Instead, price pressures have re-emerged from an unusual cluster of sources.

Trade tariffs are a primary factor — the IMF estimates they have added 0.6-0.9 percentage points to US inflation since implementation. But services inflation, which has no direct tariff exposure, has also re-accelerated. Wage growth in low-income service sectors has exceeded productivity growth for three consecutive quarters. And insurance costs — particularly for property, driven by climate-related claims — have become a statistically significant driver in ways the models have not historically captured.

Central banks face an acute dilemma. Rate cuts, which would ease the burden on mortgage-holders and businesses, risk entrenching the re-inflation. Rate hikes, politically explosive in an election year, risk pushing several overleveraged economies into recession.

The Fed's next meeting is in three weeks. The ECB meets a week later. Their decisions will set the tone for financial markets through the summer.`,
    category: 'ECONOMY',
    publishedAt: '2026-04-12',
    author: 'Editorial Team',
    tags: ['inflation', 'economy', 'central banks', 'monetary policy'],
    featured: false,
    readTime: 4,
  },
  {
    id: '7',
    slug: 'sudan-conflict-forgotten-crisis',
    title: 'Sudan\'s War Enters Its Third Year. The World Has Largely Moved On.',
    summary: 'The conflict between the SAF and RSF has produced one of the worst humanitarian catastrophes since Rwanda. International attention is elsewhere.',
    content: `When the war between Sudan's Armed Forces and the Rapid Support Forces began in April 2023, it was described by aid organizations as a potential catastrophe. Three years later, the catastrophe has materialized, and global attention has largely failed to match the scale of the crisis.

The UN estimates that over 12 million people have been internally displaced — the largest internal displacement crisis in the world. Famine conditions now affect parts of Darfur, South Kordofan, and the Blue Nile states. More than 150,000 people have died in the fighting, though the true figure is likely significantly higher due to conditions that prevent documentation.

The absence of sustained international diplomatic pressure reflects a set of uncomfortable realities. The major powers with leverage — the UAE, Egypt, Saudi Arabia, and the US — each have complex interests that complicate their role as mediators. UAE support for the RSF has been well-documented but has not triggered significant diplomatic consequences. The African Union's mediation track has stalled repeatedly.

Aid access remains the most acute immediate problem. Both the SAF and RSF have used humanitarian blockades as instruments of war. International humanitarian law violations are extensively documented but have produced no accountability.

"What's happening in Sudan meets every threshold that has historically triggered international intervention," said Alex de Waal, a leading scholar of Sudan. "The non-response tells us something important — and troubling — about the state of the international order."`,
    category: 'CONFLICT',
    publishedAt: '2026-04-10',
    author: 'Editorial Team',
    tags: ['sudan', 'conflict', 'humanitarian', 'africa'],
    featured: false,
    readTime: 5,
  },
  {
    id: '8',
    slug: 'space-economy-geopolitics',
    title: 'Space Is Becoming a Domain of Geopolitical Competition. Fast.',
    summary: 'From satellite constellations to lunar resource rights, the rules governing outer space are being stress-tested at a moment of maximum fragility.',
    content: `The past ninety days have produced more significant space-related geopolitical developments than the previous three years combined. China completed the final module of its Tiangong space station and announced a crewed lunar mission for 2028. The US Space Force released its first unclassified assessment of adversarial satellite capabilities, describing a "deteriorating" threat environment. And a dispute over the orbital placement of a SpaceX Starlink satellite brought the ITU's inadequate spectrum governance framework into sharp relief.

The international legal framework governing space — built around the 1967 Outer Space Treaty — was designed for a world with two spacefaring nations and no commercial actors. It is manifestly inadequate for a world with fourteen active national space programs and over 10,000 satellites in low Earth orbit.

Three specific problems are now acute. First, there is no agreed framework for resource rights on the moon or asteroids. The US Artemis Accords represent an attempt at a framework, but China and Russia are not signatories. Second, the risk of kinetic conflict in space — through anti-satellite weapons already tested by at least four nations — is not covered by any prohibition treaty. Third, dual-use satellite technology makes arms control verification in space uniquely difficult.

The Artemis program, if it succeeds in returning humans to the lunar surface by 2028, will force these questions into the open. Who governs the Moon? Who owns what is extracted from it? The answers do not yet exist.`,
    category: 'GEOPOLITICS',
    publishedAt: '2026-04-08',
    author: 'Editorial Team',
    tags: ['space', 'geopolitics', 'technology', 'international law'],
    featured: false,
    readTime: 5,
  },
]

export const topics: Topic[] = [
  {
    id: 'topic-1',
    title: 'Trade Wars and the End of Globalization',
    description: 'Are we witnessing the end of the globalization era? How should individuals and economies adapt to a fragmenting world trading system?',
    relatedArticleSlug: 'eu-counter-tariffs-trade-war',
    createdAt: '2026-04-18T10:00:00Z',
    commentCount: 14,
    isActive: true,
    tags: ['trade', 'economy', 'geopolitics'],
  },
  {
    id: 'topic-2',
    title: 'AI Governance: Too Late, Too Fragmented?',
    description: 'With international coordination on AI regulation breaking down, what does a fragmented regulatory landscape actually mean for safety, competition, and democratic accountability?',
    relatedArticleSlug: 'ai-regulation-framework-collapse',
    createdAt: '2026-04-17T14:00:00Z',
    commentCount: 21,
    isActive: true,
    tags: ['ai', 'governance', 'technology'],
  },
  {
    id: 'topic-3',
    title: 'Democratic Backsliding: Is the Crisis Systemic?',
    description: 'The data on democratic decline is now consistent across multiple indices. Is this a structural shift in global politics, or a correctable trough? What should democracies do differently?',
    relatedArticleSlug: 'democratic-backsliding-index-2026',
    createdAt: '2026-04-14T09:00:00Z',
    commentCount: 18,
    isActive: true,
    tags: ['democracy', 'politics', 'governance'],
  },
  {
    id: 'topic-4',
    title: 'Climate Gap: Policy vs. Reality',
    description: 'The emissions data is clear. The political commitments exist. So why is the gap between promises and outcomes widening? What would actually work?',
    relatedArticleSlug: 'climate-action-gap-2026',
    createdAt: '2026-04-16T11:00:00Z',
    commentCount: 9,
    isActive: true,
    tags: ['climate', 'policy', 'energy'],
  },
  {
    id: 'topic-5',
    title: 'Digital Money and Financial Privacy',
    description: 'Central bank digital currencies are coming. The privacy tradeoffs are real. Should we welcome programmable money, or treat it as a fundamental threat to financial freedom?',
    relatedArticleSlug: 'digital-euro-launch-controversy',
    createdAt: '2026-04-15T16:00:00Z',
    commentCount: 11,
    isActive: true,
    tags: ['finance', 'privacy', 'cbdc'],
  },
]

export const seedComments: Comment[] = [
  {
    id: 'c1',
    topicId: 'topic-1',
    nickname: 'Markus R.',
    content: 'The EU\'s move is understandable, but the timing is terrible. Raising tariffs when core inflation is already above 3.5% in most eurozone countries is a choice to make ordinary people poorer. There had to be a smarter option.',
    createdAt: '2026-04-18T11:20:00Z',
    isApproved: true,
  },
  {
    id: 'c2',
    topicId: 'topic-1',
    parentId: 'c1',
    nickname: 'Elsa V.',
    content: 'What was the alternative? Accept unilateral trade measures without response? That creates an even worse precedent.',
    createdAt: '2026-04-18T12:05:00Z',
    isApproved: true,
  },
  {
    id: 'c3',
    topicId: 'topic-1',
    nickname: 'Auctoritas',
    content: 'The "smarter option" framing assumes the goal is economic optimization. But trade policy is also signaling — about resolve, about what you\'re willing to absorb. Both arguments are valid. The question is which matters more.',
    createdAt: '2026-04-18T14:30:00Z',
    isApproved: true,
  },
  {
    id: 'c4',
    topicId: 'topic-2',
    nickname: 'Rahim A.',
    content: 'The Seoul framework was always more symbolic than structural. No binding commitments, no enforcement, no real information-sharing. The surprise isn\'t that it\'s fracturing — it\'s that anyone expected otherwise.',
    createdAt: '2026-04-17T16:00:00Z',
    isApproved: true,
  },
  {
    id: 'c5',
    topicId: 'topic-2',
    parentId: 'c4',
    nickname: 'Sofia L.',
    content: 'That\'s unfair. Building trust between governments on AI is genuinely hard. You need to start somewhere. Seoul started somewhere. The failure is in what came after, not in the framework itself.',
    createdAt: '2026-04-17T17:45:00Z',
    isApproved: true,
  },
  {
    id: 'c6',
    topicId: 'topic-2',
    nickname: 'J. Harker',
    content: 'The deeper problem is that "AI safety" means completely different things in Washington, Brussels, and Beijing. There\'s no shared threat model. You can\'t build governance on incommensurable threat models.',
    createdAt: '2026-04-18T08:10:00Z',
    isApproved: true,
  },
  {
    id: 'c7',
    topicId: 'topic-3',
    nickname: 'Ana M.',
    content: 'The V-Dem data is the most rigorous we have. And they\'re saying "systemic." I don\'t think we should be looking for reasons to doubt that. The question is what we actually do with the information.',
    createdAt: '2026-04-14T10:30:00Z',
    isApproved: true,
  },
  {
    id: 'c8',
    topicId: 'topic-3',
    nickname: 'Thomas K.',
    content: 'One thing that\'s underrated: the role of social media in accelerating the process. The playbook for dismantling democratic norms is now widely understood and has been iterated on. It takes less time than it used to.',
    createdAt: '2026-04-14T12:15:00Z',
    isApproved: true,
  },
]

// Backward-compat: alias `articles` punta a seed (per import sincroni residui)
export const articles = seedArticles

// Funzione async — unisce articoli da Sanity + seed (Sanity prima)
export async function getAllArticles(): Promise<Article[]> {
  const sanityArticles = await fetchArticlesFromSanity()
  // dedupe per slug — Sanity vince
  const sanitySlugs = new Set(sanityArticles.map(a => a.slug))
  const merged = [...sanityArticles, ...seedArticles.filter(a => !sanitySlugs.has(a.slug))]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const all = await getAllArticles()
  return all.find(a => a.slug === slug)
}

export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id)
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const all = await getAllArticles()
  return all.filter(a => a.featured)
}
