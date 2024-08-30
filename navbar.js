document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    // Check if the placeholder exists
    if (navbarPlaceholder) {
        // Fetch the navbar HTML
        fetch('../navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Initialize the nav links and set active link based on current page
                initializeNavLinks();
            })
            .catch(error => {
                console.error('Error loading the navbar:', error);
            });
    } else {
        console.error('Navbar placeholder not found');
        initializeNavLinks(); // Initialize nav links in case the navbar is already in the HTML
    }
});

function initializeNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to remove 'active' class from all links
    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Add event listeners to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            removeActiveClass();
            this.classList.add('active');
        });
    });

    // Automatically add 'active' class to the link corresponding to the current page
    const currentPath = window.location.pathname.split('/').pop(); // Get the current page name
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}
