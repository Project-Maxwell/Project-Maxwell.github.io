// Text content for Project Maxwell
// English-only version

const i18n = {
    currentLang: 'en',

    translations: {
        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.papers': 'Papers',
            'nav.people': 'People',

            // Hero Section
            'hero.subtitle': 'Pioneering research at the intersection of LLMs for wireless communications',
            'hero.cta.papers': 'Explore Papers',
            'hero.cta.people': 'Meet the Team',

            // Sections
            'sections.papers.title': 'Featured Research',
            'sections.papers.subtitle': 'Our latest contributions to LLMs for wireless communications research',
            'sections.papers.view_all': 'View All Papers',
            'sections.people.title': 'Research Team',
            'sections.people.subtitle': 'Meet the researchers driving innovation in LLMs for wireless communications',
            'sections.people.view_all': 'Meet the Team',

            // Pages
            'pages.papers.title': 'Research Papers',
            'pages.papers.subtitle': 'Our contributions to advancing LLMs for wireless communications research',
            'pages.people.title': 'Research Team',
            'pages.people.subtitle': 'Meet the researchers driving innovation in LLMs for wireless communications',
            'pages.people.team_members': 'Team Members',
            'pages.people.advisor': 'Advisor',

            // Paper Card
            'paper.status.released': 'Published',
            'paper.status.preprint': 'Preprint',
            'paper.status.in_submission': 'In Submission',
            'paper.links.website': 'Website',
            'paper.links.pdf': 'PDF',
            'paper.links.code': 'Code',
            'paper.links.poster': 'Poster',
            'paper.links.slides': 'Slides',
            'paper.links.video': 'Video',
            'paper.authors': 'Authors',
            'paper.keywords': 'Keywords',
            'paper.year': 'Year',
            'paper.venue': 'Venue',

            // Person Card
            'person.role.lead': 'Lead / PhD Student',
            'person.role.phd': 'PhD Student',
            'person.role.advisor': 'Advisor',
            'person.role.researcher': 'Researcher',
            'person.links.homepage': 'Homepage',
            'person.links.scholar': 'Google Scholar',
            'person.links.github': 'GitHub',
            'person.links.twitter': 'Twitter',
            'person.links.email': 'Email',

            // Footer
            'footer.description': 'Advancing the frontiers of wireless communications through LLM research',
            'footer.links.title': 'Links',
            'footer.contact.title': 'Contact',
            'footer.contact.affiliation': 'School of EEE, Nanyang Technological University',
            'footer.copyright': 'All rights reserved.',

            // Common
            'common.loading': 'Loading...',
            'common.error': 'Error loading content',
            'common.try_again': 'Try Again',
            'common.external_link': 'External Link',
            'common.new_tab': 'Opens in new tab',

            // Accessibility
            'a11y.toggle_theme': 'Toggle dark/light theme',
            'a11y.toggle_language': 'Toggle language',
            'a11y.toggle_menu': 'Toggle mobile menu',
            'a11y.skip_to_content': 'Skip to main content',
        }
    },

    // Initialize text content system
    init() {
        this.currentLang = 'en';
        this.updateLanguage();
    },

    // Get translation for a key
    t(key) {
        const translation = this.translations[this.currentLang][key];
        return translation || key;
    },


    // Update all text elements with translations
    updateLanguage() {
        // Update document language
        document.documentElement.lang = 'en';

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            element.textContent = translation;
        });

        // Update page title
        this.updatePageTitle();

        // Update meta description
        this.updateMetaDescription();
    },

    // Update page title based on current page
    updatePageTitle() {
        const path = window.location.pathname;
        let titleKey = 'Project Maxwell';

        if (path.includes('papers')) {
            titleKey = 'Papers - Project Maxwell';
        } else if (path.includes('people')) {
            titleKey = 'People - Project Maxwell';
        } else {
            titleKey = 'Project Maxwell - Advanced Research in LLMs for Wireless Communications';
        }

        document.title = titleKey;
    },

    // Update meta description
    updateMetaDescription() {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const path = window.location.pathname;
            let description = '';

            if (path.includes('papers')) {
                description = 'Research papers from Project Maxwell: cutting-edge work in LLMs for wireless communications, including WirelessMathBench, LACP, and WirelessMathLM.';
            } else if (path.includes('people')) {
                description = 'Meet the research team behind Project Maxwell: leading experts in LLMs for wireless communications from NTU Singapore.';
            } else {
                description = 'Project Maxwell: Pioneering research at the intersection of LLMs for wireless communications, featuring cutting-edge mathematical modeling and benchmarking.';
            }

            metaDesc.setAttribute('content', description);
        }
    },

    // Format date in English locale
    formatDate(date, options = {}) {
        return new Intl.DateTimeFormat('en-US', options).format(date);
    },

    // Format number in English locale
    formatNumber(number, options = {}) {
        return new Intl.NumberFormat('en-US', options).format(number);
    },

    // Get content from data objects (English only)
    getLocalizedContent(obj, key) {
        return obj[key] || '';
    }
};

// Initialize i18n when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
    i18n.init();
}

// Export for use in other scripts
window.i18n = i18n;