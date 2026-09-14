        const navLinks = document.querySelectorAll('.header-list a');
        const aboutLink = document.querySelector('a[href="#about-me"]');
        const projectsLink = document.querySelector('a[href="#projects"]');
        const contactLink = document.querySelector('a[href="#contact"]');
        const projectsSection = document.querySelector('#projects');
        const contactSection = document.querySelector('#contact');
        const sections = document.querySelectorAll('#about-me, #projects, #contact');
        let isProgrammaticScroll = false;

        const setActiveSection = (sectionId) => {
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
        };

        aboutLink.addEventListener('click', (event) => {
            event.preventDefault();
            history.replaceState(null, '', '#about-me');
            setActiveSection('about-me');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        projectsLink.addEventListener('click', (event) => {
            event.preventDefault();
            isProgrammaticScroll = true;
            history.replaceState(null, '', '#projects');
            setActiveSection('projects');
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        contactLink.addEventListener('click', (event) => {
            event.preventDefault();
            history.replaceState(null, '', '#contact');
            setActiveSection('contact');
            contactSection.scrollIntoView({ behavior: 'auto', block: 'start' });
        });

        const updateActiveSection = () => {
            if (isProgrammaticScroll) {
                return;
            }

            const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

            if (atPageBottom) {
                setActiveSection('contact');
                return;
            }

            const trackingLine = window.innerHeight * 0.35;
            let currentSection = sections[0];

            sections.forEach((section) => {
                if (section.getBoundingClientRect().top <= trackingLine) {
                    currentSection = section;
                }
            });

            setActiveSection(currentSection.id);
        };

        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('scrollend', () => {
            isProgrammaticScroll = false;
            updateActiveSection();
        });
        window.addEventListener('resize', updateActiveSection);
        updateActiveSection();