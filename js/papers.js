// Papers page JavaScript for Project Maxwell
// Handles loading and displaying all papers

class PapersPage {
    constructor() {
        this.init();
    }

    init() {
        this.loadPapers();
        this.setupEventListeners();
    }

    loadPapers() {
        const container = document.getElementById('papersGrid');
        if (!container) return;

        // Show loading state
        this.showLoading(container);

        // Simulate loading delay for better UX
        setTimeout(() => {
            try {
                this.renderPapers(container);
            } catch (error) {
                this.showError(container);
                console.error('Error loading papers:', error);
            }
        }, 300);
    }

    renderPapers(container) {
        const papers = projectData.papers;
        container.innerHTML = '';

        if (papers.length === 0) {
            this.showEmptyState(container);
            return;
        }

        papers.forEach((paper, index) => {
            const paperCard = this.createPaperCard(paper);
            paperCard.style.animationDelay = `${index * 100}ms`;
            paperCard.classList.add('animate-slide-up');
            container.appendChild(paperCard);

            // Add JSON-LD for each paper
            this.addPaperStructuredData(paper);
        });
    }

    createPaperCard(paper) {
        const card = document.createElement('div');
        card.className = 'paper-card';

        const title = paper.title;
        const subtitle = paper.subtitle;
        const abstract = paper.abstract;
        const keywords = paper.keywords;

        card.innerHTML = `
            <article class="h-full flex flex-col">
                <!-- Header -->
                <header class="mb-4">
                    <div class="flex items-start justify-between mb-3">
                        <span class="status-badge status-${paper.status}">
                            ${projectData.getStatusText(paper.status, 'en')}
                        </span>
                        <div class="text-right text-sm text-slate-500 dark:text-slate-400">
                            <div>${paper.year}</div>
                            ${paper.venue ? `<div class="mt-1">${paper.venue}</div>` : ''}
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        ${title}
                    </h2>

                    <h3 class="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                        ${subtitle}
                    </h3>
                </header>

                <!-- Content -->
                <div class="flex-1">
                    <!-- Authors -->
                    <div class="mb-4">
                        <h4 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            ${i18n.t('paper.authors')}:
                        </h4>
                        <div class="text-sm text-slate-600 dark:text-slate-400">
                            ${this.formatAuthorsWithTooltip(paper.authors)}
                        </div>
                    </div>

                    <!-- Abstract -->
                    ${abstract ? `
                        <div class="mb-4">
                            <h4 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Abstract:
                            </h4>
                            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                ${abstract}
                            </p>
                        </div>
                    ` : ''}

                    <!-- Keywords -->
                    <div class="mb-6">
                        <h4 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            ${i18n.t('paper.keywords')}:
                        </h4>
                        <div class="flex flex-wrap gap-2">
                            ${keywords.map(keyword => `
                                <span class="keyword-tag">${keyword}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Footer with Links -->
                <footer class="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div class="flex flex-wrap gap-2">
                        ${this.createPaperLinks(paper.links)}
                    </div>
                </footer>
            </article>
        `;

        return card;
    }

    formatAuthorsWithTooltip(authors) {
        const maxVisibleAuthors = 4;
        const authorElements = [];

        authors.forEach((author, index) => {
            if (index < maxVisibleAuthors) {
                // Try to link to person page if they're in our team
                const person = projectData.people.find(p => p.name === author);
                if (person) {
                    authorElements.push(`
                        <a href="people.html#${person.id}"
                           class="text-primary-600 dark:text-primary-400 hover:underline">
                            ${author}
                        </a>
                    `);
                } else {
                    authorElements.push(author);
                }
            }
        });

        let result = authorElements.join(', ');

        if (authors.length > maxVisibleAuthors) {
            const remainingCount = authors.length - maxVisibleAuthors;
            const remainingAuthors = authors.slice(maxVisibleAuthors).join(', ');

            result += `, <span class="relative group cursor-help">
                <span class="text-slate-500 dark:text-slate-400">
                    +${remainingCount} more
                </span>
                <div class="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                    <div class="bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                        ${remainingAuthors}
                        <div class="absolute top-full left-4 w-2 h-2 bg-slate-900 dark:bg-slate-700 transform rotate-45"></div>
                    </div>
                </div>
            </span>`;
        }

        return result;
    }

    createPaperLinks(links) {
        const linkButtons = [];

        // Primary link (website) - always first and prominent
        if (links.website) {
            linkButtons.push(`
                <a href="${links.website}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="link-btn link-btn-primary"
                   aria-label="${i18n.t('paper.links.website')} - ${i18n.t('common.new_tab')}">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    ${i18n.t('paper.links.website')}
                </a>
            `);
        }

        // Secondary links
        const secondaryLinks = [
            { key: 'pdf', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
            { key: 'code', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
            { key: 'poster', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { key: 'slides', icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1M7 4h10M9 9h6m-6 3h6m-6 3h4' },
            { key: 'video', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' }
        ];

        secondaryLinks.forEach(({ key, icon }) => {
            if (links[key]) {
                linkButtons.push(`
                    <a href="${links[key]}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="link-btn link-btn-secondary"
                       aria-label="${i18n.t(`paper.links.${key}`)} - ${i18n.t('common.new_tab')}">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}" />
                        </svg>
                        ${i18n.t(`paper.links.${key}`)}
                    </a>
                `);
            }
        });

        return linkButtons.join('');
    }

    addPaperStructuredData(paper) {
        const structuredData = projectData.generatePaperSchema(paper);
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    showLoading(container) {
        container.innerHTML = `
            <div class="col-span-full flex items-center justify-center py-16">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <div class="text-slate-500 dark:text-slate-400">
                        ${i18n.t('common.loading')}
                    </div>
                </div>
            </div>
        `;
    }

    showError(container) {
        container.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="text-center max-w-md">
                    <svg class="h-12 w-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">
                        ${i18n.t('common.error')}
                    </h3>
                    <p class="text-slate-500 dark:text-slate-400 mb-6">
                        Unable to load papers. Please try again.
                    </p>
                    <button onclick="location.reload()" class="btn-outline">
                        ${i18n.t('common.try_again')}
                    </button>
                </div>
            </div>
        `;
    }

    showEmptyState(container) {
        container.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-16">
                <div class="text-center max-w-md">
                    <svg class="h-12 w-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">
                        No papers available
                    </h3>
                    <p class="text-slate-500 dark:text-slate-400">
                        Check back later for new research publications.
                    </p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Handle URL hash for deep linking to specific papers
        if (window.location.hash) {
            const paperId = window.location.hash.substring(1);
            setTimeout(() => {
                const paperElement = document.getElementById(paperId);
                if (paperElement) {
                    paperElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }
    }
}

// Initialize papers page when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PapersPage();
    });
} else {
    new PapersPage();
}