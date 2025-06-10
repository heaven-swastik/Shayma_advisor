// Scroll-triggered animations for LIC website
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuration for Intersection Observer
    const observerConfig = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Animation classes and delays
    const animationClasses = {
        'fade-in': 'animate-fade-in',
        'slide-up': 'animate-slide-up',
        'slide-down': 'animate-slide-down',
        'slide-left': 'animate-slide-left',
        'slide-right': 'animate-slide-right',
        'scale-in': 'animate-scale-in',
        'flip-in': 'animate-flip-in'
    };

    // Create and inject CSS animations
    function injectAnimationCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Initial states - hidden elements */
            .fade-in,
            .slide-up,
            .slide-down,
            .slide-left,
            .slide-right,
            .scale-in,
            .flip-in {
                opacity: 0;
                transform: translateY(30px);
            }

            .slide-up {
                transform: translateY(50px);
            }

            .slide-down {
                transform: translateY(-50px);
            }

            .slide-left {
                transform: translateX(-50px);
            }

            .slide-right {
                transform: translateX(50px);
            }

            .scale-in {
                transform: scale(0.8) translateY(20px);
            }

            .flip-in {
                transform: rotateY(90deg) translateY(20px);
            }

            /* Animated states - visible elements */
            .animate-fade-in {
                opacity: 1;
                transform: translateY(0);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .animate-slide-up {
                opacity: 1;
                transform: translateY(0);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .animate-slide-down {
                opacity: 1;
                transform: translateY(0);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .animate-slide-left {
                opacity: 1;
                transform: translateX(0);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .animate-slide-right {
                opacity: 1;
                transform: translateX(0);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .animate-scale-in {
                opacity: 1;
                transform: scale(1) translateY(0);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .animate-flip-in {
                opacity: 1;
                transform: rotateY(0deg) translateY(0);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            /* Staggered animation delays */
            .animate-delay-1 { transition-delay: 0.1s; }
            .animate-delay-2 { transition-delay: 0.2s; }
            .animate-delay-3 { transition-delay: 0.3s; }
            .animate-delay-4 { transition-delay: 0.4s; }
            .animate-delay-5 { transition-delay: 0.5s; }
            .animate-delay-6 { transition-delay: 0.6s; }

            /* Special animations for specific elements */
            .hero-badge {
                transform: translateY(-20px) scale(0.9);
                transition: all 0.6s ease-out;
            }

            .hero-badge.visible {
                transform: translateY(0) scale(1);
            }

            .hero h1 {
                transform: translateY(40px);
                transition: all 0.8s ease-out 0.2s;
            }

            .hero h1.visible {
                transform: translateY(0);
            }

            .hero-subtitle {
                transform: translateY(30px);
                transition: all 0.8s ease-out 0.4s;
            }

            .hero-subtitle.visible {
                transform: translateY(0);
            }

            .hero-buttons {
                transform: translateY(40px);
                transition: all 0.8s ease-out 0.6s;
            }

            .hero-buttons.visible {
                transform: translateY(0);
            }

            .stat-item {
                transform: translateY(30px) scale(0.9);
                transition: all 0.6s ease-out;
            }

            .stat-item.visible {
                transform: translateY(0) scale(1);
            }

            /* Plan cards hover animation */
            .plan-card {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .plan-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }

            /* Feature cards animation */
            .feature-card {
                transition: transform 0.3s ease;
            }

            .feature-card:hover {
                transform: translateY(-5px);
            }

            /* Progress bar animation */
            .progress-bar {
                transition: width 0.3s ease;
            }

            /* Navbar scroll animation */
            .navbar {
                transition: all 0.3s ease;
            }

            .navbar.scrolled {
                backdrop-filter: blur(10px);
                background: rgba(255, 255, 255, 0.95);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize CSS animations
    injectAnimationCSS();

    // Intersection Observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered delay for elements in the same container
                if (element.parentElement.classList.contains('plans-grid') ||
                    element.parentElement.classList.contains('features-grid') ||
                    element.parentElement.classList.contains('testimonials-grid')) {
                    
                    const siblings = Array.from(element.parentElement.children);
                    const index = siblings.indexOf(element);
                    element.classList.add(`animate-delay-${Math.min(index + 1, 6)}`);
                }

                // Apply appropriate animation class
                Object.keys(animationClasses).forEach(animClass => {
                    if (element.classList.contains(animClass)) {
                        element.classList.add(animationClasses[animClass]);
                    }
                });

                // Special handling for elements without animation classes
                if (!element.classList.contains('fade-in') && 
                    !element.classList.contains('slide-up') &&
                    !element.classList.contains('slide-down') &&
                    !element.classList.contains('slide-left') &&
                    !element.classList.contains('slide-right') &&
                    !element.classList.contains('scale-in') &&
                    !element.classList.contains('flip-in')) {
                    element.classList.add('visible');
                }
            }
        });
    }, observerConfig);

    // Observe all animation elements
    const animationElements = document.querySelectorAll(`
        .fade-in,
        .slide-up,
        .slide-down,
        .slide-left,
        .slide-right,
        .scale-in,
        .flip-in,
        .hero-badge,
        .hero h1,
        .hero-subtitle,
        .hero-buttons,
        .stat-item,
        .section-header,
        .plan-card,
        .feature-card,
        .testimonial-card,
        .faq-item
    `);

    animationElements.forEach(el => scrollObserver.observe(el));

    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach((counter, index) => {
            const text = counter.textContent;
            const target = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (target > 0) {
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    // Format numbers based on original text
                    if (text.includes('₹')) {
                        counter.textContent = '₹' + Math.ceil(current) + 'L+';
                    } else if (text.includes('%')) {
                        counter.textContent = Math.ceil(current * 10) / 10 + '%';
                    } else if (text.includes('K')) {
                        counter.textContent = Math.ceil(current) + 'K+';
                    } else {
                        counter.textContent = Math.ceil(current) + '+';
                    }
                }, 50);
            }
        });
    }

    // Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateCounters();
                }, 500);
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }

    // Progress bar animation
    function updateProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
    }

    // Throttled scroll handler
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                updateProgressBar();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Toggle Animation
    window.toggleFAQ = function(element) {
        const answer = element.nextElementSibling;
        const icon = element.querySelector('.faq-icon');
        const allAnswers = document.querySelectorAll('.faq-answer');
        const allIcons = document.querySelectorAll('.faq-icon');
        
        // Close all other FAQs with animation
        allAnswers.forEach(item => {
            if (item !== answer) {
                item.style.maxHeight = '0px';
                item.style.opacity = '0';
                item.classList.remove('active');
            }
        });
        
        allIcons.forEach(item => {
            if (item !== icon) {
                item.style.transform = 'rotate(0deg)';
                item.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        if (answer.classList.contains('active')) {
            answer.style.maxHeight = '0px';
            answer.style.opacity = '0';
            icon.style.transform = 'rotate(0deg)';
            answer.classList.remove('active');
            icon.classList.remove('active');
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            icon.style.transform = 'rotate(180deg)';
            answer.classList.add('active');
            icon.classList.add('active');
        }
    };

    // Add FAQ styles
    const faqStyle = document.createElement('style');
    faqStyle.textContent = `
        .faq-answer {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, opacity 0.3s ease;
        }
        
        .faq-icon {
            transition: transform 0.3s ease;
        }
        
        .faq-question {
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .faq-question:hover {
            color: var(--primary);
        }
    `;
    document.head.appendChild(faqStyle);

    // Mobile menu toggle (if needed)
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Parallax effect for hero section
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    window.addEventListener('scroll', parallaxScroll, { passive: true });

    // Initialize on page load
    window.addEventListener('load', () => {
        // Trigger initial animations for elements in viewport
        setTimeout(() => {
            const elementsInView = document.querySelectorAll('.hero-badge, .hero h1, .hero-subtitle, .hero-buttons');
            elementsInView.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 150);
            });
        }, 300);
    });

    // Performance optimization - pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.style.animationPlayState = 'paused';
        } else {
            document.body.style.animationPlayState = 'running';
        }
    });

    console.log('Scroll animations initialized successfully!');
});

// Utility function to add animation classes to elements
function addScrollAnimation(selector, animationType = 'fade-in') {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        if (!el.classList.contains('fade-in') && 
            !el.classList.contains('slide-up') &&
            !el.classList.contains('slide-down') &&
            !el.classList.contains('slide-left') &&
            !el.classList.contains('slide-right') &&
            !el.classList.contains('scale-in') &&
            !el.classList.contains('flip-in')) {
            el.classList.add(animationType);
        }
    });
}

// Auto-apply animations to common elements if they don't have animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Apply default animations to elements that don't have them
    addScrollAnimation('.section-header', 'slide-up');
    addScrollAnimation('.plan-card', 'scale-in');
    addScrollAnimation('.feature-card', 'fade-in');
    addScrollAnimation('.testimonial-card', 'slide-up');
    addScrollAnimation('.faq-item', 'fade-in');
});