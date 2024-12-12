const carrouselItem = (product, index, carouselInner) => {
    try {
        const isActive = index === 0 ? 'active' : '';

        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${isActive}`;

        carouselItem.innerHTML =
        `
            <div class="container">
                <div class="row p-5">
                    <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                        <img class="img-fluid" src="${product.thumbnail}" alt="${product.title}">
                    </div>
                    <div class="col-lg-6 mb-0 d-flex align-items-center">
                        <div class="text-align-left align-self-center">
                            <h1 class="h1">${product.title}</h1>
                            <h3 class="h2">Precio: $${product.price}</h3>
                            <p>${product.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        carouselInner.appendChild(carouselItem);
    }
    catch (error) {
        console.error(error.message);
    }
}