document.addEventListener('DOMContentLoaded', function() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const closeCartButton = document.querySelector('.close-btn');
   console.log(addToCartButtons)
    // Function to open the cart sidebar

    // Function to close the cart sidebar
    function closeCart() {
       const cartview = document.getElementById('cart-sidebar');
        cartview.style.display = 'none'
    }
    
    // Add click event listener to the close button
    closeCartButton.addEventListener('click', closeCart); 
});

function addToCart(name, imageSrc, price) {
    // Get existing cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Check if the item already exists in the cart
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity = existingItem.quantity + 1;
    } else {
        // If the item does not exist, add it to the cart with a quantity of 1
        cart.push({
            name: name,
            imageSrc: imageSrc,
            price: price.toFixed(2),
            quantity: 1 // Initial quantity is set to 1
        });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    console.log(cart);

    // Display the cart with a delay of 500ms
    setTimeout(function() {
        displayCart(); // Refresh the cart display
        const cartview = document.getElementById('cart-sidebar');
        cartview.style.display = 'flex'; // Show the cart sidebar
    }, 500);
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let cartContainer = document.querySelector('.cart-container');
    let totalAmount = 0;

    if (cart.length > 0) {
        cartContainer.innerHTML = cart.map((item, index) => {
            // Calculate the total amount for each item based on quantity and price
            let itemTotal = item.quantity * item.price;
            totalAmount += itemTotal; // Add the item's total to the cart's total amount

            return `
                <div class="item">
                    <div class="cart-item">
                        <img src="${item.imageSrc}" alt="${item.name}">
                        <p>${item.name}</p>
                        <p>Price: $${item.price}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="decrement" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increment" data-index="${index}">+</button>
                    </div>
                    <div class="item-total">
                        <p>Total: $${itemTotal.toFixed(2)}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Add a summary section at the end of the cart
        cartContainer.innerHTML += `
            <div class="cart-summary">
                <h3>Total Amount: $${totalAmount.toFixed(2)}</h3>
            </div>
        `;
    } else {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    }

    // Remove existing event listeners before adding new ones
    document.querySelectorAll('.increment').forEach(button => {
        button.removeEventListener('click', incrementHandler);
        button.addEventListener('click', incrementHandler);
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.removeEventListener('click', decrementHandler);
        button.addEventListener('click', decrementHandler);
    });

    // Increment handler function
    function incrementHandler() {
        const index = this.dataset.index;
        cart[index].quantity = (cart[index].quantity || 1) + 1;
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        displayCart(); // Refresh the cart display
    }

    // Decrement handler function
    function decrementHandler() {
        const index = this.dataset.index;
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            displayCart(); // Refresh the cart display
        }
    }
}
