// The group; Xin Li decides changes to this list. Jiancheng An (UESTC since Feb 2026) and Li Wei (Zhejiang University since
// June 2026) stay listed as members with their current affiliations (Xin, 11-21).
export type Person = {
  id: string;
  name: string;
  role?: string;   // left out when the current title is not public
  group: "lead" | "member" | "advisor";
  affiliation: string;
  url?: string;
  bio?: string;
  photo?: string;   // a public photo the person uses; otherwise their field signature is shown
  // where the photo comes from, and whether the person agreed to it being used here. Only "given" photos
  // appear on the public site; "pending" ones show in the private preview, marked as such.
  photoSource?: { page: string; image: string; kind: string; consent: "given" | "pending" };
};

const EEE = "School of EEE, NTU";

export const PEOPLE: Person[] = [
  { id: "xin-li", name: "Xin Li", role: "Lead · PhD student", group: "lead", affiliation: EEE, url: "https://lixin.ai/", photo: "people/xin-li.webp",
    photoSource: { page: "https://lixin.ai/about.html", image: "https://lixin.ai/data/avatar-280.webp", kind: "personal homepage", consent: "given" },
    bio: "Works on LLM agents: benchmarks that evaluate them, training that improves them, and systems in which they work together. Leads OpenMaxwell." },
  { id: "mengbing-liu", name: "Mengbing Liu", role: "PhD student", group: "member", affiliation: EEE, photo: "people/mengbing-liu.webp",
    photoSource: { page: "https://liumengbing.com/", image: "https://liumengbing.com/images/mengbing_new.png", kind: "personal homepage", consent: "given" },
    bio: "Machine learning applications for wireless communications." },
  { id: "yiyang-zhu", name: "Yiyang Zhu", role: "PhD student", group: "member", affiliation: EEE, photo: "people/yiyang-zhu.webp",
    photoSource: { page: "https://scholar.google.com/citations?user=LWh42_8AAAAJ", image: "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=LWh42_8AAAAJ&citpid=3", kind: "Google Scholar", consent: "given" } },
  { id: "wenhe-zhang", name: "Wenhe Zhang", role: "Master's student", group: "member", affiliation: EEE },
  { id: "li-wei", name: "Li Wei", group: "member", affiliation: "Zhejiang University" },
  { id: "jiancheng-an", name: "Jiancheng An", role: "Professor", group: "member", affiliation: "School of Electronic Science and Engineering, UESTC", photo: "people/jiancheng-an.webp",
    photoSource: { page: "https://jiancheng-an.github.io/", image: "https://jiancheng-an.github.io/images/JianchengAn.jpg", kind: "personal homepage", consent: "given" } },
  { id: "chau-yuen", name: "Chau Yuen", role: "Advisor · Professor", group: "advisor", affiliation: EEE, url: "https://blogs.ntu.edu.sg/chau-yuen/", photo: "people/chau-yuen.webp",
    photoSource: { page: "https://dr.ntu.edu.sg/entities/person/Chau-Yuen", image: "https://dr.ntu.edu.sg/bitstreams/b82deac6-9c65-4c21-b248-6c47f89ea76c/download", kind: "official NTU page (DR-NTU)", consent: "given" } },
];

export const byName = new Map(PEOPLE.map((p) => [p.name, p]));
