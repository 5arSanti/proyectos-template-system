const fetchCategories = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');

		if (!response.ok) { throw new Error('Network response was not ok'); }

        const data = await response.json();

		if (!data || !response) {
			return categoriesBD;
		}

        return data;
    }
    catch (error) {
        // console.error('Error fetching products:', error);

		return categoriesBD;
    }
}