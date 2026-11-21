// Everything the pages say about the group, in one place. Facts here are checked against arXiv, the project
// sites and Xin Li's homepage (lixin.ai); leave a field empty rather than guess.

export const SITE = {
  name: "OpenMaxwell",
  short: "Maxwell",
  line: "LLMs and agents for wireless",
  description:
    "OpenMaxwell is an open research group on large language models and agents for wireless communications, " +
    "led by Xin Li at Nanyang Technological University, Singapore.",
  // GitHub organisation: may be renamed to open-maxwell; change it here only.
  github: "https://github.com/project-maxwell",
  githubName: "project-maxwell",
  lead: { name: "Xin Li", url: "https://lixin.ai/", email: "xin019@e.ntu.edu.sg" },
  institution: { name: "Nanyang Technological University", place: "Singapore", url: "https://www.ntu.edu.sg/" },
  founded: 2025,
  logo: "b" as "a" | "b", // which logo variant the site uses until Xin picks one (see /logo in the preview)
};

export type Direction = { id: string; n: string; name: string; question: string };
export const DIRECTIONS: Direction[] = [
  { id: "reasoning", n: "01", name: "Reasoning", question: "Can a model derive the equations an engineer would write, and can we tell when it has not?" },
  { id: "perception", n: "02", name: "Perception", question: "Can a model infer the radio field a city shapes from what an image or a few measurements show?" },
  { id: "agents", n: "03", name: "Agents", question: "How should agents exchange messages and tasks across a network, and what has to be standard?" },
];
