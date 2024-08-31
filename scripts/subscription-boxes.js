document.addEventListener('DOMContentLoaded', function() {
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

    const productGrid = document.querySelector('.product-grid');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const url = `product-details.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&imageSrc=${encodeURIComponent(product.imageSrc)}&description=${encodeURIComponent(product.description)}&additionalImages=${encodeURIComponent(product.additionalImages.join(','))}&sku=${encodeURIComponent(product.sku)}`;

        productDiv.innerHTML = `
            <a href="${url}">
                <img src="${product.imageSrc}" alt="${product.name}">
            </a>
            <div class="name">${product.name}</div>
            <div class="price">${product.price}</div>
        `;

        productGrid.appendChild(productDiv);
    });
});
