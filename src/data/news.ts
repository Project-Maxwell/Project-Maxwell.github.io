// News: public events only, newest first. Dates checked against lixin.ai and the project repositories.
export type News = { date: string; text: string; link?: { label: string; url: string } };

export const NEWS: News[] = [
  { date: "Nov 2026", text: "RadioVISTA is public: a benchmark and training data for reading invisible radio fields, with its leaderboard.",
    link: { label: "radiovista.github.io", url: "https://radiovista.github.io/" } },
  { date: "Sep 2026", text: "WirelessMathBench-XL was accepted to NeurIPS 2026.",
    link: { label: "Project", url: "https://lixin.ai/WirelessMathBench-XL/" } },
  { date: "May 2025", text: "WirelessMathBench was accepted to Findings of ACL 2025.",
    link: { label: "Project", url: "https://lixin.ai/WirelessMathBench/" } },
];
