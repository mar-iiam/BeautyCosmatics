document.addEventListener('DOMContentLoaded', function() {
    // Select the placeholder where the footer should be inserted
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // Check if the placeholder exists
    if (!footerPlaceholder) {
        console.error('Footer placeholder not found');
        return;
    }

    // Fetch the footer HTML
    fetch('../footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Insert the footer HTML into the placeholder
            footerPlaceholder.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading the footer:', error);
        });
});
