// Data structures for Project Maxwell
// Contains all papers and people information

const projectData = {
    papers: [
        {
            id: 'wirelessmathbench',
            slug: 'wirelessmathbench',
            title: 'WirelessMathBench',
            subtitle: 'A Mathematical Modeling Benchmark for LLMs in Wireless Communications',
            status: 'released',
            year: 2025,
            venue: 'ACL 2025 Findings',
            authors: ['Xin Li', 'Mengbing Liu', 'Li Wei', 'Jiancheng An', 'Mérouane Debbah', 'Chau Yuen'],
            links: {
                website: 'https://lixin.ai/WirelessMathBench/',
                pdf: null,
                code: null,
                poster: null,
                slides: null,
                video: null
            },
            keywords: ['Wireless', 'Mathematical Reasoning', 'Benchmark'],
            abstract: 'A comprehensive benchmark for evaluating the mathematical modeling capabilities of Large Language Models in wireless communications scenarios.'
        },
        {
            id: 'lacp',
            slug: 'lacp',
            title: 'LLM Agent Communication Protocol (LACP)',
            subtitle: 'Requires Urgent Standardization: A Telecom-Inspired Protocol is Necessary',
            status: 'released',
            year: 2025,
            venue: 'AI4NextG @ NeurIPS 2025',
            authors: ['Xin Li', 'Mengbing Liu', 'Chau Yuen'],
            links: {
                website: 'https://lixin.ai/LACP/',
                pdf: null,
                code: null,
                poster: null,
                slides: null,
                video: null
            },
            keywords: ['LLM Agents', 'Communication Protocol', 'Telecom'],
            abstract: 'A standardization proposal for LLM agent communication protocols inspired by telecommunications infrastructure.'
        },
        {
            id: 'wirelessmathlm',
            slug: 'wirelessmathlm',
            title: 'WirelessMathLM',
            subtitle: 'Teaching Mathematical Reasoning for LLMs in Wireless Communications with Reinforcement Learning',
            status: 'preprint',
            year: 2025,
            venue: null,
            authors: ['Xin Li', 'Mengbing Liu', 'Yiyang Zhu', 'Wenhe Zhang', 'Li Wei', 'Jiancheng An', 'Chau Yuen'],
            links: {
                website: 'https://lixin.ai/WirelessMathLM/',
                pdf: null,
                code: null,
                poster: null,
                slides: null,
                video: null
            },
            keywords: ['Language Model', 'Mathematical Reasoning', 'Reinforcement Learning', 'Wireless'],
            abstract: 'A research work on teaching mathematical reasoning capabilities to LLMs in wireless communications using reinforcement learning techniques.'
        }
    ],

    people: [
        {
            id: 'xin-li',
            name: 'Xin Li',
            role: 'Lead / PhD Student',
            affiliation: 'School of EEE, Nanyang Technological University, Singapore',
            links: {
                homepage: 'https://lixin.ai/',
                scholar: null,
                github: null,
                twitter: null,
                email: null
            },
            photo: null,
            bio: 'PhD student at NTU Singapore, focusing on the intersection of LLMs for wireless communications.',
            order: 1,
            type: 'member'
        },
        {
            id: 'mengbing-liu',
            name: 'Mengbing Liu',
            role: 'PhD Student',
            affiliation: 'School of EEE, Nanyang Technological University, Singapore',
            links: {
                homepage: null,
                scholar: null,
                github: null,
                twitter: null,
                email: null
            },
            photo: null,
            bio: 'PhD student specializing in machine learning applications for wireless communications.',
            order: 2,
            type: 'member',
        },
        {
            id: 'yiyang-zhu',
            name: 'Yiyang Zhu',
            role: 'PhD Student',
            affiliation: 'School of EEE, Nanyang Technological University, Singapore',
            links: {
                homepage: null,
                scholar: null,
                github: null,
                twitter: null,
                email: null
            },
            photo: null,
            bio: '',
            order: 3,
            type: 'member',
        },
        {
            id: 'wenhe-zhang',
            name: 'Wenhe Zhang',
            role: 'Master Student',
            affiliation: 'School of EEE, Nanyang Technological University, Singapore',
            links: {
                homepage: null,
                scholar: null,
                github: null,
                twitter: null,
                email: null
            },
            photo: null,
            bio: '',
            order: 4,
            type: 'member',
        },
        {
            id: 'li-wei',
            name: 'Li Wei',
            role: 'Postdoctoral Researcher',
            affiliation: 'School of EEE, Nanyang Technological University, Singapore',
            links: {
                homepage: null,
                scholar: null,
                github: null,
                twitter: null,
                email: null
            },
            photo: null,
            bio: '',
            order: 5,
            type: 'member',
        },
        {
            id: 'jiancheng-an',
            name: 'Jiancheng An',
            role: 'Postdoctoral Researcher',
            affiliation: 'School of EEE, Nanyang Technological University, Singapore',
            links: {
                homepage: null,
                scholar: null,
                github: null,
                twitter: null,
                email: null
            },
            photo: null,
            bio: '',
            order: 6,
            type: 'member',
        },
        {
            id: 'chau-yuen',
            name: 'Chau Yuen',
            role: 'Advisor / Professor',
            affiliation: 'School of EEE, Nanyang Technological University, Singapore',
            links: {
                homepage: null,
                scholar: null,
                github: null,
                twitter: null,
                email: null
            },
            photo: null,
            bio: '',
            order: 8,
            type: 'member'
        }
    ],

    // Helper functions
    getPaperById(id) {
        return this.papers.find(paper => paper.id === id);
    },

    getPersonById(id) {
        return this.people.find(person => person.id === id);
    },

    getPapersByStatus(status) {
        return this.papers.filter(paper => paper.status === status);
    },

    getPeopleByType(type) {
        return this.people.filter(person => person.type === type).sort((a, b) => a.order - b.order);
    },

    getLeadResearcher() {
        return this.people.find(person => person.type === 'lead');
    },

    getTeamMembers() {
        return this.people.filter(person => person.type === 'member').sort((a, b) => a.order - b.order);
    },

    getAdvisor() {
        return this.people.find(person => person.type === 'advisor');
    },

    getFeaturedPapers(limit = 3) {
        return this.papers.slice(0, limit);
    },

    // Generate avatar initials from name
    generateInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    },

    // Get status display text
    getStatusText(status, lang = 'en') {
        const statusMap = {
            en: {
                released: 'Published',
                preprint: 'Preprint',
                in_submission: 'In Submission'
            },
            cn: {
                released: '已发表',
                preprint: '预印本',
                in_submission: '投稿中'
            }
        };
        return statusMap[lang][status] || status;
    },

    // Get formatted author list
    getFormattedAuthors(authors, maxLength = 80) {
        const authorStr = authors.join(', ');
        if (authorStr.length <= maxLength) {
            return authorStr;
        }

        // Find the last complete author name that fits
        let truncated = authorStr.substring(0, maxLength);
        const lastCommaIndex = truncated.lastIndexOf(', ');
        if (lastCommaIndex > 0) {
            truncated = truncated.substring(0, lastCommaIndex);
        }

        return truncated + ', et al.';
    },

    // Generate schema.org structured data for papers
    generatePaperSchema(paper) {
        return {
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            "name": paper.title,
            "headline": paper.subtitle,
            "author": paper.authors.map(author => ({
                "@type": "Person",
                "name": author
            })),
            "url": paper.links.website,
            "datePublished": paper.year.toString(),
            "inLanguage": "en",
            "keywords": paper.keywords.join(", "),
            "abstract": paper.abstract,
            "publisher": {
                "@type": "Organization",
                "name": "Project Maxwell"
            }
        };
    },

    // Generate schema.org structured data for people
    generatePersonSchema(person) {
        return {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": person.name,
            "jobTitle": person.role,
            "affiliation": {
                "@type": "Organization",
                "name": person.affiliation
            },
            "url": person.links.homepage,
            "description": person.bio
        };
    }
};

// Export data for use in other scripts
window.projectData = projectData;