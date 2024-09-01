document.addEventListener('DOMContentLoaded', function() {
    // Define the product list
    const products = [
        {
            imageSrc: "../images/sub1.webp",
            name: "Product 1",
            price: "$19.99",
            description: "I'm a product description. This is a great place to sell your product and grab buyers' attention. Describe your product clearly and concisely. Use unique keywords. Write your own description instead of using manufacturers copy.",
            additionalImages: ["../images/sub1.1.webp", "../images/sub1.2.webp"],
            sku :"001A"
        },
        {
            imageSrc: "../images/sub2.webp",
            name: "Product 2",
            price: "$29.99",
            description: "This is the description for Product 2.",
            additionalImages: ["../images/sub2.1.webp", "../images/sub2.2.webp"],
             sku :"002B"
        },
        {
            imageSrc: "../images/sub3.webp",
            name: "Product 3",
            price: "$39.99",
            description: "This is the description for Product 3.",
            additionalImages: ["../images/sub3.1.webp", "../images/sub3.2.webp"],
            sku :"003C"
        },
        {
            imageSrc: "../images/sub4.webp",
            name: "Product 4",
            price: "$49.99",
            description: "This is the description for Product 4.",
            additionalImages: ["../images/sub4.1.webp", "../images/sub4.2.webp"],
            sku :"004D"
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const price = params.get('price');
    const imageSrc = params.get('imageSrc');
    const description = params.get('description');
    const sku = params.get('sku');
    
    let additionalImages = params.get('additionalImages');
    additionalImages = additionalImages ? additionalImages.split(',') : [];

    const allImages = [imageSrc, ...additionalImages];

    const mainImageContainer = document.querySelector('.main-image');
    const thumbnailImagesContainer = document.querySelector('.thumbnail-images');

    function updateMainImage(src) {
        mainImageContainer.innerHTML = `<img src="${src}" alt="${decodeURIComponent(name)}">`;
    }

    updateMainImage(decodeURIComponent(imageSrc)); 

    thumbnailImagesContainer.innerHTML = allImages.map((img, index) => `
        <img src="${decodeURIComponent(img)}" alt="Image for ${decodeURIComponent(name)}" class="${index === 0 ? 'active' : ''}">
    `).join('');

    const thumbnails = thumbnailImagesContainer.querySelectorAll('img');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(img => img.classList.remove('active'));
            thumbnail.classList.add('active');
            updateMainImage(thumbnail.src);
        });
    });

    // Populate the product content sections
    document.querySelector('.upper-content').innerHTML = `
    <h2>${decodeURIComponent(name)}</h2>
    <span> SKU :${decodeURIComponent(sku)}</span>
    <p>${decodeURIComponent(description)}</p>
`;
const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
document.querySelector('.right-content').innerHTML = `
    <p>Price: <span id="price-display">${decodeURIComponent(price)}</span></p>
    <p>Price options </p>
    <div class="option-box">
        <input type="radio" id="option1" name="options" value="${numericPrice + 10}">
        <div class="option-label">
            <p>One Time purchase</p>
            <label for="option1">$${numericPrice + 10}</label>
        </div>
    </div>
    <div class="option-box">
        <input type="radio" id="option2" name="options" value="${numericPrice + 20}">
        <div class="option-label">
            <p>3 Months</p>
            <label for="option2">$${numericPrice + 20}</label>
        </div>
    </div>
    <div class="option-box">
        <input type="radio" id="option3" name="options" value="${numericPrice + 30}">
        <div class="option-label">
            <p>6 Months</p>
            <label for="option3">$${numericPrice + 30}</label>
        </div>
    </div>
     <div id="subscription-container" style="display: none;">
        <button id="subscription">Subscription</button>
    </div>
    <div id="buttons-container" style="display: none;">
        <button id="add-to-cart">Add to Cart</button>
        <button id="buy-now">Buy Now</button>
    </div>
`;

// Function to update the price display
const updatePriceDisplay = (newPrice) => {
    document.getElementById('price-display').textContent = `$${newPrice.toFixed(2)}`;
};

// Add event listeners to radio buttons to update the price when selected
document.querySelectorAll('input[name="options"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        updatePriceDisplay(parseFloat(event.target.value));

        // Show buttons if the first option is selected
        const buttonsContainer = document.getElementById('buttons-container');
        if (event.target.id === 'option1') {
            buttonsContainer.style.display = 'flex';
        } else {
            buttonsContainer.style.display = 'none';
        }
        const subscriptionButton = document.getElementById('subscription-container');
        if(event.target.id==='option2' || event.target.id==='option3'){
          subscriptionButton.style.display = 'flex';
        }else {
            subscriptionButton.style.display = 'none';
        }
    });
});


    const nameLink = document.querySelector('.navigation .main-pages a:nth-child(3)');
    nameLink.textContent = decodeURIComponent(name);

    const preLink = document.querySelector('.controllers a:nth-child(1)');
    const nextLink = document.querySelector('.controllers a:nth-child(3)');

    const currentIndex = products.findIndex(product => product.name === name);

    if (currentIndex > 0) {
        const prevProduct = products[currentIndex - 1];
        preLink.href = `product-details.html?name=${encodeURIComponent(prevProduct.name)}&price=${encodeURIComponent(prevProduct.price)}&imageSrc=${encodeURIComponent(prevProduct.imageSrc)}&description=${encodeURIComponent(prevProduct.description)}&additionalImages=${encodeURIComponent(prevProduct.additionalImages.join(','))}&sku=${encodeURIComponent(prevProduct.sku)}`;
    } else {
        preLink.classList.add('disabled-link');
        preLink.addEventListener('click', function(event) {
            event.preventDefault();
        });
    }

    if (currentIndex < products.length - 1) {
        const nextProduct = products[currentIndex + 1];
        nextLink.href = `product-details.html?name=${encodeURIComponent(nextProduct.name)}&price=${encodeURIComponent(nextProduct.price)}&imageSrc=${encodeURIComponent(nextProduct.imageSrc)}&description=${encodeURIComponent(nextProduct.description)}&additionalImages=${encodeURIComponent(nextProduct.additionalImages.join(','))}&sku=${encodeURIComponent(nextProduct.sku)}`;
    } else {
        nextLink.classList.add('disabled-link');
        nextLink.addEventListener('click', function(event) {
            event.preventDefault();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sentences = document.querySelectorAll('.sentence');
    const paragraphs = document.querySelectorAll('.paragraph-container p');

    sentences.forEach(sentence => {
        sentence.addEventListener('click', () => {
            // Remove active class from all sentences
            sentences.forEach(s => s.classList.remove('active'));
            
            // Hide all paragraphs
            paragraphs.forEach(p => p.classList.remove('show'));

            // Add active class to the clicked sentence
            sentence.classList.add('active');
            
            // Show the related paragraph
            const paraId = sentence.getAttribute('data-paragraph');
            document.getElementById(paraId).classList.add('show');
        });
    });

    // Set the default active sentence and paragraph
    if (sentences.length > 0) {
        sentences[0].click(); // Trigger a click on the first sentence by default
    }
});
