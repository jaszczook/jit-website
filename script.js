// ===================================
// Smooth Scroll Animation Observer
// ===================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ===================================
// Initialize Animations on Page Load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScrolling();
    initHeroParallax();
    initPerformanceOptimizations();
});

// ===================================
// Scroll Animations
// ===================================

function initScrollAnimations() {
    // Section Headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header, index) => {
        header.classList.add('fade-in');
        header.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(header);
    });

    // About Intro
    const aboutIntro = document.querySelector('.about-intro');
    if (aboutIntro) {
        aboutIntro.classList.add('fade-in');
        animationObserver.observe(aboutIntro);
    }

    // Expertise Cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(card);
    });

    // Service Items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.15}s`;
        animationObserver.observe(item);
    });

    // Contact Content
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        contactContent.classList.add('fade-in');
        animationObserver.observe(contactContent);
    }

    // Contact Links
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach((link, index) => {
        link.classList.add('fade-in');
        link.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
        animationObserver.observe(link);
    });
}

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerOffset = 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Hero Parallax Effect
// ===================================

function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (!hero || !heroContent) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = hero.offsetHeight;

                if (scrolled < heroHeight) {
                    const opacity = 1 - (scrolled / heroHeight) * 1.5;
                    const translateY = scrolled * 0.4;

                    heroContent.style.transform = `translateY(${translateY}px)`;
                    heroContent.style.opacity = Math.max(opacity, 0);
                }

                ticking = false;
            });

            ticking = true;
        }
    });
}

// ===================================
// Performance Optimizations
// ===================================

function initPerformanceOptimizations() {
    // Preload critical assets
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');

    // Lazy load images if any are added
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Add passive event listeners for better scroll performance
    const supportsPassive = checkPassiveSupport();

    if (supportsPassive) {
        window.addEventListener('scroll', () => {}, { passive: true });
        window.addEventListener('touchstart', () => {}, { passive: true });
    }
}

// ===================================
// Check Passive Event Support
// ===================================

function checkPassiveSupport() {
    let passiveSupported = false;

    try {
        const options = {
            get passive() {
                passiveSupported = true;
                return false;
            }
        };

        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passiveSupported = false;
    }

    return passiveSupported;
}

// ===================================
// Dynamic Racing Lines Animation
// ===================================

function animateRacingLines() {
    const racingLines = document.querySelectorAll('.racing-line');

    const racingLineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const line = entry.target;
                line.style.width = '0';

                setTimeout(() => {
                    line.style.transition = 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    line.style.width = '120px';
                }, 100);

                racingLineObserver.unobserve(line);
            }
        });
    }, { threshold: 0.5 });

    racingLines.forEach(line => {
        racingLineObserver.observe(line);
    });
}

// Initialize racing lines animation
document.addEventListener('DOMContentLoaded', animateRacingLines);

// ===================================
// Card Accent Line Animation
// ===================================

function animateCardAccents() {
    const cardAccents = document.querySelectorAll('.card-accent, .hero-accent-line');

    const accentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const accent = entry.target;
                accent.style.width = '0';

                setTimeout(() => {
                    accent.style.transition = 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    const targetWidth = accent.classList.contains('hero-accent-line') ? '60px' : '40px';
                    accent.style.width = targetWidth;
                }, 150);

                accentObserver.unobserve(accent);
            }
        });
    }, { threshold: 0.5 });

    cardAccents.forEach(accent => {
        // Don't animate hero accent on load
        if (!accent.classList.contains('hero-accent-line')) {
            accentObserver.observe(accent);
        }
    });
}

// Initialize card accents animation
document.addEventListener('DOMContentLoaded', animateCardAccents);

// ===================================
// Mouse Movement Parallax Effect
// ===================================

function initMouseParallax() {
    const hero = document.querySelector('.hero');
    const carbonPattern = document.querySelector('.carbon-pattern');

    if (!hero || !carbonPattern) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        carbonPattern.style.transform = `translate(${currentX * 20}px, ${currentY * 20}px)`;

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize mouse parallax
document.addEventListener('DOMContentLoaded', initMouseParallax);

// ===================================
// Hide Scroll Indicator on Scroll
// ===================================

function initScrollIndicatorHide() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!scrollIndicator) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }

        lastScroll = currentScroll;
    });
}

// Initialize scroll indicator hide
document.addEventListener('DOMContentLoaded', initScrollIndicatorHide);

// ===================================
// Button Ripple Effect
// ===================================

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add ripple CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .btn-primary {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial opacity
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});
