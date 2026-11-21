// Papers, newest first; the first FEATURED appear on the home page.
// Sources: arXiv abstracts (2505.14354, 2509.23219, 2510.13821), radiovista.github.io, lixin.ai, and Xin Li for Radio2Map.
// Radio2Map: arXiv submission on hold, no identifier yet; add `paper` when it has one.
export type Paper = {
  id: string;
  name: string;           // short name shown large
  title: string;          // full title
  authors: string[];      // exactly as on the paper; `*` = equal contribution
  venue: string;          // "Preprint" when there is no venue
  year: number;
  direction: "reasoning" | "perception" | "agents";
  summary?: string;       // one or two sentences, from the paper or its project page
  links: { label: "Project" | "Paper" | "Code" | "Data"; url: string }[];
  // a figure from the paper or its project page (public), and where it comes from
  figure?: { src: string; w: number; h: number; alt: string; caption: string; source: string; fit?: "cover" | "contain";
    card?: string };   // a 1200 x 750 crop (or, for LACP, a redraw of the paper's figure) for the cards in direction B
  // key numbers, each stated in the paper's abstract or on its project page
  stats?: { value: string; label: string }[];
};

export const PAPERS: Paper[] = [
  {
    id: "wirelessmathbench-xl",
    name: "WirelessMathBench-XL",
    title: "WirelessMathBench-XL: An Auditable Benchmark for Wireless Mathematical Reasoning",
    authors: ["Xin Li", "Mengbing Liu", "Yiyang Zhu", "Wenhe Zhang", "Li Wei", "Jiancheng An", "Chau Yuen"],
    venue: "NeurIPS 2026",
    year: 2026,
    direction: "reasoning",
    summary:
      "4,027 problems drawn from 836 arXiv papers across 20 wireless subfields, each carrying its own text-overlap " +
      "evidence against public pretraining data, so a score can be audited rather than trusted.",
    figure: { card: "figures/wmbxl-card.webp", src: "figures/wmbxl-overview.webp", w: 1400, h: 593, fit: "contain",
      alt: "Pipeline: paper collection, formula extraction, quality assurance",
      caption: "How the benchmark is built: papers collected, formulas extracted, every problem screened.",
      source: "https://lixin.ai/WirelessMathBench-XL/" },
    links: [
      { label: "Project", url: "https://lixin.ai/WirelessMathBench-XL/" },
      { label: "Paper", url: "https://arxiv.org/abs/2509.23219" },
      { label: "Code", url: "https://github.com/LiXin97/WirelessMathBench-XL" },
      { label: "Data", url: "https://huggingface.co/datasets/XINLI1997/WirelessMATHBench-XL" },
    ],
  },
  {
    id: "radiovista",
    name: "RadioVISTA",
    title: "Seeing the Invisible: How Vision-Language Models Read, Predict and Trace Radio Fields",
    authors: ["Yiyang Zhu", "Xin Li", "Guangyuan Liu", "Ziheng Liu", "Jiayi Zhang", "Chau Yuen"],
    venue: "Preprint",
    year: 2026,
    direction: "perception",
    summary:
      "A benchmark and training dataset for visual reasoning about invisible radio fields, built by an engine that " +
      "turns any coordinate on Earth into a ray-traceable city.",
    figure: { card: "figures/radiovista-rome.webp", src: "figures/radiovista-rome.webp", w: 1200, h: 750, fit: "cover",
      alt: "Rome: the ray-traced radio field (left) and the rendered city (right)",
      caption: "Rome, 2 km across: the ray-traced radio field (left) and the city it comes from (right).",
      source: "https://radiovista.github.io/" },
    stats: [
      { value: "100", label: "cities on 6 continents" },
      { value: "12", label: "tasks with exact answers" },
      { value: "19", label: "models evaluated" },
    ],
    links: [{ label: "Project", url: "https://radiovista.github.io/" }],
  },
  {
    id: "radio2map",
    name: "Radio2Map",
    title: "Radio2Map: Reading 3D Cities from Sparse Radio Measurements with an Image Editor",
    authors: ["Xin Li", "Yiyang Zhu", "Chau Yuen"],
    venue: "Preprint",
    year: 2026,
    direction: "perception",
    links: [],
  },
  {
    id: "lacp",
    name: "LACP",
    title: "LLM Agent Communication Protocol (LACP) Requires Urgent Standardization: A Telecom-Inspired Protocol is Necessary",
    authors: ["Xin Li", "Mengbing Liu", "Chau Yuen"],
    venue: "AI4NextG @ NeurIPS 2025",
    year: 2025,
    direction: "agents",
    summary:
      "A position paper: LLM agents need one telecom-style communication standard before today's ad-hoc protocols " +
      "entrench. LACP has three layers (semantic, transactional, transport) with authentication and transactional " +
      "integrity in the core.",
    figure: { card: "figures/lacp-card.webp", src: "figures/lacp-layers.webp", w: 1600, h: 223, fit: "contain",
      alt: "LACP's three layers: semantic, transactional, transport",
      caption: "The three layers of LACP.",
      source: "https://lixin.ai/LACP/" },
    links: [
      { label: "Project", url: "https://lixin.ai/LACP/" },
      { label: "Paper", url: "https://arxiv.org/abs/2510.13821" },
    ],
  },
  {
    id: "wirelessmathbench",
    name: "WirelessMathBench",
    title: "WirelessMathBench: A Mathematical Modeling Benchmark for LLMs in Wireless Communications",
    authors: ["Xin Li", "Mengbing Liu", "Li Wei", "Jiancheng An", "Mérouane Debbah", "Chau Yuen"],
    venue: "ACL 2025 Findings",
    year: 2025,
    direction: "reasoning",
    summary: "The first benchmark for LLM mathematical modeling in wireless communications; WirelessMathBench-XL extends it.",
    figure: { card: "figures/wmb-card.webp", src: "figures/wmb-example.webp", w: 1200, h: 748, fit: "cover",
      alt: "Example problem: wireless channel reflection modelling, with a multiple-choice question",
      caption: "An example problem: model the effective channel of a double-RIS system.",
      source: "https://lixin.ai/WirelessMathBench/" },
    stats: [
      { value: "587", label: "questions" },
      { value: "40", label: "source papers" },
      { value: "38.05%", label: "best accuracy (DeepSeek-R1)" },
    ],
    links: [
      { label: "Project", url: "https://lixin.ai/WirelessMathBench/" },
      { label: "Paper", url: "https://arxiv.org/abs/2505.14354" },
      { label: "Code", url: "https://github.com/LiXin97/WirelessMathBench" },
      { label: "Data", url: "https://huggingface.co/datasets/XINLI1997/WirelessMathBench" },
    ],
  },
];

export const FEATURED = 5;
