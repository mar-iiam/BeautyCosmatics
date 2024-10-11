document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const closeCartButton = document.querySelector('.close-btn');
    const cartButton = document.querySelector("cart_button");
    // Function to close the cart sidebar
    function closeCart() {
        const cartview = document.getElementById('cart-sidebar');
        cartview.style.display = 'none';
    }
    
    // Add click event listener to the close button
    closeCartButton.addEventListener('click', closeCart); 
});

function addToCart(name, imageSrc, price) {
    // Get existing cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    console.log(cart)
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
   console.log(cart.length)
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
                   <div class="remove-item">
    <button class="delete" data-index="${index}">
        <i class="fas fa-trash"></i>
    </button>
</div>

                </div>
            `;
        }).join('');

        // Add a summary section at the end of the cart
        cartContainer.innerHTML += `
            <div class="cart-summary">
                <h3>SubTotal Amount: $${totalAmount.toFixed(2)}</h3>
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

    document.querySelectorAll('.delete').forEach(button => {
        button.removeEventListener('click', deleteHandler);
        button.addEventListener('click', deleteHandler);
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

    // Delete handler function
    function deleteHandler() {
        const index = this.dataset.index;
        cart.splice(index, 1); // Remove the item from the cart
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        displayCart(); // Refresh the cart display
    }
    document.addEventListener('DOMContentLoaded', function() {
        const contentDiv = document.getElementById('Total_price');
    
            // Create a new <p> element
            const newParagraph = document.createElement('p');
    
            // Set the content of the paragraph
            newParagraph.textContent = 'Total'+totalAmount;
    
            // Append the new paragraph to the target div
            contentDiv.appendChild(newParagraph);
    });

}


  // Initialize the cart on page load
  document.addEventListener('DOMContentLoaded', function() {
    displayCart(); // Load the cart with any existing items

    // Attach event listeners to "Add to Cart" buttons (if any exist on the page)
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const imageSrc = this.dataset.imageSrc;
            const price = parseFloat(this.dataset.price);

            addToCart(name, imageSrc, price);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
const promoParagraph = document.querySelector('.info p');

promoParagraph.addEventListener('click', function() {
let inputField = document.querySelector('.promo-input');
let addButton = document.querySelector('.promo-button');

if (!inputField) {
    // If the input field doesn't exist, create and insert it
    inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter your promo code';
    inputField.className = 'promo-input';

    // Create the "Add" button
    addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.className = 'promo-button';

    // Create a container to hold both elements
    const container = document.createElement('div');
    container.className = 'promo-container';
    container.appendChild(inputField);
    container.appendChild(addButton);

    // Insert the container after the paragraph
    promoParagraph.insertAdjacentElement('afterend', container);
} else {
    // If the input field exists, remove both the input field and the button
    inputField.parentNode.remove();
}
});
});
document.addEventListener('DOMContentLoaded', function() {
const promoParagraph = document.querySelector('.info p:nth-of-type(2)');

promoParagraph.addEventListener('click', function() {
let inputField = document.querySelector('.note-input');

if (!inputField) {
    // If the input field doesn't exist, create and insert it
    inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Additional information.......';
    inputField.className = 'note-input';

    // Create a container to hold both elements
    const container = document.createElement('div');
    container.className = 'promo-container';
    container.appendChild(inputField);

    // Insert the container after the paragraph
    promoParagraph.insertAdjacentElement('afterend', container);
} else {
    // If the input field exists, remove both the input field and the button
    inputField.parentNode.remove();
}
});
});


document.addEventListener('DOMContentLoaded', function() {
const modalOverlay = document.getElementById('modal-overlay');
const estimatedDeliveryLink = document.getElementById('estimated-delivery-link');
const closeModalButton = document.getElementById('close-modal');
const countryDropdown = document.getElementById('country-dropdown');
const selectedCountryDisplay = document.getElementById('selected-country'); // Element to display the selected country

// Function to open the modal
function openModal() {
modalOverlay.style.display = 'block';
}

// Function to close the modal
function closeModal() {
modalOverlay.style.display = 'none';
}

// Function to render the selected country
function renderSelectedCountry() {
const selectedValue = countryDropdown.value;
if (selectedValue) {
    selectedCountryDisplay.textContent = `Selected Country: ${countryDropdown.options[countryDropdown.selectedIndex].text}`;
} else {
    selectedCountryDisplay.textContent = 'No country selected.';
}
}

// Add click event listener to the Estimated Delivery link
estimatedDeliveryLink.addEventListener('click', function(event) {
event.preventDefault(); // Prevent default link behavior
openModal();
});

// Add click event listener to the Choose button
closeModalButton.addEventListener('click', function() {
renderSelectedCountry();
closeModal();
});

// Close the modal if the overlay is clicked
modalOverlay.addEventListener('click', function(event) {
if (event.target === modalOverlay) {
    closeModal();
}
});
});

document.addEventListener('DOMContentLoaded', function() {
const checkoutButton = document.getElementById('checkout-button');
const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
const closeCheckoutModalButton = document.getElementById('close-checkout-modal');

// Function to open the modal
function openCheckoutModal() {
checkoutModalOverlay.style.display = 'flex'; // Show the modal
}

// Function to close the modal
function closeCheckoutModal() {
checkoutModalOverlay.style.display = 'none'; // Hide the modal
}

// Add click event listener to the checkout button
checkoutButton.addEventListener('click', function() {
openCheckoutModal();
});

// Add click event listener to the "Got it" button
closeCheckoutModalButton.addEventListener('click', function() {
closeCheckoutModal();
});

// Close the modal if the overlay is clicked
checkoutModalOverlay.addEventListener('click', function(event) {
if (event.target === checkoutModalOverlay) {
    closeCheckoutModal();
}
});
});






