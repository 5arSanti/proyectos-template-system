
const homeProductCard = (product, container) => {
    try {

        const productItem = document.createElement('div');
        productItem.className = `col-12 col-md-4 mb-4`;

        productItem.innerHTML =
        `
            <div class="card h-100">
                <a href="compras.html">
                    <img src="${product.thumbnail}" class="${product.title}">
                </a>
                <div class="card-body">
                    <ul class="list-unstyled d-flex justify-content-between">
                        <li class="text-muted text-right">$${product.price}</li>
                    </ul>
                    <p>
                        ${product.description}
                    </p>
                    <p class="text-muted">Vistas (30)</p>
                </div>

            </div>
        `;

        container.appendChild(productItem);
    }
    catch (error) {
        console.error(error.message);
    }
}