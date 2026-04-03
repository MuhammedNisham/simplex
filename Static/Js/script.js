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

// 1. Store your product details here (Your "Database")
const productDatabase = {
    'ARCH WINDOW': { 
        title: 'ARCH WINDOW', 
        description: 'A monumental door structure forged for the harshest environments. Designed to stand resilient against severe weather while capturing the soft morning light.', 
        image: 'Static/Images/highlightpro()/arch1.jpg', // Replace with your high-end renders
        features: ['Heavy-duty commercial steel', 'Engineered for severe weather', 'Monumental architectural scaling']
    },
    'horizon': { 
        title: 'Atmospheric Horizon Frame', 
        description: 'Larger-than-life steel windows that transform ordinary views into sweeping, epic landscapes. Engineered for perfect natural light dispersion.', 
        image: 'https://via.placeholder.com/800x600', 
        features: ['Maximized volumetric light dispersion', 'Seamless landscape integration', 'Cinematic clarity']
    },
    'titan': { 
        title: 'Titan Commercial Series', 
        description: 'Heavy-duty transportable security. Inspired by commercial carry transit, these structures bring surreal strength to any natural or urban setting.', 
        image: 'https://via.placeholder.com/800x600',
        features: ['Transport-grade durability', 'Surreal industrial aesthetic', 'High-impact security locks']
    },
    'golden': { 
        title: 'The Golden-Hour Series', 
        description: 'Experience cinematic clarity. Our premium windows are crafted to maximize natural glow and dramatic lighting in your architectural space.', 
        image: 'https://via.placeholder.com/800x600',
        features: ['Optimized for golden-hour glow', 'Dramatic lighting enhancements', 'Premium steel framing']
    }
};

// 2. The function to switch pages and load the specific product
function viewProduct(productId) {
    // Hide all existing pages
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    
    // Show the product detail container
    const detailPage = document.getElementById('product-detail');
    detailPage.classList.add('active');
    
    // Load the HTML template
    fetch('Partials/product-detail.html')
        .then(response => response.text())
        .then(html => {
            // Put the template inside the container
            detailPage.innerHTML = html;
            
            // Get the specific product data from our database above
            const product = productDatabase[productId];
            
            if(product) {
                // Inject the specific image, title, and description
                document.getElementById('detail-image').src = product.image;
                document.getElementById('detail-title').innerText = product.title;
                document.getElementById('detail-description').innerText = product.description;
                
                // Inject the bullet points
                const featuresList = document.getElementById('detail-features');
                featuresList.innerHTML = ''; // Clear old ones
                product.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.innerText = feature;
                    featuresList.appendChild(li);
                });
            }
            
            // Scroll to the top of the page smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
}