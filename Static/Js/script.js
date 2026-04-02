// Get all navigation links with data-page attribute
const navLinks = document.querySelectorAll('a[data-page]');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const pageName = this.getAttribute('data-page');
        
        if (pageName) {
            // Hide all pages
            const allPages = document.querySelectorAll('.page-content');
            allPages.forEach(page => {
                page.classList.remove('active');
            });

            // Show selected page
            const selectedPage = document.getElementById(pageName);
            if (selectedPage) {
                selectedPage.classList.add('active');
                
                // Load content from partial file
                loadPageContent(pageName, selectedPage);
            }

            // Update active link in navbar
            navLinks.forEach(l => {
                l.classList.remove('active');
            });
            this.classList.add('active');

            // Close navbar collapse on mobile after clicking
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Function to load content from partial files
function loadPageContent(pageName, container) {
    const filePath = `Partials/${pageName}.html`;
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load ${filePath}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
            container.innerHTML = `<p>Error loading page content</p>`;
        });
}

// Set home page as active by default
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.querySelector('a[data-page="home"]');
    if (homeLink) {
        homeLink.classList.add('active');
        // Load home page content
        const homePage = document.getElementById('home');
        if (homePage) {
            loadPageContent('home', homePage);
        }
    }
});

// ==================== CAROUSEL CONTROL ====================
class CarouselController {
    constructor(carouselId, interval = 3000) {
        this.carousel = document.getElementById(carouselId);
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.currentIndex = 0;
        this.interval = interval;
        this.autoplayTimer = null;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoplay();
    }

    setupEventListeners() {
        // Next button
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Previous button
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }

    showSlide(index) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;

        // Remove active class from all items
        this.items.forEach(item => item.classList.remove('active'));

        // Wrap index around
        this.currentIndex = (index + this.items.length) % this.items.length;

        // Add active class to current item
        this.items[this.currentIndex].classList.add('active');

        // Reset transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600); // Match your CSS transition duration
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
        this.resetAutoplay();
    }

    prevSlide() {
        this.showSlide(this.currentIndex - 1);
        this.resetAutoplay();
    }

    startAutoplay() {
        this.autoplayTimer = setInterval(() => {
            this.showSlide(this.currentIndex + 1);
        }, this.interval);
    }

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Initialize carousel when home page loads
function initCarousel() {
    const carousel = document.getElementById('carouselExampleFade');
    if (carousel && !carousel.carouselController) {
        carousel.carouselController = new CarouselController('carouselExampleFade', 3000);
    }
}

// Modify the loadPageContent function to initialize carousel for home page
const originalLoadPageContent = loadPageContent;
loadPageContent = function(pageName, container) {
    originalLoadPageContent(pageName, container);
    
    // Initialize carousel after home page content is loaded
    if (pageName === 'home') {
        setTimeout(() => {
            initCarousel();
        }, 100);
    }
};

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initCarousel();
    }, 500);
});