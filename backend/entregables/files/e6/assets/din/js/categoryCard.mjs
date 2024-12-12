const categoryCard = (category, product, container) => {
    try {
        const caterogyItem = document.createElement('div');
        caterogyItem.className = `col-12 col-md-4 p-5 mt-3`;

        caterogyItem.innerHTML =
        `
            <a href="compras.html"><img src="${product.thumbnail}" class="rounded-circle img-fluid border"> </a>
            <h5 class="text-center mt-3 mb-3">${category.name}</h5>
            <p class="text-center"><a class="btn btn-success" href="compras.html">Ir a Comprar</a></p>
        `;

        container.appendChild(caterogyItem);
    }
    catch (err) {
        console.error(err.message)
    }
}