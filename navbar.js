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

document.addEventListener("DOMContentLoaded", function() {
    // Create the itemCount element
    const itemCountElement = document.createElement('p');
    itemCountElement.id = 'itemCount'; // Set the id for the element
    
    const cartLink = document.getElementById('navbar-placeholder'); // Get the cart link
    
    // Insert the itemCount element before "Cart" text
    cartLink.insertBefore(itemCountElement, cartLink.firstChild);
    
    // Function to update the cart item count
    function updateCartCount() {
        const totalItems = localStorage.length; // Get the total number of items in localStorage
        console.log(totalItems); // Log to console for debugging
        itemCountElement.innerHTML = totalItems > 0 ? totalItems : ''; // Set the item count, only show if > 0
    }

    updateCartCount(); // Call the function to update the count when the page loads

    // If you're dynamically adding items to localStorage elsewhere in your app, 
    // call updateCartCount() again to update the displayed count.
});