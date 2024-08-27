// navbar.js

document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    // Check if the placeholder exists
    if (!navbarPlaceholder) {
        console.error('Navbar placeholder not found');
        return;
    }

    // Fetch the navbar HTML
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            navbarPlaceholder.innerHTML = data;
            // Re-initialize event listeners after inserting the navbar
            initializeNavLinks();
        })
        .catch(error => {
            console.error('Error loading the navbar:', error);
        });
});

// Function to initialize nav link event listeners
function initializeNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to remove 'active' class from all links
    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Add event listeners to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove 'active' class from all links
            removeActiveClass();
            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });

    // Optional: Handle click outside to remove 'active' state
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            removeActiveClass();
        }
    });
}
