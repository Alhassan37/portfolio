// Portfolio Interactive Functionality

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initTypingAnimation();
        this.initScrollAnimations();
        this.initNavigation();
        this.initMobileMenu();
        this.initModals();
        this.initContactForm();
        this.initSkillsAnimation();
        this.initCVDownload();
    }

    setupEventListeners() {
        // Scroll event for animations and navigation
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Resize event for responsive adjustments
        window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 250));
        
        // Load event for initial setup
        window.addEventListener('load', this.handleLoad.bind(this));
    }

    // Typing Animation
    initTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;

        const texts = [
            'Alhassan Ahmed Osman',
            'Biotechnology Student',
            'Agricultural Genetics Specialist',
            'Bioinformatics Expert',
            'Python Developer',
            'Data Science Enthusiast',
            'Modern AgTech Researcher'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        const type = () => {
            const fullText = texts[textIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = currentText;

            let typeSpeed = isDeleting ? 80 : 120;

            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2500; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    // Navigation
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        this.scrollToSection(target);
                        this.closeMobileMenu();
                        
                        // Update active navigation immediately
                        this.setActiveNavLink(link);
                    }
                }
            });
        });

        // Smooth scroll for other scroll links
        document.querySelectorAll('.scroll-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        this.scrollToSection(target);
                    }
                }
            });
        });
    }

    setActiveNavLink(activeLink) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        // Add active class to clicked link
        activeLink.classList.add('active');
    }

    scrollToSection(target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }

    // Mobile Menu
    initMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mobileOverlay = document.getElementById('mobileMenuOverlay');
        const navbarNav = document.getElementById('navbarNav');

        if (!mobileToggle || !mobileOverlay || !navbarNav) return;

        mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        mobileOverlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mobileOverlay = document.getElementById('mobileMenuOverlay');
        const navbarNav = document.getElementById('navbarNav');

        mobileToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        navbarNav.classList.toggle('active');
        document.body.style.overflow = navbarNav.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mobileOverlay = document.getElementById('mobileMenuOverlay');
        const navbarNav = document.getElementById('navbarNav');

        if (mobileToggle) mobileToggle.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (navbarNav) navbarNav.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Scroll Animations
    initScrollAnimations() {
        this.animatedElements = document.querySelectorAll('.fade-in');
        this.handleScroll(); // Initial check
    }

    handleScroll() {
        this.updateActiveNavigation();
        this.animateOnScroll();
        this.updateHeaderBackground();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight + 100) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    animateOnScroll() {
        this.animatedElements.forEach(element => {
            if (this.isElementInView(element)) {
                element.classList.add('animate');
            }
        });
    }

    updateHeaderBackground() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.style.background = 'rgba(var(--color-slate-900-rgb), 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(var(--color-slate-900-rgb), 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }

    isElementInView(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < windowHeight * 0.8;
    }

    // Skills Animation
    initSkillsAnimation() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        const animateSkills = () => {
            skillItems.forEach((item, index) => {
                if (this.isElementInView(item)) {
                    setTimeout(() => {
                        item.classList.add('animate');
                        const progressBar = item.querySelector('.skill-progress');
                        const skillLevel = item.getAttribute('data-skill');
                        
                        if (progressBar && !progressBar.style.width) {
                            setTimeout(() => {
                                progressBar.style.width = `${skillLevel}%`;
                            }, 300);
                        }
                    }, index * 150); // Staggered animation
                }
            });
        };

        // Initial check
        animateSkills();
        
        // Add to scroll handler
        window.addEventListener('scroll', this.throttle(animateSkills, 100));
    }

    // Modals - Fixed to prevent loading state issues
    initModals() {
        const projectCards = document.querySelectorAll('.project-card');
        const modals = document.querySelectorAll('.modal');
        
        // Handle project card clicks - Fixed to prevent loading state conflicts
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent default behavior that might cause loading states
                e.preventDefault();
                
                // Don't trigger if clicking on the button directly
                if (e.target.classList.contains('project-btn') || e.target.closest('.project-btn')) {
                    return;
                }
                
                const modalId = card.getAttribute('data-modal');
                if (modalId) {
                    const modal = document.getElementById(`${modalId}Modal`);
                    if (modal) {
                        this.openModal(modal);
                    }
                }
            });
        });

        // Handle project buttons separately - ensure they work reliably
        document.querySelectorAll('.project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const card = btn.closest('.project-card');
                if (card) {
                    const modalId = card.getAttribute('data-modal');
                    if (modalId) {
                        const modal = document.getElementById(`${modalId}Modal`);
                        if (modal) {
                            this.openModal(modal);
                        }
                    }
                }
            });
        });

        // Set up modal close handlers
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.modal-close');
            const overlay = modal.querySelector('.modal-overlay');

            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.closeModal(modal);
                });
            }

            if (overlay) {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        this.closeModal(modal);
                    }
                });
            }
        });

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modals.forEach(modal => {
                    if (!modal.classList.contains('hidden')) {
                        this.closeModal(modal);
                    }
                });
            }
        });
    }

    openModal(modal) {
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus management for accessibility
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length > 0) {
                setTimeout(() => focusableElements[0].focus(), 100);
            }
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // Contact Form - Fixed to ensure proper functionality
    initContactForm() {
        const form = document.getElementById('contactForm');
        const messageDiv = document.getElementById('formMessage');

        if (!form || !messageDiv) return;

        // Ensure form controls are properly initialized and focusable
        const formControls = form.querySelectorAll('.form-control');
        formControls.forEach(control => {
            // Remove any loading classes that might interfere
            control.classList.remove('loading');
            
            // Ensure controls are enabled and focusable
            control.removeAttribute('disabled');
            control.removeAttribute('readonly');
            
            // Add focus event listeners to ensure proper behavior
            control.addEventListener('focus', (e) => {
                e.target.classList.add('focused');
            });
            
            control.addEventListener('blur', (e) => {
                e.target.classList.remove('focused');
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name')?.trim(),
                email: formData.get('email')?.trim(),
                subject: formData.get('subject')?.trim(),
                message: formData.get('message')?.trim()
            };

            // Validate form
            if (!this.validateContactForm(data)) {
                this.showFormMessage('Please fill in all required fields with valid information.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;
            
            // Add loading class only to the form, not individual controls
            form.classList.add('loading');

            try {
                // Simulate form submission
                await this.simulateFormSubmission(data);
                
                this.showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                form.reset();
                
                // Show notification as well
                this.showNotification('Message sent successfully! Thank you for reaching out.', 4000);
                
            } catch (error) {
                this.showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
                this.showNotification('Error sending message. Please try again.', 3000);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.classList.remove('loading');
            }
        });
    }

    validateContactForm(data) {
        if (!data.name || data.name.length < 2) return false;
        if (!data.email || !this.isValidEmail(data.email)) return false;
        if (!data.subject || data.subject.length < 3) return false;
        if (!data.message || data.message.length < 10) return false;
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async simulateFormSubmission(data) {
        // Simulate API call with realistic delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Log form data for demonstration
                console.log('Contact form submitted:', {
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    messageLength: data.message.length,
                    timestamp: new Date().toISOString()
                });
                resolve();
            }, 1500);
        });
    }

    showFormMessage(message, type) {
        const messageDiv = document.getElementById('formMessage');
        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = `form-message ${type}`;
            messageDiv.style.display = 'block';

            // Auto-hide after 8 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 8000);
        }
    }

    // CV Download
    initCVDownload() {
        const cvButton = document.querySelector('.cv-download-btn');
        if (!cvButton) return;

        cvButton.addEventListener('click', (e) => {
            const link = cvButton.getAttribute('href');
            
            if (link && link !== '#' && !link.startsWith('assets/')) {
                // External link or valid file
                this.showNotification('CV download started! Please check your downloads folder.', 4000);
            } else {
                // File doesn't exist yet - show helpful message
                e.preventDefault();
                this.showNotification('CV is being prepared. Please contact me directly at alhassan4work@gmail.com for the latest version!', 6000);
            }
        });
    }

    // Notifications
    showNotification(message, duration = 3000) {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        const notificationText = notification.querySelector('.notification-text');
        const closeBtn = notification.querySelector('.notification-close');

        if (notificationText) {
            notificationText.textContent = message;
        }
        
        notification.classList.remove('hidden');

        // Auto-hide
        const hideTimeout = setTimeout(() => {
            notification.classList.add('hidden');
        }, duration);

        // Manual close
        if (closeBtn) {
            closeBtn.onclick = () => {
                clearTimeout(hideTimeout);
                notification.classList.add('hidden');
            };
        }
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function() {
            const args = arguments;
            const context = this;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }

    handleResize() {
        // Handle responsive adjustments
        this.closeMobileMenu();
        
        // Recalculate animations if needed
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            if (item.classList.contains('animate')) {
                const progressBar = item.querySelector('.skill-progress');
                const skillLevel = item.getAttribute('data-skill');
                if (progressBar) {
                    progressBar.style.width = `${skillLevel}%`;
                }
            }
        });
    }

    handleLoad() {
        // Initial animations and setup after page load
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                if (this.isElementInView(element)) {
                    element.classList.add('animate');
                }
            }, index * 100);
        });

        // Remove loading states if any
        document.body.classList.remove('loading');
        
        // Ensure form controls are not in loading state
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.classList.remove('loading');
        });

        // Add welcome notification
        setTimeout(() => {
            this.showNotification('Welcome! Explore my biotechnology and bioinformatics portfolio.', 4000);
        }, 2000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    window.portfolioApp = app; // Make globally available for debugging
});

