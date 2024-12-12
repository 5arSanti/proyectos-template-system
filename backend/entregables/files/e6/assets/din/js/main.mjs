async function fetchAndDisplayProducts() {
    try {
        const products = await fetchProducts() || baseDeDatos;
        const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);

        const categories = await fetchCategories() || categoriesBD;
        const randomCategories = categories.sort(() => 0.5 - Math.random()).slice(0, 3);

        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.innerHTML = '';

        const productsContainer = document.querySelector('#products-container');
        productsContainer.innerHTML = '';

        const categoriesContainer = document.querySelector('#categories-container');
        categoriesContainer.innerHTML = '';

        randomProducts.forEach((product, index) => {
            carrouselItem(product, index, carouselInner);
            homeProductCard(product, productsContainer);
        });

        randomCategories.forEach((category) => {
            categoryCard(category, products[getRandomNumber(products.length)], categoriesContainer);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchAndDisplayProducts();