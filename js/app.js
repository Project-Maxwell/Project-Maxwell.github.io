// Main application JavaScript for Project Maxwell
// Handles theme switching, navigation, and common functionality

class ProjectMaxwellApp {
    constructor() {
        this.theme = 'light';
        this.init();
    }

    init() {
        this.initTheme();
        this.initNavigation();
        this.initScrollEffects();
        this.initAnimations();
        this.initFooter();
        this.loadHomePage();
    }

    // Theme Management
    initTheme() {
        // Check for saved theme preference or default to 'light'
        this.theme = localStorage.getItem('project-maxwell-theme') || 'light';

        // Check system preference if no saved preference
        // if (!localStorage.getItem('project-maxwell-theme')) {
        //     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //         this.theme = 'dark';
        //     }
        // }

        this.applyTheme();
        this.setupThemeToggle();
    }

    applyTheme() {
        const root = document.documentElement;

        if (this.theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Update theme toggle icons
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');

        if (sunIcon && moonIcon) {
            if (this.theme === 'dark') {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            } else {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            }
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });

            // Add accessibility attributes
            themeToggle.setAttribute('aria-label', i18n.t('a11y.toggle_theme'));
            themeToggle.setAttribute('title', i18n.t('a11y.toggle_theme'));
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('project-maxwell-theme', this.theme);
        this.applyTheme();

        // Trigger custom event
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: this.theme }
        }));
    }

    // Navigation Management
    initNavigation() {
        this.setupMobileMenu();
        this.setupActiveNavLinks();
        this.setupSmoothScrolling();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');

                if (isHidden) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'true');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Add accessibility attributes
            mobileMenuBtn.setAttribute('aria-label', i18n.t('a11y.toggle_menu'));
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-controls', 'mobileMenu');
        }
    }

    setupActiveNavLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            // Remove active class from all links first
            link.classList.remove('active');

            // Add active class to current page link
            if (
                (currentPath === '/' && href === '/') ||
                (currentPath === '/index.html' && href === '/') ||
                (currentPath.includes('papers') && href === 'papers.html') ||
                (currentPath.includes('people') && href === 'people.html')
            ) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll Effects
    initScrollEffects() {
        // Add scroll class to navigation
        const nav = document.querySelector('nav');
        if (nav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        }

        // Parallax effect for hero section (subtle)
        const hero = document.querySelector('.hero-section, .relative.py-20');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Animation Management
    initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    // Add staggered animation for cards
                    const cards = entry.target.querySelectorAll('.paper-card, .person-name-card, .academic-metric');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-slide-up');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.paper-card, .person-card, .person-name-card, .academic-metric, section').forEach(el => {
            observer.observe(el);
        });
    }

    // Footer Management
    initFooter() {
        // Update current year in footer
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    // Home Page Specific Functions
    loadHomePage() {
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            this.loadFeaturedPapers();
            this.loadPeopleStrip();
        }
    }

    loadFeaturedPapers() {
        const container = document.getElementById('featuredPapers');
        if (!container) return;

        const featuredPapers = projectData.getFeaturedPapers();
        container.innerHTML = '';

        featuredPapers.forEach(paper => {
            const paperCard = this.createPaperCard(paper, true);
            container.appendChild(paperCard);
        });
    }

    loadPeopleStrip() {
        const container = document.getElementById('peopleStrip');
        if (!container) return;

        const allPeople = [...projectData.getPeopleByType('lead'), ...projectData.getTeamMembers(), ...projectData.getPeopleByType('advisor')];
        container.innerHTML = '';

        allPeople.forEach(person => {
            const nameCard = this.createPersonNameCard(person);
            container.appendChild(nameCard);
        });
    }

    // Card Creation Functions
    createPaperCard(paper, isFeatured = false) {
        const card = document.createElement('div');
        card.className = 'paper-card animate-fade-in';

        const title = paper.title;
        const subtitle = paper.subtitle;
        const keywords = paper.keywords;

        card.innerHTML = `
            <div class="flex flex-col h-full">
                <div class="flex-1">
                    <div class="flex items-start justify-between mb-4">
                        <span class="status-badge status-${paper.status}">
                            ${projectData.getStatusText(paper.status, 'en')}
                        </span>
                        <div class="text-right">
                            <div class="venue-badge mb-1">${paper.year}</div>
                            ${paper.venue ? `<div class="academic-caption text-xs text-slate-500 dark:text-slate-400">${paper.venue}</div>` : ''}
                        </div>
                    </div>

                    <h3 class="academic-heading text-xl font-semibold text-slate-900 dark:text-white mb-3 leading-tight">
                        ${title}
                    </h3>

                    <p class="academic-body text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                        ${subtitle}
                    </p>

                    <div class="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                        <p class="academic-caption text-xs mb-1 text-slate-500 dark:text-slate-400">
                            AUTHORS
                        </p>
                        <p class="academic-body text-sm text-slate-700 dark:text-slate-300">
                            ${projectData.getFormattedAuthors(paper.authors)}
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2 mb-6">
                        ${keywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mt-auto pt-4 border-t border-slate-200 dark:border-slate-600">
                    ${this.createPaperLinks(paper.links)}
                </div>
            </div>
        `;

        return card;
    }

    createPaperLinks(links) {
        const linkButtons = [];

        if (links.website) {
            linkButtons.push(`
                <a href="${links.website}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="link-btn link-btn-primary"
                   aria-label="${i18n.t('paper.links.website')} - ${i18n.t('common.new_tab')}">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    ${i18n.t('paper.links.website')}
                </a>
            `);
        }

        ['pdf', 'code', 'poster', 'slides', 'video'].forEach(type => {
            if (links[type]) {
                linkButtons.push(`
                    <a href="${links[type]}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="link-btn link-btn-secondary"
                       aria-label="${i18n.t(`paper.links.${type}`)} - ${i18n.t('common.new_tab')}">
                        ${i18n.t(`paper.links.${type}`)}
                    </a>
                `);
            }
        });

        return linkButtons.join('');
    }

    createPersonAvatar(person) {
        const avatar = document.createElement('div');
        avatar.className = 'avatar avatar-small cursor-pointer';
        avatar.setAttribute('title', person.name);
        avatar.setAttribute('aria-label', person.name);

        if (person.photo) {
            avatar.innerHTML = `<img src="${person.photo}" alt="${person.name}" class="w-full h-full object-cover rounded-full">`;
        } else {
            avatar.textContent = projectData.generateInitials(person.name);
        }

        // Add click handler to navigate to people page
        avatar.addEventListener('click', () => {
            window.location.href = 'people.html';
        });

        return avatar;
    }

    createPersonNameCard(person) {
        const nameCard = document.createElement('div');
        nameCard.className = 'person-name-card group animate-slide-up';
        nameCard.setAttribute('title', person.name);
        nameCard.setAttribute('aria-label', person.name);

        const role = person.role;
        const roleColor = this.getRoleColor(role);

        nameCard.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="avatar avatar-small bg-gradient-to-br ${roleColor} flex items-center justify-center text-white font-semibold text-sm ring-2 ring-white dark:ring-slate-800 group-hover:ring-4 transition-all duration-300">
                    ${person.photo ? `<img src="${person.photo}" alt="${person.name}" class="w-full h-full object-cover rounded-full">` : projectData.generateInitials(person.name)}
                </div>
                <div class="text-left">
                    <div class="academic-body text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        ${person.name}
                    </div>
                    <div class="academic-caption text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        ${role}
                    </div>
                    ${person.affiliation ? `<div class="academic-caption text-xs text-slate-400 dark:text-slate-500 mt-0.5">${person.affiliation}</div>` : ''}
                </div>
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </div>
            </div>
        `;

        // Add click handler to navigate to people page
        nameCard.addEventListener('click', () => {
            window.location.href = 'people.html';
        });

        return nameCard;
    }

    getRoleColor(role) {
        const roleColors = {
            'Principal Investigator': 'from-blue-600 to-blue-800',
            'Lead Researcher': 'from-purple-600 to-purple-800',
            'Research Assistant': 'from-green-600 to-green-800',
            'PhD Student': 'from-orange-600 to-orange-800',
            'Master Student': 'from-teal-600 to-teal-800',
            'Visiting Researcher': 'from-indigo-600 to-indigo-800',
            'default': 'from-slate-600 to-slate-800'
        };
        return roleColors[role] || roleColors['default'];
    }

    // Utility Functions
    showLoading(container) {
        container.innerHTML = `
            <div class="flex items-center justify-center py-12">
                <div class="text-slate-500 dark:text-slate-400">
                    ${i18n.t('common.loading')}
                </div>
            </div>
        `;
    }

    showError(container, message = null) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12">
                <div class="text-slate-500 dark:text-slate-400 mb-4">
                    ${message || i18n.t('common.error')}
                </div>
                <button onclick="location.reload()" class="btn-outline">
                    ${i18n.t('common.try_again')}
                </button>
            </div>
        `;
    }

    // Event Listeners
    setupEventListeners() {
        // Listen for theme changes
        window.addEventListener('themeChanged', () => {
            // Any theme-specific updates can go here
        });
    }
}

// Initialize the application when DOM is loaded
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new ProjectMaxwellApp();
    });
} else {
    app = new ProjectMaxwellApp();
}

// Export for use in other scripts
window.ProjectMaxwellApp = ProjectMaxwellApp;