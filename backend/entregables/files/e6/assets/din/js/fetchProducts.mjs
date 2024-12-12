const fetchProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');

		if (!response.ok) { throw new Error('Network response was not ok'); }

        const data = await response.json();

		if (!data || !response) {
			return baseDeDatos;
		}

        return data.products;
    }
    catch (error) {
        // console.error('Error fetching products:', error);

		return baseDeDatos;
    }
}