// IMPROVED MOBILE MENU FUNCTIONALITY
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

// Create mobile overlay if it doesn't exist
if (!document.querySelector('.mobile-nav-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.innerHTML = `
        <div class="mobile-nav-menu">
            <a href="#home">Home</a>
            <a href="#plans">Plans</a>
            <a href="#why-lic">Why LIC</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Get Started</a>
        </div>
    `;
    document.body.appendChild(overlay);
}

const mobileOverlay = document.querySelector('.mobile-nav-overlay');
let isMenuOpen = false;

// Toggle mobile menu
mobileMenu.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileOverlay.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Animate hamburger to X
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
        
        // Reset hamburger
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close menu when clicking on overlay
mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
        isMenuOpen = false;
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
        
        // Reset hamburger
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close menu when clicking on menu links
document.querySelectorAll('.mobile-nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
        
        // Reset hamburger
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// IMPROVED NAVBAR SCROLL BEHAVIOR
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll (optional)
    if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY && !isMenuOpen) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});