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