// Add fade-in classes to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        '.about-content',
        '.skill-category',
        '.education-item',
        '.project-card',
        '.course-card',
        '.timeline-item',
        '.contact-content'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('fade-in');
            // Add slight delay for staggered animations
            element.style.transitionDelay = `${index * 100}ms`;
        });
    });
});

// Performance optimization: Intersection Observer for animations
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-item')) {
                        const progressBar = entry.target.querySelector('.skill-progress');
                        const skillLevel = entry.target.getAttribute('data-skill');
                        
                        if (progressBar && !progressBar.style.width) {
                            setTimeout(() => {
                                progressBar.style.width = `${skillLevel}%`;
                            }, 300);
                        }
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });

        // Observe skill items separately for skill bar animations
        document.querySelectorAll('.skill-item').forEach(element => {
            observer.observe(element);
        });
    });
}

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys when not in form fields
    if (!e.target.matches('input, textarea, select')) {
        const sections = ['home', 'about', 'skills', 'education', 'experience', 'projects', 'courses', 'contact'];
        const currentSection = document.querySelector('.nav-link.active')?.getAttribute('href')?.substring(1);
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            const nextSection = document.getElementById(sections[currentIndex + 1]);
            if (nextSection && window.portfolioApp) {
                window.portfolioApp.scrollToSection(nextSection);
            }
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            const prevSection = document.getElementById(sections[currentIndex - 1]);
            if (prevSection && window.portfolioApp) {
                window.portfolioApp.scrollToSection(prevSection);
            }
        }
    }
});

// Error handling for missing elements
window.addEventListener('error', (e) => {
    console.warn('Portfolio App Error:', e.message);
    // Don't break the app for minor issues
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load performance:', {
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
                totalTime: perfData.loadEventEnd - perfData.navigationStart
            });
        }, 0);
    });
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}