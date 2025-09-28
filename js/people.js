// People page JavaScript for Project Maxwell
// Handles loading and displaying team members

class PeoplePage {
    constructor() {
        this.init();
    }

    init() {
        this.loadPeople();
        this.setupEventListeners();
    }

    loadPeople() {
        // Show loading state for all sections
        this.showLoading(document.getElementById('leadResearcher'));
        this.showLoading(document.getElementById('teamMembers'));
        this.showLoading(document.getElementById('advisor'));

        // Simulate loading delay for better UX
        setTimeout(() => {
            try {
                this.renderPeople();
            } catch (error) {
                this.showError();
                console.error('Error loading people:', error);
            }
        }, 300);
    }

    renderPeople() {
        this.renderLeadResearcher();
        this.renderTeamMembers();
        this.renderAdvisor();
    }

    renderLeadResearcher() {
        const container = document.getElementById('leadResearcher');
        if (!container) return;

        const lead = projectData.getLeadResearcher();
        if (!lead) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = `
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-8" data-i18n="pages.people.lead">
                    Lead Researcher
                </h2>
            </div>
            <div class="flex justify-center">
                ${this.createPersonCard(lead, true)}
            </div>
        `;

        // Add JSON-LD for lead researcher
        this.addPersonStructuredData(lead);
    }

    renderTeamMembers() {
        const container = document.getElementById('teamMembers');
        if (!container) return;

        const members = projectData.getTeamMembers();
        container.innerHTML = '';

        if (members.length === 0) {
            container.innerHTML = '<p class="text-center text-slate-500 dark:text-slate-400">No team members to display.</p>';
            return;
        }

        members.forEach((member, index) => {
            const memberCard = this.createPersonCard(member);
            memberCard.style.animationDelay = `${index * 100}ms`;
            memberCard.classList.add('animate-slide-up');
            container.appendChild(memberCard);

            // Add JSON-LD for each member
            this.addPersonStructuredData(member);
        });
    }

    renderAdvisor() {
        const container = document.getElementById('advisor');
        if (!container) return;

        const advisor = projectData.getAdvisor();
        if (!advisor) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = `
            <div class="flex justify-center">
                ${this.createPersonCard(advisor, true)}
            </div>
        `;

        // Add JSON-LD for advisor
        this.addPersonStructuredData(advisor);
    }

    createPersonCard(person, isLarge = false) {
        const role = person.role;
        const affiliation = person.affiliation;
        const bio = person.bio;

        const cardSize = isLarge ? 'max-w-md mx-auto' : '';
        const avatarSize = isLarge ? 'avatar-large' : '';

        const cardElement = document.createElement('div');
        cardElement.className = `person-card ${cardSize}`;
        cardElement.id = person.id;

        cardElement.innerHTML = `
            <article class="h-full flex flex-col">
                <!-- Avatar -->
                <div class="mb-6">
                    ${this.createAvatar(person, avatarSize)}
                </div>

                <!-- Basic Info -->
                <header class="text-center mb-4">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        ${person.name}
                    </h3>
                    <p class="text-primary-600 dark:text-primary-400 font-medium mb-1">
                        ${role}
                    </p>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">
                        ${affiliation}
                    </p>
                </header>

                <!-- Bio -->
                ${bio ? `
                    <div class="flex-1 mb-6">
                        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed text-center">
                            ${bio}
                        </p>
                    </div>
                ` : '<div class="flex-1"></div>'}

                <!-- Social Links -->
                <footer class="mt-auto">
                    ${this.createSocialLinks(person.links)}
                </footer>
            </article>
        `;

        return cardElement;
    }

    createAvatar(person, sizeClass = '') {
        const avatarClass = `avatar ${sizeClass}`;

        if (person.photo) {
            return `
                <div class="${avatarClass}">
                    <img src="${person.photo}"
                         alt="${person.name}"
                         class="w-full h-full object-cover rounded-full"
                         loading="lazy">
                </div>
            `;
        } else {
            const initials = projectData.generateInitials(person.name);
            return `
                <div class="${avatarClass}" aria-label="${person.name}">
                    ${initials}
                </div>
            `;
        }
    }

    createSocialLinks(links) {
        const socialLinks = [];

        const linkConfigs = [
            {
                key: 'homepage',
                icon: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
                label: i18n.t('person.links.homepage')
            },
            {
                key: 'scholar',
                icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
                label: i18n.t('person.links.scholar')
            },
            {
                key: 'github',
                icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
                label: i18n.t('person.links.github')
            },
            {
                key: 'twitter',
                icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
                label: i18n.t('person.links.twitter')
            },
            {
                key: 'email',
                icon: 'M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                label: i18n.t('person.links.email')
            }
        ];

        linkConfigs.forEach(({ key, icon, label }) => {
            if (links[key]) {
                const href = key === 'email' ? `mailto:${links[key]}` : links[key];
                const isExternal = key !== 'email';

                socialLinks.push(`
                    <a href="${href}"
                       ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}
                       class="social-link"
                       aria-label="${label}${isExternal ? ' - ' + i18n.t('common.new_tab') : ''}"
                       title="${label}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}" />
                        </svg>
                    </a>
                `);
            }
        });

        if (socialLinks.length === 0) {
            return '<div class="h-10"></div>'; // Maintain consistent spacing
        }

        return `
            <div class="flex justify-center space-x-3">
                ${socialLinks.join('')}
            </div>
        `;
    }

    addPersonStructuredData(person) {
        const structuredData = projectData.generatePersonSchema(person);
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    showLoading(container) {
        if (!container) return;

        container.innerHTML = `
            <div class="flex items-center justify-center py-12">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <div class="text-slate-500 dark:text-slate-400">
                        ${i18n.t('common.loading')}
                    </div>
                </div>
            </div>
        `;
    }

    showError() {
        const containers = [
            document.getElementById('leadResearcher'),
            document.getElementById('teamMembers'),
            document.getElementById('advisor')
        ];

        containers.forEach(container => {
            if (container) {
                container.innerHTML = `
                    <div class="flex flex-col items-center justify-center py-12">
                        <div class="text-center max-w-md">
                            <svg class="h-12 w-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                ${i18n.t('common.error')}
                            </h3>
                            <p class="text-slate-500 dark:text-slate-400 mb-6">
                                Unable to load team information. Please try again.
                            </p>
                            <button onclick="location.reload()" class="btn-outline">
                                ${i18n.t('common.try_again')}
                            </button>
                        </div>
                    </div>
                `;
            }
        });
    }

    setupEventListeners() {
        // Handle URL hash for deep linking to specific people
        if (window.location.hash) {
            const personId = window.location.hash.substring(1);
            setTimeout(() => {
                const personElement = document.getElementById(personId);
                if (personElement) {
                    personElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Add highlight effect
                    personElement.classList.add('ring-2', 'ring-primary-400', 'ring-opacity-75');
                    setTimeout(() => {
                        personElement.classList.remove('ring-2', 'ring-primary-400', 'ring-opacity-75');
                    }, 2000);
                }
            }, 500);
        }

        // Add click handlers for person cards to update URL
        document.addEventListener('click', (e) => {
            const personCard = e.target.closest('.person-card');
            if (personCard && personCard.id) {
                // Update URL without page reload
                history.replaceState(null, null, `#${personCard.id}`);
            }
        });
    }
}

// Initialize people page when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PeoplePage();
    });
} else {
    new PeoplePage();
}