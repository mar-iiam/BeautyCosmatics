document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            imageSrc: "../images/sub1.webp",
            name: "Product 1",
            price: "$19.99"
        },
        {
            imageSrc: "../images/sub2.webp",
            name: "Product 2",
            price: "$29.99"
        },
        {
            imageSrc: "../images/sub3.webp",
            name: "Product 3",
            price: "$39.99"
        },
        {
            imageSrc: "../images/sub4.webp",
            name: "Product 4",
            price: "$49.99"
        }
    ];

    const productGrid = document.querySelector('.product-grid');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.imageSrc}" alt="${product.name}">
            <div class="name">${product.name}</div>
            <div class="price">${product.price}</div>
        `;

        productGrid.appendChild(productDiv);
    });
});
